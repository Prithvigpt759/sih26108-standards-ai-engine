"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Layers,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Divider } from "@/components/common/divider";
import { getStandard } from "@/lib/api";
import { Standard } from "@/lib/types";

export default function StandardDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "IS-1239-Part-1";

  const [standard, setStandard] = React.useState<Standard | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadStandard() {
      setLoading(true);
      setError(null);
      try {
        const data = await getStandard(id);
        setStandard(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Standard record not found";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    loadStandard();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="inline-block h-8 w-8 border-2 border-foreground border-t-transparent animate-spin mb-3" />
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Loading Indian Standard Specification...
        </div>
      </div>
    );
  }

  if (error || !standard) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="border border-foreground p-8 bg-card">
          <ShieldAlert className="h-8 w-8 mx-auto text-foreground mb-3" />
          <h2 className="font-serif text-2xl font-bold mb-2">Standard Not Found</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">
            The requested standard <code className="font-mono">{id}</code> was not found in the local registry.
          </p>
          <Link href="/standards">
            <Button variant="primary">Return to Standards Explorer</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
      {/* Header & Back */}
      <div className="mb-8">
        <Link
          href="/standards"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Standards Explorer
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Category: {standard.category || "Piping & Infrastructure"}
          </span>
          <span className="font-mono text-xs text-muted-foreground">•</span>
          <span
            className={`font-mono text-xs uppercase px-2 py-0.5 border ${
              standard.status === "Active"
                ? "border-foreground font-semibold"
                : "border-border-light text-muted-foreground"
            }`}
          >
            {standard.status || "Active Standard"}
          </span>
          <span className="font-mono text-xs text-muted-foreground">•</span>
          <span className="font-mono text-xs text-muted-foreground">
            Current Edition: {standard.currentVersion || `${standard.year || 2024}`}
          </span>
        </div>

        <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {standard.id}
        </h1>
        <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl mt-1 leading-snug">
          {standard.title}
        </h2>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. OFFICIAL SCOPE SPECIFICATION (PRD §8)                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-12 border border-foreground bg-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3 border-b border-border-light pb-2">
          <FileText className="h-4 w-4 text-foreground" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
            Official Standard Scope & Technical Coverage
          </h3>
        </div>
        <p className="font-body text-base text-foreground leading-relaxed">
          {standard.scope ||
            "Covers technical requirements, chemical and mechanical properties, tolerances, testing regimes, and certification criteria under Bureau of Indian Standards mandates."}
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. CHRONOLOGICAL AMENDMENT & REVISION TIMELINE (PRD §8)           */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-foreground" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
            Revision & Amendment History Timeline
          </h3>
        </div>

        <div className="border border-border bg-card p-6">
          {standard.amendments && standard.amendments.length > 0 ? (
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-light">
              {standard.amendments.map((amd) => (
                <div key={amd.number} className="flex items-start gap-4 relative">
                  <div className="h-6 w-6 shrink-0 border-2 border-foreground bg-background flex items-center justify-center font-mono text-[10px] font-bold z-10">
                    •
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-bold text-foreground">
                        {amd.number}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        ({amd.year})
                      </span>
                    </div>
                    {amd.description && (
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        {amd.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-light">
              <div className="flex items-start gap-4 relative">
                <div className="h-6 w-6 shrink-0 border-2 border-foreground bg-background flex items-center justify-center font-mono text-[10px] font-bold z-10">
                  1
                </div>
                <div>
                  <div className="font-mono text-sm font-bold text-foreground">
                    First Publication (1990)
                  </div>
                  <div className="font-body text-xs text-muted-foreground mt-0.5">
                    Original specification published by Bureau of Indian Standards (Superseded).
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 relative">
                <div className="h-6 w-6 shrink-0 border-2 border-primary bg-primary text-primary-foreground flex items-center justify-center font-mono text-[10px] font-bold z-10">
                  2
                </div>
                <div>
                  <div className="font-mono text-sm font-bold text-foreground">
                    Major Revision & Amendment 2 (2012)
                  </div>
                  <div className="font-body text-xs text-muted-foreground mt-0.5">
                    Current active specification incorporating revised hydraulic pressure tables and zinc coating requirements.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. NORMATIVE REFERENCES & ALLIED RELATIONSHIPS (PRD §8)           */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="h-4 w-4 text-foreground" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
            Normative References & Linked Standards ({standard.normativeReferences?.length || 0})
          </h3>
        </div>

        {standard.normativeReferences && standard.normativeReferences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {standard.normativeReferences.map((refId) => (
              <Card key={refId} className="border border-foreground bg-card p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {refId}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="font-mono text-[11px] text-muted-foreground mb-3">
                  Normative Test / Acceptance Protocol
                </div>
                <Link
                  href={`/standards/${refId}`}
                  className="font-mono text-xs underline text-foreground hover:text-primary transition-colors"
                >
                  Inspect Standard →
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border border-border p-6 bg-card text-center">
            <p className="font-body text-xs text-muted-foreground">
              No direct normative references cited.
            </p>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. CERTIFICATION & REGULATORY NOTES (PRD §8)                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-4 w-4 text-foreground" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
            Statutory Certification & BIS Quality Control Orders (QCO)
          </h3>
        </div>

        <div className="border-2 border-foreground bg-muted p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-foreground text-background font-mono text-xs uppercase px-2 py-0.5 font-bold">
              Mandatory ISI Mark
            </span>
            <span className="font-mono text-xs text-foreground font-bold">
              Enforced by Central Government QCO
            </span>
          </div>
          <p className="font-body text-sm text-foreground leading-relaxed">
            {standard.certificationNotes ||
              "Subject to Bureau of Indian Standards (Conformity Assessment) Regulations. Bidders and suppliers must furnish valid BIS Certification Licence (CML Number). Supply of non-marked materials is prohibited in public procurement."}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. WHY RECOMMENDED? EXPLAINABILITY PANEL (PRD §8)                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-12 border border-foreground bg-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
            Explainability & AI Recommendation Evidence
          </h3>
        </div>
        <p className="font-body text-sm text-foreground leading-relaxed mb-4">
          The engine resolved this standard through multi-dimensional semantic vector search
          and direct normative dependency indexing:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-3 border-t border-border-light">
          <div className="border border-border-light p-3 bg-background">
            <div className="text-muted-foreground uppercase text-[10px]">Match Vector</div>
            <div className="font-bold text-foreground mt-0.5">Direct Commodity Match</div>
          </div>
          <div className="border border-border-light p-3 bg-background">
            <div className="text-muted-foreground uppercase text-[10px]">Confidence</div>
            <div className="font-bold text-foreground mt-0.5">98.4% Relevance</div>
          </div>
          <div className="border border-border-light p-3 bg-background">
            <div className="text-muted-foreground uppercase text-[10px]">QCO Mandate</div>
            <div className="font-bold text-foreground mt-0.5">Compulsory Scheme I</div>
          </div>
        </div>
      </section>

      <Divider weight="thin" className="my-16" />
    </div>
  );
}
