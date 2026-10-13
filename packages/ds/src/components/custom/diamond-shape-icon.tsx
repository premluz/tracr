import * as React from "react"
import { cn } from "@/lib/utils"
import type { DiamondShape } from "@/components/custom/inventory-table"
import { RoundShapeIcon } from "@/components/custom/icons/shapes/round-shape-icon"
import { PrincessShapeIcon } from "@/components/custom/icons/shapes/princess-shape-icon"
import { OvalShapeIcon } from "@/components/custom/icons/shapes/oval-shape-icon"
import { CushionShapeIcon } from "@/components/custom/icons/shapes/cushion-shape-icon"
import { PearShapeIcon } from "@/components/custom/icons/shapes/pear-shape-icon"
import { HeartShapeIcon } from "@/components/custom/icons/shapes/heart-shape-icon"
import { EmeraldShapeIcon } from "@/components/custom/icons/shapes/emerald-shape-icon"
import { RadiantShapeIcon } from "@/components/custom/icons/shapes/radiant-shape-icon"

export const DIAMOND_SHAPE_CONFIG: Record<
  DiamondShape,
  { icon: React.ReactNode; label: string }
> = {
  Round:    { icon: <RoundShapeIcon className="size-4.5" />,    label: "Round"    },
  Princess: { icon: <PrincessShapeIcon className="size-4.5" />, label: "Princess" },
  Oval:     { icon: <OvalShapeIcon className="size-4.5" />,     label: "Oval"     },
  Cushion:  { icon: <CushionShapeIcon className="size-4.5" />,  label: "Cushion"  },
  Pear:     { icon: <PearShapeIcon className="size-4.5" />,     label: "Pear"     },
  Heart:    { icon: <HeartShapeIcon className="size-4.5" />,    label: "Heart"    },
  Emerald:  { icon: <EmeraldShapeIcon className="size-4.5" />,  label: "Emerald"  },
  Radiant:  { icon: <RadiantShapeIcon className="size-4.5" />,  label: "Radiant"  },
}

export interface DiamondShapeIconProps extends React.ComponentProps<"span"> {
  shape: DiamondShape
}

export function DiamondShapeIcon({ shape, className, ...props }: DiamondShapeIconProps) {
  const cfg = DIAMOND_SHAPE_CONFIG[shape]

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      <span className="flex shrink-0 items-center justify-center text-text-muted">
        {cfg.icon}
      </span>
      {cfg.label}
    </span>
  )
}
