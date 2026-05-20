import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "DS/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Save changes", variant: "default" },
};

export const Secondary: Story = {
  args: { children: "Cancel", variant: "secondary" },
};

export const Destructive: Story = {
  args: { children: "Delete", variant: "destructive" },
};

export const Outline: Story = {
  args: { children: "Export", variant: "outline" },
};

export const Ghost: Story = {
  args: { children: "View details", variant: "ghost" },
};

export const Disabled: Story = {
  args: { children: "Unavailable", disabled: true },
};
