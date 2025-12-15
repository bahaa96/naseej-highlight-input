import React, {
  type InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./index.module.css";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string;
  highlightPattern?: RegExp;
  value: string;
  onChange?: (value: string) => void;
}

const Input = ({
  label,
  highlightPattern,
  value: initialValue,
  onChange,
  className,
  ...props
}: InputProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  const regexPattern = useMemo(
    () => new RegExp(highlightPattern ?? "", "g"),
    [highlightPattern]
  );

  const parts = useMemo(
    () => inputValue?.split(regexPattern) ?? [],
    [inputValue, regexPattern]
  );

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const input = inputRef.current;
    const mirror = mirrorRef.current;
    if (!input || !mirror) return;

    const syncScroll = () => {
      mirror.scrollLeft = input.scrollLeft;
    };

    const handleScroll = () => {
      syncScroll();
    };

    const scrollToCursor = () => {
      requestAnimationFrame(() => {
        const selectionStart = input.selectionStart ?? 0;
        if (selectionStart === null) return;

        const textBeforeCursor = inputValue.substring(0, selectionStart);
        const tempSpan = document.createElement("span");
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.whiteSpace = "nowrap";
        tempSpan.style.font = window.getComputedStyle(input).font;
        tempSpan.style.padding = "0";
        tempSpan.textContent = textBeforeCursor;
        document.body.appendChild(tempSpan);
        const textWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);

        const inputRect = input.getBoundingClientRect();
        const padding = 10;
        const visibleWidth = inputRect.width - padding * 2;
        const cursorPosition = textWidth + padding;

        if (cursorPosition > input.scrollLeft + visibleWidth) {
          input.scrollLeft = cursorPosition - visibleWidth;
        } else if (cursorPosition < input.scrollLeft) {
          input.scrollLeft = Math.max(0, cursorPosition - padding);
        }
        syncScroll();
      });
    };

    input.addEventListener("scroll", handleScroll);
    input.addEventListener("input", scrollToCursor);
    input.addEventListener("keyup", scrollToCursor);
    input.addEventListener("click", scrollToCursor);
    input.addEventListener("focus", scrollToCursor);

    return () => {
      input.removeEventListener("scroll", handleScroll);
      input.removeEventListener("input", scrollToCursor);
      input.removeEventListener("keyup", scrollToCursor);
      input.removeEventListener("click", scrollToCursor);
      input.removeEventListener("focus", scrollToCursor);
    };
  }, [inputValue]);

  return (
    <div>
      {label && (
        <label className={classes["highlight-input__label"]} htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className={`${classes["highlight-input"]} ${className ?? ""}`}>
        <div ref={mirrorRef} className={classes["highlight-input__mirror"]}>
          {parts.map((part, i) =>
            regexPattern.test(part) ? (
              <span key={i} className={classes["highlight-input__match"]}>
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
        <input
          ref={inputRef}
          className={classes["highlight-input__field"]}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange?.(e.target.value);
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
