import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  weight?: "hairline" | "thin" | "medium" | "thick" | "ultra";
  withSquare?: boolean;
}

/**
 * Minimalist Monochrome Divider
 * Supports hairline rules for dense screens and bold editorial rules with geometric square for hero sections.
 */
export function Divider({
  className,
  weight = "hairline",
  withSquare = false,
  ...props
}: DividerProps) {
  const lineWeightClass = {
    hairline: "border-t border-border-light",
    thin: "border-t border-foreground",
    medium: "border-t-2 border-foreground",
    thick: "border-t-4 border-foreground",
    ultra: "border-t-8 border-foreground",
  }[weight];

  if (withSquare) {
    return (
      <div className={cn("relative my-10 flex items-center", className)} {...props}>
        <div className={cn("w-full", lineWeightClass)} />
        <div className="absolute left-8 h-3 w-3 -translate-y-1/2 border border-foreground bg-background" />
      </div>
    );
  }

  return <hr className={cn("my-8 border-0", lineWeightClass, className)} {...props} />;
}
