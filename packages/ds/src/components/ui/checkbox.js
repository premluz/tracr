import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
function Checkbox({ className, size = "md", variant = "filled", ...props }) {
    const boxSize = size === "sm" ? "size-3.5" : "size-4";
    const radius = size === "sm" ? "rounded-[2px]" : "rounded-[4px]";
    const iconSize = size === "sm" ? "size-2.5" : "size-3";
    const bgDefault = variant === "filled" ? "bg-surface-3" : "bg-transparent";
    return (_jsx(CheckboxPrimitive.Root, { "data-slot": "checkbox", "data-size": size, "data-variant": variant, className: cn("group peer relative shrink-0 border border-border-default transition-colors cursor-pointer", "before:absolute before:-inset-2 before:-z-10 before:rounded-sm before:transition-colors before:content-[''] hover:before:bg-surface-3", boxSize, radius, bgDefault, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-available focus-visible:ring-offset-1 focus-visible:ring-offset-surface-0", "disabled:cursor-not-allowed disabled:opacity-40 disabled:before:hidden", "data-[state=checked]:border-status-available data-[state=checked]:bg-status-available data-[state=checked]:text-surface-0", "data-[state=indeterminate]:border-status-available data-[state=indeterminate]:bg-status-available data-[state=indeterminate]:text-surface-0", className), ...props, children: _jsxs(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center text-current", children: [_jsx(CheckIcon, { className: cn("stroke-[2.5] group-data-[state=indeterminate]:hidden", iconSize) }), _jsx(MinusIcon, { className: cn("hidden stroke-[2.5] group-data-[state=indeterminate]:block", iconSize) })] }) }));
}
function CheckboxField({ id, label, description, size = "md", variant = "filled", checked, defaultChecked, onCheckedChange, disabled, className, }) {
    const fieldId = id ?? React.useId();
    return (_jsxs("label", { htmlFor: fieldId, className: cn("group/field flex cursor-pointer items-start gap-2.5 rounded-sm px-2 py-1.5 transition-colors", "hover:bg-surface-2", disabled && "cursor-not-allowed opacity-40 hover:bg-transparent", className), children: [_jsx(Checkbox, { id: fieldId, size: size, variant: variant, checked: checked, defaultChecked: defaultChecked, onCheckedChange: onCheckedChange, disabled: disabled, className: "mt-0.5" }), (label || description) && (_jsxs("div", { className: "flex flex-col gap-0.5", children: [label && (_jsx("span", { className: "text-sm font-medium leading-none text-text-primary", children: label })), description && (_jsx("span", { className: "text-sm leading-snug text-text-secondary", children: description }))] }))] }));
}
export { Checkbox, CheckboxField };
