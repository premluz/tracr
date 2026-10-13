import * as React from "react"

import { cn } from "@/lib/utils"

export type StatusColor =
  | "neutral"
  | "green"
  | "success"
  | "teal"
  | "red"
  | "amber"
  | "emerald"
  | "blue"
  | "yellow"
  | "pink"
  | "indigo"

export type StatusFill = "ghost" | "outline" | "outline-color" | "fill"
export type StatusTextStyle = "neutral" | "color"

export type StatusSize = "sm" | "md" | "lg"

export interface StatusProps extends Omit<React.ComponentProps<"span">, "color"> {
  color: StatusColor
  size?: StatusSize
  fill?: StatusFill
  textStyle?: StatusTextStyle
  icon?: React.ReactNode
  dot?: boolean
  iconOnly?: boolean
}

const colorTokens: Record<
  StatusColor,
  { text: string; dot: string; border: string; bg: string }
> = {
  green: {
    text: "text-status-available",
    dot: "bg-status-available",
    border: "border-status-available/20",
    bg: "bg-status-available/10",
  },
  success: {
    text: "text-status-success",
    dot: "bg-status-success",
    border: "border-status-success/20",
    bg: "bg-status-success/10",
  },
  red: {
    text: "text-status-error",
    dot: "bg-status-error",
    border: "border-status-error/20",
    bg: "bg-status-error/10",
  },
  amber: {
    text: "text-status-warning",
    dot: "bg-status-warning",
    border: "border-status-warning/20",
    bg: "bg-status-warning/10",
  },
  indigo: {
    text: "text-status-restricted",
    dot: "bg-status-restricted",
    border: "border-status-restricted/20",
    bg: "bg-status-restricted/10",
  },
  teal: {
    text: "text-badge-teal",
    dot: "bg-badge-teal",
    border: "border-badge-teal/20",
    bg: "bg-badge-teal/10",
  },
  emerald: {
    text: "text-badge-emerald",
    dot: "bg-badge-emerald",
    border: "border-badge-emerald/20",
    bg: "bg-badge-emerald/10",
  },
  blue: {
    text: "text-badge-blue",
    dot: "bg-badge-blue",
    border: "border-badge-blue/20",
    bg: "bg-badge-blue/10",
  },
  yellow: {
    text: "text-badge-yellow",
    dot: "bg-badge-yellow",
    border: "border-badge-yellow/20",
    bg: "bg-badge-yellow/10",
  },
  pink: {
    text: "text-badge-pink",
    dot: "bg-badge-pink",
    border: "border-badge-pink/20",
    bg: "bg-badge-pink/10",
  },
  neutral: {
    text: "text-text-muted",
    dot: "bg-text-muted",
    border: "border-border-default",
    bg: "bg-surface-3",
  },
}

const SIZE_CONFIG: Record<StatusSize, { text: string; height: string; padding: string; dot: string; icon: string }> = {
  sm:  { text: "text-xs",  height: "h-5", padding: "px-1.5", dot: "size-1",   icon: "[&_svg]:size-3" },
  md:  { text: "text-sm",  height: "h-6", padding: "px-2",   dot: "size-1.5", icon: "[&_svg]:size-3.5" },
  lg:  { text: "text-base", height: "h-7", padding: "px-2.5", dot: "size-2",   icon: "[&_svg]:size-4" },
}

export function Status({
  color,
  size = "md",
  fill = "ghost",
  textStyle = "color",
  icon,
  dot,
  iconOnly = false,
  className,
  children,
  ...props
}: StatusProps) {
  const tokens = colorTokens[color] ?? colorTokens.green

  if (process.env.NODE_ENV !== "production" && !colorTokens[color]) {
    console.warn(`Status: unknown color "${color}"; falling back to "green".`)
  }
  const sz = SIZE_CONFIG[size]

  const containerClass = cn(
    "inline-flex shrink-0 items-center gap-1.5 font-medium",
    sz.text,
    fill === "ghost" && "px-0.5",
    fill === "outline" && cn("rounded border border-border-default", sz.height, sz.padding),
    fill === "outline-color" && cn("rounded border", sz.height, sz.padding, tokens.border),
    fill === "fill" && cn("rounded", sz.height, sz.padding, tokens.bg),
    className
  )

  const labelClass = textStyle === "color" ? tokens.text : "text-text-secondary"

  return (
    <span className={containerClass} {...props}>
      {dot ? (
        <span className={cn("shrink-0 rounded-full", sz.dot, tokens.dot)} />
      ) : null}

      {icon ? (
        <span className={cn("flex shrink-0 items-center", sz.icon, tokens.text)}>
          {icon}
        </span>
      ) : null}

      {!iconOnly && children ? (
        <span className={labelClass}>{children}</span>
      ) : null}
    </span>
  )
}
