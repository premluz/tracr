import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface CollapseMenuIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function CollapseMenuIcon({ className, weight = "regular", ...props }: CollapseMenuIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M18 17L13 12L18 7M11 17L6 12L11 7" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
