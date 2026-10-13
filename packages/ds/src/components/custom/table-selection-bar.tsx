import * as React from "react"
import {
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel, clampSurfaceLevel } from "@/components/custom/surface-context"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export interface TableSelectionAction {
  label: string
  onClick?: () => void
}

export interface TableSelectionBarProps {
  /** Number of currently selected rows */
  selectedCount: number
  /** Total rows in the full dataset */
  totalCount?: number
  /** Label noun for the items, e.g. 'diamonds'. Defaults to 'selected'. */
  itemLabel?: string
  onDeselect?: () => void
  /** Actions shown as buttons in the selection bar */
  actions?: TableSelectionAction[]
  /** Max visible action buttons before overflow "…" */
  maxVisibleActions?: number
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  onExportClick?: () => void
  onColumnsClick?: () => void
  onFilterClick?: () => void
  filterCount?: number
  className?: string
}

export function TableSelectionBar({
  selectedCount,
  totalCount,
  itemLabel,
  onDeselect,
  actions = [],
  maxVisibleActions = 3,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  onExportClick,
  onColumnsClick,
  onFilterClick,
  filterCount,
  className,
}: TableSelectionBarProps) {
  const visible  = actions.slice(0, maxVisibleActions)
  const overflow = actions.slice(maxVisibleActions)

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-6 py-3",
        "bg-accent/10",
        className
      )}
    >
      {/* Left: selection info + Deselect + action buttons */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">
            {selectedCount.toLocaleString()}
          </span>
          {totalCount != null ? (
            <>
              {" of "}
              <span className="font-medium text-text-primary">
                {totalCount.toLocaleString()}
              </span>
              {" "}{itemLabel ?? "selected"}
            </>
          ) : (
            <> {itemLabel ?? "selected"}</>
          )}
        </span>

        {onDeselect && (
          <button
            type="button"
            onClick={onDeselect}
            className="text-sm font-medium text-status-available underline underline-offset-2 hover:opacity-80 focus-visible:outline-none"
          >
            Deselect
          </button>
        )}

        {/* Action buttons — next to Deselect */}
        {visible.map((a, i) => (
          <ToolbarBtn key={i} onClick={a.onClick}>
            {a.label}
          </ToolbarBtn>
        ))}
        {overflow.length > 0 && (
          <ToolbarBtn aria-label="More actions">
            <MoreHorizontalIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
          </ToolbarBtn>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: search + Export/Columns/Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <div className={cn("flex w-56 items-center gap-2 rounded-sm px-3 transition-colors", getSurfaceClass(getNextSurfaceLevel(useSurface().level)), getSurfaceClass(clampSurfaceLevel(getNextSurfaceLevel(useSurface().level) + 1)).replace("bg-", "hover:bg-"))}>
          <SearchIcon className="size-4 shrink-0 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>

        {onExportClick && (
          <ToolbarBtn onClick={onExportClick}>
            <DownloadIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
            Export
          </ToolbarBtn>
        )}
        {onColumnsClick && (
          <ToolbarBtn onClick={onColumnsClick}>
            <SlidersHorizontalIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
            Columns
          </ToolbarBtn>
        )}
        {onFilterClick && (
          <ToolbarBtn onClick={onFilterClick}>
            <FilterIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
            Filter
            {filterCount != null && filterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-status-available/20 px-1 text-xs font-medium text-status-available">
                {filterCount}
              </span>
            )}
          </ToolbarBtn>
        )}
      </div>
    </div>
  )
}

function ToolbarBtn({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const surface = useSurface()
  const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))
  const hoverBgClass = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)))

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-sm px-3 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        bgClass,
        hoverBgClass.replace("bg-", "hover:bg-"),
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
