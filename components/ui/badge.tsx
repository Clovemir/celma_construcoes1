import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "accent";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variant === "default" &&
          "border-slate-700/80 bg-slate-900/80 text-slate-100",
        variant === "outline" &&
          "border-slate-600/70 bg-transparent text-slate-200",
        variant === "accent" &&
          "border-orange-400/70 bg-orange-500/10 text-orange-300",
        className
      )}
      {...props}
    />
  );
}

