import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  inverted?: boolean;
}

/**
 * Standard Monochrome Card
 * Plane-against-background, sharp geometric lines, no shadow, zero radius.
 */
export function Card({
  className,
  inverted = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "p-6 md:p-8",
        inverted
          ? "bg-foreground text-background border-2 border-foreground"
          : "bg-card text-card-foreground border border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Inverted Card for hero moments (e.g. Tender Health Score hero band).
 * Swaps background/text to the opposite pole in both themes.
 */
export function InvertedCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-foreground text-background border-2 border-foreground p-6 md:p-8 relative",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Data Card for Recommendations, Standards, and Tender Findings.
 * Visual weight/rule sits as a top border or left-edge rule rather than a color tint.
 */
export interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rulePosition?: "top" | "left";
  ruleWeight?: "hairline" | "thin" | "medium" | "thick" | "ultra";
  ruleClassName?: string;
}

export function DataCard({
  className,
  rulePosition = "top",
  ruleWeight = "thin",
  ruleClassName,
  children,
  ...props
}: DataCardProps) {
  const weightClasses = {
    hairline: rulePosition === "top" ? "border-t border-t-border-light" : "border-l border-l-border-light",
    thin: rulePosition === "top" ? "border-t border-t-foreground" : "border-l border-l-foreground",
    medium: rulePosition === "top" ? "border-t-2 border-t-foreground" : "border-l-2 border-l-foreground",
    thick: rulePosition === "top" ? "border-t-4 border-t-foreground" : "border-l-4 border-l-foreground",
    ultra: rulePosition === "top" ? "border-t-8 border-t-foreground" : "border-l-8 border-l-foreground",
  }[ruleWeight];

  return (
    <div
      className={cn(
        "bg-card text-card-foreground border border-border p-6",
        weightClasses,
        ruleClassName,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
