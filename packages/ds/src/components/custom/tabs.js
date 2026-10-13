import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
// ─── Size tokens ──────────────────────────────────────────────────────────────
const SIZE = {
    sm: { tab: "h-6  px-2   gap-1   text-xs", icon: "[&>svg]:size-3", badge: "h-3.5 min-w-3.5 px-1 text-xs" },
    md: { tab: "h-7  px-2.5 gap-1   text-sm", icon: "[&>svg]:size-3.5", badge: "h-4   min-w-4   px-1   text-xs" },
    lg: { tab: "h-8  px-3   gap-1.5 text-sm", icon: "[&>svg]:size-4", badge: "h-4   min-w-4   px-1.5 text-sm" },
    xl: { tab: "h-10 px-3.5 gap-2   text-base", icon: "[&>svg]:size-4", badge: "h-5   min-w-5   px-1.5 text-sm" },
    "2xl": { tab: "h-12 px-4   gap-2   text-base", icon: "[&>svg]:size-5", badge: "h-5   min-w-5   px-2   text-sm" },
};
// ─── Component ────────────────────────────────────────────────────────────────
export function TabsNav({ items, value: controlledValue, defaultValue, onValueChange, type = "button", size = "md", orientation = "horizontal", className, }) {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? items[0]?.id ?? "");
    const activeId = controlledValue ?? internalValue;
    function select(id) {
        setInternalValue(id);
        onValueChange?.(id);
    }
    const isLine = type === "line";
    const isVertical = orientation === "vertical";
    const s = SIZE[size];
    const surface = useSurface();
    const hoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    return (_jsx(TooltipProvider, { delayDuration: 400, children: _jsx("div", { role: "tablist", "aria-orientation": orientation, className: cn("flex", isVertical ? "flex-col gap-0.5" : "flex-row items-end gap-0.5", isLine && !isVertical && "border-b border-border-subtle", isLine && isVertical && "border-l border-border-subtle", className), children: items.map((item) => {
                const isActive = item.id === activeId;
                const tipText = item.tooltip ?? item.label;
                const tabBtn = (_jsxs("button", { role: "tab", type: "button", "aria-selected": isActive, disabled: item.disabled, onClick: () => !item.disabled && select(item.id), className: cn("inline-flex shrink-0 items-center rounded-sm font-medium", "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:pointer-events-none disabled:opacity-40", s.tab, 
                    // ── button variant ──
                    !isLine && (isActive
                        ? "bg-status-available/15 text-status-available"
                        : cn("text-text-muted hover:text-text-secondary", hoverBg.replace("bg-", "hover:bg-"))), 
                    // ── line variant (horizontal) ──
                    isLine && !isVertical && [
                        "rounded-none border-b-2 translate-y-px",
                        isActive
                            ? "border-status-available text-status-available"
                            : "border-transparent text-text-muted hover:text-text-secondary",
                    ], 
                    // ── line variant (vertical) ──
                    isLine && isVertical && [
                        "rounded-none border-l-2 -translate-x-px",
                        isActive
                            ? "border-status-available text-status-available"
                            : "border-transparent text-text-muted hover:text-text-secondary",
                    ]), children: [item.icon && (_jsx("span", { className: cn("shrink-0", s.icon), children: item.icon })), item.label && (_jsx("span", { className: "max-w-[140px] truncate", children: item.label })), item.badge != null && (_jsx("span", { className: cn("inline-flex items-center justify-center rounded-sm leading-none", s.badge, isActive
                                ? "bg-status-available/20 text-status-available"
                                : cn(getSurfaceClass(getNextSurfaceLevel(surface.level)), "text-text-muted")), children: item.badge }))] }, item.id));
                if (!tipText)
                    return tabBtn;
                return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: tabBtn }), _jsx(TooltipContent, { children: tipText })] }, item.id));
            }) }) }));
}
