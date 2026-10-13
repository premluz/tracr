import * as React from "react"
import { cn } from "@/lib/utils"

export interface MarquiseShapeIconProps extends React.ComponentProps<"svg"> {}

export function MarquiseShapeIcon({ className, ...props }: MarquiseShapeIconProps) {
  return (
    <svg
      viewBox="2.37 2.29 19.41 19.41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M18.9082 8.60449V15.3945L12.0791 20.0889L5.25 15.3945V8.60449L12.0791 3.91016L18.9082 8.60449Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14.5959 11.0469V12.9531L12.0725 14.7588L9.55005 12.9531V11.0469L12.0725 9.24023L14.5959 11.0469Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
