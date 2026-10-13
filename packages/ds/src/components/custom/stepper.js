import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CheckIcon, AlertCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
// ─── Size tokens ──────────────────────────────────────────────────────────────
const S = {
    sm: {
        ring: "size-6",
        dot: "size-2",
        icon: "size-3",
        label: "text-sm  font-medium",
        desc: "text-xs",
        badge: "text-xs  h-3.5 min-w-3.5 px-1   rounded-sm",
        hLine: "h-0.5 flex-1 min-w-6  mx-2",
        vLine: "h-5 ml-3 w-0.5",
    },
    md: {
        ring: "size-8",
        dot: "size-3",
        icon: "size-4",
        label: "text-sm  font-medium",
        desc: "text-sm",
        badge: "text-xs h-4   min-w-4   px-1   rounded-sm",
        hLine: "h-0.5 flex-1 min-w-8  mx-3",
        vLine: "h-6 ml-4 w-0.5",
    },
    lg: {
        ring: "size-10",
        dot: "size-4",
        icon: "size-5",
        label: "text-base font-medium",
        desc: "text-sm",
        badge: "text-sm     h-5   min-w-5   px-1.5 rounded-sm",
        hLine: "h-0.5 flex-1 min-w-10 mx-3",
        vLine: "h-8 ml-5 w-0.5",
    },
};
// ─── Status indicator ─────────────────────────────────────────────────────────
function Indicator({ status, size }) {
    const s = S[size];
    if (status === "complete") {
        return (_jsx("div", { className: cn("shrink-0 rounded-full bg-status-available flex items-center justify-center", s.ring), children: _jsx(CheckIcon, { className: cn("text-surface-1", s.icon), strokeWidth: 2.5 }) }));
    }
    // current - use dynamic surface
    const { level: currentLevel } = useSurface();
    const currentBg = getSurfaceClass(getNextSurfaceLevel(currentLevel));
    if (status === "current") {
        return (_jsx("div", { className: cn("shrink-0 rounded-full border-2 border-status-available flex items-center justify-center", currentBg, s.ring), children: _jsx("div", { className: cn("rounded-full bg-status-available", s.dot) }) }));
    }
    if (status === "error") {
        return (_jsx("div", { className: cn("shrink-0 rounded-full bg-status-error flex items-center justify-center", s.ring), children: _jsx(AlertCircleIcon, { className: cn("text-white", s.icon) }) }));
    }
    // pending - use dynamic surface (will inherit from parent + 1)
    const { level } = useSurface();
    const pendingBg = getSurfaceClass(getNextSurfaceLevel(level));
    return _jsx("div", { className: cn("shrink-0 rounded-full", pendingBg, s.ring) });
}
// ─── Per-status colour helpers ────────────────────────────────────────────────
function labelColor(status) {
    if (status === "current")
        return "text-status-available";
    if (status === "complete")
        return "text-text-primary";
    return "text-text-muted";
}
function descColor(status) {
    return status === "current" ? "text-status-available" : "text-text-muted";
}
function lineColor(prevStatus) {
    return prevStatus === "complete" ? "bg-status-available" : "bg-surface-4";
}
// ─── Single step content ──────────────────────────────────────────────────────
function StepContent({ step, size, }) {
    const s = S[size];
    const surface = useSurface();
    const badgeBg = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)));
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Indicator, { status: step.status, size: size }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: cn("leading-none", s.label, labelColor(step.status)), children: step.label }), step.count != null && (_jsx("span", { className: cn("inline-flex items-center justify-center leading-none text-text-muted", badgeBg, s.badge), children: step.count }))] }), step.description && (_jsx("span", { className: cn("leading-tight", s.desc, descColor(step.status)), children: step.description }))] })] }));
}
// ─── Stepper ──────────────────────────────────────────────────────────────────
export function Stepper({ steps, orientation = "horizontal", size = "md", onStepClick, className, }) {
    const s = S[size];
    const isH = orientation === "horizontal";
    const surface = useSurface();
    const stepHoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level)).replace("bg-", "hover:bg-");
    function wrap(step, inner) {
        if (!onStepClick)
            return _jsx("div", { children: inner }, step.id);
        return (_jsx("button", { type: "button", onClick: () => onStepClick(step.id), className: cn("cursor-pointer rounded-sm px-1.5 py-1 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", stepHoverBg), children: inner }, step.id));
    }
    if (isH) {
        return (_jsx("div", { className: cn("flex items-center", className), children: steps.map((step, i) => (_jsxs(React.Fragment, { children: [wrap(step, _jsx(StepContent, { step: step, size: size })), i < steps.length - 1 && (_jsx("div", { className: cn("rounded-full", s.hLine, lineColor(step.status)) }))] }, step.id))) }));
    }
    // Vertical
    return (_jsx("div", { className: cn("flex flex-col", className), children: steps.map((step, i) => (_jsxs(React.Fragment, { children: [wrap(step, _jsx(StepContent, { step: step, size: size })), i < steps.length - 1 && (_jsx("div", { className: cn("rounded-full my-0.5", s.vLine, lineColor(step.status)) }))] }, step.id))) }));
}
