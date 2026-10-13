import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface PortalIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function PortalIcon({ className, weight = "regular", ...props }: PortalIconProps) {
  return (
    <svg
      viewBox="3.60 3.60 16.80 16.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M8.11111 9.17125H12M8.11111 11.8257H14.3333M8.11111 16.3761V18.1474C8.11111 18.5515 8.11111 18.7536 8.19607 18.8574C8.26995 18.9476 8.38199 19.0001 8.50042 19C8.6366 18.9999 8.79841 18.8736 9.12203 18.6212L10.9774 17.1739C11.3564 16.8782 11.5459 16.7304 11.7569 16.6252C11.9442 16.532 12.1434 16.4638 12.3494 16.4226C12.5815 16.3761 12.8242 16.3761 13.3096 16.3761H15.2667C16.5735 16.3761 17.2269 16.3761 17.726 16.1282C18.165 15.91 18.522 15.562 18.7457 15.1338C19 14.6471 19 14.01 19 12.7358V8.64036C19 7.36612 19 6.72899 18.7457 6.2423C18.522 5.81418 18.165 5.46612 17.726 5.24799C17.2269 5 16.5735 5 15.2667 5H8.73333C7.42654 5 6.77315 5 6.27402 5.24799C5.83498 5.46612 5.47802 5.81418 5.25432 6.2423C5 6.72899 5 7.36612 5 8.64036V13.3425C5 14.0478 5 14.4005 5.07951 14.6898C5.29526 15.4749 5.92421 16.0882 6.72942 16.2986C7.02614 16.3761 7.3878 16.3761 8.11111 16.3761Z" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
