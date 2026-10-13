import * as React from "react"
import Lottie from "lottie-react"
import {
  CheckCircle2Icon,
  AlertTriangleIcon,
  BanIcon,
  ChevronRightIcon,
  InfoIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"
import { Drawer } from "@/components/custom/drawer"
import { Stepper, type StepItem } from "@/components/custom/stepper"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Status } from "@/components/custom/status"
import { Confirmation } from "@/components/custom/confirmation"
import type { Diamond } from "@/components/custom/inventory-table"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"
import loaderAnimation from "@/assets/lottie/loader.json"
import successAnimation from "@/assets/lottie/success.json"

// CSS keyframes for step animations
const stepAnimationStyles = `
  @keyframes slideOutLeft {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(-30px); opacity: 0; }
  }
  @keyframes slideInRight {
    0% { transform: translateX(30px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(30px); opacity: 0; }
  }
  @keyframes slideInLeft {
    0% { transform: translateX(-30px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  .step-animate-out-left {
    animation: slideOutLeft 0.2s ease-out forwards;
  }
  .step-animate-in-right {
    animation: slideInRight 0.25s ease-out forwards;
  }
  .step-animate-out-right {
    animation: slideOutRight 0.2s ease-out forwards;
  }
  .step-animate-in-left {
    animation: slideInLeft 0.25s ease-out forwards;
  }
`

// ─── Types ────────────────────────────────────────────────────────────────────

export type TransferStep = "selection" | "details" | "results"

export interface TransferSelection {
  eligible: Diamond[]
  eligibleAfterUnlock: Diamond[]
  lockedCount: number
  notEligible: {
    transferring: Diamond[]
    missingData: Diamond[]
  }
}

export interface TransferResult {
  diamonds: number
  shipmentName: string
  recipientUrl: string
}

export interface TransferDrawerProps {
  open: boolean
  onClose: () => void
  diamonds: Diamond[]
  /** Called when user clicks "Unlock all" on the locked group */
  onUnlockAll?: () => void
  /** Called when a preview group row is clicked (opens nested drawer) */
  onPreviewGroup?: (group: "eligible" | "locked" | "transferring" | "missingData") => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function classifyDiamonds(diamonds: Diamond[]): TransferSelection {
  const eligible:            Diamond[] = []
  const eligibleAfterUnlock: Diamond[] = []
  const transferring:        Diamond[] = []
  const missingData:         Diamond[] = []

  for (const d of diamonds) {
    if (d.status === "available")       eligible.push(d)
    else if (d.status === "locked")     eligibleAfterUnlock.push(d)
    else if (d.status === "transferring") transferring.push(d)
    else                                missingData.push(d)
  }

  return {
    eligible,
    eligibleAfterUnlock,
    lockedCount: eligibleAfterUnlock.length,
    notEligible: { transferring, missingData },
  }
}

function caratRange(diamonds: Diamond[]): string {
  if (!diamonds.length) return "–"
  const carats = diamonds.map((d) => d.carat)
  const min = Math.min(...carats).toFixed(3)
  const max = Math.max(...carats).toFixed(3)
  return min === max ? `${min}ct` : `${min}ct – ${max}ct`
}

function totalCarat(diamonds: Diamond[]): string {
  return diamonds.reduce((s, d) => s + d.carat, 0).toFixed(3) + "ct"
}

// ─── Stepper bar ──────────────────────────────────────────────────────────────

function TransferStepper({
  step,
  eligibleCount,
  detailsCount,
  resultsCount,
  onStepClick,
}: {
  step: TransferStep
  eligibleCount: number
  detailsCount: number
  resultsCount?: number
  onStepClick?: (id: string) => void
}) {
  const steps: StepItem[] = [
    {
      id: "selection",
      label: "Selection",
      count: eligibleCount,
      status: step === "selection" ? "current" : "complete",
    },
    {
      id: "details",
      label: "Details",
      count: detailsCount,
      status:
        step === "details"
          ? "current"
          : step === "results"
            ? "complete"
            : "pending",
    },
    {
      id: "results",
      label: "Results",
      count: resultsCount ?? detailsCount,
      countFaded: step !== "results",
      status: step === "results" ? (resultsCount != null ? "complete" : "current") : "pending",
    },
  ]

  return (
    <Stepper
      steps={steps}
      orientation="horizontal"
      size="sm"
      onStepClick={onStepClick}
      className="w-full px-1"
    />
  )
}

// ─── Step 1: Selection ────────────────────────────────────────────────────────

function SelectionStep({
  selection,
  onUnlockAll,
  onPreviewGroup,
}: {
  selection: TransferSelection
  onUnlockAll?: () => void
  onPreviewGroup?: TransferDrawerProps["onPreviewGroup"]
}) {
  const { eligible, eligibleAfterUnlock, lockedCount, notEligible } = selection

  return (
    <div className="flex flex-col gap-3">
      {/* Eligible now */}
      <GroupRow
        icon={<CheckCircle2Icon className="size-4 text-status-available" strokeWidth={iconStrokeWidth.regular} />}
        title="Eligible for transfer now"
        chips={[{ label: `${eligible.length} eligible for transfer`, color: "green" }]}
        onClick={() => onPreviewGroup?.("eligible")}
      />

      {/* Eligible after unlock */}
      {eligibleAfterUnlock.length > 0 && (
        <GroupRow
          icon={<AlertTriangleIcon className="size-4 text-status-warning" strokeWidth={iconStrokeWidth.regular} />}
          title="Eligible for transfer after resolving issues"
          chips={[{ label: `${lockedCount} locked`, color: "neutral" }]}
          action={
            <Button
              variant="secondary-subtle"
              size="md"
              onClick={(e) => { e.stopPropagation(); onUnlockAll?.() }}
            >
              Unlock all
            </Button>
          }
          onClick={() => onPreviewGroup?.("locked")}
        />
      )}

      {/* Not eligible — grouped card */}
      {(notEligible.transferring.length > 0 || notEligible.missingData.length > 0) && (
        <div className="rounded-sm border border-border-subtle overflow-hidden">
          {/* Group header — non-interactive */}
          <div className="flex items-center gap-2 px-5 py-5 border-b border-border-subtle">
            <BanIcon className="size-4 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
            <span className="text-sm  font-medium text-text-primary">Not eligible for transfer</span>
          </div>
          {/* Sub-rows */}
          {notEligible.transferring.length > 0 && (
            <button
              type="button"
              onClick={() => onPreviewGroup?.("transferring")}
              className={cn(
              "w-full px-5 py-4 text-left flex items-center justify-between cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              getSurfaceClass(getNextSurfaceLevel(useSurface().level)).replace("bg-", "hover:bg-")
            )}
            >
              <Status color="neutral" fill="fill" textStyle="neutral">{`${notEligible.transferring.length} transferring`}</Status>
              <ChevronRightIcon className="size-4 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
            </button>
          )}
          {notEligible.transferring.length > 0 && notEligible.missingData.length > 0 && (
            <div className="border-t border-border-subtle" />
          )}
          {notEligible.missingData.length > 0 && (
            <button
              type="button"
              onClick={() => onPreviewGroup?.("missingData")}
              className={cn(
              "w-full px-5 py-4 text-left flex items-center justify-between cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              getSurfaceClass(getNextSurfaceLevel(useSurface().level)).replace("bg-", "hover:bg-")
            )}
            >
              <Status color="neutral" fill="fill" textStyle="neutral">{`${notEligible.missingData.length} missing data`}</Status>
              <ChevronRightIcon className="size-4 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── GroupRow ─────────────────────────────────────────────────────────────────

interface ChipDef { label: string; color: "green" | "amber" | "neutral" }

function GroupRow({
  icon,
  title,
  chips,
  action,
  onClick,
}: {
  icon: React.ReactNode
  title: string | null
  chips: ChipDef[]
  action?: React.ReactNode
  onClick?: () => void
}) {
  const surface = useSurface()
  const hoverBgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full cursor-pointer rounded-sm border border-border-subtle px-5 py-5 text-left",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        hoverBgClass.replace("bg-", "hover:bg-")
      )}
    >
      {title && (
        <div className="mb-2 flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-text-primary">{title}</span>
        </div>
      )}
      <div className="flex items-center pt-3 pb-1 justify-between">
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c, i) => (
            <Status key={i} color={c.color} fill="fill" textStyle={c.color === "neutral" ? "neutral" : "color"}>
              {c.label}
            </Status>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <ChevronRightIcon className="size-4 text-text-muted" strokeWidth={iconStrokeWidth.regular} />
        </div>
      </div>
    </button>
  )
}

// ─── Step 2: Details ──────────────────────────────────────────────────────────

function DetailsStep({
  diamonds,
  shipmentName,
  recipientUrl,
  onShipmentNameChange,
  onRecipientUrlChange,
}: {
  diamonds: Diamond[]
  shipmentName: string
  recipientUrl: string
  onShipmentNameChange: (v: string) => void
  onRecipientUrlChange: (v: string) => void
}) {
  return (
    <div className="rounded-sm border border-border-subtle overflow-hidden">
      {/* Summary stats */}
      <div className="inline-flex">
        <StatCell label="Diamonds" value={String(diamonds.length)} />
        <StatCell label="Total carat weight" value={totalCarat(diamonds)} divider />
        <StatCell label="Carat range" value={caratRange(diamonds)} divider />
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 p-5">
        <FormField
          label="Shipment name"
          value={shipmentName}
          onChange={(e) => onShipmentNameChange(e.target.value)}
          placeholder=""
          variant="filled"
          inputSize="lg"
        />

        <FormField
          label="Recipient URL"
          labelIcon={<InfoIcon className="size-3.5 text-text-muted" strokeWidth={iconStrokeWidth.regular} />}
          value={recipientUrl}
          onChange={(e) => onRecipientUrlChange(e.target.value)}
          placeholder=""
          variant="filled"
          inputSize="lg"
        />
      </div>
    </div>
  )
}

function StatCell({ label, value, divider }: { label: string; value: string; divider?: boolean }) {
  return (
    <div
      className={cn(
        "relative px-5 py-4",
        divider && "before:absolute before:left-0 before:top-4 before:bottom-4 before:w-px before:bg-border-subtle"
      )}
    >
      <p className="eyebrow mb-1 text-[10px]">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  )
}

// ─── Step 3: Results ──────────────────────────────────────────────────────────

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="eyebrow w-36 shrink-0 text-[10px]">
        {label}
      </span>
      <span className="text-sm text-text-primary break-all">{value}</span>
    </div>
  )
}

// Single Confirmation instance whose accessory/title swap in place between
// processing and success — same icon-then-text structure throughout, so the
// transition never jumps the way swapping between two differently-shaped
// components did.
function ResultsStep({
  processing,
  result,
}: {
  processing: boolean
  result: TransferResult | null
}) {
  const isSuccess = !processing && result != null

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <Confirmation
        layout="vertical"
        accessory={
          <Lottie
            className="size-16"
            animationData={isSuccess ? successAnimation : loaderAnimation}
            loop={!isSuccess}
            autoplay
          />
        }
        title={isSuccess ? "Transfer successful" : "Processing"}
      />
      {isSuccess && result && (
        <div className="w-full rounded-sm border border-border-subtle px-5 py-5 flex flex-col gap-3">
          <ResultRow label="Diamonds" value={String(result.diamonds)} />
          <ResultRow label="Shipment name" value={result.shipmentName} />
          <ResultRow label="Recipient URL" value={result.recipientUrl} />
        </div>
      )}
    </div>
  )
}

// Animated step wrapper with slide + fade transitions
function AnimatedStep({
  step,
  renderContent,
}: {
  step: TransferStep
  renderContent: (step: TransferStep) => React.ReactNode
}) {
  const [animationClass, setAnimationClass] = React.useState("")
  const [displayStep, setDisplayStep] = React.useState(step)

  const stepOrder: TransferStep[] = ["selection", "details", "results"]

  React.useEffect(() => {
    if (step === displayStep) return

    const currentIndex = stepOrder.indexOf(displayStep)
    const newIndex = stepOrder.indexOf(step)
    const isForward = newIndex > currentIndex

    // Start exit animation for current content
    setAnimationClass(isForward ? "step-animate-out-left" : "step-animate-out-right")

    // After exit animation, switch content and start enter animation
    const exitTimer = setTimeout(() => {
      setDisplayStep(step)
      setAnimationClass(isForward ? "step-animate-in-right" : "step-animate-in-left")

      // Clear animation class after enter animation completes
      const enterTimer = setTimeout(() => {
        setAnimationClass("")
      }, 250)

      return () => clearTimeout(enterTimer)
    }, 200)

    return () => clearTimeout(exitTimer)
  }, [step, displayStep])

  return (
    <>
      {/* Inject animation styles */}
      <style>{stepAnimationStyles}</style>
      <div className={cn("w-full", animationClass)}>
        {renderContent(displayStep)}
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TransferDrawer({
  open,
  onClose,
  diamonds,
  onUnlockAll,
  onPreviewGroup,
}: TransferDrawerProps) {
  const [step, setStep]                       = React.useState<TransferStep>("selection")
  const [shipmentName, setShipmentName]       = React.useState("")
  const [recipientUrl, setRecipientUrl]       = React.useState("")
  const [processing, setProcessing]           = React.useState(false)
  const [result, setResult]                   = React.useState<TransferResult | null>(null)
  const [unlockedIds, setUnlockedIds]         = React.useState<Set<string>>(new Set())

  // Diamonds unlocked via "Unlock all" are treated as available for the rest
  // of this session, so the selection/counts update immediately without
  // needing a real backend round-trip.
  const effectiveDiamonds = React.useMemo(
    () => unlockedIds.size === 0
      ? diamonds
      : diamonds.map((d) => unlockedIds.has(d.id) ? { ...d, status: "available" as const } : d),
    [diamonds, unlockedIds]
  )
  const selection = React.useMemo(() => classifyDiamonds(effectiveDiamonds), [effectiveDiamonds])
  const eligibleDiamonds = selection.eligible

  // Reset when closed
  React.useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        setStep("selection")
        setShipmentName("")
        setRecipientUrl("")
        setProcessing(false)
        setResult(null)
        setUnlockedIds(new Set())
      }, 350)
      return () => clearTimeout(t)
    }
  }, [open])

  function handleUnlockAll() {
    setUnlockedIds((prev) => {
      const next = new Set(prev)
      for (const d of selection.eligibleAfterUnlock) next.add(d.id)
      return next
    })
    onUnlockAll?.()
  }

  function handleContinue() {
    if (step === "selection") {
      setStep("details")
    } else if (step === "details") {
      setStep("results")
      setProcessing(true)
      window.setTimeout(() => {
        setProcessing(false)
        setResult({
          diamonds: eligibleDiamonds.length,
          shipmentName,
          recipientUrl,
        })
      }, 2000)
    }
  }

  function handleStepClick(id: string) {
    if (id === "results") return
    if (id === step) return
    if (id === "selection") setStep("selection")
    if (id === "details" && (step === "selection" || step === "results")) setStep("details")
  }

  const canContinue = step === "selection"
    || (step === "details" && shipmentName.trim() !== "" && recipientUrl.trim() !== "")

  // Header actions (top-right)
  const headerActions = step === "results" ? (
    result ? (
      <>
        <Button variant="secondary-subtle" size="md" onClick={onClose}>Close</Button>
        <Button size="md" onClick={onClose}>View transfer</Button>
      </>
    ) : null
  ) : (
    <Button size="md" disabled={!canContinue} onClick={handleContinue}>
      {step === "selection" ? "Continue" : "Confirm transfer"}
    </Button>
  )

  const totalSelected = diamonds.length
  const detailsCount  = eligibleDiamonds.length
  const resultsCount  = result?.diamonds

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Transfer"
      size="md"
      headerActions={headerActions}
      closeOnBackdrop
    >
      {/* Stepper */}
      <div className="-mx-4 -mt-4 mb-4 px-4 py-3">
        <TransferStepper
          step={step}
          eligibleCount={step === "selection" ? totalSelected : totalSelected}
          detailsCount={detailsCount}
          resultsCount={resultsCount}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Body */}
      <AnimatedStep
        step={step}
        renderContent={(currentStep) => (
          <>
            {currentStep === "selection" && (
              <SelectionStep
                selection={selection}
                onUnlockAll={handleUnlockAll}
                onPreviewGroup={onPreviewGroup}
              />
            )}
            {currentStep === "details" && (
              <DetailsStep
                diamonds={eligibleDiamonds}
                shipmentName={shipmentName}
                recipientUrl={recipientUrl}
                onShipmentNameChange={setShipmentName}
                onRecipientUrlChange={setRecipientUrl}
              />
            )}
            {currentStep === "results" && (
              <ResultsStep
                processing={processing}
                result={result}
              />
            )}
          </>
        )}
      />
    </Drawer>
  )
}
