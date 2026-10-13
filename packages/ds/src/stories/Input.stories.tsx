import type { Meta, StoryObj } from "@storybook/react-vite"
import { InfoIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"

// ─── Input stories ────────────────────────────────────────────────────────────

const meta: Meta<typeof Input> = {
  title: "DS/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { placeholder: "Enter data" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Input>

// Variants
export const Filled: Story = { args: { variant: "filled" } }
export const Outline: Story = { args: { variant: "outline" } }

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      {(["sm", "md", "lg", "xl", "2xl"] as const).map((inputSize) => (
        <FormField
          key={inputSize}
          label="Label"
          placeholder="Enter data"
          inputSize={inputSize}
        />
      ))}
    </div>
  ),
}

// States
export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <FormField label="Full name" placeholder="As appears on card" variant="filled" />
      <FormField label="Full name" placeholder="As appears on card" variant="outline" />
    </div>
  ),
}

export const WithHint: Story = {
  render: () => (
    <FormField
      label="Email"
      placeholder="you@example.com"
      hint="We'll never share your email."
      className="w-80"
    />
  ),
}

export const WithSuccess: Story = {
  render: () => (
    <FormField
      label="Email"
      defaultValue="Data entered"
      success="This is a validation message."
      className="w-80"
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <FormField
      label="Login"
      defaultValue="Data entered"
      error="This is a validation message."
      className="w-80"
    />
  ),
}

// Types — default / success / error
export const Types: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <FormField label="Label" placeholder="Enter data" />
      <FormField label="Label" defaultValue="Data entered" success="This is a validation message." />
      <FormField label="Login" defaultValue="Data entered" error="This is a validation message." />
    </div>
  ),
}

export const WithLabelIcon: Story = {
  render: () => (
    <FormField
      label="Recipient URL"
      labelIcon={<InfoIcon className="size-3.5 text-text-muted" />}
      placeholder="https://example.com"
      className="w-80"
    />
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Cannot edit this" },
}
