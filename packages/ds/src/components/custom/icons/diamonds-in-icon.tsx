import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface DiamondsInIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function DiamondsInIcon({ className, weight = "regular", ...props }: DiamondsInIconProps) {
  return (
    <svg
      viewBox="-0.90 0.60 22.80 22.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M7.21781 13.0498L1 13.0936M5.47574 15.0994L7.52542 13.0497L5.47574 11M20 7.2L12 10.6667M6.50003 18C6.50003 18 10.2688 19.3752 12 20L20 16.8V7.2L12 4L4.00003 7.2L12 10.6667M12 10.6667V20" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
