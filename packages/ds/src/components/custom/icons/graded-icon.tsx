import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface GradedIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function GradedIcon({ className, weight = "regular", ...props }: GradedIconProps) {
  return (
    <svg
      viewBox="1.19 1.19 21.62 21.62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M14.2976 6.02625L15.6762 7.4048M11.5405 8.78335L12.9191 10.1619M8.78342 11.5405L10.162 12.919M6.02632 14.2976L7.40487 15.6761M3.32955 17.1151L6.88495 20.6705C7.06692 20.8524 7.15791 20.9434 7.26283 20.9775C7.35512 21.0075 7.45454 21.0075 7.54683 20.9775C7.65175 20.9434 7.74274 20.8524 7.92471 20.6705L20.6705 7.92471C20.8524 7.74274 20.9434 7.65175 20.9775 7.54683C21.0075 7.45454 21.0075 7.35512 20.9775 7.26283C20.9434 7.15791 20.8524 7.06692 20.6705 6.88495L17.1151 3.32955C16.9331 3.14757 16.8421 3.05658 16.7372 3.02249C16.6449 2.9925 16.5455 2.9925 16.4532 3.02249C16.3482 3.05658 16.2573 3.14757 16.0753 3.32955L3.32955 16.0753C3.14757 16.2573 3.05658 16.3482 3.02249 16.4532C2.9925 16.5455 2.9925 16.6449 3.02249 16.7372C3.05658 16.8421 3.14757 16.9331 3.32955 17.1151Z" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
