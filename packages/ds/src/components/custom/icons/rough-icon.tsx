import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface RoughIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function RoughIcon({ className, weight = "regular", ...props }: RoughIconProps) {
  return (
    <svg
      viewBox="0.25 0.00 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M21.5 10.0445L12.2424 2L3 10.0445L12.2424 22L21.5 10.0445ZM3 10.0445L11 13M12.2424 2L11 13M21.5 10.0445L11 13M12.2424 22L11 13" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
