import * as React from "react"
import { cn } from "@/lib/utils"

export interface HeartShapeIconProps extends React.ComponentProps<"svg"> {}

export function HeartShapeIcon({ className, ...props }: HeartShapeIconProps) {
  return (
    <svg
      viewBox="1.20 1.67 21.60 21.60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M3.76596 10.7447L11.8085 19.9362L20.617 10.7447L21 7.68085L18.7021 5H14.8723L11.8085 7.68085L9.12766 5H5.29787L3 7.68085L3.76596 10.7447Z" stroke="currentColor" strokeWidth="2" />
      <path d="M11.8083 11.5104L6.82959 8.82959L11.8083 14.9572L16.787 8.82959L11.8083 11.5104Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
