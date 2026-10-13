import * as React from "react"

import { cn } from "@/lib/utils"
import { CollapseMenuIcon } from "@/components/custom/icons/collapse-menu-icon"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface SidebarNavGroup {
  label: string
  items: SidebarNavItem[]
}

export interface SidebarNavItem {
  id: string
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: React.ReactNode
  onClick?: () => void
}

export interface SidebarNavBottomItem {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

export interface SidebarNavProps extends React.ComponentProps<"div"> {
  logo?: React.ReactNode
  groups: SidebarNavGroup[]
  bottomItems?: SidebarNavBottomItem[]
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  width?: string
  collapsedWidth?: string
}

export function SidebarNav({
  logo,
  groups,
  bottomItems = [],
  collapsed = false,
  onCollapsedChange,
  width = "240px",
  collapsedWidth = "64px",
  className,
  ...props
}: SidebarNavProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn("flex h-full flex-col transition-all duration-200", className)}
        style={{ width: collapsed ? collapsedWidth : width }}
        {...props}
      >
      {logo ? (
        <div className={cn(
          "flex py-8 pb-10 h-12 shrink-0 items-center",
          collapsed ? "justify-center px-2" : "px-4"
        )}>
          {logo}
        </div>
      ) : null}

      {/* Top navigation groups */}
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-2">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="mb-1 flex items-center px-2">
                <span className="eyebrow">{group.label}</span>
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const button = (
                  <button
                    key={item.id}
                    type="button"
                    data-active={item.active ? "true" : undefined}
                    onClick={item.onClick}
                    className={cn(
                      "group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                      "text-text-secondary hover:bg-surface-1 hover:text-text-primary",
                      "data-[active=true]:bg-accent/10 data-[active=true]:text-accent",
                      collapsed && "justify-center px-1"
                    )}
                  >
                    <span className={cn(
                      "flex shrink-0 items-center justify-center group-hover:text-text-secondary",
                      item.active ? "text-accent" : "text-text-muted",
                      collapsed ? "size-5" : "size-4"
                    )}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span
                          className={cn(
                            "flex-1 truncate text-left",
                            item.active ? "text-accent" : "text-text-secondary"
                          )}
                        >
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="shrink-0">{item.badge}</span>
                        ) : null}
                      </>
                    )}
                  </button>
                )

                return collapsed ? (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : button
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom items */}
      <div className={cn("flex flex-col gap-0.5 py-2", collapsed ? "px-2" : "px-3")}>
        {bottomItems.map((item) => {
          const button = (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={cn(
                "group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                "text-text-secondary hover:bg-surface-1 hover:text-text-primary",
                collapsed && "justify-center px-1"
              )}
            >
              <span className={cn(
                "flex shrink-0 items-center justify-center text-text-muted group-hover:text-text-secondary",
                collapsed ? "size-5" : "size-4"
              )}>
                {item.icon}
              </span>
              {!collapsed && <span className="flex-1 truncate text-left">{item.label}</span>}
            </button>
          )

          return collapsed ? (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>{button}</TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          ) : button
        })}

        {/* Collapse/Expand button - always visible */}
        {onCollapsedChange && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onCollapsedChange(!collapsed)}
                className={cn(
                  "group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  "text-text-secondary hover:bg-surface-1 hover:text-text-primary",
                  collapsed && "justify-center px-1"
                )}
              >
                <span className={cn(
                  "flex shrink-0 items-center justify-center text-text-muted group-hover:text-text-secondary",
                  collapsed ? "size-5" : "size-4"
                )}>
                  <CollapseMenuIcon className={cn("size-4", collapsed && "scale-x-[-1]")} />
                </span>
                {!collapsed && <span className="flex-1 truncate text-left">Collapse</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" sideOffset={8}>
                Expand
              </TooltipContent>
            )}
          </Tooltip>
        )}
      </div>
    </div>
    </TooltipProvider>
  )
}
