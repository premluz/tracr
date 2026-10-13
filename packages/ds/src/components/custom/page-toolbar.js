import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DownloadIcon, FilterIcon, SearchIcon, SlidersHorizontalIcon, } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel, clampSurfaceLevel } from "@/components/custom/surface-context";
export function PageToolbar({ itemCount, itemLabel = "items", searchValue, onSearchChange, searchPlaceholder = "Search", onExportClick, onColumnsClick, onFilterClick, filterCount, actions, className, ...props }) {
    const surface = useSurface();
    const inputBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    return (_jsxs("div", { className: cn("flex items-center gap-2 px-6 py-3", className), ...props, children: [itemCount != null ? (_jsxs("span", { className: "shrink-0 text-sm text-text-secondary", children: [_jsx("span", { className: "font-medium text-text-primary", children: itemCount.toLocaleString() }), " ", itemLabel] })) : null, _jsxs("div", { className: "flex flex-1 items-center justify-end gap-2", children: [_jsxs("div", { className: cn("flex w-56 items-center gap-2 rounded-sm px-3 transition-colors", inputBg, getSurfaceClass(clampSurfaceLevel(getNextSurfaceLevel(surface.level) + 1)).replace("bg-", "hover:bg-")), children: [_jsx(SearchIcon, { className: "size-4 shrink-0 text-text-muted" }), _jsx("input", { type: "text", value: searchValue, onChange: (e) => onSearchChange?.(e.target.value), placeholder: searchPlaceholder, className: "h-8 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" })] }), onExportClick ? (_jsxs(ToolbarButton, { onClick: onExportClick, children: [_jsx(DownloadIcon, { className: "size-4" }), "Export"] })) : null, onColumnsClick ? (_jsxs(ToolbarButton, { onClick: onColumnsClick, children: [_jsx(SlidersHorizontalIcon, { className: "size-4" }), "Columns"] })) : null, onFilterClick ? (_jsxs(ToolbarButton, { onClick: onFilterClick, children: [_jsx(FilterIcon, { className: "size-4" }), "Filter", filterCount != null && filterCount > 0 ? (_jsx("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-status-available/20 px-1 text-xs font-medium text-status-available", children: filterCount })) : null] })) : null, actions] })] }));
}
function ToolbarButton({ className, children, ...props }) {
    const surface = useSurface();
    const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const hoverBgClass = getSurfaceClass(clampSurfaceLevel(getNextSurfaceLevel(surface.level) + 1));
    return (_jsx("button", { type: "button", className: cn("inline-flex h-8 shrink-0 items-center gap-1.5 rounded-sm px-3 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", bgClass, hoverBgClass.replace("bg-", "hover:bg-"), className), ...props, children: children }));
}
