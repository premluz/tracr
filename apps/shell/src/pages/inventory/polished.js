import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useLocation, useSearchParams } from "react-router";
import { AwardIcon, PowerIcon } from "lucide-react";
import { PageShell } from "@/components/custom/page-shell";
import { SidebarNav } from "@/components/custom/sidebar-nav";
import { PageHeader } from "@/components/custom/page-header";
import { DrawerProvider } from "@/components/custom/drawer";
import { InventoryTable, generateDiamonds } from "@/components/custom/inventory-table";
import { TransferDrawer } from "@/components/custom/transfer-drawer";
import { DiamondPreviewDrawer } from "@/components/custom/diamond-preview-drawer";
import { Logo } from "@/components/custom/logo";
import { Logomark } from "@/components/custom/logomark";
import { TabsNav } from "@/components/custom/tabs";
import { Button } from "@/components/ui/button";
import { RoughIcon } from "@/components/custom/icons/rough-icon";
import { SplitIcon } from "@/components/custom/icons/split-icon";
import { PolishedIcon } from "@/components/custom/icons/polished-icon";
import { MonitoringIcon } from "@/components/custom/icons/monitoring-icon";
import { DataIntegrationToolIcon } from "@/components/custom/icons/data-integration-tool-icon";
import { DiamondsInIcon } from "@/components/custom/icons/diamonds-in-icon";
import { DiamondsOutIcon } from "@/components/custom/icons/diamonds-out-icon";
import { ContactIcon } from "@/components/custom/icons/contact-icon";
import { HelpIcon } from "@/components/custom/icons/help-icon";
// ─── Static data ──────────────────────────────────────────────────────────────
const ALL_DIAMONDS = generateDiamonds(5000);
const SCENARIO_1_IDS = ALL_DIAMONDS.slice(0, 10).map((d) => d.id);
// ─── Nav ─────────────────────────────────────────────────────────────────────
function InventoryCount({ n }) {
    return (_jsx("span", { className: "rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-text-muted", children: n.toLocaleString() }));
}
const navGroups = [
    {
        label: "Inventory",
        items: [
            { id: "rough", icon: _jsx(RoughIcon, { className: "size-4" }), label: "Rough" },
            { id: "split", icon: _jsx(SplitIcon, { className: "size-4" }), label: "Split" },
            { id: "polished", icon: _jsx(PolishedIcon, { className: "size-4" }), label: "Polished" },
            { id: "graded", icon: _jsx(AwardIcon, { className: "size-4" }), label: "Graded" },
        ],
    },
    {
        label: "Integration",
        items: [
            { id: "monitoring", icon: _jsx(MonitoringIcon, { className: "size-4" }), label: "Monitoring" },
            { id: "integration-tool", icon: _jsx(DataIntegrationToolIcon, { className: "size-4" }), label: "Integration tool" },
        ],
    },
    {
        label: "Shipments",
        items: [
            { id: "inbound", icon: _jsx(DiamondsInIcon, { className: "size-4" }), label: "Inbound" },
            { id: "outbound", icon: _jsx(DiamondsOutIcon, { className: "size-4" }), label: "Outbound" },
        ],
    },
];
const bottomItems = [
    { id: "feedback", icon: _jsx(ContactIcon, { className: "size-4" }), label: "Feedback" },
    { id: "help", icon: _jsx(HelpIcon, { className: "size-4" }), label: "Help" },
    { id: "logout", icon: _jsx(PowerIcon, { className: "size-4" }), label: "Logout" },
];
// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
];
function TabBar({ active, onChange }) {
    return (_jsx(TabsNav, { items: TABS.map((t) => ({ id: t.id, label: t.label })), value: active, onValueChange: onChange, type: "button", size: "lg", className: "px-6 py-4" }));
}
export function PolishedInventoryPage() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const scenario = Number(searchParams.get("scenario") ?? "0");
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(50);
    const [tab, setTab] = React.useState("active");
    const [collapsed, setCollapsed] = React.useState(false);
    const initialRows = React.useMemo(() => scenario === 1 ? ALL_DIAMONDS.filter((d) => SCENARIO_1_IDS.includes(d.id)) : [], [scenario]);
    const [selectedDiamonds, setSelectedDiamonds] = React.useState(initialRows);
    const [transferOpen, setTransferOpen] = React.useState(false);
    const [previewGroup, setPreviewGroup] = React.useState(null);
    const filtered = React.useMemo(() => {
        if (!search)
            return ALL_DIAMONDS;
        const q = search.toLowerCase();
        return ALL_DIAMONDS.filter((d) => d.id.toLowerCase().includes(q) ||
            d.clarity.toLowerCase().includes(q) ||
            d.shape.toLowerCase().includes(q));
    }, [search]);
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const previewDiamonds = React.useMemo(() => {
        if (!previewGroup)
            return [];
        const eligible = selectedDiamonds.filter((d) => d.status === "available");
        const locked = selectedDiamonds.filter((d) => d.status === "locked");
        const transferring = selectedDiamonds.filter((d) => d.status === "transferring");
        const missingData = selectedDiamonds.filter((d) => d.status !== "available" && d.status !== "locked" && d.status !== "transferring");
        if (previewGroup === "eligible")
            return eligible;
        if (previewGroup === "locked")
            return locked;
        if (previewGroup === "transferring")
            return transferring;
        return missingData;
    }, [previewGroup, selectedDiamonds]);
    const previewTitle = {
        eligible: "Eligible for transfer",
        locked: "Eligible after resolving issues",
        transferring: "Not eligible – transferring",
        missingData: "Not eligible – missing data",
    };
    const activeSegments = React.useMemo(() => location.pathname.split("/").filter(Boolean), [location.pathname]);
    const groupsWithCount = React.useMemo(() => navGroups.map((group) => {
        const items = group.items.map((item) => {
            const withBadge = group.label === "Inventory" && item.id === "polished"
                ? { ...item, badge: _jsx(InventoryCount, { n: ALL_DIAMONDS.length }) }
                : item;
            return {
                ...withBadge,
                active: activeSegments.includes(withBadge.id),
            };
        });
        return { ...group, items };
    }), [activeSegments]);
    return (_jsxs(DrawerProvider, { children: [_jsx(PageShell, { sidebar: _jsx(SidebarNav, { logo: collapsed ? _jsx(Logomark, { className: "text-status-available" }) : _jsx(Logo, { className: "text-text-primary" }), groups: groupsWithCount, bottomItems: bottomItems, collapsed: collapsed, onCollapsedChange: setCollapsed }), children: _jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [_jsx(PageHeader, { title: "Polished inventory", indicator: true, environment: "uat", properties: [{ label: "Total Diamonds", value: filtered.length.toLocaleString() }], actions: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", size: "md", children: "Export" }), _jsx(Button, { size: "md", children: "Add stone" })] }) }), _jsx(TabBar, { active: tab, onChange: setTab }), _jsx(InventoryTable, { data: paginated, totalCount: filtered.length, search: search, onSearchChange: (v) => { setSearch(v); setPage(1); }, searchPlaceholder: "Search by ID, clarity, shape\u2026", onExport: () => { }, onColumns: () => { }, onFilter: () => { }, page: page, onPageChange: setPage, pageSize: pageSize, onPageSizeChange: (s) => { setPageSize(s); setPage(1); }, onView: () => { }, onShare: () => { }, onArchive: () => { }, onUnlock: () => { }, onTransfer: () => setTransferOpen(true), onSelectionChange: setSelectedDiamonds, initialSelectedRows: scenario === 1 ? initialRows : undefined, className: "flex-1 overflow-hidden" })] }) }), _jsx(TransferDrawer, { open: transferOpen, onClose: () => setTransferOpen(false), diamonds: selectedDiamonds, onUnlockAll: () => { }, onPreviewGroup: (group) => setPreviewGroup(group) }), _jsx(DiamondPreviewDrawer, { open: previewGroup !== null && transferOpen, onClose: () => setPreviewGroup(null), title: previewGroup ? previewTitle[previewGroup] : "", diamonds: previewDiamonds })] }));
}
