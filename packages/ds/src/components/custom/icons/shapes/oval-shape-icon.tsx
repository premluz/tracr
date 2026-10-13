import * as React from "react"
import { cn } from "@/lib/utils"

export interface OvalShapeIconProps extends React.ComponentProps<"svg"> {}

export function OvalShapeIcon({ className, ...props }: OvalShapeIconProps) {
  return (
    <svg
      viewBox="2.45 2.18 19.63 19.63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M16.0587 5.55826L17.795 9.47392L17.7473 14.627L15.9388 18.5099L12.185 20.1754L8.4626 18.4416L6.72632 14.525L6.78128 8.58678L8.18886 5.49518L12.3237 3.81756L16.0587 5.55826Z" stroke="currentColor" strokeWidth="2" />
      <path d="M13.3299 9.68909L13.8684 10.9051L13.8524 12.6345L13.2914 13.8403L12.2392 14.3061L11.1949 13.8209L10.6573 12.6049L10.676 10.5796L11.0847 9.68003L12.2738 9.19785L13.3299 9.68909Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
