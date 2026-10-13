import * as React from "react"

export type SurfaceLevel = 0 | 1 | 2 | 3 | 4 | 5

export interface SurfaceContextValue {
  level: SurfaceLevel
}

export interface SurfaceProviderProps {
  children: React.ReactNode
  level?: SurfaceLevel
}

const SurfaceContext = React.createContext<SurfaceContextValue>({ level: 0 })

export function clampSurfaceLevel(level: number): SurfaceLevel {
  return Math.min(5, Math.max(0, level)) as SurfaceLevel
}

export function getNextSurfaceLevel(level: SurfaceLevel): SurfaceLevel {
  return clampSurfaceLevel(level + 1)
}

export function getSurfaceClass(level: SurfaceLevel) {
  return `bg-surface-${level}` as const
}

export function SurfaceProvider({
  children,
  level = 0,
}: SurfaceProviderProps) {
  const value = React.useMemo(
    () => ({ level: clampSurfaceLevel(level) }),
    [level]
  )

  return (
    <SurfaceContext.Provider value={value}>{children}</SurfaceContext.Provider>
  )
}

export function SurfaceStep({
  children,
  level,
}: SurfaceProviderProps) {
  const surface = useSurface()
  const nextLevel = level ?? getNextSurfaceLevel(surface.level)

  return <SurfaceProvider level={nextLevel}>{children}</SurfaceProvider>
}

export function useSurface() {
  return React.useContext(SurfaceContext)
}

export function useNextSurfaceLevel() {
  const surface = useSurface()

  return getNextSurfaceLevel(surface.level)
}
