"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-10 h-10 border border-foreground bg-background opacity-0",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "inline-flex items-center justify-center",
        "h-10 px-3 min-w-[44px]",
        "border border-foreground bg-background text-foreground",
        "hover:bg-foreground hover:text-background",
        "font-mono text-xs uppercase tracking-widest",
        "transition-colors duration-100",
        "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-foreground focus-visible:outline-offset-[3px]",
        className
      )}
    >
      {isDark ? (
        <span className="inline-flex items-center gap-2">
          <Sun className="h-4 w-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">Light</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          <Moon className="h-4 w-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">Dark</span>
        </span>
      )}
    </button>
  );
}
