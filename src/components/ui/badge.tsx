
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-700 text-white",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-error-500 text-white",
        outline: "text-foreground",
        success: "border-transparent bg-success-100 text-success-700",
        warning: "border-transparent bg-warning-100 text-warning-700",
        error: "border-transparent bg-error-100 text-error-700",
        info: "border-transparent bg-primary-100 text-primary-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
