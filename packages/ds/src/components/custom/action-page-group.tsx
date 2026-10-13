import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel, type SurfaceLevel } from "@/components/custom/surface-context"
import { Button } from "@/components/ui/button"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionPageGroupVariant = "success" | "warning" | "blocked"

export interface ActionPageGroupItem {
  id: string
  label: string
  action?: { label: string; onClick?: () => void }
  onClick?: () => void
}

export interface ActionPageGroupProps {
  icon?: React.ReactNode
  title: string
  items: ActionPageGroupItem[]
  variant?: ActionPageGroupVariant
  className?: string
}

// ─── Styling by variant ───────────────────────────────────────────────────────

function getLabelClasses(variant: ActionPageGroupVariant, level: SurfaceLevel) {
  const bgClass = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(level)))
  return {
    success: "bg-status-available/15 text-status-available",
    warning: cn(bgClass, "text-text-secondary"),
    blocked: cn(bgClass, "text-text-secondary"),
  }[variant]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ActionPageGroup({
  icon,
  title,
  items,
  variant = "warning",
  className,
}: ActionPageGroupProps) {
  const surface = useSurface()
  const headerBg = getSurfaceClass(getNextSurfaceLevel(surface.level))
  const itemHoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level))
  return (
    <div
      className={cn(
        "overflow-hidden rounded-sm border border-border-subtle",
        className
      )}
    >
      {/* Header bar */}
      <div className={cn("flex items-center gap-2.5 px-4 py-3", headerBg)}>
        {icon && (
          <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-4">
            {icon}
          </span>
        )}
        <span className="text-sm font-medium text-text-primary">{title}</span>
      </div>

      {/* Item rows */}
      <div className="divide-y divide-border-subtle">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
              item.onClick && itemHoverBg.replace("bg-", "hover:bg-")
            )}
          >
            {/* Label badge */}
            <span
              className={cn(
                "inline-flex shrink-0 items-center rounded-sm px-2 py-0.5 text-sm font-medium",
                getLabelClasses(variant, surface.level)
              )}
            >
              {item.label}
            </span>

            {/* Spacer */}
            <span className="flex-1" />

            {/* Optional action button */}
            {item.action && (
              <Button
                variant="secondary-subtle"
                size="md"
                onClick={(e) => {
                  e.stopPropagation()
                  item.action?.onClick?.()
                }}
              >
                {item.action.label}
              </Button>
            )}

            {/* Chevron */}
            <ChevronRightIcon className="size-4 shrink-0 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
          </button>
        ))}
      </div>
    </div>
  )
}
