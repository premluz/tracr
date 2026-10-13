import type { Meta, StoryObj } from "@storybook/react-vite"
import { DiamondIcon, BoxIcon, PackageIcon, BarChart3Icon, SettingsIcon } from "lucide-react"
import { PageShell } from "@/components/custom/page-shell"
import { PageHeader } from "@/components/custom/page-header"
import { NavItem } from "@/components/custom/nav-item"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof PageShell> = {
  title: "DS/Custom/PageShell",
  component: PageShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof PageShell>

function SampleSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 items-center border-b border-border-subtle px-4">
        <span className="text-sm font-semibold text-text-primary">Tracr</span>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        <NavItem icon={<DiamondIcon className="size-4" />} label="Polished Inventory" active />
        <NavItem icon={<BoxIcon className="size-4" />} label="Rough Inventory" />
        <NavItem icon={<PackageIcon className="size-4" />} label="Shipments" />
        <NavItem icon={<BarChart3Icon className="size-4" />} label="Dashboard" />
      </nav>
      <div className="border-t border-border-subtle p-2">
        <NavItem icon={<SettingsIcon className="size-4" />} label="Settings" />
      </div>
    </div>
  )
}

export const Default: Story = {
  args: {
    sidebar: <SampleSidebar />,
    children: (
      <PageHeader
        title="Polished Inventory"
        description="Manage and track polished diamond inventory across all locations."
        onBack={() => {}}
        indicator
        environment="uat"
        properties={[
          { label: "Files required", value: "15/15" },
          { label: "Autosaved", value: "Today at 14:04" },
        ]}
        actions={
          <>
            <Button variant="outline" size="md">Secondary</Button>
            <Button size="md">Primary</Button>
          </>
        }
      />
    ),
  },
}

export const NoSidebar: Story = {
  args: {
    children: (
      <div className="flex h-full items-center justify-center">
        <p className="text-text-muted">Full-width layout without sidebar</p>
      </div>
    ),
  },
}
