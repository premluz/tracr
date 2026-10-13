import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"

export type RadioSize    = "sm" | "md"
export type RadioVariant = "filled" | "outline"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

export interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  size?:    RadioSize
  variant?: RadioVariant
}

function RadioGroupItem({
  className,
  size = "md",
  variant = "filled",
  ...props
}: RadioGroupItemProps) {
  const surface   = useSurface()
  const hoverBg   = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)))
  const boxSize   = size === "sm" ? "size-3.5" : "size-4"
  const haloSize  = size === "sm" ? "size-[1.875rem]" : "size-8"
  const dotSize   = size === "sm" ? "size-1.5" : "size-2"
  const bgDefault = variant === "filled" ? "bg-surface-3" : "bg-transparent"

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group peer -m-2 inline-flex shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer",
        haloSize,
        hoverBg.replace("bg-", "hover:bg-"),
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-available focus-visible:ring-offset-1 focus-visible:ring-offset-surface-0",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-border-default transition-colors",
          boxSize, bgDefault,
          "group-data-[state=checked]:border-status-available"
        )}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span className={cn("rounded-full bg-status-available", dotSize)} />
        </RadioGroupPrimitive.Indicator>
      </span>
    </RadioGroupPrimitive.Item>
  )
}

// ─── RadioField ───────────────────────────────────────────────────────────────

export interface RadioFieldProps {
  label?:       React.ReactNode
  description?: React.ReactNode
  size?:        RadioSize
  variant?:     RadioVariant
  value:        string
  disabled?:    boolean
  className?:   string
}

function RadioField({
  label,
  description,
  size = "md",
  variant = "filled",
  value,
  disabled,
  className,
}: RadioFieldProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-2.5 rounded-sm px-2 py-1.5 transition-colors",
        "hover:bg-surface-2",
        disabled && "cursor-not-allowed opacity-40 hover:bg-transparent",
        className
      )}
    >
      <RadioGroupItem
        value={value}
        size={size}
        variant={variant}
        disabled={disabled}
        className="mt-0.5"
      />
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium leading-none text-text-primary">
              {label}
            </span>
          )}
          {description && (
            <span className="text-sm leading-snug text-text-secondary">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  )
}

export { RadioGroup, RadioGroupItem, RadioField }
