import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export type { ColumnDef }

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  getRowId?: (row: TData) => string
  rowHeight?: number
  className?: string
  onRowClick?: (row: TData) => void
  onRowContextMenu?: (row: TData, e: React.MouseEvent) => void
  onSelectionChange?: (rows: TData[]) => void
  /** Controlled row-selection state. Pass `{}` to clear all selections. */
  rowSelection?: RowSelectionState
  /** Called whenever row selection changes. Required when `rowSelection` is controlled. */
  onRowSelectionChange?: (state: RowSelectionState) => void
  emptyState?: React.ReactNode
}

export function DataTable<TData>({
  data,
  columns,
  getRowId,
  rowHeight = 48,
  className,
  onRowClick,
  onRowContextMenu,
  onSelectionChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange: onControlledRowSelectionChange,
  emptyState = "No records found.",
}: DataTableProps<TData>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const surface = useSurface()
  const headerBg = getSurfaceClass(getNextSurfaceLevel(surface.level))
  const rowHoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level))

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({})

  const isControlled = controlledRowSelection !== undefined
  const rowSelection = isControlled ? controlledRowSelection : internalRowSelection

  const lastClickedIndexRef = React.useRef<number | null>(null)
  const [isShiftDown, setIsShiftDown] = React.useState(false)
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)

  const table = useReactTable({
    data,
    columns,
    ...(getRowId && { getRowId }),
    state: { sorting, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      const prev = isControlled ? controlledRowSelection : internalRowSelection
      const next = typeof updater === "function" ? updater(prev) : updater
      if (isControlled) {
        onControlledRowSelectionChange?.(next)
      } else {
        setInternalRowSelection(next)
      }
      onSelectionChange?.(
        table.getRowModel().rows
          .filter((r) => next[r.id])
          .map((r) => r.original)
      )
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const { rows } = table.getRowModel()

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Shift") setIsShiftDown(true)
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "Shift") setIsShiftDown(false)
    }
    function handleBlur() {
      setIsShiftDown(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", handleBlur)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", handleBlur)
    }
  }, [])

  const previewRange = React.useMemo(() => {
    if (!isShiftDown || hoverIndex == null || lastClickedIndexRef.current == null) return null
    const from = Math.min(lastClickedIndexRef.current, hoverIndex)
    const to = Math.max(lastClickedIndexRef.current, hoverIndex)
    return { from, to }
  }, [isShiftDown, hoverIndex])

  function commitRange(toIndex: number, rowId: string, shiftHeld: boolean) {
    const fromIndex = lastClickedIndexRef.current
    if (shiftHeld && fromIndex != null) {
      const from = Math.min(fromIndex, toIndex)
      const to = Math.max(fromIndex, toIndex)
      const nextSelected = !rowSelection[rowId]
      table.setRowSelection((prev) => {
        const next = { ...prev }
        for (let i = from; i <= to; i++) {
          next[rows[i].id] = nextSelected
        }
        return next
      })
    }
    lastClickedIndexRef.current = toIndex
  }

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => rowHeight,
    overscan: 15,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()
  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0
  const paddingBottom =
    virtualItems.length > 0 ? totalSize - virtualItems[virtualItems.length - 1].end : 0
  const colCount = columns.length

  return (
    <div ref={containerRef} className={cn("overflow-auto", className)}>
      <table className="w-full min-w-max border-collapse">
        <thead className={cn("sticky top-0 z-10 border-b border-border-keyline", headerBg)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sorted = header.column.getIsSorted()
                return (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      "h-[3.25rem] px-3 text-left align-middle whitespace-nowrap text-[11px] eyebrow",
                      canSort && "cursor-pointer select-none hover:text-text-primary"
                    )}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    {header.isPlaceholder ? null : (
                      <span className="flex h-full items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort &&
                          (sorted === "asc" ? (
                            <ChevronUpIcon className="size-3 text-text-primary" strokeWidth={iconStrokeWidth.regular} />
                          ) : sorted === "desc" ? (
                            <ChevronDownIcon className="size-3 text-text-primary" strokeWidth={iconStrokeWidth.regular} />
                          ) : (
                            <ChevronsUpDownIcon className="size-3 opacity-30" strokeWidth={iconStrokeWidth.regular} />
                          ))}
                      </span>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr aria-hidden>
              <td style={{ height: paddingTop }} colSpan={colCount} />
            </tr>
          )}

          {virtualItems.length === 0 && data.length === 0 && (
            <tr>
              <td colSpan={colCount} className="h-24 text-center text-sm text-text-muted">
                {emptyState}
              </td>
            </tr>
          )}

          {virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index]
            const inPreviewRange =
              previewRange != null &&
              virtualRow.index >= previewRange.from &&
              virtualRow.index <= previewRange.to
            return (
              <tr
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className={cn(
                  "group border-b border-border-keyline text-sm",
                  rowHoverBg.replace("bg-", "hover:bg-"),
                  "data-[state=selected]:bg-accent/10",
                  inPreviewRange && "bg-accent/5",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(row.original)}
                onClickCapture={(e) => {
                  if ((e.target as HTMLElement).closest("[data-row-checkbox]")) {
                    if (e.shiftKey) {
                      e.stopPropagation()
                      e.preventDefault()
                    }
                    commitRange(virtualRow.index, row.id, e.shiftKey)
                  }
                }}
                onMouseEnter={() => setHoverIndex(virtualRow.index)}
                onContextMenu={(e) => {
                  if (onRowContextMenu) {
                    e.preventDefault()
                    onRowContextMenu(row.original, e)
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className="h-12 px-3 align-middle text-text-primary whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}

          {paddingBottom > 0 && (
            <tr aria-hidden>
              <td style={{ height: paddingBottom }} colSpan={colCount} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
