import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Stepper, type StepItem } from "@/components/custom/stepper"

const meta: Meta<typeof Stepper> = {
  title: "DS/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Stepper>

// ─── Shared step sets ─────────────────────────────────────────────────────────

const BASE: StepItem[] = [
  { id: "1", label: "Step", count: 1, status: "complete"  },
  { id: "2", label: "Step", count: 1, status: "current"   },
  { id: "3", label: "Step", count: 1, status: "pending"   },
]

const WITH_DESC: StepItem[] = [
  { id: "1", label: "Step", description: "Description", count: 1, status: "complete" },
  { id: "2", label: "Step", description: "Description", count: 1, status: "current"  },
  { id: "3", label: "Step", description: "Description", count: 1, status: "pending"  },
]

const FOUR: StepItem[] = [
  { id: "1", label: "Step", count: 1, status: "complete" },
  { id: "2", label: "Step", count: 1, status: "current"  },
  { id: "3", label: "Step", count: 1, status: "pending"  },
  { id: "4", label: "Step", count: 1, status: "pending"  },
]

// ─── Types ────────────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  args: { steps: BASE, orientation: "horizontal" },
}

export const Vertical: Story = {
  args: { steps: FOUR, orientation: "vertical" },
  decorators: [(Story) => <div className="p-4"><Story /></div>],
}

export const WithDescriptions: Story = {
  args: { steps: WITH_DESC, orientation: "horizontal" },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-xs font-mono text-text-muted capitalize">{size}</span>
          <Stepper steps={BASE} size={size} />
        </div>
      ))}
    </div>
  ),
}

// ─── Interaction states ───────────────────────────────────────────────────────

export const AllComplete: Story = {
  name: "State — all complete",
  args: {
    steps: BASE.map((s) => ({ ...s, status: "complete" as const })),
  },
}

export const WithError: Story = {
  name: "State — failure",
  args: {
    steps: [
      { id: "1", label: "Step", count: 1, status: "complete" },
      { id: "2", label: "Step", count: 1, status: "complete" },
      { id: "3", label: "Step", count: 1, status: "error"    },
    ],
  },
}

// ─── Clickable ────────────────────────────────────────────────────────────────

export const Clickable: Story = {
  render: () => {
    const [active, setActive] = React.useState("2")
    const steps: StepItem[] = [
      { id: "1", label: "Account",     count: 1, status: active === "1" ? "current" : +active > 1 ? "complete" : "pending" },
      { id: "2", label: "Preferences", count: 3, status: active === "2" ? "current" : +active > 2 ? "complete" : "pending" },
      { id: "3", label: "Review",      count: 2, status: active === "3" ? "current" : +active > 3 ? "complete" : "pending" },
    ]
    return (
      <div className="flex flex-col gap-4">
        <Stepper steps={steps} onStepClick={setActive} />
        <p className="text-xs text-text-muted">Click a step to navigate</p>
      </div>
    )
  },
}

// ─── Vertical with descriptions ───────────────────────────────────────────────

export const VerticalWithDescriptions: Story = {
  name: "Vertical — with descriptions",
  args: {
    steps: WITH_DESC,
    orientation: "vertical",
  },
  decorators: [(Story) => <div className="p-4"><Story /></div>],
}
