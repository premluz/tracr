import * as React from "react"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import {
  CheckIcon,
  LockIcon,
  TriangleAlertIcon,
  ArrowRightLeftIcon,
  CircleCheckIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DataTable } from "@/components/custom/data-table"
import { PageToolbar } from "@/components/custom/page-toolbar"
import { TableSelectionBar } from "@/components/custom/table-selection-bar"
import { PaginationFooter } from "@/components/custom/pagination-footer"
import { Status, type StatusColor, type StatusFill } from "@/components/custom/status"
import { DiamondShapeIcon } from "@/components/custom/diamond-shape-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

// ─── Domain types ─────────────────────────────────────────────────────────────

export const CLARITIES = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"] as const
export const COLOURS   = ["D", "E", "F", "G", "H", "I", "J", "Q"] as const
export const SHAPES    = ["Round", "Princess", "Oval", "Cushion", "Pear", "Heart", "Emerald", "Radiant"] as const
export const STATUSES  = ["available", "locked", "missing-check", "not-inscribed", "transferring"] as const

export type DiamondClarity = (typeof CLARITIES)[number]
export type DiamondColour  = (typeof COLOURS)[number]
export type DiamondShape   = (typeof SHAPES)[number]
export type DiamondStatus  = (typeof STATUSES)[number]

export interface Diamond {
  id: string
  carat: number
  clarity: DiamondClarity
  colour: DiamondColour
  labEligible: boolean
  lastUpdated: string
  polishedCheck: "available" | "restricted"
  roughCheck: "available" | "restricted"
  shape: DiamondShape
  status: DiamondStatus
}

// ─── Status config ────────────────────────────────────────────────────────────

export const DIAMOND_STATUS_CONFIG: Record<
  DiamondStatus,
  { color: StatusColor; fill: StatusFill; icon: React.ReactNode; label: string }
> = {
  available:        { color: "success", fill: "fill", icon: <CheckIcon strokeWidth={iconStrokeWidth.regular} />,         label: "Available"     },
  locked:           { color: "red",    fill: "fill", icon: <LockIcon strokeWidth={iconStrokeWidth.regular} />,           label: "Locked"        },
  "missing-check":  { color: "amber",  fill: "fill", icon: <TriangleAlertIcon strokeWidth={iconStrokeWidth.regular} />,  label: "Missing check" },
  "not-inscribed":  { color: "yellow", fill: "fill", icon: <TriangleAlertIcon strokeWidth={iconStrokeWidth.regular} />,  label: "Not inscribed" },
  transferring:     { color: "blue",   fill: "fill", icon: <ArrowRightLeftIcon strokeWidth={iconStrokeWidth.regular} />, label: "Transferring"  },
}

// ─── Cell helpers ─────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  const d = new Date(iso)
  return (
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }) +
    " - " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  )
}

function DiamondStatusCell({ status }: { status: DiamondStatus }) {
  const cfg = DIAMOND_STATUS_CONFIG[status]
  return <Status color={cfg.color} fill={cfg.fill} textStyle="color" icon={cfg.icon}>{cfg.label}</Status>
}

function CheckCell({ check }: { check: "available" | "restricted" }) {
  return check === "available"
    ? <Status color="success" fill="fill" textStyle="color" icon={<CheckIcon strokeWidth={iconStrokeWidth.regular} />}>Available</Status>
    : <Status color="indigo" fill="outline-color" textStyle="color" icon={<LockIcon strokeWidth={iconStrokeWidth.regular} />}>Restricted</Status>
}

// ─── Column definitions ───────────────────────────────────────────────────────

interface RowActions {
  onView?:     (row: Diamond) => void
  onShare?:    (row: Diamond) => void
  onArchive?:  (row: Diamond) => void
  onUnlock?:   (row: Diamond) => void
  onTransfer?: (row: Diamond) => void
}

function buildColumns(
  onRowMenuClick?: (row: Diamond, e: React.MouseEvent) => void,
  rowActions?: RowActions,
  contextMenuState?: {
    rowId: string | null
    setRowId: (id: string | null) => void
  }
): ColumnDef<Diamond>[] {
  return [
    {
      id: "select",
      size: 44,
      enableSorting: false,
      header: ({ table }) => (
        <div className="-mx-3 flex items-center pl-6">
          <Checkbox
            checked={
              table.getIsAllRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? "indeterminate"
                  : false
            }
            onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
            aria-label="Select all"
            variant="outline"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="-mx-3 flex items-center pl-6" data-row-checkbox>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Select row"
            variant="outline"
          />
        </div>
      ),
    },
    {
      accessorKey: "carat",
      header: "Carat",
      size: 90,
      cell: ({ getValue }) => `${(getValue() as number).toFixed(3)}ct`,
    },
    { accessorKey: "clarity", header: "Clarity", size: 80 },
    { accessorKey: "colour",  header: "Colour",  size: 72 },
    {
      accessorKey: "shape",
      header: "Shape",
      size: 110,
      cell: ({ getValue }) => <DiamondShapeIcon shape={getValue() as DiamondShape} />,
    },
    {
      accessorKey: "lastUpdated",
      header: "Last updated",
      size: 160,
      cell: ({ getValue }) => fmtDate(getValue() as string),
    },
    {
      accessorKey: "labEligible",
      header: "Lab eligible",
      size: 100,
      enableSorting: false,
      cell: ({ getValue }) =>
        getValue()
          ? <CircleCheckIcon className="size-4.5 text-status-success" strokeWidth={iconStrokeWidth.regular} />
          : null,
    },
    {
      accessorKey: "polishedCheck",
      header: "Polished check",
      size: 140,
      enableSorting: false,
      cell: ({ getValue }) => <CheckCell check={getValue() as Diamond["polishedCheck"]} />,
    },
    {
      accessorKey: "roughCheck",
      header: "Rough check",
      size: 120,
      enableSorting: false,
      cell: ({ getValue }) => <CheckCell check={getValue() as Diamond["roughCheck"]} />,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      cell: ({ getValue }) => <DiamondStatusCell status={getValue() as DiamondStatus} />,
    },
    {
      id: "actions",
      size: 44,
      enableSorting: false,
      cell: ({ row }) => {
        const d = row.original
        const items = [
          rowActions?.onView     && { label: "View",     onClick: () => rowActions.onView!(d) },
          rowActions?.onShare    && { label: "Share",    onClick: () => rowActions.onShare!(d) },
          rowActions?.onTransfer && { label: "Transfer", onClick: () => rowActions.onTransfer!(d) },
          rowActions?.onUnlock   && { label: "Unlock",   onClick: () => rowActions.onUnlock!(d) },
          rowActions?.onArchive  && { label: "Archive",  onClick: () => rowActions.onArchive!(d) },
        ].filter(Boolean) as { label: string; onClick: () => void }[]

        if (!items.length && !onRowMenuClick) return null

        const isContextOpen = contextMenuState?.rowId === row.id

        return (
          <DropdownMenu
            open={isContextOpen ? true : undefined}
            onOpenChange={(open) => {
              if (!open && isContextOpen) contextMenuState?.setRowId(null)
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary-ghost"
                size="icon-sm"
                className="opacity-0 transition-none group-hover:opacity-100 data-[state=open]:opacity-100 focus-visible:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontalIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {items.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={(e) => { e.stopPropagation(); item.onClick() }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

// ─── Mock data helper (exported for stories) ─────────────────────────────────

function mkStatus(i: number): DiamondStatus {
  const mod = i % 10
  if (mod === 3) return "locked"
  if (mod === 6) return "missing-check"
  if (mod === 8) return "not-inscribed"
  if (mod === 9) return "transferring"
  return "available"
}

export function generateDiamonds(count = 3353): Diamond[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `TR-${String(i + 1).padStart(5, "0")}`,
    carat: Math.round((1.5 + ((i * 37) % 150) / 100) * 1000) / 1000,
    clarity: CLARITIES[i % CLARITIES.length],
    colour: COLOURS[i % COLOURS.length],
    labEligible: i % 4 !== 0,
    lastUpdated: new Date(2023, 10, 27 - (i % 30), 13, i % 60).toISOString(),
    polishedCheck: (i % 7 === 0 ? "available" : "restricted") as Diamond["polishedCheck"],
    roughCheck: (i % 9 === 0 ? "available" : "restricted") as Diamond["roughCheck"],
    shape: SHAPES[i % SHAPES.length],
    status: mkStatus(i),
  }))
}

// ─── Component props ──────────────────────────────────────────────────────────

export interface InventoryTableProps {
  data: Diamond[]
  /** Total count across all pages (for toolbar label and pagination) */
  totalCount?: number
  // Toolbar
  search?: string
  onSearchChange?: (v: string) => void
  searchPlaceholder?: string
  onExport?: () => void
  onColumns?: () => void
  onFilter?: () => void
  filterCount?: number
  // Selection actions
  onView?:     (rows: Diamond[]) => void
  onShare?:    (rows: Diamond[]) => void
  onArchive?:  (rows: Diamond[]) => void
  onUnlock?:   (rows: Diamond[]) => void
  onTransfer?: (rows: Diamond[]) => void
  // Pagination
  page?: number
  onPageChange?: (page: number) => void
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  // Row
  onRowClick?: (row: Diamond) => void
  onRowMenu?: (row: Diamond, e: React.MouseEvent) => void
  /** Called whenever the selected diamond set changes */
  onSelectionChange?: (rows: Diamond[]) => void
  /** Rows to pre-select on mount */
  initialSelectedRows?: Diamond[]
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InventoryTable({
  data,
  totalCount,
  search,
  onSearchChange,
  searchPlaceholder = "Search by ID, clarity, shape…",
  onExport,
  onColumns,
  onFilter,
  filterCount,
  onView,
  onShare,
  onArchive,
  onUnlock,
  onTransfer,
  page = 1,
  onPageChange,
  pageSize = 50,
  onPageSizeChange,
  onRowClick,
  onRowMenu,
  onSelectionChange,
  initialSelectedRows,
  className,
}: InventoryTableProps) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    () => initialSelectedRows ? Object.fromEntries(initialSelectedRows.map((d) => [d.id, true])) : {}
  )
  const [selectedRows, setSelectedRows] = React.useState<Diamond[]>(
    () => initialSelectedRows ?? []
  )
  const [contextMenuRowId, setContextMenuRowId] = React.useState<string | null>(null)

  const itemCount = totalCount ?? data.length

  const columns = React.useMemo(
    () => buildColumns(onRowMenu, {
      onView:     onView     ? (d) => onView([d])     : undefined,
      onShare:    onShare    ? (d) => onShare([d])    : undefined,
      onArchive:  onArchive  ? (d) => onArchive([d])  : undefined,
      onUnlock:   onUnlock   ? (d) => onUnlock([d])   : undefined,
      onTransfer: onTransfer ? (d) => onTransfer([d]) : undefined,
    }, { rowId: contextMenuRowId, setRowId: setContextMenuRowId }),
    [onRowMenu, onView, onShare, onArchive, onUnlock, onTransfer, contextMenuRowId]
  )

  function handleSelectionChange(rows: Diamond[]) {
    setSelectedRows(rows)
    onSelectionChange?.(rows)
  }

  function handleRowSelectionChange(state: RowSelectionState) {
    setRowSelection(state)
  }

  function handleDeselect() {
    setRowSelection({})
    setSelectedRows([])
  }

  const hasSelection = selectedRows.length > 0

  const selectionActions = [
    onView     && { label: "View",     onClick: () => onView(selectedRows)     },
    onShare    && { label: "Share",    onClick: () => onShare(selectedRows)    },
    onArchive  && { label: "Archive",  onClick: () => onArchive(selectedRows)  },
    onUnlock   && { label: "Unlock",   onClick: () => onUnlock(selectedRows)   },
    onTransfer && { label: "Transfer", onClick: () => onTransfer(selectedRows) },
  ].filter(Boolean) as { label: string; onClick: () => void }[]

  return (
    <div className={cn("flex flex-col overflow-hidden", className)}>
      {/* Toolbar — swaps to selection bar when rows are selected */}
      {hasSelection ? (
        <TableSelectionBar
          selectedCount={selectedRows.length}
          itemLabel="diamonds"
          onDeselect={handleDeselect}
          actions={selectionActions}
          maxVisibleActions={5}
          searchValue={search}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          onExportClick={onExport}
          onColumnsClick={onColumns}
          onFilterClick={onFilter}
          filterCount={filterCount}
        />
      ) : (
        <PageToolbar
          itemCount={itemCount}
          itemLabel="diamonds"
          searchValue={search}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          onExportClick={onExport}
          onColumnsClick={onColumns}
          onFilterClick={onFilter}
          filterCount={filterCount}
        />
      )}

      {/* Table */}
      <div className="flex-1 overflow-hidden">
        <DataTable
          data={data}
          columns={columns}
          getRowId={(r) => r.id}
          rowSelection={rowSelection}
          onRowSelectionChange={handleRowSelectionChange}
          onSelectionChange={handleSelectionChange}
          onRowClick={onRowClick}
          onRowContextMenu={(d) => setContextMenuRowId(d.id)}
          className="h-full"
        />
      </div>

      {/* Pagination */}
      <PaginationFooter
        page={page}
        pageSize={pageSize}
        totalItems={itemCount}
        onPageChange={onPageChange ?? (() => {})}
        onPageSizeChange={onPageSizeChange ?? (() => {})}
      />
    </div>
  )
}
