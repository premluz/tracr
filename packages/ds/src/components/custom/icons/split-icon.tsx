import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface SplitIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function SplitIcon({ className, weight = "regular", ...props }: SplitIconProps) {
  return (
    <svg
      viewBox="0.10 1.10 22.80 22.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M12.3636 21L21 5.88889L12.3636 4L2 5.88889L12.3636 21ZM2 5.88889C2.92121 6.39259 8.14141 7.98765 10.6364 9.03704M21 5.88889L10.6364 9.03704M12.3636 21L10.6364 9.03704" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
