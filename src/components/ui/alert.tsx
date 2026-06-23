import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-2xl border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        primary:
          "bg-card text-primary bg-primary/10 border-primary *:data-[slot=alert-description]:text-primary/90 *:[svg]:text-current",
        info:
          "bg-card text-info bg-info/10 border-info *:data-[slot=alert-description]:text-info/90 *:[svg]:text-current",
        success:
          "bg-card text-success bg-success/10 border-success *:data-[slot=alert-description]:text-success/90 *:[svg]:text-current",
        warning:
          "bg-card text-warning bg-warning/10 border-warning *:data-[slot=alert-description]:text-warning/90 *:[svg]:text-current",
        danger:
          "bg-card text-danger bg-danger/10 border-danger *:data-[slot=alert-description]:text-danger/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "group-has-[>svg]/alert:col-start-2 font-medium [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "[&_p:not(:last-child)]:mb-4 text-muted-foreground [&_a]:hover:text-foreground text-sm [&_a]:underline [&_a]:underline-offset-3 text-balance md:text-pretty",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("top-2.5 right-3 absolute", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
