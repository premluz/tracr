import * as React from "react"
import { CheckIcon, AlertCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

// ─── Types ────────────────────────────────────────────────────────────────────

export type StepStatus = "complete" | "current" | "pending" | "error"
export type StepperSize = "sm" | "md" | "lg"
export type StepperOrientation = "horizontal" | "vertical"

export interface StepItem {
  id: string
  label: string
  description?: string
  count?: number | string
  status: StepStatus
  /** Reserves layout space for the count badge but renders it fully transparent */
  countFaded?: boolean
}

export interface StepperProps {
  steps: StepItem[]
  orientation?: StepperOrientation
  size?: StepperSize
  onStepClick?: (id: string) => void
  className?: string
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const S = {
  sm: {
    ring:   "size-6",
    dot:    "size-2",
    icon:   "size-3",
    label:  "text-sm  font-medium",
    desc:   "text-xs",
    badge:  "text-xs  h-3.5 min-w-3.5 px-1   rounded-sm",
    hLine:  "h-0.5 flex-1 min-w-6  mx-2",
    vLine:  "h-5 ml-3 w-0.5",
  },
  md: {
    ring:   "size-8",
    dot:    "size-3",
    icon:   "size-4",
    label:  "text-sm  font-medium",
    desc:   "text-sm",
    badge:  "text-xs h-4   min-w-4   px-1   rounded-sm",
    hLine:  "h-0.5 flex-1 min-w-8  mx-3",
    vLine:  "h-6 ml-4 w-0.5",
  },
  lg: {
    ring:   "size-10",
    dot:    "size-4",
    icon:   "size-5",
    label:  "text-base font-medium",
    desc:   "text-sm",
    badge:  "text-sm     h-5   min-w-5   px-1.5 rounded-sm",
    hLine:  "h-0.5 flex-1 min-w-10 mx-3",
    vLine:  "h-8 ml-5 w-0.5",
  },
} as const

// ─── Status indicator ─────────────────────────────────────────────────────────

// Written as literal strings (not built via template/replace) so Tailwind's
// static scanner can actually find and generate them — group-hover: variants
// built at runtime are invisible to the scanner and silently do nothing.
const GROUP_HOVER_BG: Record<number, string> = {
  0: "group-hover:bg-surface-0",
  1: "group-hover:bg-surface-1",
  2: "group-hover:bg-surface-2",
  3: "group-hover:bg-surface-3",
  4: "group-hover:bg-surface-4",
  5: "group-hover:bg-surface-5",
}

function Indicator({ status, size }: { status: StepStatus; size: StepperSize }) {
  const s = S[size]

  if (status === "complete") {
    return (
      <div
        className={cn(
          "shrink-0 rounded-full bg-status-available flex items-center justify-center",
          s.ring
        )}
      >
        <CheckIcon className={cn("text-surface-1", s.icon)} strokeWidth={iconStrokeWidth.thick} />
      </div>
    )
  }

  // current - use dynamic surface
  const { level: currentLevel } = useSurface()
  const currentBg = getSurfaceClass(getNextSurfaceLevel(currentLevel))
  const currentHoverBg = GROUP_HOVER_BG[getNextSurfaceLevel(getNextSurfaceLevel(currentLevel))]

  if (status === "current") {
    return (
      <div
        className={cn(
          "shrink-0 rounded-full border-2 border-status-available flex items-center justify-center transition-colors",
          currentBg,
          currentHoverBg,
          s.ring
        )}
      >
        <div className={cn("rounded-full bg-status-available", s.dot)} />
      </div>
    )
  }

  if (status === "error") {
    return (
      <div
        className={cn(
          "shrink-0 rounded-full bg-status-error flex items-center justify-center",
          s.ring
        )}
      >
        <AlertCircleIcon className={cn("text-white", s.icon)} strokeWidth={iconStrokeWidth.regular} />
      </div>
    )
  }

  // pending - use dynamic surface (will inherit from parent + 1)
  const { level } = useSurface()
  const pendingBg = getSurfaceClass(getNextSurfaceLevel(level))
  const pendingHoverBg = GROUP_HOVER_BG[getNextSurfaceLevel(getNextSurfaceLevel(level))]
  return (
    <div
      className={cn(
        "shrink-0 rounded-full transition-colors",
        pendingBg,
        pendingHoverBg,
        s.ring
      )}
    />
  )
}

// ─── Per-status colour helpers ────────────────────────────────────────────────

function labelColor(status: StepStatus) {
  if (status === "current") return "text-status-available"
  if (status === "complete") return "text-text-primary"
  return "text-text-muted"
}

function descColor(status: StepStatus) {
  return status === "current" ? "text-status-available" : "text-text-muted"
}

function lineColor(prevStatus: StepStatus) {
  return prevStatus === "complete" ? "bg-status-available" : "bg-surface-4"
}

// ─── Single step content ──────────────────────────────────────────────────────

function StepContent({
  step,
  size,
}: {
  step: StepItem
  size: StepperSize
}) {
  const s = S[size]
  const surface = useSurface()
  const badgeBg = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)))

  return (
    <div className="flex items-center gap-2">
      <Indicator status={step.status} size={size} />
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className={cn("leading-none", s.label, labelColor(step.status))}>
            {step.label}
          </span>
          {step.count != null && (
            <span
              className={cn(
                "inline-flex items-center justify-center leading-none text-text-muted",
                badgeBg,
                s.badge,
                step.countFaded && "opacity-0"
              )}
            >
              {step.count}
            </span>
          )}
        </div>
        {step.description && (
          <span className={cn("leading-tight", s.desc, descColor(step.status))}>
            {step.description}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

export function Stepper({
  steps,
  orientation = "horizontal",
  size = "md",
  onStepClick,
  className,
}: StepperProps) {
  const s = S[size]
  const isH = orientation === "horizontal"
  const surface = useSurface()
  const stepHoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level)).replace("bg-", "hover:bg-")

  function wrap(step: StepItem, inner: React.ReactNode) {
    if (!onStepClick) return <div key={step.id}>{inner}</div>
    return (
      <button
        key={step.id}
        type="button"
        onClick={() => onStepClick(step.id)}
        className={cn(
          "group cursor-pointer rounded-sm px-1.5 py-1 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          stepHoverBg
        )}
      >
        {inner}
      </button>
    )
  }

  if (isH) {
    return (
      <div className={cn("flex items-center", className)}>
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            {wrap(step, <StepContent step={step} size={size} />)}
            {i < steps.length - 1 && (
              <div className={cn("rounded-full", s.hLine, lineColor(step.status))} />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  // Vertical
  return (
    <div className={cn("flex flex-col", className)}>
      {steps.map((step, i) => (
        <React.Fragment key={step.id}>
          {wrap(step, <StepContent step={step} size={size} />)}
          {i < steps.length - 1 && (
            <div className={cn("rounded-full my-0.5", s.vLine, lineColor(step.status))} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
