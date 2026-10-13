import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { DataTable, type ColumnDef } from "@/components/custom/data-table"
import { Status } from "@/components/custom/status"
import { SurfaceProvider } from "@/components/custom/surface-context"
import { CheckIcon, LockIcon, TriangleAlertIcon } from "lucide-react"

interface Diamond {
  id: string
  shape: string
  carat: number
  colour: string
  clarity: string
  status: "available" | "warning" | "error" | "locked"
}

const sampleData: Diamond[] = [
  { id: "TR-00142", shape: "Round",   carat: 1.52, colour: "D", clarity: "VVS1", status: "available" },
  { id: "TR-00271", shape: "Oval",    carat: 2.01, colour: "E", clarity: "VS1",  status: "available" },
  { id: "TR-00389", shape: "Emerald", carat: 0.91, colour: "F", clarity: "VVS2", status: "warning" },
  { id: "TR-00401", shape: "Round",   carat: 3.15, colour: "D", clarity: "IF",   status: "available" },
  { id: "TR-00455", shape: "Pear",    carat: 1.77, colour: "G", clarity: "VS2",  status: "error" },
  { id: "TR-00512", shape: "Cushion", carat: 2.44, colour: "E", clarity: "VVS1", status: "locked" },
]

const statusIcon = {
  available: <CheckIcon />,
  warning:   <TriangleAlertIcon />,
  error:     <TriangleAlertIcon />,
  locked:    <LockIcon />,
} satisfies Record<Diamond["status"], React.ReactNode>

const statusColor = {
  available: "green",
  warning:   "amber",
  error:     "red",
  locked:    "red",
} as const

const columns: ColumnDef<Diamond>[] = [
  { accessorKey: "id",      header: "Tracr ID", size: 110 },
  { accessorKey: "shape",   header: "Shape",    size: 100 },
  { accessorKey: "carat",   header: "Carat",    size: 80,  cell: ({ getValue }) => `${(getValue() as number).toFixed(2)}ct` },
  { accessorKey: "colour",  header: "Colour",   size: 72 },
  { accessorKey: "clarity", header: "Clarity",  size: 80 },
  {
    accessorKey: "status",
    header: "Status",
    size: 140,
    enableSorting: false,
    cell: ({ getValue }) => {
      const s = getValue() as Diamond["status"]
      return (
        <Status color={statusColor[s]} fill="outline-color" textStyle="color" icon={statusIcon[s]}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </Status>
      )
    },
  },
]

const meta: Meta<typeof DataTable<Diamond>> = {
  title: "DS/Custom/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <SurfaceProvider level={1}>
        <div className="w-full max-w-4xl">
          <Story />
        </div>
      </SurfaceProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DataTable<Diamond>>

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    getRowId: (row) => row.id,
  },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
  },
}

export const CustomEmptyState: Story = {
  args: {
    columns,
    data: [],
    emptyState: "No diamonds match your filters.",
  },
}
