/**
 * SIH26108 — Monochrome Domain Styling Helpers
 *
 * Encodes Severity and RelevanceType into the Minimalist Monochrome system.
 * Zero hue: differentiation occurs purely via border weight, fill density,
 * explicit Lucide iconography, and uppercase JetBrains Mono labels.
 */

import { Severity, RelevanceType } from "@/lib/types";
import {
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  Info,
  HelpCircle,
  Target,
  Layers,
  FlaskConical,
  Shield,
  Wrench,
  GitBranch,
  Link,
  type LucideIcon,
} from "lucide-react";

export interface SeverityMonochromeConfig {
  label: string;
  icon: LucideIcon;
  /** Border weight utility */
  borderClass: string;
  /** Fill/surface utility */
  fillClass: string;
  /** Small badge presentation */
  badgeClass: string;
  /** Full card rule presentation (top/left rule) */
  cardRuleClass: string;
}

export interface RelevanceMonochromeConfig {
  label: string;
  icon: LucideIcon;
  borderClass: string;
  fillClass: string;
  badgeClass: string;
}

/**
 * Maps finding Severity to monochrome visual hierarchy.
 */
export function getSeverityMonochromeConfig(
  severity: Severity
): SeverityMonochromeConfig {
  switch (severity) {
    case Severity.CRITICAL:
      return {
        label: "CRITICAL",
        icon: AlertOctagon,
        borderClass: "border-4 border-foreground",
        fillClass: "bg-foreground text-background",
        badgeClass:
          "bg-foreground text-background border-2 border-foreground font-mono font-bold tracking-widest text-xs uppercase px-2 py-0.5",
        cardRuleClass: "border-t-8 border-foreground",
      };

    case Severity.HIGH:
      return {
        label: "HIGH",
        icon: AlertTriangle,
        borderClass: "border-2 border-foreground",
        fillClass: "bg-muted text-foreground",
        badgeClass:
          "bg-muted text-foreground border-2 border-foreground font-mono font-semibold tracking-widest text-xs uppercase px-2 py-0.5",
        cardRuleClass: "border-t-4 border-foreground",
      };

    case Severity.MEDIUM:
      return {
        label: "MEDIUM",
        icon: AlertCircle,
        borderClass: "border-2 border-foreground",
        fillClass: "bg-background text-foreground",
        badgeClass:
          "bg-transparent text-foreground border border-foreground font-mono font-medium tracking-widest text-xs uppercase px-2 py-0.5",
        cardRuleClass: "border-t-2 border-foreground",
      };

    case Severity.LOW:
      return {
        label: "LOW",
        icon: Info,
        borderClass: "border border-foreground",
        fillClass: "bg-background text-foreground",
        badgeClass:
          "bg-transparent text-foreground border border-border font-mono tracking-widest text-xs uppercase px-2 py-0.5",
        cardRuleClass: "border-t border-foreground",
      };

    case Severity.INFO:
    default:
      return {
        label: "INFO",
        icon: HelpCircle,
        borderClass: "border border-border-light",
        fillClass: "bg-muted/40 text-muted-foreground",
        badgeClass:
          "bg-transparent text-muted-foreground border border-border-light font-mono tracking-widest text-xs uppercase px-2 py-0.5",
        cardRuleClass: "border-t border-border-light",
      };
  }
}

/**
 * Maps standard recommendation RelevanceType to monochrome visual hierarchy.
 */
export function getRelevanceMonochromeConfig(
  relevance: RelevanceType
): RelevanceMonochromeConfig {
  switch (relevance) {
    case RelevanceType.PRIMARY:
      return {
        label: "PRIMARY",
        icon: Target,
        borderClass: "border-2 border-foreground",
        fillClass: "bg-foreground text-background",
        badgeClass:
          "bg-foreground text-background border border-foreground font-mono font-bold tracking-widest text-xs uppercase px-2 py-0.5",
      };

    case RelevanceType.SAFETY:
      return {
        label: "SAFETY",
        icon: Shield,
        borderClass: "border-2 border-foreground",
        fillClass: "bg-muted text-foreground",
        badgeClass:
          "bg-muted text-foreground border-2 border-foreground font-mono font-semibold tracking-widest text-xs uppercase px-2 py-0.5",
      };

    case RelevanceType.TESTING:
      return {
        label: "TESTING",
        icon: FlaskConical,
        borderClass: "border border-foreground",
        fillClass: "bg-transparent text-foreground",
        badgeClass:
          "bg-transparent text-foreground border border-foreground font-mono tracking-widest text-xs uppercase px-2 py-0.5",
      };

    case RelevanceType.ALLIED:
      return {
        label: "ALLIED",
        icon: Layers,
        borderClass: "border border-foreground",
        fillClass: "bg-transparent text-foreground",
        badgeClass:
          "bg-transparent text-foreground border border-foreground font-mono tracking-widest text-xs uppercase px-2 py-0.5",
      };

    case RelevanceType.INSTALLATION:
      return {
        label: "INSTALLATION",
        icon: Wrench,
        borderClass: "border border-foreground",
        fillClass: "bg-transparent text-foreground",
        badgeClass:
          "bg-transparent text-foreground border border-foreground font-mono tracking-widest text-xs uppercase px-2 py-0.5",
      };

    case RelevanceType.CONDITIONAL:
      return {
        label: "CONDITIONAL",
        icon: GitBranch,
        borderClass: "border border-dashed border-foreground",
        fillClass: "bg-transparent text-foreground",
        badgeClass:
          "bg-transparent text-foreground border border-dashed border-foreground font-mono tracking-widest text-xs uppercase px-2 py-0.5",
      };

    case RelevanceType.RELATED:
    default:
      return {
        label: "RELATED",
        icon: Link,
        borderClass: "border border-border-light",
        fillClass: "bg-transparent text-muted-foreground",
        badgeClass:
          "bg-transparent text-muted-foreground border border-border-light font-mono tracking-widest text-xs uppercase px-2 py-0.5",
      };
  }
}
