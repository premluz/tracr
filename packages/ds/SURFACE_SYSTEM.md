# Surface System — Component Build Rules

Every component in `src/components/custom/` **must** be surface-aware.
This document is the single source of truth for how surfacing works.

---

## Core concept

Elevation is expressed through background color steps, **never shadows**.
There are 6 surface levels (0–5), darkest to lightest:

| Level | Token | Tailwind class | Usage |
|-------|-------|----------------|-------|
| 0 | `--ds-semantic-surface-0` | `bg-surface-0` | Page background |
| 1 | `--ds-semantic-surface-1` | `bg-surface-1` | Sidebar / nav |
| 2 | `--ds-semantic-surface-2` | `bg-surface-2` | Cards / panels |
| 3 | `--ds-semantic-surface-3` | `bg-surface-3` | Table rows / list items |
| 4 | `--ds-semantic-surface-4` | `bg-surface-4` | Hover state |
| 5 | `--ds-semantic-surface-5` | `bg-surface-5` | Popover / tooltip |

A child component should always sit **one level above** its parent.

---

## API — `src/components/custom/surface-context.tsx`

### Provider & stepper

```tsx
// Wrap a layout root to set the starting level
<SurfaceProvider level={0}>
  {/* everything inside knows it's on surface 0 */}
  <SurfaceStep>
    {/* auto-increments to surface 1 */}
    <SurfaceStep>
      {/* auto-increments to surface 2 */}
    </SurfaceStep>
  </SurfaceStep>
</SurfaceProvider>
```

- `SurfaceProvider` — sets an explicit level.
- `SurfaceStep` — reads parent level, increments by 1 (clamped at 5).
  Accepts optional `level` prop to override.

### Hooks

| Hook | Returns | Use when |
|------|---------|----------|
| `useSurface()` | `{ level: SurfaceLevel }` | You need the current level |
| `useNextSurfaceLevel()` | `SurfaceLevel` | You need the next level for a child surface |

### Helpers

| Function | Signature | Returns |
|----------|-----------|---------|
| `getSurfaceClass(level)` | `(SurfaceLevel) → string` | `"bg-surface-{n}"` |
| `getNextSurfaceLevel(level)` | `(SurfaceLevel) → SurfaceLevel` | Clamped `level + 1` |
| `clampSurfaceLevel(n)` | `(number) → SurfaceLevel` | Clamps to 0–5 |

---

## Rules for building components

### 1. Never hardcode surface colors

```tsx
// BAD
className="bg-[#151515]"
className="bg-surface-2"   // hardcoded to a specific level

// GOOD — reads from context
const surface = useSurface()
const bg = getSurfaceClass(surface.level)
```

### 2. Child containers must step up

If your component renders a container that nests other components,
wrap children in `<SurfaceStep>` so they auto-increment:

```tsx
export function Card({ children }: { children: React.ReactNode }) {
  const nextLevel = useNextSurfaceLevel()

  return (
    <SurfaceStep level={nextLevel}>
      <div className={getSurfaceClass(nextLevel)}>
        {children}
      </div>
    </SurfaceStep>
  )
}
```

### 3. Hover states use surface-4

For interactive rows/items, use `hover:bg-surface-4` rather than
calculating a relative step. This is a fixed convention.

### 4. Layout shells set the root level

`PageShell` wraps everything in `<SurfaceProvider level={0}>`.
Sidebar is `<SurfaceStep level={1}>`, main content is `<SurfaceStep level={2}>`.
Components inside main content should use context, not assume level 2.

### 5. No shadows

Elevation is **only** expressed through surface color steps.
Never add `shadow-*` classes for depth. Use `border-border-subtle` instead.

---

## Token-only rule

Components consume tokens exclusively — never raw hex values.

```tsx
// BAD
className="text-[#a1a1aa]"
className="border-[#2a2a2a]"

// GOOD
className="text-text-secondary"
className="border-border-default"
```

Available Tailwind token classes:

- **Backgrounds:** `bg-surface-0` through `bg-surface-5`
- **Text:** `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-disabled`
- **Borders:** `border-border-keyline`, `border-border-subtle`, `border-border-default`, `border-border-strong`
  - `border-keyline` — structural separators only (nav/content, header/content, table row/header lines, footer). Subtler than `border-subtle`.
  - `border-subtle` — component outlines (inputs, checkboxes, cards/panes).
- **Status:** `text-status-available`, `text-status-warning`, `text-status-error`, `text-status-restricted`
- **Status bg (with opacity):** `bg-status-available/10`, `bg-status-warning/10`, etc.

---

## Checklist for every new component

- [ ] Imports from `surface-context.tsx` (not hardcoded bg classes)
- [ ] Uses `useSurface()` or `useNextSurfaceLevel()` for its own background
- [ ] Wraps children in `<SurfaceStep>` if it's a container
- [ ] Hover states use `hover:bg-surface-4`
- [ ] Zero hardcoded hex values — tokens only
- [ ] Zero `shadow-*` classes
- [ ] Has a Storybook story in `src/stories/`
- [ ] Exported through `src/index.ts`
- [ ] TypeScript props interface exported as a named type
