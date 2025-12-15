import type { Meta, StoryObj } from "@storybook/react-vite";

import { HighlightInput } from "naseej-highlight-input";
import "naseej-highlight-input/dist/index.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/HighlightInput",
  component: HighlightInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: "text", required: false },
    highlightPattern: {
      control: "text",
      required: false,
      name: "Highlight Pattern (without modifiers)",
    },
    value: { control: "text", required: false },
    onChange: { action: "onChange", required: false },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    label: "type your text here",
    highlightPattern: /(?:[a-zA-Z0-9]+)/g,
    value: "",
    onChange: (value) => {
      console.log(value);
    },
  },
} satisfies Meta<typeof HighlightInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "type your text here",
    highlightPattern: "(\\d+)",
    value: "kjhbhbhb",
    onChange: (value) => {
      console.log(value);
    },
  },
};
