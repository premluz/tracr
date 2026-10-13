import React from "react"
import type { Preview } from "@storybook/react-vite"
import "../src/index.css"

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-bg text-text-primary">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
}

export default preview
