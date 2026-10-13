import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function Backdrop({ visible = true, onClick, blur, className, style }) {
    return (_jsx("div", { "aria-hidden": true, style: style, className: cn("fixed inset-0 bg-black/50 transition-opacity duration-200", blur && "backdrop-blur-sm", visible ? "opacity-100" : "pointer-events-none opacity-0", className), onClick: onClick }));
}
