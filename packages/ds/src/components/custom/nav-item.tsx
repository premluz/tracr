import * as React from "react"

import { cn } from "@/lib/utils"

export interface NavItemProps extends React.ComponentProps<"button"> {
  icon?: React.ReactNode
  label: string
  active?: boolean
  badge?: React.ReactNode
}

export function NavItem({
  icon,
  label,
  active = false,
  badge,
  className,
  ...props
}: NavItemProps) {
  return (
    <button
      type="button"
      data-active={active ? "true" : undefined}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-medium transition-colors",
        "text-text-secondary hover:bg-surface-3 hover:text-text-primary",
        "data-[active=true]:bg-accent/10 data-[active=true]:text-accent",
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {icon ? (
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center group-hover:text-text-primary",
            active ? "text-accent" : "text-text-muted"
          )}
        >
          {icon}
        </span>
      ) : null}
      <span
        className={cn(
          "flex-1 truncate text-left",
          active ? "text-accent" : "text-text-secondary"
        )}
      >
        {label}
      </span>
      {badge ? (
        <span className="shrink-0">{badge}</span>
      ) : null}
    </button>
  )
}
