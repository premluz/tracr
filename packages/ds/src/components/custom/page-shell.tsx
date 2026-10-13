import * as React from "react"

import { cn } from "@/lib/utils"
import { SurfaceProvider, SurfaceStep } from "@/components/custom/surface-context"

export interface PageShellProps extends React.ComponentProps<"div"> {
  sidebar?: React.ReactNode
}

export function PageShell({
  sidebar,
  children,
  className,
  ...props
}: PageShellProps) {
  return (
    <SurfaceProvider level={0}>
      <div
        className={cn("flex h-screen w-full overflow-hidden", className)}
        {...props}
      >
        {sidebar ? (
          <SurfaceStep level={1}>
            <aside className="flex h-full shrink-0 flex-col border-r border-border-keyline">
              {sidebar}
            </aside>
          </SurfaceStep>
        ) : null}

        <main className="flex flex-1 flex-col overflow-y-auto bg-surface-0">
          {children}
        </main>
      </div>
    </SurfaceProvider>
  )
}

