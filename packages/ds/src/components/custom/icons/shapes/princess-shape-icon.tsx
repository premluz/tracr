import * as React from "react"
import { cn } from "@/lib/utils"

export interface PrincessShapeIconProps extends React.ComponentProps<"svg"> {}

export function PrincessShapeIcon({ className, ...props }: PrincessShapeIconProps) {
  return (
    <svg
      viewBox="2.70 2.70 18.60 18.60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.12132 12L12 5.12132L18.8787 12L12 18.8787L5.12132 12ZM3 12L4.06066 10.9393L10.9393 4.06066L12 3L13.0607 4.06066L19.9393 10.9393L21 12L19.9393 13.0607L13.0607 19.9393L12 21L10.9393 19.9393L4.06066 13.0607L3 12ZM10.0305 12.0005L12.0001 10.0309L13.9697 12.0005L12.0001 13.9701L10.0305 12.0005ZM7.90918 12.0005L8.96984 10.9398L10.9394 8.97024L12.0001 7.90958L13.0607 8.97024L15.0303 10.9398L16.091 12.0005L15.0303 13.0611L13.0607 15.0307L12.0001 16.0914L10.9394 15.0307L8.96984 13.0611L7.90918 12.0005Z"
        fill="currentColor"
      />
    </svg>
  )
}
