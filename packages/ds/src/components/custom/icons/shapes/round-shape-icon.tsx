import * as React from "react"
import { cn } from "@/lib/utils"

export interface RoundShapeIconProps extends React.ComponentProps<"svg"> {}

export function RoundShapeIcon({ className, ...props }: RoundShapeIconProps) {
  return (
    <svg
      viewBox="2.15 2.15 19.71 19.71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M13.9404 9.32715L15.1406 10.9785V13.0205L13.9404 14.6719L12 15.3018L10.0586 14.6719L8.85938 13.0205V10.9785L10.0586 9.32715L12 8.69727L13.9404 9.32715Z" stroke="currentColor" strokeWidth="2" />
      <path d="M16.8262 5.35645L19.8096 9.46191V14.5371L16.8262 18.6426L12 20.2109L7.17285 18.6426L4.19043 14.5371V9.46191L7.17285 5.35645L12 3.78809L16.8262 5.35645Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
