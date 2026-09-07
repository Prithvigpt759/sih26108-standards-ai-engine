"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/analyze", label: "Requirement Input" },
  { href: "/tender", label: "Tender Check" },
  { href: "/standards", label: "Standards Explorer" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-none">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8 lg:px-12">
        {/* Authoritative Editorial Brand */}
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 font-serif text-lg tracking-tight text-foreground"
        >
          <span className="font-bold text-xl tracking-tighter flex items-center gap-1.5">
            SIH26108
            <span className="inline-block h-1.5 w-1.5 bg-primary" />
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:inline">
            {"// Standards AI Engine"}
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-widest">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors duration-150 hover:underline hover:decoration-2 hover:decoration-primary hover:underline-offset-4",
                      isActive
                        ? "font-bold text-foreground underline decoration-2 decoration-primary underline-offset-4"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
