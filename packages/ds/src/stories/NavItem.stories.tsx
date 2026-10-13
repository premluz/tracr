import type { Meta, StoryObj } from "@storybook/react-vite"
import { BoxIcon, DiamondIcon, PackageIcon, BarChart3Icon, SettingsIcon } from "lucide-react"
import { NavItem } from "@/components/custom/nav-item"

const meta: Meta<typeof NavItem> = {
  title: "DS/Custom/NavItem",
  component: NavItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[220px] rounded-lg bg-surface-1 p-2">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NavItem>

export const Default: Story = {
  args: {
    icon: <BoxIcon className="size-4" />,
    label: "Polished Inventory",
  },
}

export const Active: Story = {
  args: {
    icon: <DiamondIcon className="size-4" />,
    label: "Polished Inventory",
    active: true,
  },
}

export const WithBadge: Story = {
  args: {
    icon: <PackageIcon className="size-4" />,
    label: "Inbound Shipments",
    badge: (
      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-status-available/20 px-1 text-[10px] font-medium text-status-available">
        3
      </span>
    ),
  },
}

export const SidebarExample: Story = {
  render: () => (
    <div className="flex w-[220px] flex-col gap-0.5 rounded-lg bg-surface-1 p-2">
      <NavItem icon={<DiamondIcon className="size-4" />} label="Polished Inventory" active />
      <NavItem icon={<BoxIcon className="size-4" />} label="Rough Inventory" />
      <NavItem icon={<PackageIcon className="size-4" />} label="Inbound Shipments" />
      <NavItem icon={<BarChart3Icon className="size-4" />} label="Dashboard" />
      <NavItem icon={<SettingsIcon className="size-4" />} label="Settings" />
    </div>
  ),
}
