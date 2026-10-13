import type { Meta, StoryObj } from "@storybook/react-vite"
import { TableSelectionBar } from "@/components/custom/table-selection-bar"
import { TableSkeleton } from "@/components/custom/table-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

// ─── Selection bar ────────────────────────────────────────────────────────────

const selectionMeta: Meta<typeof TableSelectionBar> = {
  title: "DS/TableSelectionBar",
  component: TableSelectionBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default selectionMeta
type Story = StoryObj<typeof TableSelectionBar>

const ACTIONS = [
  { label: "Action" },
  { label: "Action" },
  { label: "Action" },
  { label: "Action" },
  { label: "Action" },
  { label: "Action" },
]

export const Default: Story = {
  args: {
    selectedCount: 1,
    totalCount: 125_224,
    onDeselect: () => {},
    actions: ACTIONS.slice(0, 3),
    onExportClick: () => {},
    onColumnsClick: () => {},
    onFilterClick: () => {},
  },
}

export const ManyActions: Story = {
  name: "Many actions — overflow …",
  args: {
    selectedCount: 42,
    totalCount: 125_224,
    onDeselect: () => {},
    actions: ACTIONS,
    maxVisibleActions: 3,
    onExportClick: () => {},
    onFilterClick: () => {},
    filterCount: 2,
  },
}

export const SmallScreenWrap: Story = {
  name: "Small screen — wraps to 2 lines",
  decorators: [(Story) => <div className="w-72"><Story /></div>],
  args: {
    selectedCount: 1,
    totalCount: 125_224,
    onDeselect: () => {},
    actions: ACTIONS,
    maxVisibleActions: 6,
    onExportClick: () => {},
    onColumnsClick: () => {},
    onFilterClick: () => {},
  },
}

// ─── Skeleton stories ─────────────────────────────────────────────────────────

export const SkeletonWave: Story = {
  name: "Table skeleton — wave shimmer",
  render: () => (
    <div className="p-6">
      <TableSkeleton shimmer="wave" rows={5} columns={7} />
    </div>
  ),
}

export const SkeletonPulse: Story = {
  name: "Table skeleton — pulse",
  render: () => (
    <div className="p-6">
      <TableSkeleton shimmer="pulse" rows={5} columns={7} />
    </div>
  ),
}

export const SkeletonShimmerVariants: Story = {
  name: "Shimmer variants",
  render: () => (
    <div className="flex flex-col gap-8 p-6 max-w-sm">
      <div>
        <p className="mb-2 text-xs font-semibold text-text-muted">Shimmer out (wave)</p>
        <Skeleton variant="wave" className="h-4 w-48 mb-3" />
        <Skeleton variant="wave" className="h-14 w-32" />
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-text-muted">Shimmer over (pulse)</p>
        <Skeleton variant="pulse" className="h-4 w-48 mb-3" />
        <Skeleton variant="pulse" className="h-14 w-32" />
      </div>
    </div>
  ),
}
