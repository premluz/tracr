import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface DiamondsOutIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function DiamondsOutIcon({ className, weight = "regular", ...props }: DiamondsOutIconProps) {
  return (
    <svg
      viewBox="2.25 1.48 21.03 21.03"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M21.2178 12.9504L15 12.9942M19.4757 15L21.5254 12.9503L19.4757 10.9006M4 7.2L12 10.6667M17.5 18C17.5 18 13.7312 19.3752 12 20L4 16.8V7.2L12 4L20 7.2L12 10.6667M12 10.6667V20" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
