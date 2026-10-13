import * as React from "react"
import { cn } from "@/lib/utils"

export interface BackdropProps {
  visible?: boolean
  onClick?: () => void
  blur?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Backdrop({ visible = true, onClick, blur = true, className, style }: BackdropProps) {
  return (
    <div
      aria-hidden
      style={style}
      className={cn(
        "fixed inset-0 bg-black/50 transition-opacity duration-200",
        blur && "backdrop-blur-sm",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        className
      )}
      onClick={onClick}
    />
  )
}
