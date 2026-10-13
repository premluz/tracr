import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { SurfaceProvider, SurfaceStep } from "@/components/custom/surface-context";
export function PageShell({ sidebar, children, className, ...props }) {
    return (_jsx(SurfaceProvider, { level: 0, children: _jsxs("div", { className: cn("flex h-screen w-full overflow-hidden", className), ...props, children: [sidebar ? (_jsx(SurfaceStep, { level: 1, children: _jsx("aside", { className: "flex h-full shrink-0 flex-col border-r border-border-subtle", children: sidebar }) })) : null, _jsx("main", { className: "flex flex-1 flex-col overflow-y-auto bg-surface-0", children: children })] }) }));
}
