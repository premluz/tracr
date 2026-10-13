import type { Meta, StoryObj } from "@storybook/react-vite"
import { CheckIcon, WifiOffIcon } from "lucide-react"
import { Badge, type BadgeProps } from "@/components/ui/badge"

const colors: NonNullable<BadgeProps["color"]>[] = [
  "neutral",
  "green",
  "teal",
  "red",
  "amber",
  "emerald",
  "blue",
  "yellow",
  "pink",
  "indigo",
]

const fills: NonNullable<BadgeProps["fill"]>[] = [
  "subtle",
  "medium",
  "strong",
]

const meta: Meta<typeof Badge> = {
  title: "DS/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: "Label" },
}

export const WithIcon: Story = {
  args: {
    color: "green",
    fill: "subtle",
    children: (
      <>
        <CheckIcon />
        Available
      </>
    ),
  },
}

export const SmallRounding: Story = {
  name: "Small rounding — all colors × fills",
  render: () => (
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-3">
          {fills.map((fill) => (
            <Badge key={fill} color={color} fill={fill} radius="sm">
              Label
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const FullRounding: Story = {
  name: "Full rounding — all colors × fills",
  render: () => (
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-3">
          {fills.map((fill) => (
            <Badge key={fill} color={color} fill={fill} radius="full">
              Label
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Outline: Story = {
  name: "Border only (outline) — all colors",
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {colors.map((color) => (
          <div key={color} className="flex items-center gap-3">
            <Badge color={color} fill="outline" radius="sm">
              Label
            </Badge>
            <Badge color={color} fill="outline" radius="full">
              Label
            </Badge>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge color="green" fill="subtle" size="sm">Small</Badge>
      <Badge color="green" fill="subtle" size="md">Medium</Badge>
    </div>
  ),
}

export const StatusExamples: Story = {
  name: "Status use cases",
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge color="green" fill="subtle" radius="sm">
        <CheckIcon /> Available
      </Badge>
      <Badge color="red" fill="subtle" radius="sm">
        <WifiOffIcon /> Offline
      </Badge>
      <Badge color="amber" fill="subtle" radius="sm">
        Missing check
      </Badge>
      <Badge color="neutral" fill="subtle" radius="sm">
        Restricted
      </Badge>
      <Badge color="amber" fill="subtle" size="sm" className="uppercase font-semibold">
        dev
      </Badge>
      <Badge color="indigo" fill="subtle" size="sm" className="uppercase font-semibold">
        uat
      </Badge>
    </div>
  ),
}
