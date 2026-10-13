import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusBadge } from "@/components/custom/status-badge"

const meta: Meta<typeof StatusBadge> = {
  title: "DS/Custom/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof StatusBadge>

export const Available: Story = {
  args: { status: "available" },
}

export const Warning: Story = {
  args: { status: "warning" },
}

export const Error: Story = {
  args: { status: "error" },
}

export const Restricted: Story = {
  args: { status: "restricted" },
}

export const Locked: Story = {
  args: { status: "locked" },
}

export const CustomLabel: Story = {
  args: { status: "available", children: "In Stock" },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <StatusBadge status="available" />
      <StatusBadge status="warning" />
      <StatusBadge status="error" />
      <StatusBadge status="restricted" />
      <StatusBadge status="locked" />
    </div>
  ),
}
