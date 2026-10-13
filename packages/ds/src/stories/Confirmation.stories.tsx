import type { Meta, StoryObj } from "@storybook/react-vite"
import { CheckIcon, XIcon, CircleIcon } from "lucide-react"
import {
  Confirmation,
  ConfirmationIcon,
} from "@/components/custom/confirmation"

const meta: Meta<typeof Confirmation> = {
  title: "DS/Confirmation",
  component: Confirmation,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Confirmation>

// ─── Vertical layouts ─────────────────────────────────────────────────────────

export const Success: Story = {
  args: {
    accessory: <ConfirmationIcon icon={<CheckIcon />} variant="default" />,
    title: "Action successful",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    primaryAction: { label: "Action 1" },
    secondaryAction: { label: "Action 2" },
  },
}

export const Error: Story = {
  args: {
    accessory: <ConfirmationIcon icon={<XIcon />} variant="error" />,
    title: "Action failed",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    primaryAction: { label: "Action 1" },
    secondaryAction: { label: "Action 2" },
  },
}

export const EmptyStateVertical: Story = {
  name: "Empty state — vertical",
  args: {
    accessory: <ConfirmationIcon icon={<CircleIcon />} variant="success" size="sm" />,
    title: "No data to display",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in nunc lobortis, tempus lorem ut, aliquam felis. Nunc elementum sem at tristique tristique.",
    primaryAction: { label: "Action 1" },
    secondaryAction: { label: "Action 2" },
  },
}

export const EmptyStateWithImage: Story = {
  name: "Empty state — vertical with image",
  args: {
    accessory: (
      <div className="size-24 rounded-lg bg-surface-3" aria-label="Illustration placeholder" />
    ),
    title: "No data to display",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in nunc lobortis, tempus lorem ut, aliquam felis.",
    primaryAction: { label: "Action 1" },
    secondaryAction: { label: "Action 2" },
  },
}

// ─── Horizontal layouts ───────────────────────────────────────────────────────

export const HorizontalWithImage: Story = {
  name: "Horizontal — image",
  args: {
    layout: "horizontal",
    accessory: (
      <div className="size-16 rounded-lg bg-surface-3" aria-label="Illustration placeholder" />
    ),
    title: "No data to display",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in nunc lobortis, tempus lorem ut, aliquam felis.",
    primaryAction: { label: "Action 1" },
    secondaryAction: { label: "Action 2" },
  },
}

export const HorizontalWithIcon: Story = {
  name: "Horizontal — icon",
  args: {
    layout: "horizontal",
    accessory: <ConfirmationIcon icon={<CircleIcon />} variant="success" size="sm" />,
    title: "No data to display",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in nunc lobortis, tempus lorem ut, aliquam felis.",
    primaryAction: { label: "Action 1" },
    secondaryAction: { label: "Action 2" },
  },
}

// ─── Custom accessory (e.g. Lottie placeholder) ──────────────────────────────

export const CustomAccessory: Story = {
  name: "Custom accessory (Lottie placeholder)",
  args: {
    accessory: (
      <div className="flex size-16 items-center justify-center rounded-full bg-surface-4">
        <span className="text-xs text-text-muted">Lottie</span>
      </div>
    ),
    title: "Processing complete",
    description: "Your data has been processed successfully.",
    primaryAction: { label: "Continue" },
  },
}

// ─── Minimal ──────────────────────────────────────────────────────────────────

export const TitleOnly: Story = {
  name: "Minimal — title only",
  args: {
    title: "No results",
  },
}
