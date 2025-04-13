
import * as React from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useSidebar, SIDEBAR_WIDTH_MOBILE } from "./sidebar-provider"

export const SidebarMobile = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
  }
>(
  (
    {
      side = "left",
      children,
      ...props
    },
    ref
  ) => {
    const { openMobile, setOpenMobile } = useSidebar()

    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }
)
SidebarMobile.displayName = "SidebarMobile"
