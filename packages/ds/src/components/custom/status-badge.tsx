import * as React from "react"
import { LockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export type StatusBadgeStatus =
  | "available"
  | "warning"
  | "error"
  | "restricted"
  | "locked"

export type StatusBadgeSize = "sm" | "md" | "lg"

export interface StatusBadgeProps extends React.ComponentProps<"span"> {
  status: StatusBadgeStatus
  size?: StatusBadgeSize
}

const statusClasses: Record<StatusBadgeStatus, string> = {
  available: "border-status-available/30 text-status-available",
  warning: "border-status-warning/30 text-status-warning",
  error: "border-status-error/30 text-status-error",
  restricted: "border-status-restricted/30 text-status-restricted",
  locked: "border-status-restricted/30 text-status-restricted",
}

const statusLabels: Record<StatusBadgeStatus, string> = {
  available: "Available",
  warning: "Warning",
  error: "Error",
  restricted: "Restricted",
  locked: "Locked",
}

const SIZE_CONFIG: Record<StatusBadgeSize, { height: string; padding: string; text: string; icon: string }> = {
  sm:  { height: "h-4",  padding: "px-1.5", text: "text-xs",  icon: "size-2.5" },
  md:  { height: "h-5",  padding: "px-2",   text: "text-sm",  icon: "size-3" },
  lg:  { height: "h-6",  padding: "px-2.5", text: "text-sm",  icon: "size-3.5" },
}

export function StatusBadge({
  status,
  size = "md",
  children,
  className,
  ...props
}: StatusBadgeProps) {
  const sz = SIZE_CONFIG[size]
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full border bg-surface-3 font-medium leading-none",
        sz.height,
        sz.padding,
        sz.text,
        statusClasses[status],
        className
      )}
      {...props}
    >
      {status === "locked" ? <LockIcon className={cn("shrink-0", sz.icon)} strokeWidth={iconStrokeWidth.regular} /> : null}
      {children ?? statusLabels[status]}
    </span>
  )
}
