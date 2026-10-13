import * as React from "react"
import { SearchIcon, GemIcon, CheckIcon, LockIcon, MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"
import { Drawer } from "@/components/custom/drawer"
import { Status } from "@/components/custom/status"
import { Button } from "@/components/ui/button"
import { PaginationFooter } from "@/components/custom/pagination-footer"
import type { Diamond } from "@/components/custom/inventory-table"
import { DIAMOND_STATUS_CONFIG } from "@/components/custom/inventory-table"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

// ─── Props ────────────────────────────────────────────────────────────────────

export interface DiamondPreviewDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  diamonds: Diamond[]
}

// ─── Component ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 40

export function DiamondPreviewDrawer({
  open,
  onClose,
  title,
  diamonds,
}: DiamondPreviewDrawerProps) {
  const surface = useSurface()
  const inputBg = getSurfaceClass(getNextSurfaceLevel(surface.level))
  const tableHeaderBg = getSurfaceClass(getNextSurfaceLevel(surface.level))
  const tableRowHoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level))

  const [search, setSearch] = React.useState("")
  const [page, setPage]     = React.useState(1)

  const filtered = React.useMemo(() => {
    if (!search.trim()) return diamonds
    const q = search.toLowerCase()
    return diamonds.filter(
      (d) =>
        d.id.toLowerCase().includes(q) ||
        d.clarity.toLowerCase().includes(q) ||
        d.shape.toLowerCase().includes(q)
    )
  }, [diamonds, search])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Reset on close
  React.useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => { setSearch(""); setPage(1) }, 350)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      size="lg"
      headerActions={<Button onClick={onClose}>Done</Button>}
    >
      {/* Toolbar */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">{filtered.length.toLocaleString()}</span> diamonds
        </span>
        <div className="flex items-center gap-2">
          <div className={cn("flex w-52 items-center gap-2 rounded-sm px-2.5", inputBg)}>
            <SearchIcon className="size-3.5 shrink-0 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search"
              className="h-7 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-sm border border-border-subtle">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className={cn("border-b border-border-subtle", tableHeaderBg)}>
              {["Tracr ID", "Participant ID", "Shape", "Carat", "Clarity", "Colour", "Status", ""].map((h) => (
                <th
                  key={h}
                  className="h-9 px-3 text-left text-xs eyebrow text-text-muted whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((d) => {
              const cfg = DIAMOND_STATUS_CONFIG[d.status]
              return (
                <tr
                  key={d.id}
                  className={cn("group border-b border-border-subtle", tableRowHoverBg.replace("bg-", "hover:bg-"))}
                >
                  <td className="h-11 px-3 text-text-secondary whitespace-nowrap">{d.id}</td>
                  <td className="h-11 px-3 text-text-muted whitespace-nowrap">L6JX87dxdkegfy</td>
                  <td className="h-11 px-3 text-text-secondary whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <GemIcon className="size-3 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
                      {d.shape}
                    </span>
                  </td>
                  <td className="h-11 px-3 text-text-secondary whitespace-nowrap">{d.carat.toFixed(3)}ct</td>
                  <td className="h-11 px-3 text-text-secondary">{d.clarity}</td>
                  <td className="h-11 px-3 text-text-secondary">{d.colour}</td>
                  <td className="h-11 px-3 whitespace-nowrap">
                    <Status color={cfg.color} fill={cfg.fill} textStyle="color" icon={
                      d.status === "available"
                        ? <CheckIcon strokeWidth={iconStrokeWidth.regular} />
                        : d.status === "locked"
                          ? <LockIcon strokeWidth={iconStrokeWidth.regular} />
                          : undefined
                    }>
                      {cfg.label}
                    </Status>
                  </td>
                  <td className="h-11 px-3">
                    <Button
                      variant="secondary-ghost"
                      size="icon-sm"
                      className="opacity-0 transition-none group-hover:opacity-100 focus-visible:opacity-100"
                    >
                      <MoreHorizontalIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
                    </Button>
                  </td>
                </tr>
              )
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={8} className="h-20 text-center text-sm text-text-muted">
                  No diamonds found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-3">
        <PaginationFooter
          page={page}
          pageSize={PAGE_SIZE}
          totalItems={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={() => {}}
          className={cn("border-t-0 px-0")}
        />
      </div>
    </Drawer>
  )
}
