import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
const envColor = {
    dev: "amber",
    uat: "indigo",
};
export function PageHeader({ title, description, onBack, indicator, environment, properties, actions, className, ...props }) {
    return (_jsxs("div", { className: cn("flex flex-col border-b border-border-subtle px-6 py-4", className), ...props, children: [_jsxs("div", { className: "flex items-center gap-3", children: [onBack ? (_jsx("button", { type: "button", onClick: onBack, className: "flex size-7 shrink-0 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-surface-4 hover:text-text-primary", "aria-label": "Go back", children: _jsx(ArrowLeftIcon, { className: "size-4" }) })) : null, _jsx("h1", { className: "shrink-0 text-base font-semibold text-text-primary", children: title }), indicator ? (_jsx("span", { className: "size-2 shrink-0 rounded-full bg-status-available" })) : null, environment ? (_jsx(Badge, { color: envColor[environment], fill: "subtle", size: "sm", radius: "sm", className: "uppercase font-semibold", children: environment })) : null, properties && properties.length > 0 ? (_jsx("div", { className: "flex items-center gap-4", children: properties.map((prop) => (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "eyebrow text-[11px]", children: prop.label }), _jsx("span", { className: "rounded-sm bg-surface-3 px-1.5 py-0.5 text-sm text-text-secondary", children: prop.value })] }, prop.label))) })) : null, actions ? (_jsx("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: actions })) : null] }), description ? (_jsx("p", { className: cn("mt-1 text-sm text-text-muted", onBack && "pl-10"), children: description })) : null] }));
}
