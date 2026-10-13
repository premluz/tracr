import * as React from "react"
import { cn } from "@/lib/utils"
import { iconStrokeWidth, type IconWeight } from "@/components/custom/icons/icon-weight"

export interface LogOutIconProps extends React.ComponentProps<"svg"> {
  weight?: IconWeight
}

export function LogOutIcon({ className, weight = "regular", ...props }: LogOutIconProps) {
  return (
    <svg
      viewBox="1.40 2.40 19.20 19.20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M15.1111 8.11111L19 12L15.1111 15.8889M19 12H9.66667M12 15.8889C12 16.6122 12 16.9739 11.9205 17.2706C11.7047 18.0758 11.0758 18.7047 10.2706 18.9205C9.97386 19 9.6122 19 8.88889 19H8.5C7.4128 19 4.8692 19 4.44041 18.8224C3.86867 18.5856 3.41443 18.1313 3.17761 17.5596C3 17.1308 3 16.5872 3 15.5V8.5C3 7.4128 3 6.8692 3.17762 6.44041C3.41443 5.86867 3.86867 5.41443 4.44041 5.17761C4.86921 5 7.4128 5 8.5 5H8.88889C9.6122 5 9.97386 5 10.2706 5.07951C11.0758 5.29526 11.7047 5.92421 11.9205 6.72942C12 7.02614 12 7.3878 12 8.11111" stroke="currentColor" strokeWidth={iconStrokeWidth[weight]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
