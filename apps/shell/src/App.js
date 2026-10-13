import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router";
import { PolishedInventoryPage } from "./pages/inventory/polished";
export function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/inventory/polished", replace: true }) }), _jsx(Route, { path: "/inventory/polished", element: _jsx(PolishedInventoryPage, {}) })] }));
}
