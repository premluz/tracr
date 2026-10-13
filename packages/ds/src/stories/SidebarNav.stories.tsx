import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { AwardIcon, PowerIcon } from "lucide-react"
import { SidebarNav } from "@/components/custom/sidebar-nav"
import { Logo } from "@/components/custom/logo"
import { Logomark } from "@/components/custom/logomark"
import { Badge } from "@/components/ui/badge"
import { RoughIcon } from "@/components/custom/icons/rough-icon"
import { SplitIcon } from "@/components/custom/icons/split-icon"
import { PolishedIcon } from "@/components/custom/icons/polished-icon"
import { MonitoringIcon } from "@/components/custom/icons/monitoring-icon"
import { DataIntegrationToolIcon } from "@/components/custom/icons/data-integration-tool-icon"
import { DiamondsInIcon } from "@/components/custom/icons/diamonds-in-icon"
import { DiamondsOutIcon } from "@/components/custom/icons/diamonds-out-icon"
import { ContactIcon } from "@/components/custom/icons/contact-icon"
import { HelpIcon } from "@/components/custom/icons/help-icon"

const meta: Meta<typeof SidebarNav> = {
  title: "DS/SidebarNav",
  component: SidebarNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof SidebarNav>

// Sample data for stories
const topGroups = [
  {
    label: "Inventory",
    items: [
      { id: "rough", icon: <RoughIcon className="size-4" />, label: "Rough", active: true },
      { id: "split", icon: <SplitIcon className="size-4" />, label: "Split" },
      { id: "polished", icon: <PolishedIcon className="size-4" />, label: "Polished" },
      { id: "graded", icon: <AwardIcon className="size-4" />, label: "Graded" },
    ],
  },
  {
    label: "Integration",
    items: [
      { id: "monitoring", icon: <MonitoringIcon className="size-4" />, label: "Monitoring" },
      { id: "integration-tool", icon: <DataIntegrationToolIcon className="size-4" />, label: "Integration Tool" },
    ],
  },
  {
    label: "Shipments",
    items: [
      { id: "inbound", icon: <DiamondsInIcon className="size-4" />, label: "Inbound", badge: <Badge color="neutral" fill="subtle" className="h-5 px-1.5 text-[10px]">3</Badge> },
      { id: "outbound", icon: <DiamondsOutIcon className="size-4" />, label: "Outbound" },
    ],
  },
]

const bottomItems = [
  { id: "feedback", icon: <ContactIcon className="size-4" />, label: "Feedback" },
  { id: "help", icon: <HelpIcon className="size-4" />, label: "Help" },
  { id: "logout", icon: <PowerIcon className="size-4" />, label: "Logout" },
]

export const Default: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)
    return (
      <div className="flex h-screen w-64 bg-surface-1">
        <SidebarNav
          logo={<Logo className="text-text-primary" />}
          groups={topGroups}
          bottomItems={bottomItems}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>
    )
  },
}

export const Collapsed: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(true)
    return (
      <div className="flex h-screen w-16 bg-surface-1">
        <SidebarNav
          logo={<Logomark className="text-accent" />}
          groups={topGroups}
          bottomItems={bottomItems}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>
    )
  },
}

export const WithLogomark: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)
    return (
      <div className="flex h-screen w-64 bg-surface-1">
        <SidebarNav
          logo={<Logomark className="text-status-available" />}
          groups={topGroups}
          bottomItems={bottomItems}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>
    )
  },
}

export const WithoutBottomItems: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)
    return (
      <div className="flex h-screen w-64 bg-surface-1">
        <SidebarNav
          logo={<Logo className="text-text-primary" />}
          groups={topGroups}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)
    const [activeId, setActiveId] = React.useState("rough")

    const groups = topGroups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        active: item.id === activeId,
        onClick: () => setActiveId(item.id),
      })),
    }))

    return (
      <div className="flex h-screen w-64 bg-surface-1">
        <SidebarNav
          logo={collapsed ? <Logomark className="text-status-available" /> : <Logo className="text-text-primary" />}
          groups={groups}
          bottomItems={bottomItems.map((item) => ({
            ...item,
            onClick: () => console.log(`Clicked ${item.label}`),
          }))}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>
    )
  },
}
