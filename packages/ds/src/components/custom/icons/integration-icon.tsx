import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface IntegrationIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function IntegrationIcon({ className, weight = "regular", ...props }: IntegrationIconProps) {
  return (
    <svg
      viewBox="2.32 2.25 19.33 19.33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M16.7526 7.20715L20.0187 10.4732L17.3211 13.1711L10.6567 6.61087L13.4065 3.86108L16.7526 7.20715ZM16.7526 7.20715L19.2526 4.70716M7.20701 16.6212L3.94092 13.3551L6.6385 10.6573L8.9999 12.9666M7.20701 16.6212L10.5531 19.9673L13.303 17.2175L10.7979 14.7385M7.20701 16.6212L4.70702 19.1212M8.9999 12.9666L11.1624 10.8041M8.9999 12.9666L10.7979 14.7385M10.7979 14.7385L12.9473 12.5891" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
