import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const colorTokens = {
    green: {
        text: "text-status-available",
        dot: "bg-status-available",
        border: "border-status-available/40",
        bg: "bg-status-available/10",
        bgBorder: "border-status-available/20",
    },
    success: {
        text: "text-status-success",
        dot: "bg-status-success",
        border: "border-status-success/40",
        bg: "bg-status-success/10",
        bgBorder: "border-status-success/20",
    },
    red: {
        text: "text-status-error",
        dot: "bg-status-error",
        border: "border-status-error/40",
        bg: "bg-status-error/10",
        bgBorder: "border-status-error/20",
    },
    amber: {
        text: "text-status-warning",
        dot: "bg-status-warning",
        border: "border-status-warning/40",
        bg: "bg-status-warning/10",
        bgBorder: "border-status-warning/20",
    },
    indigo: {
        text: "text-status-restricted",
        dot: "bg-status-restricted",
        border: "border-status-restricted/40",
        bg: "bg-status-restricted/10",
        bgBorder: "border-status-restricted/20",
    },
    teal: {
        text: "text-badge-teal",
        dot: "bg-badge-teal",
        border: "border-badge-teal/40",
        bg: "bg-badge-teal/10",
        bgBorder: "border-badge-teal/20",
    },
    emerald: {
        text: "text-badge-emerald",
        dot: "bg-badge-emerald",
        border: "border-badge-emerald/40",
        bg: "bg-badge-emerald/10",
        bgBorder: "border-badge-emerald/20",
    },
    blue: {
        text: "text-badge-blue",
        dot: "bg-badge-blue",
        border: "border-badge-blue/40",
        bg: "bg-badge-blue/10",
        bgBorder: "border-badge-blue/20",
    },
    yellow: {
        text: "text-badge-yellow",
        dot: "bg-badge-yellow",
        border: "border-badge-yellow/40",
        bg: "bg-badge-yellow/10",
        bgBorder: "border-badge-yellow/20",
    },
    pink: {
        text: "text-badge-pink",
        dot: "bg-badge-pink",
        border: "border-badge-pink/40",
        bg: "bg-badge-pink/10",
        bgBorder: "border-badge-pink/20",
    },
    neutral: {
        text: "text-text-muted",
        dot: "bg-text-muted",
        border: "border-border-default",
        bg: "bg-surface-3",
        bgBorder: "border-border-subtle",
    },
};
const SIZE_CONFIG = {
    sm: { text: "text-xs", height: "h-5", padding: "px-1.5", dot: "size-1", icon: "[&_svg]:size-3" },
    md: { text: "text-sm", height: "h-6", padding: "px-2", dot: "size-1.5", icon: "[&_svg]:size-3.5" },
    lg: { text: "text-base", height: "h-7", padding: "px-2.5", dot: "size-2", icon: "[&_svg]:size-4" },
};
export function Status({ color, size = "md", fill = "ghost", textStyle = "color", icon, dot, iconOnly = false, className, children, ...props }) {
    const tokens = colorTokens[color] ?? colorTokens.green;
    if (process.env.NODE_ENV !== "production" && !colorTokens[color]) {
        console.warn(`Status: unknown color "${color}"; falling back to "green".`);
    }
    const sz = SIZE_CONFIG[size];
    const containerClass = cn("inline-flex shrink-0 items-center gap-1.5 font-medium", sz.text, fill === "ghost" && "px-0.5", fill === "outline" && cn("rounded border border-border-default", sz.height, sz.padding), fill === "outline-color" && cn("rounded border", sz.height, sz.padding, tokens.border), fill === "fill" && cn("rounded border", sz.height, sz.padding, tokens.bg, tokens.bgBorder), className);
    const labelClass = textStyle === "color" ? tokens.text : "text-text-secondary";
    return (_jsxs("span", { className: containerClass, ...props, children: [dot ? (_jsx("span", { className: cn("shrink-0 rounded-full", sz.dot, tokens.dot) })) : null, icon ? (_jsx("span", { className: cn("flex shrink-0 items-center", sz.icon, tokens.text), children: icon })) : null, !iconOnly && children ? (_jsx("span", { className: labelClass, children: children })) : null] }));
}
