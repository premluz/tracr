import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Accessory icon helper ────────────────────────────────────────────────────

export type ConfirmationIconVariant = "default" | "success" | "error"

export interface ConfirmationIconProps {
  icon: React.ReactNode
  variant?: ConfirmationIconVariant
  size?: "sm" | "lg"
  className?: string
}

const iconVariantClasses: Record<ConfirmationIconVariant, string> = {
  default: "bg-surface-4 text-text-primary",
  success: "bg-surface-4 text-status-available ring-1 ring-status-available/30",
  error: "bg-surface-4 text-status-error ring-1 ring-status-error/30",
}

const iconSizeClasses: Record<"sm" | "lg", string> = {
  sm: "size-8 [&>svg]:size-4",
  lg: "size-12 [&>svg]:size-5",
}

export function ConfirmationIcon({
  icon,
  variant = "default",
  size = "lg",
  className,
}: ConfirmationIconProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        iconVariantClasses[variant],
        iconSizeClasses[size],
        className
      )}
    >
      {icon}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface ConfirmationAction {
  label: string
  onClick?: () => void
}

export interface ConfirmationProps {
  accessory?: React.ReactNode
  title: string
  description?: string
  primaryAction?: ConfirmationAction
  secondaryAction?: ConfirmationAction
  layout?: "vertical" | "horizontal"
  className?: string
}

export function Confirmation({
  accessory,
  title,
  description,
  primaryAction,
  secondaryAction,
  layout = "vertical",
  className,
}: ConfirmationProps) {
  const hasActions = primaryAction || secondaryAction

  if (layout === "horizontal") {
    return (
      <div className={cn("flex items-start gap-4", className)}>
        {accessory && <div className="shrink-0">{accessory}</div>}
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-base font-semibold text-text-primary">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-text-muted">{description}</p>
            )}
          </div>
          {hasActions && (
            <div className="flex items-center gap-2">
              {secondaryAction && (
                <Button variant="secondary-subtle" size="sm" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button size="sm" onClick={primaryAction.onClick}>
                  {primaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Vertical (centered) layout
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {accessory && <div className="mb-4">{accessory}</div>}
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-text-muted">{description}</p>
      )}
      {hasActions && (
        <div className="mt-5 flex items-center gap-2">
          {secondaryAction && (
            <Button variant="secondary-subtle" size="sm" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button size="sm" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
