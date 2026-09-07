"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SkipLinkProps {
  targetId?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Accessible Skip to Main Content link.
 * Styled with Minimalist Monochrome inverted-card treatment on focus:
 * pure rectangular geometry, high contrast 2px border, bold mono typography.
 */
export function SkipLink({
  targetId = "main-content",
  className,
  children = "Skip to main content →",
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only",
        "focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "focus:px-6 focus:py-3",
        "focus:bg-foreground focus:text-background",
        "focus:border-2 focus:border-foreground",
        "focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest",
        "focus:outline focus:outline-[3px] focus:outline-foreground focus:outline-offset-[3px]",
        "transition-none",
        className
      )}
    >
      {children}
    </a>
  );
}
