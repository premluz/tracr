import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { AwardIcon, PowerIcon } from "lucide-react"
import { PageShell } from "@/components/custom/page-shell"
import { SidebarNav, type SidebarNavGroup, type SidebarNavBottomItem } from "@/components/custom/sidebar-nav"
import { PageHeader } from "@/components/custom/page-header"
import { InventoryTable, generateDiamonds } from "@/components/custom/inventory-table"
import { Logo } from "@/components/custom/logo"
import { Logomark } from "@/components/custom/logomark"
import { Button } from "@/components/ui/button"
import { TabsNav, type TabItem } from "@/components/custom/tabs"
import { RoughIcon } from "@/components/custom/icons/rough-icon"
import { SplitIcon } from "@/components/custom/icons/split-icon"
import { PolishedIcon } from "@/components/custom/icons/polished-icon"
import { MonitoringIcon } from "@/components/custom/icons/monitoring-icon"
import { DataIntegrationToolIcon } from "@/components/custom/icons/data-integration-tool-icon"
import { DiamondsInIcon } from "@/components/custom/icons/diamonds-in-icon"
import { DiamondsOutIcon } from "@/components/custom/icons/diamonds-out-icon"
import { ContactIcon } from "@/components/custom/icons/contact-icon"
import { HelpIcon } from "@/components/custom/icons/help-icon"

const DIAMONDS = generateDiamonds(3353)

// ─── Nav setup ────────────────────────────────────────────────────────────────

const navGroups: SidebarNavGroup[] = [
  {
    label: "Inventory",
    items: [
      { id: "rough",    icon: <RoughIcon className="size-4" />,            label: "Rough" },
      { id: "split",    icon: <SplitIcon className="size-4" />,            label: "Split" },
      { id: "polished", icon: <PolishedIcon className="size-4" />,         label: "Polished", active: true },
      { id: "graded",   icon: <AwardIcon className="size-4" />,            label: "Graded" },
    ],
  },
  {
    label: "Integration",
    items: [
      { id: "monitoring",       icon: <MonitoringIcon className="size-4" />,          label: "Monitoring" },
      { id: "integration-tool", icon: <DataIntegrationToolIcon className="size-4" />, label: "Integration tool" },
    ],
  },
  {
    label: "Shipments",
    items: [
      { id: "inbound",  icon: <DiamondsInIcon className="size-4" />,  label: "Inbound" },
      { id: "outbound", icon: <DiamondsOutIcon className="size-4" />, label: "Outbound" },
    ],
  },
]

const bottomItems: SidebarNavBottomItem[] = [
  { id: "feedback", icon: <ContactIcon className="size-4" />, label: "Feedback" },
  { id: "help", icon: <HelpIcon className="size-4" />, label: "Help" },
  { id: "logout", icon: <PowerIcon className="size-4" />, label: "Logout" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────


function InventoryCount() {
  return (
    <span className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
      22,221
    </span>
  )
}

const TAB_ITEMS: TabItem[] = [
  { id: "active", label: "Active" },
  { id: "archived", label: "Archived" },
]

// ─── Demo ─────────────────────────────────────────────────────────────────────

function AppShellDemo() {
  const [search, setSearch]       = React.useState("")
  const [page, setPage]           = React.useState(1)
  const [pageSize, setPageSize]   = React.useState(50)
  const [tab, setTab]             = React.useState("active")
  const [collapsed, setCollapsed] = React.useState(false)

  const groupsWithCount = navGroups.map((g) =>
    g.label === "Inventory"
      ? { ...g, items: g.items.map((item, i) => (i === 2 ? { ...item, badge: <InventoryCount /> } : item)) }
      : g
  )

  const filtered = React.useMemo(
    () =>
      search
        ? DIAMONDS.filter((d) =>
            d.id.toLowerCase().includes(search.toLowerCase()) ||
            d.clarity.toLowerCase().includes(search.toLowerCase()) ||
            d.shape.toLowerCase().includes(search.toLowerCase())
          )
        : DIAMONDS,
    [search]
  )

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <PageShell
      sidebar={
        <SidebarNav
          logo={collapsed ? <Logomark className="text-status-available" /> : <Logo className="text-text-primary" />}
          groups={groupsWithCount}
          bottomItems={bottomItems}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      }
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Polished inventory"
          indicator
          environment="uat"
          properties={[{ label: "Stones", value: filtered.length.toLocaleString() }]}
          actions={
            <>
              <Button variant="outline" size="md">Export</Button>
              <Button size="md">Add stone</Button>
            </>
          }
        />

        <TabsNav items={TAB_ITEMS} value={tab} onValueChange={setTab} type="button" size="lg" className="px-6 py-1.5" />

        <InventoryTable
          data={paginated}
          totalCount={filtered.length}
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1) }}
          onExport={() => {}}
          onColumns={() => {}}
          onFilter={() => {}}
          page={page}
          onPageChange={setPage}
          pageSize={pageSize}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
          onView={() => {}}
          onShare={() => {}}
          onArchive={() => {}}
          onUnlock={() => {}}
          onTransfer={() => {}}
          className="flex-1 overflow-hidden"
        />
      </div>
    </PageShell>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "DS/AppShell",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const PolishedInventory: Story = {
  render: () => <AppShellDemo />,
}
