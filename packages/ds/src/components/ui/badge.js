import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
const badgeVariants = cva("inline-flex w-fit shrink-0 items-center justify-center gap-1 border font-medium whitespace-nowrap transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-3", {
    variants: {
        radius: {
            sm: "rounded-sm",
            full: "rounded-full",
        },
        size: {
            xs: "h-4 px-1 text-[10px]",
            sm: "h-5 px-1.5 text-xs",
            md: "h-6 px-2 text-sm",
            lg: "h-7 px-2.5 text-sm",
        },
        fill: {
            subtle: "",
            medium: "",
            strong: "",
            outline: "bg-transparent",
        },
        color: {
            neutral: "",
            green: "",
            teal: "",
            red: "",
            amber: "",
            emerald: "",
            blue: "",
            yellow: "",
            pink: "",
            indigo: "",
        },
    },
    compoundVariants: [
        { color: "neutral", fill: "subtle", className: "border-border-subtle bg-surface-3 text-text-secondary" },
        { color: "neutral", fill: "medium", className: "border-transparent bg-surface-4 text-text-primary" },
        { color: "neutral", fill: "strong", className: "border-transparent bg-surface-5 text-text-primary" },
        { color: "neutral", fill: "outline", className: "border-border-default text-text-secondary" },
        { color: "green", fill: "subtle", className: "border-status-available/20 bg-status-available/10 text-status-available" },
        { color: "green", fill: "medium", className: "border-transparent bg-status-available/25 text-status-available" },
        { color: "green", fill: "strong", className: "border-transparent bg-status-available text-surface-0" },
        { color: "green", fill: "outline", className: "border-status-available/40 text-status-available" },
        { color: "teal", fill: "subtle", className: "border-badge-teal/20 bg-badge-teal/10 text-badge-teal" },
        { color: "teal", fill: "medium", className: "border-transparent bg-badge-teal/25 text-badge-teal" },
        { color: "teal", fill: "strong", className: "border-transparent bg-badge-teal text-surface-0" },
        { color: "teal", fill: "outline", className: "border-badge-teal/40 text-badge-teal" },
        { color: "red", fill: "subtle", className: "border-status-error/20 bg-status-error/10 text-status-error" },
        { color: "red", fill: "medium", className: "border-transparent bg-status-error/25 text-status-error" },
        { color: "red", fill: "strong", className: "border-transparent bg-status-error text-surface-0" },
        { color: "red", fill: "outline", className: "border-status-error/40 text-status-error" },
        { color: "amber", fill: "subtle", className: "border-status-warning/20 bg-status-warning/10 text-status-warning" },
        { color: "amber", fill: "medium", className: "border-transparent bg-status-warning/25 text-status-warning" },
        { color: "amber", fill: "strong", className: "border-transparent bg-status-warning text-surface-0" },
        { color: "amber", fill: "outline", className: "border-status-warning/40 text-status-warning" },
        { color: "emerald", fill: "subtle", className: "border-badge-emerald/20 bg-badge-emerald/10 text-badge-emerald" },
        { color: "emerald", fill: "medium", className: "border-transparent bg-badge-emerald/25 text-badge-emerald" },
        { color: "emerald", fill: "strong", className: "border-transparent bg-badge-emerald text-surface-0" },
        { color: "emerald", fill: "outline", className: "border-badge-emerald/40 text-badge-emerald" },
        { color: "blue", fill: "subtle", className: "border-badge-blue/20 bg-badge-blue/10 text-badge-blue" },
        { color: "blue", fill: "medium", className: "border-transparent bg-badge-blue/25 text-badge-blue" },
        { color: "blue", fill: "strong", className: "border-transparent bg-badge-blue text-surface-0" },
        { color: "blue", fill: "outline", className: "border-badge-blue/40 text-badge-blue" },
        { color: "yellow", fill: "subtle", className: "border-badge-yellow/20 bg-badge-yellow/10 text-badge-yellow" },
        { color: "yellow", fill: "medium", className: "border-transparent bg-badge-yellow/25 text-badge-yellow" },
        { color: "yellow", fill: "strong", className: "border-transparent bg-badge-yellow text-surface-0" },
        { color: "yellow", fill: "outline", className: "border-badge-yellow/40 text-badge-yellow" },
        { color: "pink", fill: "subtle", className: "border-badge-pink/20 bg-badge-pink/10 text-badge-pink" },
        { color: "pink", fill: "medium", className: "border-transparent bg-badge-pink/25 text-badge-pink" },
        { color: "pink", fill: "strong", className: "border-transparent bg-badge-pink text-surface-0" },
        { color: "pink", fill: "outline", className: "border-badge-pink/40 text-badge-pink" },
        { color: "indigo", fill: "subtle", className: "border-status-restricted/20 bg-status-restricted/10 text-status-restricted" },
        { color: "indigo", fill: "medium", className: "border-transparent bg-status-restricted/25 text-status-restricted" },
        { color: "indigo", fill: "strong", className: "border-transparent bg-status-restricted text-surface-0" },
        { color: "indigo", fill: "outline", className: "border-status-restricted/40 text-status-restricted" },
    ],
    defaultVariants: {
        radius: "sm",
        size: "md",
        fill: "subtle",
        color: "neutral",
    },
});
function Badge({ className, color = "neutral", fill = "subtle", radius = "sm", size = "md", asChild = false, ...props }) {
    const Comp = asChild ? Slot.Root : "span";
    return (_jsx(Comp, { "data-slot": "badge", className: cn(badgeVariants({ color, fill, radius, size }), className), ...props }));
}
export { Badge, badgeVariants };
