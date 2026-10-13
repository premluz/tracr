import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  LayoutDashboardIcon,
  ListIcon,
  GridIcon,
  SlidersIcon,
} from "lucide-react"
import { TabsNav, type TabItem } from "@/components/custom/tabs"

const meta: Meta<typeof TabsNav> = {
  title: "DS/Tabs",
  component: TabsNav,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof TabsNav>

// ─── Shared tab sets ──────────────────────────────────────────────────────────

const ITEMS_PLAIN: TabItem[] = [
  { id: "overview",      label: "Overview" },
  { id: "details",       label: "Details",       badge: 2 },
  { id: "spec",          label: "Specification" },
  { id: "config",        label: "Configuration" },
]

const ITEMS_ICON: TabItem[] = [
  { id: "overview",      label: "Overview",      icon: <LayoutDashboardIcon /> },
  { id: "details",       label: "Details",       icon: <ListIcon />,   badge: 2 },
  { id: "spec",          label: "Specification", icon: <GridIcon /> },
  { id: "config",        label: "Configuration", icon: <SlidersIcon /> },
]

const ITEMS_ICON_ONLY: TabItem[] = [
  { id: "overview",      icon: <LayoutDashboardIcon />, tooltip: "Overview" },
  { id: "details",       icon: <ListIcon />,   badge: 2, tooltip: "Details" },
  { id: "spec",          icon: <GridIcon />,             tooltip: "Specification" },
  { id: "config",        icon: <SlidersIcon />,          tooltip: "Configuration" },
]

const ITEMS_LONG: TabItem[] = [
  { id: "overview",      label: "Overview",         badge: 2 },
  { id: "details",       label: "Details",          badge: 2 },
  { id: "spec",          label: "Specification",    badge: 2 },
  { id: "version",       label: "Version history",  tooltip: "Version history" },
]

// ─── Types ────────────────────────────────────────────────────────────────────

export const TypeButton: Story = {
  name: "Type — button",
  args: { items: ITEMS_PLAIN, type: "button", defaultValue: "overview" },
}

export const TypeLine: Story = {
  name: "Type — line",
  args: { items: ITEMS_PLAIN, type: "line", defaultValue: "overview" },
}

export const TypeWithIcon: Story = {
  name: "Type — with icon",
  args: { items: ITEMS_ICON, type: "button", defaultValue: "overview" },
}

export const TypeIconOnly: Story = {
  name: "Type — icon only",
  args: { items: ITEMS_ICON_ONLY, type: "button", defaultValue: "overview" },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

const sizeItems: TabItem[] = [
  { id: "a", label: "Item" },
  { id: "b", label: "Item", badge: 2 },
  { id: "c", label: "Item", badge: 2 },
  { id: "d", label: "Item", badge: 2 },
]

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-xs font-mono text-text-muted">{size}</span>
          <TabsNav items={sizeItems} size={size} defaultValue="a" />
        </div>
      ))}
    </div>
  ),
}

// ─── Orientation ─────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: "Orientation — vertical, button",
  args: { items: ITEMS_PLAIN, type: "button", orientation: "vertical", defaultValue: "overview" },
}

export const VerticalWithIcon: Story = {
  name: "Orientation — vertical, with icon",
  args: { items: ITEMS_ICON, type: "button", orientation: "vertical", defaultValue: "overview" },
}

// ─── Truncation + tooltip ─────────────────────────────────────────────────────

export const Truncation: Story = {
  name: "Truncation — tooltip on hover",
  render: () => (
    <div className="w-[420px] flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs text-text-muted">Truncated label</p>
        <TabsNav items={ITEMS_LONG} defaultValue="overview" />
      </div>
      <div>
        <p className="mb-2 text-xs text-text-muted">With tooltip (hover last tab)</p>
        <TabsNav items={ITEMS_LONG} defaultValue="overview" />
      </div>
    </div>
  ),
}

// ─── All types at a glance ────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: "All types",
  render: () => {
    const [val, setVal] = React.useState("overview")
    return (
      <div className="flex flex-col gap-10 w-[600px]">
        {(
          [
            { label: "Button",    items: ITEMS_PLAIN, type: "button" },
            { label: "Line",      items: ITEMS_PLAIN, type: "line" },
            { label: "With icon", items: ITEMS_ICON,  type: "button" },
            { label: "Icon only", items: ITEMS_ICON_ONLY, type: "button" },
          ] as const
        ).map(({ label, items, type }) => (
          <div key={label}>
            <p className="mb-3 text-sm font-semibold text-text-primary">{label}</p>
            <TabsNav
              items={items}
              type={type}
              value={val}
              onValueChange={setVal}
            />
          </div>
        ))}
      </div>
    )
  },
}
