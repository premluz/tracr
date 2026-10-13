import * as React from "react"
import { useLocation, useSearchParams } from "react-router"
import { AwardIcon, PowerIcon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { PageShell } from "@/components/custom/page-shell"
import { SidebarNav, type SidebarNavGroup, type SidebarNavBottomItem } from "@/components/custom/sidebar-nav"
import { PageHeader } from "@/components/custom/page-header"
import { DrawerProvider } from "@/components/custom/drawer"
import { InventoryTable, generateDiamonds, type Diamond } from "@/components/custom/inventory-table"
import { TransferDrawer } from "@/components/custom/transfer-drawer"
import { DiamondPreviewDrawer } from "@/components/custom/diamond-preview-drawer"
import { Logo } from "@/components/custom/logo"
import { Logomark } from "@/components/custom/logomark"
import { TabsNav } from "@/components/custom/tabs"
import { Button } from "@/components/ui/button"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"
import { RoughIcon } from "@/components/custom/icons/rough-icon"
import { SplitIcon } from "@/components/custom/icons/split-icon"
import { PolishedIcon } from "@/components/custom/icons/polished-icon"
import { MonitoringIcon } from "@/components/custom/icons/monitoring-icon"
import { DataIntegrationToolIcon } from "@/components/custom/icons/data-integration-tool-icon"
import { DiamondsInIcon } from "@/components/custom/icons/diamonds-in-icon"
import { DiamondsOutIcon } from "@/components/custom/icons/diamonds-out-icon"
import { ContactIcon } from "@/components/custom/icons/contact-icon"
import { HelpIcon } from "@/components/custom/icons/help-icon"

// ─── Static data ──────────────────────────────────────────────────────────────

const ALL_DIAMONDS = generateDiamonds(5000)
const SCENARIO_1_IDS = ALL_DIAMONDS.slice(0, 10).map((d) => d.id)

// ─── Nav ─────────────────────────────────────────────────────────────────────

function InventoryCount({ n }: { n: number }) {
  return (
    <span className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
      {n.toLocaleString()}
    </span>
  )
}

const navGroups: SidebarNavGroup[] = [
  {
    label: "Inventory",
    items: [
      { id: "rough",    icon: <RoughIcon className="size-4" />,    label: "Rough" },
      { id: "split",    icon: <SplitIcon className="size-4" />,    label: "Split" },
      { id: "polished", icon: <PolishedIcon className="size-4" />, label: "Polished" },
      { id: "graded",   icon: <AwardIcon className="size-4" />,    label: "Graded" },
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

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "active", label: "Active" },
  { id: "archived", label: "Archived" },
] as const

function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <TabsNav
      items={TABS.map((t) => ({ id: t.id, label: t.label }))}
      value={active}
      onValueChange={onChange}
      type="button"
      size="lg"
      className="px-6 py-4"
    />
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type PreviewGroup = "eligible" | "locked" | "transferring" | "missingData"

export function PolishedInventoryPage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const scenario = Number(searchParams.get("scenario") ?? "0")

  const [search, setSearch]       = React.useState("")
  const [page, setPage]           = React.useState(1)
  const [pageSize, setPageSize]   = React.useState(50)
  const [tab, setTab]             = React.useState("active")
  const [collapsed, setCollapsed] = React.useState(false)

  const initialRows = React.useMemo(
    () => scenario === 1 ? ALL_DIAMONDS.filter((d) => SCENARIO_1_IDS.includes(d.id)) : [],
    [scenario]
  )
  const [selectedDiamonds, setSelectedDiamonds] = React.useState<Diamond[]>(initialRows)

  const [transferOpen, setTransferOpen] = React.useState(false)
  const [previewGroup, setPreviewGroup] = React.useState<PreviewGroup | null>(null)

  const filtered = React.useMemo(() => {
    if (!search) return ALL_DIAMONDS
    const q = search.toLowerCase()
    return ALL_DIAMONDS.filter(
      (d) =>
        d.id.toLowerCase().includes(q) ||
        d.clarity.toLowerCase().includes(q) ||
        d.shape.toLowerCase().includes(q)
    )
  }, [search])

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const previewDiamonds = React.useMemo(() => {
    if (!previewGroup) return []
    const eligible     = selectedDiamonds.filter((d) => d.status === "available")
    const locked       = selectedDiamonds.filter((d) => d.status === "locked")
    const transferring = selectedDiamonds.filter((d) => d.status === "transferring")
    const missingData  = selectedDiamonds.filter(
      (d) => d.status !== "available" && d.status !== "locked" && d.status !== "transferring"
    )
    if (previewGroup === "eligible")     return eligible
    if (previewGroup === "locked")       return locked
    if (previewGroup === "transferring") return transferring
    return missingData
  }, [previewGroup, selectedDiamonds])

  const previewTitle: Record<PreviewGroup, string> = {
    eligible:     "Eligible for transfer",
    locked:       "Eligible after resolving issues",
    transferring: "Not eligible – transferring",
    missingData:  "Not eligible – missing data",
  }

  const activeSegments = React.useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname]
  )

  const groupsWithCount = React.useMemo(
    () =>
      navGroups.map((group) => {
        const items = group.items.map((item) => {
          const withBadge =
            group.label === "Inventory" && item.id === "polished"
              ? { ...item, badge: <InventoryCount n={ALL_DIAMONDS.length} /> }
              : item

          return {
            ...withBadge,
            active: activeSegments.includes(withBadge.id),
          }
        })

        return { ...group, items }
      }),
    [activeSegments]
  )

  return (
    <DrawerProvider>
      <PageShell
        sidebar={
          <SidebarNav
            logo={collapsed ? <Logomark className="text-status-available" /> : <Logo className="h-5 w-auto text-text-primary" />}
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
            properties={[{ label: "Total Diamonds", value: filtered.length.toLocaleString() }]}
            actions={
              <Button size="md">
                <PlusIcon data-icon="inline-start" strokeWidth={iconStrokeWidth.regular} />
                Add diamond
              </Button>
            }
          />

          <TabBar active={tab} onChange={setTab} />

          <InventoryTable
            data={paginated}
            totalCount={filtered.length}
            search={search}
            onSearchChange={(v) => { setSearch(v); setPage(1) }}
            searchPlaceholder="Search"
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
            onTransfer={() => setTransferOpen(true)}
            onSelectionChange={setSelectedDiamonds}
            initialSelectedRows={scenario === 1 ? initialRows : undefined}
            className="flex-1 overflow-hidden"
          />
        </div>
      </PageShell>

      <TransferDrawer
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        diamonds={selectedDiamonds}
        onUnlockAll={() => {}}
        onPreviewGroup={(group) => setPreviewGroup(group as PreviewGroup)}
      />

      <DiamondPreviewDrawer
        open={previewGroup !== null && transferOpen}
        onClose={() => setPreviewGroup(null)}
        title={previewGroup ? previewTitle[previewGroup] : ""}
        diamonds={previewDiamonds}
      />
    </DrawerProvider>
  )
}
