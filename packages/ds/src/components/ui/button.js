import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
const buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/60 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            // ── Primary ───────────────────────────────────────────
            default: "bg-status-available text-surface-0 hover:bg-status-available/90",
            subtle: "bg-status-available/15 text-status-available hover:bg-status-available/25",
            outline: "border-status-available/60 text-status-available hover:bg-status-available/10",
            ghost: "text-status-available hover:bg-status-available/10",
            // ── Secondary ─────────────────────────────────────────
            secondary: "text-text-primary",
            "secondary-subtle": "text-text-secondary hover:text-text-primary",
            "secondary-outline": "border-border-default text-text-secondary hover:text-text-primary",
            "secondary-ghost": "text-text-secondary hover:text-text-primary",
            // ── Destructive ───────────────────────────────────────
            destructive: "bg-status-error text-surface-0 hover:bg-status-error/90",
            "destructive-subtle": "bg-status-error/15 text-status-error hover:bg-status-error/25",
            "destructive-outline": "border-status-error/60 text-status-error hover:bg-status-error/10",
            "destructive-ghost": "text-status-error hover:bg-status-error/10",
            // ── Link ──────────────────────────────────────────────
            link: "text-status-available underline-offset-4 hover:underline",
        },
        size: {
            xs: "h-6  gap-1   px-2   text-xs  has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7  gap-1   px-2   text-sm  has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            md: "h-8  gap-1.5 px-2.5 text-sm  has-data-[icon=inline-end]:pr-2   has-data-[icon=inline-start]:pl-2   [&_svg:not([class*='size-'])]:size-4",
            lg: "h-9  gap-1.5 px-3   text-base has-data-[icon=inline-end]:pr-2   has-data-[icon=inline-start]:pl-2   [&_svg:not([class*='size-'])]:size-4",
            xl: "h-10 gap-2   px-3.5 text-base has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-4.5",
            "2xl": "h-12 gap-2   px-4   text-lg  has-data-[icon=inline-end]:pr-3   has-data-[icon=inline-start]:pl-3   [&_svg:not([class*='size-'])]:size-5",
            "icon-xs": "size-6  [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7  [&_svg:not([class*='size-'])]:size-3.5",
            "icon-md": "size-8  [&_svg:not([class*='size-'])]:size-4",
            "icon-lg": "size-9  [&_svg:not([class*='size-'])]:size-4",
            "icon-xl": "size-10 [&_svg:not([class*='size-'])]:size-4.5",
            "icon-2xl": "size-12 [&_svg:not([class*='size-'])]:size-5",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});
function Button({ className, variant = "default", size = "md", asChild = false, ...props }) {
    const Comp = asChild ? Slot.Root : "button";
    const surface = useSurface();
    // Dynamic backgrounds for secondary variants
    const isSecondary = variant?.startsWith("secondary");
    const secondaryBg = isSecondary ? getSurfaceClass(getNextSurfaceLevel(surface.level)) : "";
    const secondaryHoverBg = isSecondary ? getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level))).replace("bg-", "hover:bg-") : "";
    return (_jsx(Comp, { "data-slot": "button", "data-variant": variant, "data-size": size, className: cn(buttonVariants({ variant, size }), isSecondary && cn(secondaryBg, secondaryHoverBg), className), ...props }));
}
export { Button, buttonVariants };
