import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "boxed" | "underline";
}

/**
 * Minimalist Monochrome Input
 * Crisp geometric border, zero border radius, italic muted placeholder,
 * thick border focus state without colored halo.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "boxed", type, ...props }, ref) => {
    const variantStyles =
      variant === "underline"
        ? "border-b-2 border-foreground bg-transparent px-0 py-2 focus:border-b-4 focus:outline-none"
        : "border border-foreground bg-background px-4 py-3 focus:border-2 focus:outline-none";

    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full text-foreground placeholder:text-muted-foreground placeholder:italic",
          "font-body text-base",
          "transition-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles,
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
