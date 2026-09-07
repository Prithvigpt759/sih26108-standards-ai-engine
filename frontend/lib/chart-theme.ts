/**
 * SIH26108 — Recharts Monochrome Theme Helper
 *
 * Strict Zero-Hue charting configuration for compliance and standards analytics.
 * Recharts series are differentiated by stroke pattern (solid/dashed/dotted),
 * stroke width, and fill opacity — never by color hue.
 *
 * All line, axis, and text styles consume theme tokens (var(--foreground),
 * var(--border-light), var(--muted-foreground), var(--card)) so charts
 * automatically adapt between light and dark modes.
 */

export interface MonochromeSeriesConfig {
  stroke: string;
  fill: string;
  strokeWidth: number;
  strokeDasharray?: string;
  fillOpacity: number;
}

/**
 * Differentiated series styles for multi-line and multi-area charts.
 */
export const chartSeries: MonochromeSeriesConfig[] = [
  // Series 0: Primary (e.g. Current Tender / Analyzed Standard) - Solid, Bold Electric Blue
  {
    stroke: "var(--primary)",
    fill: "var(--primary)",
    strokeWidth: 2.5,
    strokeDasharray: "0 0",
    fillOpacity: 0.22,
  },
  // Series 1: Benchmark / Reference Standard - Dashed
  {
    stroke: "var(--foreground)",
    fill: "var(--foreground)",
    strokeWidth: 2,
    strokeDasharray: "6 4",
    fillOpacity: 0.12,
  },
  // Series 2: Baseline / Threshold / Minimum Compliance - Dotted
  {
    stroke: "var(--muted-foreground)",
    fill: "var(--muted-foreground)",
    strokeWidth: 1.5,
    strokeDasharray: "2 3",
    fillOpacity: 0.06,
  },
  // Series 3: Allied / Secondary Comparison - Long Dash Dot
  {
    stroke: "var(--foreground)",
    fill: "var(--foreground)",
    strokeWidth: 2,
    strokeDasharray: "10 4 2 4",
    fillOpacity: 0.18,
  },
];

/**
 * Standard CartesianGrid props for Recharts.
 */
export const chartGridProps = {
  stroke: "var(--border-light)",
  strokeDasharray: "3 3",
  vertical: false,
};

/**
 * Standard XAxis & YAxis styling props.
 */
export const chartAxisProps = {
  stroke: "var(--border-light)",
  tickLine: { stroke: "var(--border-light)" },
  axisLine: { stroke: "var(--border-light)" },
  tick: {
    fill: "var(--muted-foreground)",
    fontSize: 12,
    fontFamily: "var(--font-mono)",
  },
};

/**
 * Standard Tooltip styling props.
 */
export const chartTooltipProps = {
  contentStyle: {
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 0,
    boxShadow: "none",
    color: "var(--foreground)",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    padding: "8px 12px",
  },
  itemStyle: {
    color: "var(--foreground)",
    fontSize: 12,
  },
  labelStyle: {
    color: "var(--muted-foreground)",
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "4px",
  },
  cursor: {
    stroke: "var(--foreground)",
    strokeWidth: 1,
    strokeDasharray: "4 4",
  },
};

/**
 * Standard Legend styling props.
 */
export const chartLegendProps = {
  wrapperStyle: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    paddingTop: 16,
    color: "var(--foreground)",
  },
};
