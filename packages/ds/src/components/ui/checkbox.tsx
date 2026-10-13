import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export type CheckboxSize    = "sm" | "md"
export type CheckboxVariant = "filled" | "outline"

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  size?:    CheckboxSize
  variant?: CheckboxVariant
}

function Checkbox({
  className,
  size = "md",
  variant = "filled",
  ...props
}: CheckboxProps) {
  const surface  = useSurface()
  const hoverBg  = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)))
  const boxSize    = size === "sm" ? "size-3.5" : "size-4"
  const haloSize   = size === "sm" ? "size-[1.875rem]" : "size-8"
  const radius     = size === "sm" ? "rounded-[2px]" : "rounded-[4px]"
  const iconSize   = size === "sm" ? "size-2.5" : "size-3"
  const bgDefault  = variant === "filled" ? "bg-surface-3" : "bg-transparent"

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group peer -m-2 inline-flex shrink-0 items-center justify-center rounded-sm transition-colors cursor-pointer",
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
          "flex shrink-0 items-center justify-center border border-border-default transition-colors",
          boxSize, radius, bgDefault,
          "group-data-[state=checked]:border-status-available group-data-[state=checked]:bg-status-available group-data-[state=checked]:text-surface-0",
          "group-data-[state=indeterminate]:border-status-available group-data-[state=indeterminate]:bg-status-available group-data-[state=indeterminate]:text-surface-0"
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <CheckIcon className={cn("group-data-[state=indeterminate]:hidden", iconSize)} strokeWidth={iconStrokeWidth.thick} />
          <MinusIcon className={cn("hidden group-data-[state=indeterminate]:block", iconSize)} strokeWidth={iconStrokeWidth.thick} />
        </CheckboxPrimitive.Indicator>
      </span>
    </CheckboxPrimitive.Root>
  )
}

// ─── CheckboxField ────────────────────────────────────────────────────────────
// Wraps checkbox + label/description with the full-row state layer

export interface CheckboxFieldProps {
  id?:          string
  label?:       React.ReactNode
  description?: React.ReactNode
  size?:        CheckboxSize
  variant?:     CheckboxVariant
  checked?:     boolean | "indeterminate"
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | "indeterminate") => void
  disabled?:    boolean
  className?:   string
}

function CheckboxField({
  id,
  label,
  description,
  size = "md",
  variant = "filled",
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
}: CheckboxFieldProps) {
  const fieldId = id ?? React.useId()

  return (
    <label
      htmlFor={fieldId}
      className={cn(
        "group/field flex cursor-pointer items-start gap-2.5 rounded-sm px-2 py-1.5 transition-colors",
        "hover:bg-surface-2",
        disabled && "cursor-not-allowed opacity-40 hover:bg-transparent",
        className
      )}
    >
      <Checkbox
        id={fieldId}
        size={size}
        variant={variant}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
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

export { Checkbox, CheckboxField }
