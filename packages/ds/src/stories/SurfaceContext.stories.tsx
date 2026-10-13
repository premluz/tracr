import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  SurfaceProvider,
  SurfaceStep,
  useSurface,
  getSurfaceClass,
  type SurfaceLevel,
} from "@/components/custom/surface-context"

function SurfaceCard({ children }: { children?: React.ReactNode }) {
  const surface = useSurface()
  const bg = getSurfaceClass(surface.level)

  return (
    <div className={`rounded-lg border border-border-subtle p-4 ${bg}`}>
      <p className="mb-2 text-xs font-medium text-text-muted">
        Surface level: {surface.level}
      </p>
      {children}
    </div>
  )
}

const meta: Meta = {
  title: "DS/Custom/SurfaceContext",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj

export const NestedSurfaces: Story = {
  render: () => (
    <SurfaceProvider level={0}>
      <SurfaceCard>
        <SurfaceStep>
          <SurfaceCard>
            <SurfaceStep>
              <SurfaceCard>
                <SurfaceStep>
                  <SurfaceCard>
                    <p className="text-xs text-text-secondary">
                      Each nested card auto-steps one surface level up.
                    </p>
                  </SurfaceCard>
                </SurfaceStep>
              </SurfaceCard>
            </SurfaceStep>
          </SurfaceCard>
        </SurfaceStep>
      </SurfaceCard>
    </SurfaceProvider>
  ),
}

export const ExplicitLevels: Story = {
  render: () => (
    <div className="flex gap-3">
      {([0, 1, 2, 3, 4, 5] as SurfaceLevel[]).map((level) => (
        <SurfaceProvider key={level} level={level}>
          <SurfaceCard />
        </SurfaceProvider>
      ))}
    </div>
  ),
}
