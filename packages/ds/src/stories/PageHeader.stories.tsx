import type { Meta, StoryObj } from "@storybook/react-vite"
import { PageHeader } from "@/components/custom/page-header"
import { SurfaceProvider } from "@/components/custom/surface-context"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof PageHeader> = {
  title: "DS/Custom/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <SurfaceProvider level={1}>
        <div className="w-full max-w-5xl">
          <Story />
        </div>
      </SurfaceProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Minimal: Story = {
  args: {
    title: "Polished inventory",
  },
}

export const WithBackButton: Story = {
  args: {
    title: "Diamond TR-00142",
    onBack: () => {},
  },
}

export const WithIndicator: Story = {
  args: {
    title: "Pipeline upload",
    onBack: () => {},
    indicator: true,
  },
}

export const WithEnvironmentDev: Story = {
  name: "Environment — Dev",
  args: {
    title: "Pipeline upload",
    onBack: () => {},
    indicator: true,
    environment: "dev",
  },
}

export const WithEnvironmentUat: Story = {
  name: "Environment — UAT",
  args: {
    title: "Pipeline upload",
    onBack: () => {},
    indicator: true,
    environment: "uat",
  },
}

export const WithProperties: Story = {
  args: {
    title: "Inbound shipment",
    onBack: () => {},
    indicator: true,
    properties: [
      { label: "Files required", value: "15/15" },
      { label: "Autosaved", value: "Today at 14:04" },
    ],
  },
}

export const WithActions: Story = {
  args: {
    title: "Polished inventory",
    actions: (
      <>
        <Button variant="outline" size="sm">Secondary</Button>
        <Button variant="outline" size="sm">Secondary</Button>
        <Button size="sm">Primary</Button>
      </>
    ),
  },
}

export const WithDescription: Story = {
  args: {
    title: "Rough inventory",
    onBack: () => {},
    description: "Optional page description",
  },
}

export const FullAnatomy: Story = {
  name: "Full anatomy (all slots)",
  args: {
    title: "Page name",
    onBack: () => {},
    indicator: true,
    environment: "uat",
    description: "Optional page description",
    properties: [
      { label: "Files required", value: "15/15" },
      { label: "Autosaved", value: "Today at 14:04" },
    ],
    actions: (
      <>
        <Button variant="outline" size="sm">Secondary</Button>
        <Button variant="outline" size="sm">Secondary</Button>
        <Button variant="outline" size="sm">Secondary</Button>
        <Button size="sm">Primary</Button>
      </>
    ),
  },
}
