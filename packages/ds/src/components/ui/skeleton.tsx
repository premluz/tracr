import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "pulse" | "wave"
}

function Skeleton({ className, variant = "pulse", style, ...props }: SkeletonProps) {
  const waveStyle =
    variant === "wave"
      ? {
          backgroundImage:
            "linear-gradient(90deg, var(--color-surface-3) 25%, var(--color-surface-4) 50%, var(--color-surface-3) 75%)",
          backgroundSize: "400% 100%",
          animation: "shimmer-wave 1.8s ease-in-out infinite",
          ...style,
        }
      : style

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md",
        variant === "pulse" ? "animate-pulse bg-surface-3" : "bg-surface-3",
        className
      )}
      style={waveStyle}
      {...props}
    />
  )
}

export { Skeleton }
