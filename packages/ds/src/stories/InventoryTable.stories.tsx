import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { SurfaceProvider } from "@/components/custom/surface-context"
import { InventoryTable, generateDiamonds } from "@/components/custom/inventory-table"

const DIAMONDS = generateDiamonds(3353)

const meta: Meta = {
  title: "DS/InventoryTable",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

// ─── Standalone table (no shell) ─────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [search, setSearch] = React.useState("")
    const [page, setPage]     = React.useState(1)
    const [pageSize, setPageSize] = React.useState(50)

    const filtered = React.useMemo(
      () =>
        search
          ? DIAMONDS.filter(
              (d) =>
                d.id.toLowerCase().includes(search.toLowerCase()) ||
                d.clarity.toLowerCase().includes(search.toLowerCase()) ||
                d.shape.toLowerCase().includes(search.toLowerCase())
            )
          : DIAMONDS,
      [search]
    )

    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

    return (
      <SurfaceProvider level={1}>
        <div className="h-screen flex flex-col bg-surface-1">
          <InventoryTable
            data={paginated}
            totalCount={filtered.length}
            search={search}
            onSearchChange={(v) => { setSearch(v); setPage(1) }}
            onExport={() => alert("Export")}
            onColumns={() => alert("Columns")}
            onFilter={() => alert("Filter")}
            page={page}
            onPageChange={setPage}
            pageSize={pageSize}
            onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
            onView={(rows) => alert(`View ${rows.length} items`)}
            onShare={(rows) => alert(`Share ${rows.length} items`)}
            onArchive={(rows) => alert(`Archive ${rows.length} items`)}
            onUnlock={(rows) => alert(`Unlock ${rows.length} items`)}
            onTransfer={(rows) => alert(`Transfer ${rows.length} items`)}
            className="flex-1 overflow-hidden"
          />
        </div>
      </SurfaceProvider>
    )
  },
}
