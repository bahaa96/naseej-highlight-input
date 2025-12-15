import React from "react";

interface NotWithTheTreeProps {
  message?: string;
}

const NotWithTheTree = ({
  message = "This component should be tree-shaken if not imported",
}: NotWithTheTreeProps) => {
  return (
    <div style={{ padding: "20px", border: "2px solid red", margin: "10px" }}>
      <h2>NotWithTheTree Component</h2>
      <p>{message}</p>
      <p>
        If you see this in your bundle but didn't import it, tree-shaking is not
        working!
      </p>
    </div>
  );
};

export default NotWithTheTree;
