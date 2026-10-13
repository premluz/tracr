# Project Handover — Tracr

## Last worked on
29 July 2026

## Project Overview

Tracr is a React + TypeScript design system and inventory-management UI. It is structured as a **pnpm monorepo** with one package and one consuming app.

- **Design system package:** `packages/ds` — React components, tokens, and Storybook.
- **Application:** `apps/shell` — inventory dashboard that consumes `packages/ds`.

---

## Monorepo Structure

```
/Users/przemek/Tracr
├── apps/shell/              # Inventory dashboard app
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── pages/inventory/polished.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── packages/ds/             # Design system
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Primitive components (shadcn style)
│   │   │   └── custom/      # Domain/composite components
│   │   ├── lib/utils.ts     # cn() helper
│   │   ├── index.ts         # Public exports
│   │   └── main.tsx
│   ├── src/stories/         # Storybook stories
│   ├── src/styles/          # Tailwind tokens + token files
│   ├── tokens/base.json     # Source of truth for design tokens
│   ├── components.json      # shadcn registry file
│   └── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── HANDOVER.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | CSS keyframes / inline `<style>` |
| State | React `useState` |
| Routing | `react-router` v7 |
| Icons | `lucide-react` |
| Component variants | `class-variance-authority` (CVA) |
| Merging | `tailwind-merge` + `clsx` via `cn()` |
| Package manager | pnpm workspaces |

---

## Key Architectural Patterns

### 1. Dynamic surfacing (`surface-context.tsx`)

Every component can ask for the current surface level and escalate to the next one.

```tsx
const surface = useSurface()
const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))
```

Surface levels: `0` → `bg-surface-0` (base), up to `5`.

Guides: `packages/ds/SURFACE_SYSTEM.md`, `packages/ds/SURFACE_SYSTEM_GUIDE.md`.

### 2. Token system

Source of truth: `packages/ds/tokens/base.json`.
Generated outputs:
- `packages/ds/src/styles/tokens.css`
- `packages/ds/src/styles/tokens.ts`

Tailwind bridge: `packages/ds/src/styles/tailwind-tokens.css` defines `--color-*`, `--font-*`, etc. inside `@theme`.

**Do not hand-edit generated token files unless you are also updating `base.json`.**

### 3. Component layers

- `ui/` — primitives: Button, Input, Checkbox, Table, Dialog, Badge, etc.
- `custom/` — composite/domain components: InventoryTable, TransferDrawer, DataTable, SidebarNav, etc.

---

## Completed Work

### TransferDrawer stepper animations
**File:** `packages/ds/src/components/custom/transfer-drawer.tsx`

- `AnimatedStep` wrapper: slide left/right + fade on step change.
- Forward (1→2, 2→3): current content slides left 30px + fades out (200ms), new content slides in from right + fades in (250ms).
- Backward (2→1): direction reverses.
- `ResultsStep`: same animation between `ProcessingStep` and `SuccessStep`.

### DiamondPreviewDrawer search input
**File:** `packages/ds/src/components/custom/diamond-preview-drawer.tsx`

- Removed hardcoded border so it matches the main inventory search input (filled surface, no border).

### Font migration
**Files:**
- `apps/shell/src/main.tsx` — changed import from `@fontsource-variable/geist` to `@fontsource/source-sans-pro`.
- `packages/ds/src/index.css` — `body` font-family set to `"Source Sans Pro", sans-serif`.
- `apps/shell/src/index.css` — same.

**Blocker:** `@fontsource/source-sans-pro` is not installed. See "Known Issues".

### Table selected row background
**File:** `packages/ds/src/components/custom/data-table.tsx`

- Selected rows now use `data-[state=selected]:bg-accent/10` to match `TableSelectionBar`.

### Status restricted color
**Files:** `packages/ds/tokens/base.json`, `packages/ds/src/styles/tokens.css`, `packages/ds/src/styles/tokens.ts`

- Changed `SemanticStatusRestricted` from `#818cf8` to `#999999`.

### New table primitives
**File:** `packages/ds/src/components/ui/table.tsx`

- Created `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`.

### SidebarNav logo padding
**File:** `packages/ds/src/components/custom/sidebar-nav.tsx`

- Adjusted logo container padding.

---

## In Progress / Pending

### Preloader animation

Requested but not implemented. Spec:
- Letter-by-letter drop animation for "Hello, I'm Prem".
- Add "s" then "design" so final text reads "prems design".
- Remove "Welcome to prems design" phrase.
- Keep a falling dot that lands between "prems" and "design".

**No file exists yet.** Need decision on location (`index.html` inline, splash route, or new component).

### AI-constrained component registry (V0-style)

Goal: V0-style generation constrained to real components.

Quick wins:
1. Add Storybook prop tables via `react-docgen-typescript`.
2. Expand `packages/ds/components.json` registry with component schemas and examples.
3. Regenerate tokens from `tokens/base.json` to eliminate manual drift.
4. Split business logic from UI in `transfer-drawer.tsx` and `data-table.tsx`.

Estimated effort: 2-3 days for first pass.

---

## Known Issues

1. **Missing font package**
   `apps/shell/src/main.tsx` imports `@fontsource/source-sans-pro`, which is not in `apps/shell/package.json`. The build will fail until you either:
   - Install: `cd apps/shell && pnpm add @fontsource/source-sans-pro`
   - Or switch to Google Fonts CDN in `apps/shell/index.html`.

2. **Tailwind v4 lint warnings**
   Some editors flag `@theme`, `@source`, and `@custom-variant` as unknown at-rules. These are valid Tailwind v4 directives; build is unaffected.

3. **Token drift risk**
   `tokens.css` and `tokens.ts` were hand-edited in this session. Regenerate from `tokens/base.json` to keep them consistent.

---

## Common Commands

```bash
# Install dependencies at repo root
pnpm install

# Run the shell app
cd apps/shell
pnpm exec vite --port 5174 --force

# Run Storybook
cd packages/ds
pnpm storybook

# Install missing font
cd apps/shell && pnpm add @fontsource/source-sans-pro

# Regenerate tokens (if a script exists)
cd packages/ds && pnpm tokens:build
```

---

## Design System Health Snapshot

| Area | Score | Notes |
|---|---|---|
| Tokenization | 7/10 | Strong JSON/CSS/TS token pipeline, but manual edits risk drift. |
| Composability | 5/10 | Primitives are good; custom components mix business logic + UI. |
| AI discoverability | 2/10 | No formal prop registry beyond Storybook stories. |
| Production readiness | 6/10 | Components work; blocked by missing font package. |
| Accessibility | 6/10 | Radix primitives used where applicable; not systematically audited. |

---

## Next Recommended Work

1. **Fix build blocker** — install or CDN the font.
2. **Regenerate tokens** from `base.json`.
3. **Build preloader** animation component.
4. **Create `packages/ds/components.json` schema** with prop tables for AI generation.
5. **Refactor large custom components** (`transfer-drawer.tsx`, `data-table.tsx`) into smaller, composable pieces.

---

## Key Files Reference

| Purpose | Path |
|---|---|
| App entry | `apps/shell/src/main.tsx` |
| Routes | `apps/shell/src/App.tsx` |
| Main page | `apps/shell/src/pages/inventory/polished.tsx` |
| Component exports | `packages/ds/src/index.ts` |
| Surface system | `packages/ds/src/components/custom/surface-context.tsx` |
| Tokens source | `packages/ds/tokens/base.json` |
| Tailwind bridge | `packages/ds/src/styles/tailwind-tokens.css` |
| Component registry | `packages/ds/components.json` |
| Storybook stories | `packages/ds/src/stories/*.stories.tsx` |
