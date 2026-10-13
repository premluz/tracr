import * as React from "react"
import { cn } from "@/lib/utils"

export interface CushionShapeIconProps extends React.ComponentProps<"svg"> {}

export function CushionShapeIcon({ className, ...props }: CushionShapeIconProps) {
  return (
    <svg
      viewBox="2.10 2.10 19.80 19.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M15.9678 3.75L18.1387 4.47266L19.5244 5.8584L20.25 8.09082V15.9678L19.5264 18.1387L18.1387 19.5264L15.9678 20.25H8.03223L5.86035 19.5264L4.47266 18.1387L3.75 15.9678V8.03125L4.47266 5.86035L5.86035 4.47266L8.03223 3.75H15.9678Z" stroke="currentColor" strokeWidth="2" />
      <rect x="8.96984" y="12.186" width="4.54839" height="4.54839" transform="rotate(-45 8.96984 12.186)" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
