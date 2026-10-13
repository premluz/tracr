import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { DrawerProvider, Drawer } from "@/components/custom/drawer"
import { SurfaceProvider } from "@/components/custom/surface-context"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ─── Shared helpers ───────────────────────────────────────────────────────────

function DrawerFooter({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm" onClick={onClose}>
        Cancel
      </Button>
      <Button size="sm">Apply</Button>
    </div>
  )
}

function ContentSkeletons({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-4" style={{ width: `${100 - i * 15}%` }} />
      ))}
    </div>
  )
}

function PageCanvas({ children }: { children: React.ReactNode }) {
  return (
    <SurfaceProvider level={1}>
      <DrawerProvider>
        <div className="flex h-screen w-full items-center justify-center bg-surface-1">
          {children}
        </div>
      </DrawerProvider>
    </SurfaceProvider>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "DS/Drawer",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [open, setOpen] = React.useState<"sm" | "md" | "lg" | null>(null)
    return (
      <PageCanvas>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpen("sm")}>
            Small — 25%
          </Button>
          <Button variant="outline" onClick={() => setOpen("md")}>
            Medium — 50%
          </Button>
          <Button variant="outline" onClick={() => setOpen("lg")}>
            Large — 75%
          </Button>
        </div>

        {(["sm", "md", "lg"] as const).map((size) => (
          <Drawer
            key={size}
            open={open === size}
            onClose={() => setOpen(null)}
            title="Drawer name"
            size={size}
            footer={<DrawerFooter onClose={() => setOpen(null)} />}
          >
            <ContentSkeletons rows={5} />
          </Drawer>
        ))}
      </PageCanvas>
    )
  },
}

// ─── Nested (medium × 3) ─────────────────────────────────────────────────────

export const NestedMedium: Story = {
  name: "Nested — medium drawers",
  render: () => {
    const [d1, setD1] = React.useState(false)
    const [d2, setD2] = React.useState(false)
    const [d3, setD3] = React.useState(false)
    const [d4, setD4] = React.useState(false)

    const closeAll = () => { setD1(false); setD2(false); setD3(false); setD4(false) }

    return (
      <PageCanvas>
        <Button onClick={() => setD1(true)}>Open drawer</Button>

        <Drawer
          open={d1}
          onClose={closeAll}
          title="Drawer 1"
          size="md"
          footer={<DrawerFooter onClose={closeAll} />}
        >
          <ContentSkeletons />
          <div className="mt-6">
            <Button size="sm" onClick={() => setD2(true)}>
              Open drawer 2
            </Button>
          </div>

          <Drawer
            open={d2}
            onClose={() => { setD2(false); setD3(false); setD4(false) }}
            title="Drawer 2"
            size="md"
            footer={<DrawerFooter onClose={() => setD2(false)} />}
          >
            <ContentSkeletons />
            <div className="mt-6">
              <Button size="sm" onClick={() => setD3(true)}>
                Open drawer 3
              </Button>
            </div>

            <Drawer
              open={d3}
              onClose={() => { setD3(false); setD4(false) }}
              title="Drawer 3"
              size="md"
              footer={<DrawerFooter onClose={() => setD3(false)} />}
            >
              <ContentSkeletons />
              <div className="mt-6">
                <Button size="sm" onClick={() => setD4(true)}>
                  Open drawer 4
                </Button>
              </div>

              <Drawer
                open={d4}
                onClose={() => setD4(false)}
                title="Drawer 4"
                size="md"
                footer={<DrawerFooter onClose={() => setD4(false)} />}
              >
                <ContentSkeletons />
                <p className="mt-4 text-xs text-text-muted">
                  Drawer 1 is now pushed off screen.
                </p>
              </Drawer>
            </Drawer>
          </Drawer>
        </Drawer>
      </PageCanvas>
    )
  },
}

// ─── Nested with large drawer ─────────────────────────────────────────────────

export const NestedWithLarge: Story = {
  name: "Nested — large pushes to edge",
  render: () => {
    const [d1, setD1] = React.useState(false)
    const [d2, setD2] = React.useState(false)

    return (
      <PageCanvas>
        <Button onClick={() => setD1(true)}>Open medium drawer</Button>

        <Drawer
          open={d1}
          onClose={() => { setD1(false); setD2(false) }}
          title="Drawer 1 (medium)"
          size="md"
          footer={<DrawerFooter onClose={() => setD1(false)} />}
        >
          <ContentSkeletons />
          <div className="mt-6">
            <Button size="sm" onClick={() => setD2(true)}>
              Open large drawer
            </Button>
          </div>

          <Drawer
            open={d2}
            onClose={() => setD2(false)}
            title="Drawer 2 (large)"
            size="lg"
            footer={<DrawerFooter onClose={() => setD2(false)} />}
          >
            <ContentSkeletons rows={6} />
            <p className="mt-4 text-xs text-text-muted">
              Large drawer pushes previous drawers to the screen edge.
            </p>
          </Drawer>
        </Drawer>
      </PageCanvas>
    )
  },
}

// ─── No backdrop close ────────────────────────────────────────────────────────

export const NoBackdropClose: Story = {
  name: "closeOnBackdrop disabled",
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <PageCanvas>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Drawer name"
          size="md"
          closeOnBackdrop={false}
          footer={<DrawerFooter onClose={() => setOpen(false)} />}
        >
          <ContentSkeletons />
          <p className="mt-4 text-xs text-text-muted">
            Clicking outside this drawer will not close it.
            Use the × button or ESC key.
          </p>
        </Drawer>
      </PageCanvas>
    )
  },
}
