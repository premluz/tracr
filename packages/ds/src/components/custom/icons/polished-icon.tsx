import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface PolishedIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function PolishedIcon({ className, weight = "regular", ...props }: PolishedIconProps) {
  return (
    <svg
      viewBox="1.20 1.70 21.60 21.60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M3 9.19444L7.93548 10.5385M10.5509 4H7.93548L3 9.19444L11.5492 21L21 9.19444L15.0645 4H10.5509ZM7.93548 10.5385L11.5492 21M7.93548 10.5385L10.5509 4M7.93548 10.5385H15.0645M21 9.19444L15.0645 10.5385M11.5492 21L15.0645 10.5385M10.5509 4H12.8077L15.0645 10.5385" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
