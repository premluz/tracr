import * as React from "react"
import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabsType = "button" | "line"
export type TabsSize = "sm" | "md" | "lg" | "xl" | "2xl"
export type TabsOrientation = "horizontal" | "vertical"

export interface TabItem {
  id: string
  label?: string
  icon?: React.ReactNode
  badge?: number | string
  /** Override tooltip text; defaults to full label when label is present */
  tooltip?: string
  disabled?: boolean
}

export interface TabsNavProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  type?: TabsType
  size?: TabsSize
  orientation?: TabsOrientation
  className?: string
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE: Record<TabsSize, { tab: string; icon: string; badge: string }> = {
  sm:  { tab: "h-6  px-2   gap-1   text-xs",   icon: "[&>svg]:size-3",   badge: "h-3.5 min-w-3.5 px-1 text-xs" },
  md:  { tab: "h-7  px-2.5 gap-1   text-sm",   icon: "[&>svg]:size-3.5", badge: "h-4   min-w-4   px-1   text-xs" },
  lg:  { tab: "h-8  px-3   gap-1.5 text-sm",   icon: "[&>svg]:size-4",   badge: "h-4   min-w-4   px-1.5 text-sm" },
  xl:  { tab: "h-10 px-3.5 gap-2   text-base", icon: "[&>svg]:size-4",   badge: "h-5   min-w-5   px-1.5 text-sm" },
  "2xl": { tab: "h-12 px-4   gap-2   text-base", icon: "[&>svg]:size-5", badge: "h-5   min-w-5   px-2   text-sm" },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TabsNav({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  type = "button",
  size = "md",
  orientation = "horizontal",
  className,
}: TabsNavProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue ?? items[0]?.id ?? ""
  )
  const activeId = controlledValue ?? internalValue

  function select(id: string) {
    setInternalValue(id)
    onValueChange?.(id)
  }

  const isLine     = type === "line"
  const isVertical = orientation === "vertical"
  const s          = SIZE[size]

  const surface = useSurface()
  const hoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level))

  return (
    <TooltipProvider delayDuration={400}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "flex",
          isVertical ? "flex-col gap-0.5" : "flex-row items-end gap-0.5",
          isLine && !isVertical && "border-b border-border-subtle",
          isLine && isVertical  && "border-l border-border-subtle",
          className
        )}
      >
        {items.map((item) => {
          const isActive   = item.id === activeId
          const tipText    = item.tooltip ?? item.label

          const tabBtn = (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => !item.disabled && select(item.id)}
              className={cn(
                "inline-flex shrink-0 cursor-pointer items-center rounded-sm font-medium",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
                s.tab,

                // ── button variant ──
                !isLine && (isActive
                    ? "bg-status-available/15 text-status-available"
                    : cn("text-text-muted hover:text-text-secondary", hoverBg.replace("bg-", "hover:bg-"))
                ),

                // ── line variant (horizontal) ──
                isLine && !isVertical && [
                  "rounded-none border-b-2 translate-y-px",
                  isActive
                    ? "border-status-available text-status-available"
                    : "border-transparent text-text-muted hover:text-text-secondary",
                ],

                // ── line variant (vertical) ──
                isLine && isVertical && [
                  "rounded-none border-l-2 -translate-x-px",
                  isActive
                    ? "border-status-available text-status-available"
                    : "border-transparent text-text-muted hover:text-text-secondary",
                ],
              )}
            >
              {item.icon && (
                <span className={cn("shrink-0", s.icon)}>{item.icon}</span>
              )}

              {item.label && (
                <span className="max-w-[140px] truncate">{item.label}</span>
              )}

              {item.badge != null && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-sm leading-none",
                    s.badge,
                    isActive
                      ? "bg-status-available/20 text-status-available"
                      : cn(getSurfaceClass(getNextSurfaceLevel(surface.level)), "text-text-muted")
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )

          if (!tipText) return tabBtn

          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>{tabBtn}</TooltipTrigger>
              <TooltipContent>{tipText}</TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
