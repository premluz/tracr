import * as React from "react"
import { FilterIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export interface FilterBarProps extends React.ComponentProps<"div"> {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  actions?: React.ReactNode
  filterCount?: number
  onFilterClick?: () => void
  onColumnsClick?: () => void
}

function FilterButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  const surface = useSurface()
  const hoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level))

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-sm border border-border-subtle px-2.5 text-sm text-text-secondary transition-colors hover:text-text-primary",
        hoverBg.replace("bg-", "hover:bg-"),
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search…",
  actions,
  filterCount,
  onFilterClick,
  onColumnsClick,
  className,
  ...props
}: FilterBarProps) {
  const surface = useSurface()
  const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm border border-border-subtle px-3 py-2",
        bgClass,
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-2">
        <SearchIcon className="size-4 shrink-0 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-7 w-full min-w-[120px] bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
        />
      </div>

      <div className="flex items-center gap-1">
        {onFilterClick ? (
          <FilterButton onClick={onFilterClick}>
            <FilterIcon className="size-3.5" strokeWidth={iconStrokeWidth.regular} />
            Filters
            {filterCount != null && filterCount > 0 ? (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-status-available/20 px-1 text-xs font-medium text-status-available">
                {filterCount}
              </span>
            ) : null}
          </FilterButton>
        ) : null}

        {onColumnsClick ? (
          <FilterButton onClick={onColumnsClick}>
            <SlidersHorizontalIcon className="size-3.5" strokeWidth={iconStrokeWidth.regular} />
            Columns
          </FilterButton>
        ) : null}

        {actions}
      </div>
    </div>
  )
}
