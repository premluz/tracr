import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Backdrop } from "@/components/custom/backdrop";
import { SurfaceProvider, useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context";
const DrawerStackContext = React.createContext({
    stack: [],
    register: () => { },
    unregister: () => { },
});
export function DrawerProvider({ children }) {
    const [stack, setStack] = React.useState([]);
    const register = React.useCallback((id, size) => {
        setStack((prev) => prev.some((d) => d.id === id) ? prev : [...prev, { id, size }]);
    }, []);
    const unregister = React.useCallback((id) => {
        setStack((prev) => prev.filter((d) => d.id !== id));
    }, []);
    return (_jsx(DrawerStackContext.Provider, { value: { stack, register, unregister }, children: children }));
}
// ─── Offset calculation ───────────────────────────────────────────────────────
/**
 * Returns the vw offset (how far left to push) for a drawer in the stack.
 *
 * Rules (from spec):
 *   - Each newer medium drawer pushes existing drawers left by 25 vw.
 *   - A large drawer pushes all previous drawers left by 50 vw (left edge of lg = 25 vw).
 */
function getOffset(id, stack) {
    const index = stack.findIndex((d) => d.id === id);
    if (index === -1)
        return 0;
    const newer = stack.slice(index + 1);
    return newer.reduce((sum, d) => sum + (d.size === "lg" ? 50 : 25), 0);
}
// ─── Sizes ────────────────────────────────────────────────────────────────────
const WIDTH = {
    sm: "w-[25vw] min-w-56",
    md: "w-[50vw] min-w-80",
    lg: "w-[75vw] min-w-96",
};
export function Drawer({ open, onClose, title, size = "md", children, footer, headerActions, closeOnBackdrop = true, }) {
    const id = React.useId();
    const { stack, register, unregister } = React.useContext(DrawerStackContext);
    // Track DOM lifecycle separately from `open` so exit animation can play
    const [alive, setAlive] = React.useState(false);
    const [entered, setEntered] = React.useState(false);
    React.useEffect(() => {
        if (open) {
            register(id, size);
            setAlive(true);
            // Double RAF ensures the browser has painted the initial (off-screen)
            // state before we apply the transition target.
            const raf1 = requestAnimationFrame(() => {
                const raf2 = requestAnimationFrame(() => setEntered(true));
                return () => cancelAnimationFrame(raf2);
            });
            return () => cancelAnimationFrame(raf1);
        }
        else {
            unregister(id);
            setEntered(false);
            const t = window.setTimeout(() => setAlive(false), 320);
            return () => window.clearTimeout(t);
        }
    }, [open, id, size, register, unregister]);
    // ESC closes the topmost drawer
    const isTop = stack.length > 0 && stack[stack.length - 1].id === id;
    React.useEffect(() => {
        if (!isTop)
            return;
        const handler = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isTop, onClose]);
    const offset = getOffset(id, stack);
    const stackIndex = stack.findIndex((d) => d.id === id);
    const zIndex = 50 + (stackIndex >= 0 ? stackIndex : 0);
    if (!alive)
        return null;
    return createPortal(_jsxs(_Fragment, { children: [_jsx(Backdrop, { visible: entered, onClick: isTop && closeOnBackdrop ? onClose : undefined, style: { zIndex: zIndex - 1 } }), _jsx(SurfaceProvider, { level: 0, children: _jsx("div", { role: "dialog", "aria-modal": true, "aria-label": title, className: cn("fixed right-0 top-0 flex h-full flex-col", "bg-surface-0 shadow-2xl border-l border-border-subtle", "transition-transform duration-300 ease-in-out", WIDTH[size]), style: {
                        zIndex,
                        transform: entered
                            ? `translateX(-${offset}vw)`
                            : "translateX(100%)",
                    }, children: _jsx(DrawerContent, { onClose: onClose, title: title, headerActions: headerActions, footer: footer, children: children }) }) })] }), document.body);
}
// ─── Drawer Content (internal) ────────────────────────────────────────────────
function DrawerContent({ onClose, title, headerActions, footer, children, }) {
    const surface = useSurface();
    const closeHoverBg = getSurfaceClass(getNextSurfaceLevel(surface.level));
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex shrink-0 items-center gap-3 border-b border-border-subtle px-4 py-3", children: [_jsx("button", { type: "button", "aria-label": "Close drawer", onClick: onClose, className: cn("flex size-8 shrink-0 items-center justify-center rounded text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", closeHoverBg.replace("bg-", "hover:bg-")), children: _jsx(XIcon, { className: "size-4.5" }) }), _jsx("h2", { className: "flex-1 text-base font-semibold text-text-primary", children: title }), headerActions && (_jsx("div", { className: "flex shrink-0 items-center gap-2", children: headerActions }))] }), _jsx("div", { className: "flex-1 overflow-y-auto px-4 py-4", children: children }), footer && (_jsx("div", { className: "shrink-0 border-t border-border-subtle px-4 py-3", children: footer }))] }));
}
