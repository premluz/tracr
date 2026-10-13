import * as React from "react"
import { cn } from "@/lib/utils"

export interface EmeraldShapeIconProps extends React.ComponentProps<"svg"> {}

export function EmeraldShapeIcon({ className, ...props }: EmeraldShapeIconProps) {
  return (
    <svg
      viewBox="1.96 2.10 19.80 19.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M16.4619 3.75L18.4775 5.76562V18.2344L16.4619 20.25H7.26562L5.25 18.2344V5.76562L7.26562 3.75H16.4619Z" stroke="currentColor" strokeWidth="2" />
      <rect x="9.25" y="8.65918" width="5.04545" height="6.68182" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
