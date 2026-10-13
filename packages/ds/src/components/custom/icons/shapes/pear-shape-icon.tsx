import * as React from "react"
import { cn } from "@/lib/utils"

export interface PearShapeIconProps extends React.ComponentProps<"svg"> {}

export function PearShapeIcon({ className, ...props }: PearShapeIconProps) {
  return (
    <svg
      viewBox="2.82 2.73 19.08 19.08"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M18.9199 13.873L18.2168 16.8398L16.4258 19.1875L12.3633 20.2256L8.30078 19.1885L6.51074 16.8418L5.80566 13.874L12.3633 4.32422L18.9199 13.873Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14.8183 14.1849L12.3637 10.7729L9.90918 14.1849L10.1819 15.2817L10.8637 16.1347L12.3637 16.5002L13.8637 16.1347L14.5455 15.2817L14.8183 14.1849Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
