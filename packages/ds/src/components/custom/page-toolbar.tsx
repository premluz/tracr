import * as React from "react"
import {
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel, clampSurfaceLevel } from "@/components/custom/surface-context"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export interface PageToolbarProps extends React.ComponentProps<"div"> {
  itemCount?: number
  itemLabel?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  onExportClick?: () => void
  onColumnsClick?: () => void
  onFilterClick?: () => void
  filterCount?: number
  actions?: React.ReactNode
}

export function PageToolbar({
  itemCount,
  itemLabel = "items",
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  onExportClick,
  onColumnsClick,
  onFilterClick,
  filterCount,
  actions,
  className,
  ...props
}: PageToolbarProps) {
  const surface = useSurface()
  const inputBg = getSurfaceClass(getNextSurfaceLevel(surface.level))

  return (
    <div
      className={cn("flex items-center gap-2 px-6 py-3", className)}
      {...props}
    >
      {itemCount != null ? (
        <span className="shrink-0 text-sm text-text-secondary">
          <span className="font-medium text-text-primary">
            {itemCount.toLocaleString()}
          </span>{" "}
          {itemLabel}
        </span>
      ) : null}

      <div className="flex flex-1 items-center justify-end gap-2">
        <div className={cn("flex w-56 items-center gap-2 rounded-sm px-3 transition-colors", inputBg, getSurfaceClass(clampSurfaceLevel(getNextSurfaceLevel(surface.level) + 1)).replace("bg-", "hover:bg-"))}>
          <SearchIcon className="size-4 shrink-0 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>

        {onExportClick ? (
          <ToolbarButton onClick={onExportClick}>
            <DownloadIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
            Export
          </ToolbarButton>
        ) : null}

        {onColumnsClick ? (
          <ToolbarButton onClick={onColumnsClick}>
            <SlidersHorizontalIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
            Columns
          </ToolbarButton>
        ) : null}

        {onFilterClick ? (
          <ToolbarButton onClick={onFilterClick}>
            <FilterIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
            Filter
            {filterCount != null && filterCount > 0 ? (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-status-available/20 px-1 text-xs font-medium text-status-available">
                {filterCount}
              </span>
            ) : null}
          </ToolbarButton>
        ) : null}

        {actions}
      </div>
    </div>
  )
}

function ToolbarButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const surface = useSurface()
  const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))
  const hoverBgClass = getSurfaceClass(clampSurfaceLevel(getNextSurfaceLevel(surface.level) + 1))

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
