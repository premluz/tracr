import * as React from "react"
import { cn } from "@/lib/utils"

export interface AsscherShapeIconProps extends React.ComponentProps<"svg"> {}

export function AsscherShapeIcon({ className, ...props }: AsscherShapeIconProps) {
  return (
    <svg
      viewBox="2.10 2.10 19.80 19.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M17.7334 3.75L20.25 5.80957V18.1895L17.7334 20.25H6.2666L3.75 18.1895V5.80957L6.2666 3.75H17.7334Z" stroke="currentColor" strokeWidth="2" />
      <rect x="9.47705" y="9.47705" width="5.04545" height="5.04545" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
