# Surface System Guide

## Overview

The design system uses a dynamic surface hierarchy where components automatically escalate their background color based on the parent surface level. This creates consistent visual depth without hardcoded values.

## Core Concepts

### Surface Levels (0-5)

- **Surface 0**: Base background (body, page canvas)
- **Surface 1**: Elevated elements on Surface 0 (sidebar, cards, table headers)
- **Surface 2**: Elements on Surface 1 (main content areas)
- **Surface 3**: Interactive elements (buttons, inputs, filters)
- **Surface 4-5**: Further elevation for emphasis

## How to Use Dynamic Surfacing

### 1. Reading Current Surface Level

```tsx
import { useSurface, getSurfaceClass, getNextSurfaceLevel } from "@/components/custom/surface-context"

function MyComponent() {
  const surface = useSurface()
  // surface.level is 0, 1, 2, 3, 4, or 5
  
  // Get the next surface level
  const nextLevel = getNextSurfaceLevel(surface.level)
  // If on surface 0 → returns 1
  // If on surface 1 → returns 2
  
  // Get the CSS class
  const bgClass = getSurfaceClass(nextLevel) // "bg-surface-1", "bg-surface-2", etc.
}
```

### 2. Escalating Components

Components that sit ON a surface should escalate to the next level:

```tsx
// GOOD: Dynamic escalation
const surface = useSurface()
const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))

return (
  <div className={cn("rounded-sm border", bgClass)}>
    {/* Content sits one level above parent */}
  </div>
)

// BAD: Hardcoded surface
return (
  <div className="rounded-sm border bg-surface-3">
    {/* Will always be surface-3 regardless of context */}
  </div>
)
```

### 3. SurfaceProvider and SurfaceStep

Use `SurfaceProvider` to set a fixed level, or `SurfaceStep` to automatically escalate:

```tsx
import { SurfaceProvider, SurfaceStep } from "@/components/custom/surface-context"

// Set explicit level
<SurfaceProvider level={0}>
  <body className="bg-surface-0">
    {/* Children inherit level 0 */}
  </body>
</SurfaceProvider>

// Auto-escalate to next level
<SurfaceStep>
  <aside>
    {/* Will be surface 1 if parent was 0 */}
  </aside>
</SurfaceStep>

// Escalate multiple levels
<SurfaceStep level={2}>
  <main>
    {/* Will be surface 2 */}
  </main>
</SurfaceStep>
```

## Component Guidelines

### ✅ DO: Use Dynamic Surfacing

**DataTable headers** (correct):
```tsx
const surface = useSurface()
const headerBg = getSurfaceClass(getNextSurfaceLevel(surface.level))

<thead className={cn("sticky top-0", headerBg)}>
```

**FilterBar wrapper** (correct):
```tsx
const surface = useSurface()
const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))

<div className={cn("rounded-sm border", bgClass)}>
```

### ❌ DON'T: Hardcode Surface Values

**PageToolbar search wrapper** (incorrect):
```tsx
// ❌ Always surface-3, breaks hierarchy
<div className="rounded-sm bg-surface-3 px-3">
```

**ToolbarButton** (incorrect):
```tsx
// ❌ Always surface-3
<button className="bg-surface-3 hover:bg-surface-4">
```

## Common Patterns

### Container Components

Containers should NOT have explicit surface backgrounds if they use `SurfaceStep`:

```tsx
// PageShell.tsx
<SurfaceProvider level={0}>
  <div className="flex h-screen"> {/* No bg class here */}
    <SurfaceStep>
      <aside className="border-r"> {/* No bg class - SurfaceStep handles it */}
        {/* Content */}
      </aside>
    </SurfaceStep>
    
    <SurfaceStep>
      <main className="flex-1"> {/* No bg class - SurfaceStep handles it */}
        {/* Content */}
      </main>
    </SurfaceStep>
  </div>
</SurfaceProvider>
```

### Interactive Elements

Buttons, inputs, and filters should escalate:

```tsx
function ToolbarButton() {
  const surface = useSurface()
  const bgClass = getSurfaceClass(getNextSurfaceLevel(surface.level))
  
  return (
    <button className={cn("rounded-sm px-3", bgClass)}>
      {children}
    </button>
  )
}
```

### Table Headers

Table headers should be one level above their container:

```tsx
function DataTable() {
  const surface = useSurface()
  const headerBg = getSurfaceClass(getNextSurfaceLevel(surface.level))
  
  return (
    <table>
      <thead className={cn("sticky top-0", headerBg)}>
        {/* Headers sit one level above table body */}
      </thead>
      <tbody>
        {/* Body inherits parent surface */}
      </tbody>
    </table>
  )
}
```

## Migration Checklist

When updating components to use dynamic surfacing:

- [ ] Remove hardcoded `bg-surface-*` classes from container elements
- [ ] Import `useSurface`, `getSurfaceClass`, `getNextSurfaceLevel`
- [ ] Calculate dynamic background: `getSurfaceClass(getNextSurfaceLevel(surface.level))`
- [ ] Apply dynamic class to the appropriate element
- [ ] Ensure parent uses `SurfaceProvider` or `SurfaceStep`
- [ ] Test at different surface levels (0, 1, 2)

## Files to Update

The following components currently use hardcoded surface values and should be migrated:

1. **page-toolbar.tsx** - Search wrapper uses `bg-surface-3`
2. **page-toolbar.tsx** - `ToolbarButton` uses `bg-surface-3` and `hover:bg-surface-4`
3. **table-selection-bar.tsx** - `ToolbarBtn` uses `hover:bg-surface-3`
4. **button.tsx** - Secondary variants use hardcoded `bg-surface-3`, `bg-surface-4`, `bg-surface-5`
5. **input.tsx** - Filled variant uses `bg-surface-3`

## Visual Hierarchy Example

```
┌─────────────────────────────────────────┐  Surface 0 (body bg-surface-0)
│  ┌─────────────────────┐                │
│  │ Sidebar             │                │  Surface 1 (SurfaceStep auto)
│  │ ┌─────────────────┐ │                │
│  │ │ Nav Item        │ │                │  Surface 2 (hover state)
│  │ └─────────────────┘ │                │
│  └─────────────────────┘                │
│  ┌───────────────────────────────────┐  │
│  │ Main Content                      │  │  Surface 2 (SurfaceStep auto)
│  │ ┌─────────────────────────────┐   │  │
│  │ │ Filter Bar                  │   │  │  Surface 3 (dynamic +1)
│  │ │ [Search] [Filter] [Columns] │   │  │
│  │ └─────────────────────────────┘   │  │
│  │ ┌─────────────────────────────┐   │  │
│  │ │ Table                       │   │  │
│  │ │ ▲ Header (Surface 3)        │   │  │  Surface 3 (dynamic +1 from body)
│  │ │ ─────────────────────────── │   │  │
│  │ │ Row 1                       │   │  │  Surface 2 (parent level)
│  │ │ Row 2                       │   │  │
│  │ └─────────────────────────────┘   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Quick Reference

| Pattern | Code |
|---------|------|
| Read current level | `const { level } = useSurface()` |
| Get next level | `getNextSurfaceLevel(level)` |
| Get CSS class | `getSurfaceClass(level)` |
| Dynamic escalation | `getSurfaceClass(getNextSurfaceLevel(useSurface().level))` |
| Wrap with step | `<SurfaceStep>{children}</SurfaceStep>` |
| Fixed level | `<SurfaceProvider level={1}>{children}</SurfaceProvider>` |
