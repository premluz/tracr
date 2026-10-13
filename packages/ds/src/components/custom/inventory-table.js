import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CheckIcon, LockIcon, TriangleAlertIcon, ArrowRightLeftIcon, CircleCheckIcon, GemIcon, MoreHorizontalIcon, } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/custom/data-table";
import { PageToolbar } from "@/components/custom/page-toolbar";
import { TableSelectionBar } from "@/components/custom/table-selection-bar";
import { PaginationFooter } from "@/components/custom/pagination-footer";
import { Status } from "@/components/custom/status";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu";
// ─── Domain types ─────────────────────────────────────────────────────────────
export const CLARITIES = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
export const COLOURS = ["D", "E", "F", "G", "H", "I", "J", "Q"];
export const SHAPES = ["Round", "Princess", "Oval", "Cushion", "Pear", "Heart", "Emerald", "Radiant"];
export const STATUSES = ["available", "locked", "missing-check", "not-inscribed", "transferring"];
// ─── Status config ────────────────────────────────────────────────────────────
export const DIAMOND_STATUS_CONFIG = {
    available: { color: "success", fill: "outline-color", icon: _jsx(CheckIcon, {}), label: "Available" },
    locked: { color: "red", fill: "fill", icon: _jsx(LockIcon, {}), label: "Locked" },
    "missing-check": { color: "amber", fill: "fill", icon: _jsx(TriangleAlertIcon, {}), label: "Missing check" },
    "not-inscribed": { color: "yellow", fill: "fill", icon: _jsx(TriangleAlertIcon, {}), label: "Not inscribed" },
    transferring: { color: "blue", fill: "fill", icon: _jsx(ArrowRightLeftIcon, {}), label: "Transferring" },
};
// ─── Cell helpers ─────────────────────────────────────────────────────────────
function fmtDate(iso) {
    const d = new Date(iso);
    return (d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }) +
        " - " +
        d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
}
function DiamondStatusCell({ status }) {
    const cfg = DIAMOND_STATUS_CONFIG[status];
    return _jsx(Status, { color: cfg.color, fill: cfg.fill, textStyle: "color", icon: cfg.icon, children: cfg.label });
}
function CheckCell({ check }) {
    return check === "available"
        ? _jsx(Status, { color: "success", fill: "outline-color", textStyle: "color", icon: _jsx(CheckIcon, {}), children: "Available" })
        : _jsx(Status, { color: "indigo", fill: "outline-color", textStyle: "color", icon: _jsx(LockIcon, {}), children: "Restricted" });
}
function buildColumns(onRowMenuClick, rowActions) {
    return [
        {
            id: "select",
            size: 44,
            enableSorting: false,
            header: ({ table }) => (_jsx("div", { className: "-mx-3 pl-6", children: _jsx(Checkbox, { checked: table.getIsAllRowsSelected()
                        ? true
                        : table.getIsSomeRowsSelected()
                            ? "indeterminate"
                            : false, onCheckedChange: (v) => table.toggleAllRowsSelected(!!v), "aria-label": "Select all", variant: "outline" }) })),
            cell: ({ row }) => (_jsx("div", { className: "-mx-3 pl-6", children: _jsx(Checkbox, { checked: row.getIsSelected(), onCheckedChange: (v) => row.toggleSelected(!!v), onClick: (e) => e.stopPropagation(), "aria-label": "Select row", variant: "outline" }) })),
        },
        {
            accessorKey: "carat",
            header: "Carat",
            size: 90,
            cell: ({ getValue }) => `${getValue().toFixed(3)}ct`,
        },
        { accessorKey: "clarity", header: "Clarity", size: 80 },
        { accessorKey: "colour", header: "Colour", size: 72 },
        {
            accessorKey: "labEligible",
            header: "Lab eligible",
            size: 100,
            enableSorting: false,
            cell: ({ getValue }) => getValue()
                ? _jsx(CircleCheckIcon, { className: "size-4 text-status-success" })
                : null,
        },
        {
            accessorKey: "lastUpdated",
            header: "Last updated",
            size: 160,
            cell: ({ getValue }) => fmtDate(getValue()),
        },
        {
            accessorKey: "polishedCheck",
            header: "Polished check",
            size: 140,
            enableSorting: false,
            cell: ({ getValue }) => _jsx(CheckCell, { check: getValue() }),
        },
        {
            accessorKey: "roughCheck",
            header: "Rough check",
            size: 120,
            enableSorting: false,
            cell: ({ getValue }) => _jsx(CheckCell, { check: getValue() }),
        },
        {
            accessorKey: "shape",
            header: "Shape",
            size: 110,
            cell: ({ getValue }) => (_jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx(GemIcon, { className: "size-3.5 text-text-muted" }), getValue()] })),
        },
        {
            accessorKey: "status",
            header: "Status",
            size: 150,
            cell: ({ getValue }) => _jsx(DiamondStatusCell, { status: getValue() }),
        },
        {
            id: "actions",
            size: 44,
            enableSorting: false,
            cell: ({ row }) => {
                const d = row.original;
                const items = [
                    rowActions?.onView && { label: "View", onClick: () => rowActions.onView(d) },
                    rowActions?.onShare && { label: "Share", onClick: () => rowActions.onShare(d) },
                    rowActions?.onTransfer && { label: "Transfer", onClick: () => rowActions.onTransfer(d) },
                    rowActions?.onUnlock && { label: "Unlock", onClick: () => rowActions.onUnlock(d) },
                    rowActions?.onArchive && { label: "Archive", onClick: () => rowActions.onArchive(d) },
                ].filter(Boolean);
                if (!items.length && !onRowMenuClick)
                    return null;
                return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "secondary-ghost", size: "icon-sm", onClick: (e) => e.stopPropagation(), children: _jsx(MoreHorizontalIcon, { className: "size-4" }) }) }), _jsx(DropdownMenuContent, { align: "end", children: items.map((item) => (_jsx(DropdownMenuItem, { onClick: (e) => { e.stopPropagation(); item.onClick(); }, children: item.label }, item.label))) })] }));
            },
        },
    ];
}
// ─── Mock data helper (exported for stories) ─────────────────────────────────
function mkStatus(i) {
    const mod = i % 10;
    if (mod === 3)
        return "locked";
    if (mod === 6)
        return "missing-check";
    if (mod === 8)
        return "not-inscribed";
    if (mod === 9)
        return "transferring";
    return "available";
}
export function generateDiamonds(count = 3353) {
    return Array.from({ length: count }, (_, i) => ({
        id: `TR-${String(i + 1).padStart(5, "0")}`,
        carat: Math.round((1.5 + ((i * 37) % 150) / 100) * 1000) / 1000,
        clarity: CLARITIES[i % CLARITIES.length],
        colour: COLOURS[i % COLOURS.length],
        labEligible: i % 4 !== 0,
        lastUpdated: new Date(2023, 10, 27 - (i % 30), 13, i % 60).toISOString(),
        polishedCheck: (i % 7 === 0 ? "available" : "restricted"),
        roughCheck: (i % 9 === 0 ? "available" : "restricted"),
        shape: SHAPES[i % SHAPES.length],
        status: mkStatus(i),
    }));
}
// ─── Component ────────────────────────────────────────────────────────────────
export function InventoryTable({ data, totalCount, search, onSearchChange, searchPlaceholder = "Search by ID, clarity, shape…", onExport, onColumns, onFilter, filterCount, onView, onShare, onArchive, onUnlock, onTransfer, page = 1, onPageChange, pageSize = 50, onPageSizeChange, onRowClick, onRowMenu, onSelectionChange, initialSelectedRows, className, }) {
    const [rowSelection, setRowSelection] = React.useState(() => initialSelectedRows ? Object.fromEntries(initialSelectedRows.map((d) => [d.id, true])) : {});
    const [selectedRows, setSelectedRows] = React.useState(() => initialSelectedRows ?? []);
    const itemCount = totalCount ?? data.length;
    const columns = React.useMemo(() => buildColumns(onRowMenu, {
        onView: onView ? (d) => onView([d]) : undefined,
        onShare: onShare ? (d) => onShare([d]) : undefined,
        onArchive: onArchive ? (d) => onArchive([d]) : undefined,
        onUnlock: onUnlock ? (d) => onUnlock([d]) : undefined,
        onTransfer: onTransfer ? (d) => onTransfer([d]) : undefined,
    }), [onRowMenu, onView, onShare, onArchive, onUnlock, onTransfer]);
    function handleSelectionChange(rows) {
        setSelectedRows(rows);
        onSelectionChange?.(rows);
    }
    function handleRowSelectionChange(state) {
        setRowSelection(state);
    }
    function handleDeselect() {
        setRowSelection({});
        setSelectedRows([]);
    }
    const hasSelection = selectedRows.length > 0;
    const selectionActions = [
        onView && { label: "View", onClick: () => onView(selectedRows) },
        onShare && { label: "Share", onClick: () => onShare(selectedRows) },
        onArchive && { label: "Archive", onClick: () => onArchive(selectedRows) },
        onUnlock && { label: "Unlock", onClick: () => onUnlock(selectedRows) },
        onTransfer && { label: "Transfer", onClick: () => onTransfer(selectedRows) },
    ].filter(Boolean);
    return (_jsxs("div", { className: cn("flex flex-col overflow-hidden", className), children: [hasSelection ? (_jsx(TableSelectionBar, { selectedCount: selectedRows.length, itemLabel: "diamonds", onDeselect: handleDeselect, actions: selectionActions, maxVisibleActions: 5, searchValue: search, onSearchChange: onSearchChange, searchPlaceholder: searchPlaceholder, onExportClick: onExport, onColumnsClick: onColumns, onFilterClick: onFilter, filterCount: filterCount })) : (_jsx(PageToolbar, { itemCount: itemCount, itemLabel: "diamonds", searchValue: search, onSearchChange: onSearchChange, searchPlaceholder: searchPlaceholder, onExportClick: onExport, onColumnsClick: onColumns, onFilterClick: onFilter, filterCount: filterCount })), _jsx("div", { className: "flex-1 overflow-hidden", children: _jsx(DataTable, { data: data, columns: columns, getRowId: (r) => r.id, rowSelection: rowSelection, onRowSelectionChange: handleRowSelectionChange, onSelectionChange: handleSelectionChange, onRowClick: onRowClick, className: "h-full" }) }), _jsx(PaginationFooter, { page: page, pageSize: pageSize, totalItems: itemCount, onPageChange: onPageChange ?? (() => { }), onPageSizeChange: onPageSizeChange ?? (() => { }) })] }));
}
