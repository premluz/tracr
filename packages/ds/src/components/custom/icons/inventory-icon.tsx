import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface InventoryIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function InventoryIcon({ className, weight = "regular", ...props }: InventoryIconProps) {
  return (
    <svg
      viewBox="2.40 2.40 19.20 19.20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M20 7.42857L12 11.1429M4 7.42857V16.5714L12 20L20 16.5714V7.42857L12 4L4 7.42857ZM12 11.1429V20M12 11.1429L4 7.42857" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinejoin="round" />
    </svg>
  )
}
