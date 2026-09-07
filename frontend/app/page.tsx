import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/common/button";
import { InvertedCard, DataCard } from "@/components/common/card";
import { SeverityBadge, RelevanceBadge } from "@/components/common/badge";
import { Divider } from "@/components/common/divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Severity, RelevanceType } from "@/lib/types";

export default function HomePage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24 lg:px-12 lg:py-32">
      {/* Subtle Monochrome Line Texture */}
      <div className="pointer-events-none absolute inset-0 texture-lines" aria-hidden="true" />

      {/* ------------------------------------------------------------------ */}
      {/* 1. EDITORIAL HERO MOMENT                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {"SIH26108 // Procurement Standards Assistant"}
            </span>
          </div>

          <h1 className="font-serif text-6xl font-bold tracking-tighter leading-none sm:text-7xl md:text-8xl lg:text-9xl">
            STANDARDS
            <br />
            PRECISION<span className="text-primary">.</span>
          </h1>

          <p className="max-w-2xl font-body text-lg leading-relaxed text-muted-foreground md:text-xl">
            AI-powered procurement compliance for Indian Standards (IS/BIS).
            Stark editorial rigor applied to tender health checks, normative gap detection,
            and specification validation.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link href="/tender">
              <Button size="lg" variant="primary">
                Run Tender Health Check <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/standards">
              <Button size="lg" variant="outline">
                Explore Standards
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Decorative Rule with Square */}
        <Divider weight="thick" withSquare className="my-16 md:my-24" />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. THE INVERTED CARD MOMENT (Tender Health Score)                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative my-16">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
            Tender Health Assessment
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {"// Benchmark Document: TND-2026-DEL-041"}
          </span>
        </div>

        <InvertedCard className="my-4">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest opacity-80">
                Compliance Health Score
              </span>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-7xl font-bold tracking-tighter md:text-8xl">
                  82
                </span>
                <span className="font-mono text-xl opacity-70">/ 100</span>
              </div>
              <p className="max-w-md font-body text-sm leading-relaxed opacity-90">
                Analysis identified 1 critical clause conflict (outdated HDPE specification)
                and 2 mandatory certification omissions under BIS Quality Control Orders.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-background/20 pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0">
              <div className="font-mono text-xs uppercase tracking-widest opacity-70">
                Finding Distribution
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="border border-background px-2.5 py-1 font-mono text-xs uppercase tracking-wider">
                  1 Critical
                </span>
                <span className="border border-background/60 px-2.5 py-1 font-mono text-xs uppercase tracking-wider">
                  2 High
                </span>
                <span className="border border-background/40 px-2.5 py-1 font-mono text-xs uppercase tracking-wider">
                  1 Medium
                </span>
                <span className="border border-background/20 px-2.5 py-1 font-mono text-xs uppercase tracking-wider">
                  1 Low
                </span>
              </div>
              <div className="mt-2">
                <Link href="/tender/TND-2026-DEL-041">
                  <Button variant="inverted" size="sm">
                    View Complete Audit Trail →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </InvertedCard>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. ZERO-HUE SEVERITY HIERARCHY MATRIX                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative my-20">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {"Section 02 //"}
          </span>
          <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
            Monochrome Severity Hierarchy
          </h2>
        </div>
        <p className="mb-8 max-w-xl font-body text-sm text-muted-foreground">
          Zero hue. Compliance severity is encoded through progressive border weight,
          surface fill density, explicit Lucide iconography, and small-caps JetBrains Mono labels.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* CRITICAL */}
          <DataCard rulePosition="top" ruleWeight="ultra" className="flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <SeverityBadge severity={Severity.CRITICAL} />
              </div>
              <h3 className="font-serif text-lg font-bold">Ultra Rule</h3>
              <p className="mt-2 font-body text-xs text-muted-foreground">
                8px solid border. Immediate tender disqualification risk or statutory breach.
              </p>
            </div>
            <div className="mt-6 border-t border-border-light pt-3 font-mono text-[10px] uppercase text-muted-foreground">
              Weight: 8px Solid
            </div>
          </DataCard>

          {/* HIGH */}
          <DataCard rulePosition="top" ruleWeight="thick" className="flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <SeverityBadge severity={Severity.HIGH} />
              </div>
              <h3 className="font-serif text-lg font-bold">Thick Rule</h3>
              <p className="mt-2 font-body text-xs text-muted-foreground">
                4px solid border. Missing mandatory certification (e.g. BIS ISI mark).
              </p>
            </div>
            <div className="mt-6 border-t border-border-light pt-3 font-mono text-[10px] uppercase text-muted-foreground">
              Weight: 4px Solid
            </div>
          </DataCard>

          {/* MEDIUM */}
          <DataCard rulePosition="top" ruleWeight="medium" className="flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <SeverityBadge severity={Severity.MEDIUM} />
              </div>
              <h3 className="font-serif text-lg font-bold">Medium Rule</h3>
              <p className="mt-2 font-body text-xs text-muted-foreground">
                2px solid border. Ambiguous testing clauses or unreferenced standards.
              </p>
            </div>
            <div className="mt-6 border-t border-border-light pt-3 font-mono text-[10px] uppercase text-muted-foreground">
              Weight: 2px Solid
            </div>
          </DataCard>

          {/* LOW */}
          <DataCard rulePosition="top" ruleWeight="thin" className="flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <SeverityBadge severity={Severity.LOW} />
              </div>
              <h3 className="font-serif text-lg font-bold">Thin Rule</h3>
              <p className="mt-2 font-body text-xs text-muted-foreground">
                1px standard border. Minor formatting discrepancies or terminology updates.
              </p>
            </div>
            <div className="mt-6 border-t border-border-light pt-3 font-mono text-[10px] uppercase text-muted-foreground">
              Weight: 1px Solid
            </div>
          </DataCard>

          {/* INFO */}
          <DataCard rulePosition="top" ruleWeight="hairline" className="flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <SeverityBadge severity={Severity.INFO} />
              </div>
              <h3 className="font-serif text-lg font-bold">Hairline Rule</h3>
              <p className="mt-2 font-body text-xs text-muted-foreground">
                1px subtle rule. Informational context, cross-references, or guidelines.
              </p>
            </div>
            <div className="mt-6 border-t border-border-light pt-3 font-mono text-[10px] uppercase text-muted-foreground">
              Weight: 1px Hairline
            </div>
          </DataCard>
        </div>

        {/* Relevance Types Preview */}
        <div className="mt-10 border border-border bg-card p-6">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Normative Relevance Classification
          </div>
          <div className="flex flex-wrap gap-2.5">
            <RelevanceBadge relevance={RelevanceType.PRIMARY} />
            <RelevanceBadge relevance={RelevanceType.SAFETY} />
            <RelevanceBadge relevance={RelevanceType.TESTING} />
            <RelevanceBadge relevance={RelevanceType.ALLIED} />
            <RelevanceBadge relevance={RelevanceType.INSTALLATION} />
            <RelevanceBadge relevance={RelevanceType.CONDITIONAL} />
            <RelevanceBadge relevance={RelevanceType.RELATED} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. RETOKENIZED SHADCN TABLE PRIMITIVE                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative my-20">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {"Section 03 //"}
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
              Normative Standards Registry (shadcn Primitive)
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Zero-Override Inheritance
          </span>
        </div>
        <p className="mb-6 max-w-2xl font-body text-sm text-muted-foreground">
          The table below is an unmodified shadcn/ui <code className="font-mono">Table</code>{" "}
          primitive. It inherits pure monochrome borders, zero border radius, zero shadow,
          and theme variable polarity automatically without any per-component hacks.
        </p>

        <div className="border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Standard ID
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Title
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Category
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Status
                </TableHead>
                <TableHead className="text-right font-mono text-xs uppercase tracking-widest text-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono font-bold">IS 4984:2016</TableCell>
                <TableCell className="font-body">
                  High Density Polyethylene (HDPE) Pipes for Water Supply
                </TableCell>
                <TableCell className="font-mono text-xs">Pipes & Fittings</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 font-mono text-xs uppercase">
                    <Check className="h-3.5 w-3.5" /> Active
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link href="/standards/IS-4984" className="font-mono text-xs underline">
                    View Spec →
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-bold">IS 1239 (Part 1)</TableCell>
                <TableCell className="font-body">
                  Steel Tubes, Tubulars and Other Wrought Steel Fittings
                </TableCell>
                <TableCell className="font-mono text-xs">Structural Steel</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 font-mono text-xs uppercase">
                    <Check className="h-3.5 w-3.5" /> Active
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link href="/standards/IS-1239" className="font-mono text-xs underline">
                    View Spec →
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-bold">IS 1536:2001</TableCell>
                <TableCell className="font-body">
                  Centrifugally Cast (Spun) Iron Pressure Pipes for Water, Gas and Sewage
                </TableCell>
                <TableCell className="font-mono text-xs">Cast Iron</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 font-mono text-xs uppercase text-muted-foreground">
                    Superseded
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link href="/standards/IS-1536" className="font-mono text-xs underline">
                    View Spec →
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Footer Divider */}
      <Divider weight="thin" className="my-16" />

      <footer className="flex flex-col items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:flex-row">
        <span>{"SIH26108 // Ministry of Consumer Affairs, Food & Public Distribution"}</span>
        <span>Minimalist Monochrome Design System</span>
      </footer>
    </div>
  );
}
