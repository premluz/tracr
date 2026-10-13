import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CheckIcon,
  LockIcon,
  TriangleAlertIcon,
  ArrowRightLeftIcon,
  DiamondIcon,
  DiamondMinusIcon,
  CrosshairIcon,
  ArchiveIcon,
  SkullIcon,
} from "lucide-react"
import { Status, type StatusFill } from "@/components/custom/status"

const meta: Meta<typeof Status> = {
  title: "DS/Status",
  component: Status,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof Status>

export const Default: Story = {
  args: {
    color: "green",
    fill: "fill",
    textStyle: "color",
    icon: <CheckIcon />,
    children: "Available",
  },
}

const fills: { label: string; value: StatusFill }[] = [
  { label: "Ghost", value: "ghost" },
  { label: "Outline = neutral", value: "outline" },
  { label: "Outline = colour", value: "outline-color" },
  { label: "Fill", value: "fill" },
]

export const VariantMatrixIcon: Story = {
  name: "Variant matrix — with icons",
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-[140px_1fr_1fr_1fr] items-center gap-y-4 gap-x-6 text-xs text-text-muted">
        <div />
        <div className="font-semibold">Text = neutral</div>
        <div className="font-semibold">Text = colour</div>
        <div className="font-semibold">Icon only</div>

        {fills.map(({ label, value }) => (
          <>
            <div key={`${value}-label`} className="font-medium text-text-secondary">{label}</div>
            <div key={`${value}-neutral`} className="flex items-center gap-3">
              <Status color="success" fill={value} textStyle="neutral" icon={<CheckIcon />}>Available</Status>
              <Status color="red" fill={value} textStyle="neutral" icon={<LockIcon />}>Locked</Status>
            </div>
            <div key={`${value}-color`} className="flex items-center gap-3">
              <Status color="success" fill={value} textStyle="color" icon={<CheckIcon />}>Available</Status>
              <Status color="red" fill={value} textStyle="color" icon={<LockIcon />}>Locked</Status>
            </div>
            <div key={`${value}-icon`} className="flex items-center gap-3">
              <Status color="success" fill={value} icon={<CheckIcon />} iconOnly />
              <Status color="red" fill={value} icon={<LockIcon />} iconOnly />
            </div>
          </>
        ))}
      </div>
    </div>
  ),
}

export const VariantMatrixDot: Story = {
  name: "Variant matrix — with dots",
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-[140px_1fr_1fr] items-center gap-y-4 gap-x-6 text-xs text-text-muted">
        <div />
        <div className="font-semibold">Text = neutral</div>
        <div className="font-semibold">Text = colour</div>

        {fills.map(({ label, value }) => (
          <>
            <div key={`${value}-label`} className="font-medium text-text-secondary">{label}</div>
            <div key={`${value}-neutral`} className="flex items-center gap-3">
              <Status color="success" fill={value} textStyle="neutral" dot>Available</Status>
              <Status color="red" fill={value} textStyle="neutral" dot>Locked</Status>
            </div>
            <div key={`${value}-color`} className="flex items-center gap-3">
              <Status color="success" fill={value} textStyle="color" dot>Available</Status>
              <Status color="red" fill={value} textStyle="color" dot>Locked</Status>
            </div>
          </>
        ))}
      </div>
    </div>
  ),
}

export const PresetsSubtle: Story = {
  name: "Presets — subtle fill (app layer example)",
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="mb-2 text-xs text-text-muted">
        These presets would live in your app, not in the DS.
        The DS exports the Status primitive; the app maps domain statuses to props.
      </p>
      <Status color="success" fill="fill" textStyle="color" icon={<CheckIcon />}>Available (success)</Status>
      <Status color="green" fill="fill" textStyle="color" icon={<CheckIcon />}>Available (accent)</Status>
      <Status color="red" fill="fill" textStyle="color" icon={<LockIcon />}>Locked</Status>
      <Status color="amber" fill="fill" textStyle="color" icon={<TriangleAlertIcon />}>Missing check</Status>
      <Status color="amber" fill="fill" textStyle="color" icon={<TriangleAlertIcon />}>Missing scan</Status>
      <Status color="yellow" fill="fill" textStyle="color" icon={<TriangleAlertIcon />}>Not inscribed</Status>
      <Status color="blue" fill="fill" textStyle="color" icon={<ArrowRightLeftIcon />}>Transferring</Status>
      <Status color="emerald" fill="fill" textStyle="color" icon={<CrosshairIcon />}>Polished</Status>
      <Status color="pink" fill="fill" textStyle="color" icon={<DiamondMinusIcon />}>Split</Status>
      <Status color="yellow" fill="fill" textStyle="color" icon={<DiamondIcon />}>Rough</Status>
      <Status color="neutral" fill="fill" textStyle="color" icon={<CheckIcon />}>Transferred</Status>
      <Status color="neutral" fill="fill" textStyle="color" icon={<ArchiveIcon />}>Archived</Status>
      <Status color="neutral" fill="fill" textStyle="color" icon={<SkullIcon />}>Destroyed</Status>
    </div>
  ),
}

export const PresetsOutline: Story = {
  name: "Presets — outline colour (app layer example)",
  render: () => (
    <div className="flex flex-col gap-2">
      <Status color="success" fill="outline-color" textStyle="color" icon={<CheckIcon />}>Available (success)</Status>
      <Status color="green" fill="outline-color" textStyle="color" icon={<CheckIcon />}>Available (accent)</Status>
      <Status color="red" fill="outline-color" textStyle="color" icon={<LockIcon />}>Locked</Status>
      <Status color="amber" fill="outline-color" textStyle="color" icon={<TriangleAlertIcon />}>Missing check</Status>
      <Status color="amber" fill="outline-color" textStyle="color" icon={<TriangleAlertIcon />}>Missing scan</Status>
      <Status color="yellow" fill="outline-color" textStyle="color" icon={<TriangleAlertIcon />}>Not inscribed</Status>
      <Status color="blue" fill="outline-color" textStyle="color" icon={<ArrowRightLeftIcon />}>Transferring</Status>
      <Status color="emerald" fill="outline-color" textStyle="color" icon={<CrosshairIcon />}>Polished</Status>
      <Status color="pink" fill="outline-color" textStyle="color" icon={<DiamondMinusIcon />}>Split</Status>
      <Status color="yellow" fill="outline-color" textStyle="color" icon={<DiamondIcon />}>Rough</Status>
      <Status color="neutral" fill="outline-color" textStyle="color" icon={<CheckIcon />}>Transferred</Status>
      <Status color="neutral" fill="outline-color" textStyle="color" icon={<ArchiveIcon />}>Archived</Status>
      <Status color="neutral" fill="outline-color" textStyle="color" icon={<SkullIcon />}>Destroyed</Status>
    </div>
  ),
}
