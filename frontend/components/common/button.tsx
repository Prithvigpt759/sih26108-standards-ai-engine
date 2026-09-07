import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "inverted";
  size?: "sm" | "md" | "lg";
}

/**
 * Precision SaaS & Editorial Button
 * Strict rectangular geometry, zero border radius, zero shadow.
 * Electric blue accent on primary actions for distinct visual hierarchy.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variantStyles = {
      primary:
        "bg-primary text-primary-foreground border border-primary hover:bg-primary-hover active:opacity-90",
      outline:
        "bg-transparent text-foreground border border-foreground hover:bg-muted hover:text-foreground",
      ghost:
        "bg-transparent text-foreground border border-transparent hover:underline hover:decoration-2 hover:decoration-primary",
      inverted:
        "bg-background text-foreground border border-background hover:bg-foreground hover:text-background hover:border-foreground",
    }[variant];

    const sizeStyles = {
      sm: "h-9 px-4 text-xs font-mono tracking-widest uppercase",
      md: "h-11 px-6 text-xs font-mono tracking-widest uppercase",
      lg: "h-14 px-8 text-sm font-mono tracking-widest uppercase",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "cursor-pointer select-none font-medium",
          "transition-colors duration-150",
          "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-ring focus-visible:outline-offset-[3px]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          variantStyles,
          sizeStyles,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
