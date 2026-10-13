import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface MonitoringIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function MonitoringIcon({ className, weight = "regular", ...props }: MonitoringIconProps) {
  return (
    <svg
      viewBox="2.30 1.30 20.40 20.40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M4 11.7241H5.2439L6.90244 8.58621L8.97561 18L12.2927 5L15.6098 16.2069L17.6829 9.48276L18.5122 12.6207L19.3415 11.7241H21" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
