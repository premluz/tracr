import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#080808" },
        { name: "surface-1", value: "#0f0f0f" },
        { name: "surface-2", value: "#151515" },
      ],
    },
    layout: "centered",
  },
};

export default preview;
