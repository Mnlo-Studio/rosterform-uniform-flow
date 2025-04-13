
import React from "react";
import { useSidebar } from "./sidebar-provider";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const SidebarRail = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <div
      ref={ref}
      className={cn(
        "hidden h-full w-3 flex-col items-center justify-center py-4 md:flex",
        "group-data-[state=collapsed]:cursor-pointer",
        className
      )}
      onClick={() => state === "collapsed" && toggleSidebar()}
      {...props}
    >
      {state === "collapsed" && (
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-sidebar hover:bg-gray-200 text-sidebar-foreground"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
});
SidebarRail.displayName = "SidebarRail";
