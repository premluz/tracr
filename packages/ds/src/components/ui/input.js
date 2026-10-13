import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
const inputVariants = cva([
    "w-full min-w-0 rounded-sm border transition-colors outline-none",
    "placeholder:text-text-muted",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-foreground",
], {
    variants: {
        variant: {
            filled: "border-transparent bg-transparent disabled:opacity-50",
            outline: "border-border-subtle bg-transparent",
        },
        inputSize: {
            xs: "h-6  px-2   text-xs   file:h-4 file:text-xs",
            sm: "h-7  px-2   text-sm   file:h-5 file:text-sm",
            md: "h-8  px-2.5 text-sm   file:h-5 file:text-sm",
            lg: "h-9  px-3   text-base file:h-6 file:text-base",
            xl: "h-10 px-3.5 text-base file:h-7 file:text-base",
            "2xl": "h-12 px-4   text-lg   file:h-8 file:text-lg",
        },
    },
    defaultVariants: {
        variant: "filled",
        inputSize: "md",
    },
});
function Input({ className, type, variant, inputSize, ...props }) {
    const surface = useSurface();
    const filledBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const filledHoverBg = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level)));
    return (_jsx("input", { type: type, "data-slot": "input", className: cn(inputVariants({ variant, inputSize }), variant === "filled" && cn(filledBg, filledHoverBg.replace("bg-", "hover:bg-")), className), ...props }));
}
export { Input, inputVariants };
