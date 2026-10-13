import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { SearchIcon, GemIcon, CheckIcon, LockIcon, MoreHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
import { Drawer } from "@/components/custom/drawer";
import { Status } from "@/components/custom/status";
import { Button } from "@/components/ui/button";
import { PaginationFooter } from "@/components/custom/pagination-footer";
import { DIAMOND_STATUS_CONFIG } from "@/components/custom/inventory-table";
// ─── Component ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 40;
export function DiamondPreviewDrawer({ open, onClose, title, diamonds, }) {
    const surface = useSurface();
    const inputBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const tableHeaderBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const tableRowHoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(1);
    const filtered = React.useMemo(() => {
        if (!search.trim())
            return diamonds;
        const q = search.toLowerCase();
        return diamonds.filter((d) => d.id.toLowerCase().includes(q) ||
            d.clarity.toLowerCase().includes(q) ||
            d.shape.toLowerCase().includes(q));
    }, [diamonds, search]);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    // Reset on close
    React.useEffect(() => {
        if (!open) {
            const t = window.setTimeout(() => { setSearch(""); setPage(1); }, 350);
            return () => clearTimeout(t);
        }
    }, [open]);
    return (_jsxs(Drawer, { open: open, onClose: onClose, title: title, size: "lg", headerActions: _jsx(Button, { onClick: onClose, children: "Done" }), children: [_jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [_jsxs("span", { className: "text-sm text-text-secondary", children: [_jsx("span", { className: "font-medium text-text-primary", children: filtered.length.toLocaleString() }), " diamonds"] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: cn("flex w-52 items-center gap-2 rounded-sm px-2.5", inputBg), children: [_jsx(SearchIcon, { className: "size-3.5 shrink-0 text-text-muted" }), _jsx("input", { type: "text", value: search, onChange: (e) => { setSearch(e.target.value); setPage(1); }, placeholder: "Search", className: "h-7 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" })] }) })] }), _jsx("div", { className: "overflow-auto rounded-sm border border-border-subtle", children: _jsxs("table", { className: "w-full border-collapse text-sm", children: [_jsx("thead", { children: _jsx("tr", { className: cn("border-b border-border-subtle", tableHeaderBg), children: ["Tracr ID", "Participant ID", "Shape", "Carat", "Clarity", "Colour", "Status", ""].map((h) => (_jsx("th", { className: "h-9 px-3 text-left text-xs eyebrow text-text-muted whitespace-nowrap", children: h }, h))) }) }), _jsxs("tbody", { children: [paginated.map((d) => {
                                    const cfg = DIAMOND_STATUS_CONFIG[d.status];
                                    return (_jsxs("tr", { className: cn("border-b border-border-subtle transition-colors", tableRowHoverBg.replace("bg-", "hover:bg-")), children: [_jsx("td", { className: "h-11 px-3 text-text-secondary whitespace-nowrap", children: d.id }), _jsx("td", { className: "h-11 px-3 text-text-muted whitespace-nowrap", children: "L6JX87dxdkegfy" }), _jsx("td", { className: "h-11 px-3 text-text-secondary whitespace-nowrap", children: _jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx(GemIcon, { className: "size-3 text-text-muted" }), d.shape] }) }), _jsxs("td", { className: "h-11 px-3 text-text-secondary whitespace-nowrap", children: [d.carat.toFixed(3), "ct"] }), _jsx("td", { className: "h-11 px-3 text-text-secondary", children: d.clarity }), _jsx("td", { className: "h-11 px-3 text-text-secondary", children: d.colour }), _jsx("td", { className: "h-11 px-3 whitespace-nowrap", children: _jsx(Status, { color: cfg.color, fill: cfg.fill, textStyle: "color", icon: d.status === "available"
                                                        ? _jsx(CheckIcon, {})
                                                        : d.status === "locked"
                                                            ? _jsx(LockIcon, {})
                                                            : undefined, children: cfg.label }) }), _jsx("td", { className: "h-11 px-3", children: _jsx(Button, { variant: "secondary-ghost", size: "icon-sm", children: _jsx(MoreHorizontalIcon, { className: "size-4" }) }) })] }, d.id));
                                }), paginated.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "h-20 text-center text-sm text-text-muted", children: "No diamonds found" }) }))] })] }) }), _jsx("div", { className: "mt-3", children: _jsx(PaginationFooter, { page: page, pageSize: PAGE_SIZE, totalItems: filtered.length, onPageChange: setPage, onPageSizeChange: () => { }, className: cn("border-t-0 px-0") }) })] }));
}
