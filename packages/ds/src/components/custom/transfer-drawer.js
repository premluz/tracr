import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CheckCircle2Icon, AlertTriangleIcon, BanIcon, ChevronRightIcon, InfoIcon, Loader2Icon, } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
import { Drawer } from "@/components/custom/drawer";
import { Stepper } from "@/components/custom/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
`;
// ─── Helpers ──────────────────────────────────────────────────────────────────
function classifyDiamonds(diamonds) {
    const eligible = [];
    const eligibleAfterUnlock = [];
    const transferring = [];
    const missingData = [];
    for (const d of diamonds) {
        if (d.status === "available")
            eligible.push(d);
        else if (d.status === "locked")
            eligibleAfterUnlock.push(d);
        else if (d.status === "transferring")
            transferring.push(d);
        else
            missingData.push(d);
    }
    return {
        eligible,
        eligibleAfterUnlock,
        lockedCount: eligibleAfterUnlock.length,
        notEligible: { transferring, missingData },
    };
}
function caratRange(diamonds) {
    if (!diamonds.length)
        return "–";
    const carats = diamonds.map((d) => d.carat);
    const min = Math.min(...carats).toFixed(3);
    const max = Math.max(...carats).toFixed(3);
    return min === max ? `${min}ct` : `${min}ct – ${max}ct`;
}
function totalCarat(diamonds) {
    return diamonds.reduce((s, d) => s + d.carat, 0).toFixed(3) + "ct";
}
// ─── Stepper bar ──────────────────────────────────────────────────────────────
function TransferStepper({ step, eligibleCount, detailsCount, resultsCount, onStepClick, }) {
    const steps = [
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
            status: step === "details"
                ? "current"
                : step === "results"
                    ? "complete"
                    : "pending",
        },
        {
            id: "results",
            label: "Results",
            count: resultsCount,
            status: step === "results" ? "current" : "pending",
        },
    ];
    return (_jsx(Stepper, { steps: steps, orientation: "horizontal", size: "sm", onStepClick: onStepClick, className: "w-full px-1" }));
}
// ─── Step 1: Selection ────────────────────────────────────────────────────────
function SelectionStep({ selection, onUnlockAll, onPreviewGroup, }) {
    const { eligible, eligibleAfterUnlock, lockedCount, notEligible } = selection;
    return (_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(GroupRow, { icon: _jsx(CheckCircle2Icon, { className: "size-4 text-status-available" }), title: "Eligible for transfer now", chips: [{ label: `${eligible.length} eligible for transfer`, color: "green" }], onClick: () => onPreviewGroup?.("eligible") }), eligibleAfterUnlock.length > 0 && (_jsx(GroupRow, { icon: _jsx(AlertTriangleIcon, { className: "size-4 text-status-warning" }), title: "Eligible for transfer after resolving issues", chips: [{ label: `${lockedCount} locked`, color: "amber" }], action: _jsx(Button, { variant: "secondary-subtle", size: "md", onClick: (e) => { e.stopPropagation(); onUnlockAll?.(); }, children: "Unlock all" }), onClick: () => onPreviewGroup?.("locked") })), (notEligible.transferring.length > 0 || notEligible.missingData.length > 0) && (_jsxs("div", { className: cn("rounded-sm border border-border-subtle overflow-hidden", getSurfaceClass(getNextSurfaceLevel(useSurface().level))), children: [_jsxs("div", { className: "flex items-center gap-2 px-4 py-4 border-b border-border-subtle", children: [_jsx(BanIcon, { className: "size-4 text-text-muted" }), _jsx("span", { className: "text-sm  font-medium text-text-primary", children: "Not eligible for transfer" })] }), notEligible.transferring.length > 0 && (_jsxs("button", { type: "button", onClick: () => onPreviewGroup?.("transferring"), className: cn("w-full px-4 py-3 text-left flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring", getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(useSurface().level))).replace("bg-", "hover:bg-")), children: [_jsx(Chip, { label: `${notEligible.transferring.length} transferring`, color: "neutral" }), _jsx(ChevronRightIcon, { className: "size-4 text-text-muted" })] })), notEligible.transferring.length > 0 && notEligible.missingData.length > 0 && (_jsx("div", { className: "border-t border-border-subtle" })), notEligible.missingData.length > 0 && (_jsxs("button", { type: "button", onClick: () => onPreviewGroup?.("missingData"), className: cn("w-full px-4 py-3 text-left flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring", getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(useSurface().level))).replace("bg-", "hover:bg-")), children: [_jsx(Chip, { label: `${notEligible.missingData.length} missing data`, color: "neutral" }), _jsx(ChevronRightIcon, { className: "size-4 text-text-muted" })] }))] }))] }));
}
function GroupRow({ icon, title, chips, action, onClick, }) {
    const surface = useSurface();
    const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const hoverBgClass = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)));
    return (_jsxs("button", { type: "button", onClick: onClick, className: cn("w-full rounded-sm border border-border-subtle px-4 py-4 text-left", "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", bgClass, hoverBgClass.replace("bg-", "hover:bg-")), children: [title && (_jsxs("div", { className: "mb-2 flex items-center gap-2", children: [icon, _jsx("span", { className: "text-sm font-medium text-text-primary", children: title })] })), _jsxs("div", { className: "flex items-center pt-3 pb-1 justify-between", children: [_jsx("div", { className: "flex flex-wrap gap-1.5", children: chips.map((c, i) => _jsx(Chip, { ...c }, i)) }), _jsxs("div", { className: "flex items-center gap-2", children: [action, _jsx(ChevronRightIcon, { className: "size-4 text-text-muted" })] })] })] }));
}
function Chip({ label, color }) {
    const surface = useSurface();
    const neutralBg = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)));
    return (_jsx("span", { className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium", color === "green" && "bg-status-available/15 text-status-available", color === "amber" && "bg-status-warning/15 text-status-warning", color === "neutral" && cn(neutralBg, "text-text-secondary")), children: label }));
}
// ─── Step 2: Details ──────────────────────────────────────────────────────────
function DetailsStep({ diamonds, shipmentName, recipientUrl, onShipmentNameChange, onRecipientUrlChange, }) {
    return (_jsxs("div", { className: "flex flex-col gap-5", children: [_jsxs("div", { className: "grid grid-cols-3 gap-px rounded-sm overflow-hidden border border-border-subtle", children: [_jsx(StatCell, { label: "Diamonds", value: String(diamonds.length) }), _jsx(StatCell, { label: "Total carat weight", value: totalCarat(diamonds) }), _jsx(StatCell, { label: "Carat range", value: caratRange(diamonds) })] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex flex-col gap-1.5", children: [_jsx("label", { className: "eyebrow text-sm", children: "Shipment name" }), _jsx(Input, { value: shipmentName, onChange: (e) => onShipmentNameChange(e.target.value), placeholder: "", variant: "filled", inputSize: "lg" })] }), _jsxs("div", { className: "flex flex-col gap-1.5", children: [_jsx("label", { className: "eyebrow text-sm", children: "Recipient URL" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { value: recipientUrl, onChange: (e) => onRecipientUrlChange(e.target.value), placeholder: "", variant: "filled", inputSize: "lg", className: "pr-9" }), _jsx(InfoIcon, { className: "absolute right-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" })] })] })] })] }));
}
function StatCell({ label, value }) {
    const surface = useSurface();
    const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level));
    return (_jsxs("div", { className: cn("px-4 py-3", bgClass), children: [_jsx("p", { className: "eyebrow mb-1 text-[10px]", children: label }), _jsx("p", { className: "text-sm font-medium text-text-primary", children: value })] }));
}
// ─── Step 3: Results ──────────────────────────────────────────────────────────
function ProcessingStep() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-72 gap-3", children: [_jsx(Loader2Icon, { className: "size-8 text-status-available animate-spin" }), _jsx("p", { className: "text-sm text-text-secondary", children: "Processing" })] }));
}
function SuccessStep({ result }) {
    return (_jsxs("div", { className: "flex flex-col items-center gap-6 py-8", children: [_jsx("div", { className: "flex size-16 items-center justify-center rounded-full bg-status-available/20", children: _jsx(CheckCircle2Icon, { className: "size-8 text-status-available" }) }), _jsx("h3", { className: "text-xl font-bold text-text-primary", children: "Transfer successful" }), _jsxs("div", { className: cn("w-full rounded-sm border border-border-subtle px-4 py-4 flex flex-col gap-3", getSurfaceClass(getNextSurfaceLevel(useSurface().level))), children: [_jsx(ResultRow, { label: "Diamonds", value: String(result.diamonds) }), _jsx(ResultRow, { label: "Shipment name", value: result.shipmentName }), _jsx(ResultRow, { label: "Recipient URL", value: result.recipientUrl })] })] }));
}
function ResultRow({ label, value }) {
    return (_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("span", { className: "eyebrow w-36 shrink-0 text-[10px]", children: label }), _jsx("span", { className: "text-sm text-text-primary break-all", children: value })] }));
}
// Results step with animation between loader and success
function ResultsStep({ processing, result, }) {
    const [animationClass, setAnimationClass] = React.useState("");
    const [displayProcessing, setDisplayProcessing] = React.useState(processing);
    React.useEffect(() => {
        if (processing === displayProcessing)
            return;
        if (!processing && displayProcessing) {
            // Transition from processing to success - fade out left, fade in right
            setAnimationClass("step-animate-out-left");
            const exitTimer = setTimeout(() => {
                setDisplayProcessing(false);
                setAnimationClass("step-animate-in-right");
                const enterTimer = setTimeout(() => {
                    setAnimationClass("");
                }, 250);
                return () => clearTimeout(enterTimer);
            }, 200);
            return () => clearTimeout(exitTimer);
        }
    }, [processing, displayProcessing]);
    return (_jsx("div", { className: cn("w-full", animationClass), children: displayProcessing ? _jsx(ProcessingStep, {}) : result && _jsx(SuccessStep, { result: result }) }));
}
// Animated step wrapper with slide + fade transitions
function AnimatedStep({ step, renderContent, }) {
    const [animationClass, setAnimationClass] = React.useState("");
    const [displayStep, setDisplayStep] = React.useState(step);
    const stepOrder = ["selection", "details", "results"];
    React.useEffect(() => {
        if (step === displayStep)
            return;
        const currentIndex = stepOrder.indexOf(displayStep);
        const newIndex = stepOrder.indexOf(step);
        const isForward = newIndex > currentIndex;
        // Start exit animation for current content
        setAnimationClass(isForward ? "step-animate-out-left" : "step-animate-out-right");
        // After exit animation, switch content and start enter animation
        const exitTimer = setTimeout(() => {
            setDisplayStep(step);
            setAnimationClass(isForward ? "step-animate-in-right" : "step-animate-in-left");
            // Clear animation class after enter animation completes
            const enterTimer = setTimeout(() => {
                setAnimationClass("");
            }, 250);
            return () => clearTimeout(enterTimer);
        }, 200);
        return () => clearTimeout(exitTimer);
    }, [step, displayStep]);
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: stepAnimationStyles }), _jsx("div", { className: cn("w-full", animationClass), children: renderContent(displayStep) })] }));
}
// ─── Main component ───────────────────────────────────────────────────────────
export function TransferDrawer({ open, onClose, diamonds, onUnlockAll, onPreviewGroup, }) {
    const [step, setStep] = React.useState("selection");
    const [shipmentName, setShipmentName] = React.useState("");
    const [recipientUrl, setRecipientUrl] = React.useState("");
    const [processing, setProcessing] = React.useState(false);
    const [result, setResult] = React.useState(null);
    const selection = React.useMemo(() => classifyDiamonds(diamonds), [diamonds]);
    const eligibleDiamonds = selection.eligible;
    // Reset when closed
    React.useEffect(() => {
        if (!open) {
            const t = window.setTimeout(() => {
                setStep("selection");
                setShipmentName("");
                setRecipientUrl("");
                setProcessing(false);
                setResult(null);
            }, 350);
            return () => clearTimeout(t);
        }
    }, [open]);
    function handleContinue() {
        if (step === "selection") {
            setStep("details");
        }
        else if (step === "details") {
            setStep("results");
            setProcessing(true);
            window.setTimeout(() => {
                setProcessing(false);
                setResult({
                    diamonds: eligibleDiamonds.length,
                    shipmentName,
                    recipientUrl,
                });
            }, 2000);
        }
    }
    function handleStepClick(id) {
        if (id === "results")
            return;
        if (id === step)
            return;
        if (id === "selection")
            setStep("selection");
        if (id === "details" && (step === "selection" || step === "results"))
            setStep("details");
    }
    const canContinue = step === "selection"
        || (step === "details" && shipmentName.trim() !== "" && recipientUrl.trim() !== "");
    // Header actions (top-right)
    const headerActions = step === "results" ? (result ? (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary-subtle", size: "md", onClick: onClose, children: "Close" }), _jsx(Button, { size: "md", onClick: onClose, children: "View transfer" })] })) : null) : (_jsx(Button, { size: "md", disabled: !canContinue, onClick: handleContinue, children: step === "selection" ? "Continue" : "Confirm transfer" }));
    const totalSelected = diamonds.length;
    const detailsCount = eligibleDiamonds.length;
    const resultsCount = result?.diamonds;
    return (_jsxs(Drawer, { open: open, onClose: onClose, title: "Transfer", size: "md", headerActions: headerActions, closeOnBackdrop: true, children: [_jsx("div", { className: "-mx-4 -mt-4 mb-4 px-4 py-3", children: _jsx(TransferStepper, { step: step, eligibleCount: step === "selection" ? totalSelected : totalSelected, detailsCount: detailsCount, resultsCount: resultsCount, onStepClick: handleStepClick }) }), _jsx(AnimatedStep, { step: step, renderContent: (currentStep) => (_jsxs(_Fragment, { children: [currentStep === "selection" && (_jsx(SelectionStep, { selection: selection, onUnlockAll: onUnlockAll, onPreviewGroup: onPreviewGroup })), currentStep === "details" && (_jsx(DetailsStep, { diamonds: eligibleDiamonds, shipmentName: shipmentName, recipientUrl: recipientUrl, onShipmentNameChange: setShipmentName, onRecipientUrlChange: setRecipientUrl })), currentStep === "results" && (_jsx(ResultsStep, { processing: processing, result: result }))] })) })] }));
}
