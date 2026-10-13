import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FilterBar } from "@/components/custom/filter-bar"
import { SurfaceProvider } from "@/components/custom/surface-context"

const meta: Meta<typeof FilterBar> = {
  title: "DS/Custom/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <SurfaceProvider level={1}>
        <div className="w-full max-w-3xl">
          <Story />
        </div>
      </SurfaceProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FilterBar>

export const Default: Story = {
  args: {
    searchPlaceholder: "Search diamonds…",
    onFilterClick: () => {},
    onColumnsClick: () => {},
  },
}

export const WithActiveFilters: Story = {
  args: {
    searchPlaceholder: "Search diamonds…",
    searchValue: "round",
    onFilterClick: () => {},
    onColumnsClick: () => {},
    filterCount: 2,
  },
}

export const SearchOnly: Story = {
  args: {
    searchPlaceholder: "Filter by ID…",
  },
}

export const Interactive: Story = {
  render: () => {
    const [search, setSearch] = React.useState("")

    return (
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search diamonds…"
        onFilterClick={() => alert("Filters clicked")}
        onColumnsClick={() => alert("Columns clicked")}
        filterCount={search.length > 0 ? 1 : 0}
      />
    )
  },
}
