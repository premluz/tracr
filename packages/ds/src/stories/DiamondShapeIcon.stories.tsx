import type { Meta, StoryObj } from "@storybook/react-vite"
import { DiamondShapeIcon, DIAMOND_SHAPE_CONFIG } from "@/components/custom/diamond-shape-icon"
import type { DiamondShape } from "@/components/custom/inventory-table"

const meta: Meta<typeof DiamondShapeIcon> = {
  title: "DS/Custom/Cell Values/DiamondShapeIcon",
  component: DiamondShapeIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    shape: {
      control: "select",
      options: Object.keys(DIAMOND_SHAPE_CONFIG) as DiamondShape[],
    },
  },
}

export default meta
type Story = StoryObj<typeof DiamondShapeIcon>

export const Round: Story = {
  args: { shape: "Round" },
}

export const Princess: Story = {
  args: { shape: "Princess" },
}

export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(Object.keys(DIAMOND_SHAPE_CONFIG) as DiamondShape[]).map((shape) => (
        <DiamondShapeIcon key={shape} shape={shape} />
      ))}
    </div>
  ),
}
