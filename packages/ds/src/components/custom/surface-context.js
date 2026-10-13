import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
const SurfaceContext = React.createContext({ level: 0 });
export function clampSurfaceLevel(level) {
    return Math.min(5, Math.max(0, level));
}
export function getNextSurfaceLevel(level) {
    return clampSurfaceLevel(level + 1);
}
export function getSurfaceClass(level) {
    return `bg-surface-${level}`;
}
export function SurfaceProvider({ children, level = 0, }) {
    const value = React.useMemo(() => ({ level: clampSurfaceLevel(level) }), [level]);
    return (_jsx(SurfaceContext.Provider, { value: value, children: children }));
}
export function SurfaceStep({ children, level, }) {
    const surface = useSurface();
    const nextLevel = level ?? getNextSurfaceLevel(surface.level);
    return _jsx(SurfaceProvider, { level: nextLevel, children: children });
}
export function useSurface() {
    return React.useContext(SurfaceContext);
}
export function useNextSurfaceLevel() {
    const surface = useSurface();
    return getNextSurfaceLevel(surface.level);
}
