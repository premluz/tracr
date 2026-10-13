import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export interface PaginationFooterProps extends React.ComponentProps<"div"> {
  page: number
  pageSize: number
  totalItems: number
  pageSizeOptions?: number[]
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function PaginationFooter({
  page,
  pageSize,
  totalItems,
  pageSizeOptions = [25, 50, 100],
  onPageChange,
  onPageSizeChange,
  className,
  ...props
}: PaginationFooterProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)
  const surface = useSurface()
  const selectBg = getSurfaceClass(getNextSurfaceLevel(surface.level))
  const selectHoverFocusBg = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)))
  const selectHoverBg = selectHoverFocusBg.replace("bg-", "hover:bg-")
  const selectFocusBg = selectHoverFocusBg.replace("bg-", "focus:bg-")

  return (
    <div
      className={cn(
        "flex h-12 shrink-0 items-center justify-between border-t border-border-keyline px-6 text-sm text-text-muted",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span>View</span>
        <span className="relative inline-flex items-center">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className={cn("h-8 appearance-none rounded-sm py-0 pl-2 pr-7 text-sm text-text-secondary outline-none transition-colors", selectBg, selectHoverBg, selectFocusBg)}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2 size-3.5 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
        </span>
      </div>

      <span>
        Showing{" "}
        <span className="text-text-secondary">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="text-text-secondary">
          {totalItems.toLocaleString()}
        </span>
      </span>

      <div className="flex items-center gap-1">
        <PaginationButton
          onClick={() => onPageChange?.(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
        </PaginationButton>

        <span className="flex h-8 items-center gap-1 px-2">
          <span className="text-text-secondary">{page}</span>
          <span className="text-text-muted">/</span>
          <span className="text-text-muted">{totalPages}</span>
        </span>

        <PaginationButton
          onClick={() => onPageChange?.(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <ChevronRightIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
        </PaginationButton>
      </div>
    </div>
  )
}

function PaginationButton({
  className,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  const surface = useSurface()
  const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))
  const hoverBgClass = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level))).replace("bg-", "hover:bg-")

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-sm text-text-secondary transition-colors hover:text-text-primary disabled:pointer-events-none disabled:opacity-40",
        bgClass,
        hoverBgClass,
        className
      )}
      {...props}
    />
  )
}
