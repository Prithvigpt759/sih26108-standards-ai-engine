/**
 * SIH26108 — Shared Utilities
 *
 * Minimal dependency-free utilities.
 * cn() / classname merging deferred until shadcn/ui or
 * clsx+tailwind-merge are installed by Dev A/B.
 */

/**
 * Format an ISO 8601 date string for display.
 * Uses the browser's Intl.DateTimeFormat for locale-aware formatting.
 */
export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoString));
}
