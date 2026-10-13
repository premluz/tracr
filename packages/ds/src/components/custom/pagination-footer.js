import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
export function PaginationFooter({ page, pageSize, totalItems, pageSizeOptions = [25, 50, 100], onPageChange, onPageSizeChange, className, ...props }) {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);
    return (_jsxs("div", { className: cn("flex h-12 shrink-0 items-center justify-between border-t border-border-subtle px-6 text-sm text-text-muted", className), ...props, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "View" }), _jsx("select", { value: pageSize, onChange: (e) => onPageSizeChange?.(Number(e.target.value)), className: "h-8 rounded-sm bg-surface-3 px-2 text-sm text-text-secondary outline-none hover:bg-surface-4 focus:bg-surface-4 transition-colors", children: pageSizeOptions.map((size) => (_jsx("option", { value: size, children: size }, size))) })] }), _jsxs("span", { children: ["Showing", " ", _jsxs("span", { className: "text-text-secondary", children: [start, "-", end] }), " ", "of", " ", _jsx("span", { className: "text-text-secondary", children: totalItems.toLocaleString() })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(PaginationButton, { onClick: () => onPageChange?.(page - 1), disabled: page <= 1, "aria-label": "Previous page", children: _jsx(ChevronLeftIcon, { className: "size-4" }) }), _jsxs("span", { className: "flex h-8 items-center gap-1 px-2", children: [_jsx("span", { className: "text-text-secondary", children: page }), _jsx("span", { className: "text-text-muted", children: "/" }), _jsx("span", { className: "text-text-muted", children: totalPages })] }), _jsx(PaginationButton, { onClick: () => onPageChange?.(page + 1), disabled: page >= totalPages, "aria-label": "Next page", children: _jsx(ChevronRightIcon, { className: "size-4" }) })] })] }));
}
function PaginationButton({ className, disabled, ...props }) {
    const surface = useSurface();
    const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const hoverBgClass = getSurfaceClass(getNextSurfaceLevel(getNextSurfaceLevel(surface.level))).replace("bg-", "hover:bg-");
    return (_jsx("button", { type: "button", disabled: disabled, className: cn("inline-flex size-8 items-center justify-center rounded-sm text-text-secondary transition-colors hover:text-text-primary disabled:pointer-events-none disabled:opacity-40", bgClass, hoverBgClass, className), ...props }));
}
