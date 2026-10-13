import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
export function DataTable({ data, columns, getRowId, rowHeight = 48, className, onRowClick, onSelectionChange, rowSelection: controlledRowSelection, onRowSelectionChange: onControlledRowSelectionChange, emptyState = "No records found.", }) {
    const containerRef = React.useRef(null);
    const surface = useSurface();
    const headerBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const rowHoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    const [sorting, setSorting] = React.useState([]);
    const [internalRowSelection, setInternalRowSelection] = React.useState({});
    const isControlled = controlledRowSelection !== undefined;
    const rowSelection = isControlled ? controlledRowSelection : internalRowSelection;
    const table = useReactTable({
        data,
        columns,
        ...(getRowId && { getRowId }),
        state: { sorting, rowSelection },
        enableRowSelection: true,
        onRowSelectionChange: (updater) => {
            const prev = isControlled ? controlledRowSelection : internalRowSelection;
            const next = typeof updater === "function" ? updater(prev) : updater;
            if (isControlled) {
                onControlledRowSelectionChange?.(next);
            }
            else {
                setInternalRowSelection(next);
            }
            onSelectionChange?.(table.getRowModel().rows
                .filter((r) => next[r.id])
                .map((r) => r.original));
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    const { rows } = table.getRowModel();
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => rowHeight,
        overscan: 15,
    });
    const virtualItems = rowVirtualizer.getVirtualItems();
    const totalSize = rowVirtualizer.getTotalSize();
    const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
    const paddingBottom = virtualItems.length > 0 ? totalSize - virtualItems[virtualItems.length - 1].end : 0;
    const colCount = columns.length;
    return (_jsx("div", { ref: containerRef, className: cn("overflow-auto", className), children: _jsxs("table", { className: "w-full min-w-max border-collapse", children: [_jsx("thead", { className: cn("sticky top-0 z-10 border-b border-border-subtle", headerBg), children: table.getHeaderGroups().map((headerGroup) => (_jsx("tr", { children: headerGroup.headers.map((header) => {
                            const canSort = header.column.getCanSort();
                            const sorted = header.column.getIsSorted();
                            return (_jsx("th", { style: { width: header.getSize() }, className: cn("h-10 px-3 text-left align-middle whitespace-nowrap text-[11px] eyebrow", canSort && "cursor-pointer select-none hover:text-text-primary"), onClick: canSort ? header.column.getToggleSortingHandler() : undefined, children: header.isPlaceholder ? null : (_jsxs("span", { className: "inline-flex items-center gap-1", children: [flexRender(header.column.columnDef.header, header.getContext()), canSort &&
                                            (sorted === "asc" ? (_jsx(ChevronUpIcon, { className: "size-3 text-text-primary" })) : sorted === "desc" ? (_jsx(ChevronDownIcon, { className: "size-3 text-text-primary" })) : (_jsx(ChevronsUpDownIcon, { className: "size-3 opacity-30" })))] })) }, header.id));
                        }) }, headerGroup.id))) }), _jsxs("tbody", { children: [paddingTop > 0 && (_jsx("tr", { "aria-hidden": true, children: _jsx("td", { style: { height: paddingTop }, colSpan: colCount }) })), virtualItems.length === 0 && data.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: colCount, className: "h-24 text-center text-sm text-text-muted", children: emptyState }) })), virtualItems.map((virtualRow) => {
                            const row = rows[virtualRow.index];
                            return (_jsx("tr", { "data-state": row.getIsSelected() ? "selected" : undefined, className: cn("border-b border-border-subtle text-sm transition-colors", rowHoverBg.replace("bg-", "hover:bg-"), "data-[state=selected]:bg-accent/10", onRowClick && "cursor-pointer"), onClick: () => onRowClick?.(row.original), children: row.getVisibleCells().map((cell) => (_jsx("td", { style: { width: cell.column.getSize() }, className: "h-12 px-3 align-middle text-text-secondary whitespace-nowrap", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id));
                        }), paddingBottom > 0 && (_jsx("tr", { "aria-hidden": true, children: _jsx("td", { style: { height: paddingBottom }, colSpan: colCount }) }))] })] }) }));
}
