import * as React from "react"
import { ArrowLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export type EnvironmentTag = "dev" | "uat"

export interface PageProperty {
  label: string
  value: React.ReactNode
}

export interface PageHeaderProps extends React.ComponentProps<"div"> {
  title: string
  description?: string
  onBack?: () => void
  indicator?: boolean
  environment?: EnvironmentTag
  properties?: PageProperty[]
  actions?: React.ReactNode
}

const envColor: Record<EnvironmentTag, "amber" | "indigo"> = {
  dev: "amber",
  uat: "indigo",
}

export function PageHeader({
  title,
  description,
  onBack,
  indicator,
  environment,
  properties,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col border-b border-border-keyline px-6 py-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex size-7 shrink-0 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-surface-4 hover:text-text-primary"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="size-4" strokeWidth={iconStrokeWidth.regular} />
          </button>
        ) : null}

        <h1 className="shrink-0 text-base font-semibold text-text-primary">
          {title}
        </h1>

        {indicator ? (
          <span className="size-2 shrink-0 rounded-full bg-status-available" />
        ) : null}

        {environment ? (
          <Badge
            color={envColor[environment]}
            fill="subtle"
            size="sm"
            radius="sm"
            className="uppercase font-semibold"
          >
            {environment}
          </Badge>
        ) : null}

        {properties && properties.length > 0 ? (
          <div className="flex items-center gap-4">
            {properties.map((prop) => (
              <div key={prop.label} className="flex items-center gap-1.5">
                <span className="eyebrow text-[11px]">
                  {prop.label}
                </span>
                <span className="rounded-sm bg-surface-3 px-1.5 py-0.5 text-sm text-text-secondary">
                  {prop.value}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {actions ? (
          <div className="ml-auto flex shrink-0 items-center gap-2">
            {actions}
          </div>
        ) : null}
      </div>

      {description ? (
        <p
          className={cn(
            "mt-1 text-sm text-text-muted",
            onBack && "pl-10"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
