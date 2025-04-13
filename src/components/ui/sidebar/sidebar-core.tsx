
import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-provider"
import { SidebarWrapper } from "./sidebar-wrapper"
import { SidebarMobile } from "./sidebar-mobile"
import { SidebarInset } from "./sidebar-inset"

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <SidebarMobile side={side} {...props}>
          {children}
        </SidebarMobile>
      )
    }

    return (
      <SidebarWrapper
        ref={ref}
        side={side}
        variant={variant}
        collapsible={collapsible}
        className={className}
        {...props}
      >
        {children}
      </SidebarWrapper>
    )
  }
)
Sidebar.displayName = "Sidebar"

// Re-export SidebarInset for easier imports
export { SidebarInset }
