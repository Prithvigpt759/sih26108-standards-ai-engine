import * as React from "react";
import { Severity, RelevanceType } from "@/lib/types";
import {
  getSeverityMonochromeConfig,
  getRelevanceMonochromeConfig,
} from "@/lib/monochrome";
import { cn } from "@/lib/utils";

export function SeverityBadge({
  severity,
  className,
}: {
  severity: Severity;
  className?: string;
}) {
  const config = getSeverityMonochromeConfig(severity);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        config.badgeClass,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
      <span>{config.label}</span>
    </span>
  );
}

export function RelevanceBadge({
  relevance,
  className,
}: {
  relevance: RelevanceType;
  className?: string;
}) {
  const config = getRelevanceMonochromeConfig(relevance);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        config.badgeClass,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
      <span>{config.label}</span>
    </span>
  );
}
