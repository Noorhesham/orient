"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, color, nocustomcol = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(`relative h-4 w-full bg-gray-200 overflow-hidden rounded-full `, className)}
    {...props}
  >
    {nocustomcol ? (
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1  transition-all ${color} `}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    ) : (
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1  transition-all  `}
        style={{ transform: `translateX(-${100 - (value || 0)}%)`, backgroundColor: `${color}` }}
      />
    )}
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
