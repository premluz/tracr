import { cn } from "@/lib/utils"
import { Skeleton, type SkeletonProps } from "@/components/ui/skeleton"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableSkeletonProps {
  rows?: number
  columns?: number
  hasCheckbox?: boolean
  hasRowActions?: boolean
  hasToolbar?: boolean
  shimmer?: SkeletonProps["variant"]
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TableSkeleton({
  rows = 5,
  columns = 7,
  hasCheckbox = true,
  hasRowActions = true,
  hasToolbar = true,
  shimmer = "wave",
  className,
}: TableSkeletonProps) {
  const cell = (w: string, key: number) => (
    <Skeleton key={key} variant={shimmer} className={cn("h-4 rounded", w)} />
  )

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-sm border border-border-subtle", className)}>

      {/* Toolbar skeleton */}
      {hasToolbar && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
          <Skeleton variant={shimmer} className="h-4 w-28" />
          <Skeleton variant={shimmer} className="h-7 w-52" />
        </div>
      )}

      {/* Header row */}
      <div className="flex items-center gap-3 border-b border-border-subtle bg-surface-3 px-4 py-2">
        {hasCheckbox && (
          <Skeleton variant={shimmer} className="size-3.5 shrink-0 rounded-sm" />
        )}
        {Array.from({ length: columns }, (_, i) =>
          cell("flex-1", i)
        )}
        {hasRowActions && <div className="w-5 shrink-0" />}
      </div>

      {/* Data rows */}
      {Array.from({ length: rows }, (_, r) => (
        <div
          key={r}
          className="flex items-center gap-3 border-b border-border-subtle px-4 py-2.5 last:border-0"
        >
          {hasCheckbox && (
            <Skeleton variant={shimmer} className="size-3.5 shrink-0 rounded-sm" />
          )}
          {Array.from({ length: columns }, (_, i) =>
            cell(
              i === 0 ? "w-20 flex-none" : "flex-1",
              i
            )
          )}
          {hasRowActions && (
            <Skeleton variant={shimmer} className="size-5 w-5 shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}
