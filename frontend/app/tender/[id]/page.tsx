"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  ShieldAlert,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { InvertedCard, DataCard } from "@/components/common/card";
import { SeverityBadge } from "@/components/common/badge";
import { Divider } from "@/components/common/divider";
import { getTenderAnalysis } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { TenderAnalysis, Severity } from "@/lib/types";

export default function TenderResultPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "tender-analysis-001";

  const [tender, setTender] = React.useState<TenderAnalysis | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Severity filter state
  const [selectedSeverity, setSelectedSeverity] = React.useState<
    "ALL" | Severity
  >("ALL");

  // Fix My Tender Studio state
  // Track accepted/rejected status for each finding: findingId -> 'ACCEPTED' | 'REJECTED' | 'PENDING'
  const [fixDecisions, setFixDecisions] = React.useState<
    Record<string, "ACCEPTED" | "REJECTED" | "PENDING">
  >({});

  // Expanded evidence state
  const [expandedEvidence, setExpandedEvidence] = React.useState<
    Record<string, boolean>
  >({});

  // Copy feedback state
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    async function loadTender() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTenderAnalysis(id);
        setTender(data);

        // Initialize fix decisions
        const initial: Record<string, "ACCEPTED" | "REJECTED" | "PENDING"> = {};
        data.findings.forEach((f) => {
          initial[f.id] = "PENDING";
        });
        setFixDecisions(initial);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Tender analysis record not found";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    loadTender();
  }, [id]);

  const handleDecision = (findingId: string, decision: "ACCEPTED" | "REJECTED") => {
    setFixDecisions((prev) => ({
      ...prev,
      [findingId]: prev[findingId] === decision ? "PENDING" : decision,
    }));
  };

  const handleAcceptAll = () => {
    if (!tender) return;
    const allAccepted: Record<string, "ACCEPTED" | "REJECTED" | "PENDING"> = {};
    tender.findings.forEach((f) => {
      allAccepted[f.id] = "ACCEPTED";
    });
    setFixDecisions(allAccepted);
  };

  const handleResetDecisions = () => {
    if (!tender) return;
    const reset: Record<string, "ACCEPTED" | "REJECTED" | "PENDING"> = {};
    tender.findings.forEach((f) => {
      reset[f.id] = "PENDING";
    });
    setFixDecisions(reset);
  };

  // Compute live dynamic health score based on accepted fixes
  const acceptedCount = Object.values(fixDecisions).filter(
    (d) => d === "ACCEPTED"
  ).length;
  const totalFindings = tender?.findings.length || 1;
  const baseScore = tender?.healthScore || 42;
  const calculatedScore = Math.min(
    100,
    Math.round(baseScore + ((100 - baseScore) * acceptedCount) / totalFindings)
  );

  const toggleEvidence = (findingId: string) => {
    setExpandedEvidence((prev) => ({ ...prev, [findingId]: !prev[findingId] }));
  };

  const handleCopyRemediatedSpec = () => {
    if (!tender) return;

    let text = `REMEDIATED TENDER SPECIFICATION SCHEDULE // ${tender.fileName}\n`;
    text += `Target Standard: IS 1239 (Part 1):2004 / Amd 2:2012\n\n`;

    tender.findings.forEach((f, idx) => {
      const decision = fixDecisions[f.id];
      text += `[Clause Item ${idx + 1}] ${f.clause || "General Provision"}: ${f.title}\n`;
      if (decision === "ACCEPTED" && f.recommendedSpec) {
        text += `Adopted Remediation: ${f.recommendedSpec}\n\n`;
      } else {
        text += `Original: ${f.currentSpec || "Not specified in tender"}\n\n`;
      }
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 text-center">
        <div className="inline-block h-8 w-8 border-2 border-foreground border-t-transparent animate-spin mb-4" />
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Loading Tender Health Check Audit...
        </div>
      </div>
    );
  }

  if (error || !tender) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="border border-foreground p-8 bg-card">
          <ShieldAlert className="h-8 w-8 mx-auto text-foreground mb-3" />
          <h2 className="font-serif text-2xl font-bold mb-2">Tender Audit Not Found</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">
            The requested tender analysis identifier <code className="font-mono">{id}</code> does not exist or has expired.
          </p>
          <Link href="/tender">
            <Button variant="primary">Return to Tender Check</Button>
          </Link>
        </div>
      </div>
    );
  }

  const filteredFindings = tender.findings.filter((f) => {
    if (selectedSeverity === "ALL") return true;
    return f.severity === selectedSeverity;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
      {/* Back Navigation & Meta */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/tender"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Upload
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Document: {tender.fileName}
            </span>
            <span className="font-mono text-xs text-muted-foreground">•</span>
            <span className="font-mono text-xs text-muted-foreground">
              {formatDate(tender.uploadedAt)}
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl mt-1">
            Tender Health Check Audit
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/standards">
            <Button variant="outline" size="sm" className="text-xs">
              Standards Explorer
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={handleCopyRemediatedSpec}
            className="text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Spec Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy Remediated Spec
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. HEALTH SCORE HERO INVERTED CARD                                */}
      {/* ------------------------------------------------------------------ */}
      <InvertedCard className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest opacity-80 flex items-center gap-2">
              <span className="h-2 w-2 bg-primary inline-block" />
              Overall Tender Compliance Health Score
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-7xl md:text-8xl font-bold tracking-tighter">
                {calculatedScore}
              </span>
              <div className="font-mono text-xl opacity-70">
                / 100
                {acceptedCount > 0 && (
                  <span className="ml-3 text-xs uppercase tracking-wider block sm:inline font-semibold text-primary-hover">
                    (Base: {baseScore} + Fixes: +{calculatedScore - baseScore})
                  </span>
                )}
              </div>
            </div>

            {/* MANDATORY PRD §9 DISCLAIMER */}
            <div className="border-t border-background/20 pt-3 max-w-xl">
              <p className="font-mono text-xs tracking-wide opacity-90 leading-relaxed font-semibold">
                ⚠️ Analytical prototype indicator — not legal certification.
              </p>
              <p className="font-body text-xs opacity-75 mt-1">
                AI findings represent automated draft guidance to assist procurement officers and require review by a qualified technical engineer prior to tender issuance.
              </p>
            </div>
          </div>

          {/* Audit Metrics */}
          <div className="border-t border-background/20 pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0 space-y-4 font-mono text-xs">
            <div>
              <div className="opacity-70 uppercase text-[10px]">Detected Scope</div>
              <div className="font-bold text-sm mt-0.5">
                {tender.detectedProducts?.join(", ") || "Galvanized Steel Pipes"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="opacity-70 uppercase text-[10px]">Standards Found</div>
                <div className="font-bold text-lg">{tender.standardsFound?.length || 1}</div>
              </div>
              <div>
                <div className="opacity-70 uppercase text-[10px]">Standards Recommended</div>
                <div className="font-bold text-lg">{tender.standardsRecommended?.length || 3}</div>
              </div>
            </div>
            <div>
              <div className="opacity-70 uppercase text-[10px]">Total Findings Flagged</div>
              <div className="font-bold text-lg">{tender.findings.length} Compliance Gaps</div>
            </div>
          </div>
        </div>
      </InvertedCard>

      {/* ------------------------------------------------------------------ */}
      {/* 2. "FIX MY TENDER" INTERACTIVE REMEDIATION STUDIO (PRD §10)        */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-14 border-2 border-foreground bg-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-serif text-2xl font-bold tracking-tight">
                Fix My Tender // Remediation Studio
              </h2>
            </div>
            <p className="font-body text-xs text-muted-foreground">
              Review AI-proposed specification fixes side-by-side. Accept or reject modifications to dynamically improve the tender health score.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAcceptAll}
              className="text-xs"
            >
              <Check className="h-3.5 w-3.5" /> Accept All ({tender.findings.length})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetDecisions}
              className="text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          </div>
        </div>

        {/* Interactive Suggestions List */}
        <div className="space-y-6">
          {tender.findings.map((finding, idx) => {
            const decision = fixDecisions[finding.id] || "PENDING";
            const isAccepted = decision === "ACCEPTED";
            const isRejected = decision === "REJECTED";

            return (
              <div
                key={finding.id}
                className={`border transition-colors duration-100 p-5 ${
                  isAccepted
                    ? "border-primary/60 bg-muted/40"
                    : isRejected
                    ? "border-border-light bg-card opacity-60"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold uppercase text-muted-foreground">
                        Clause #{idx + 1}: {finding.clause || "Specification Clause"}
                      </span>
                      <SeverityBadge severity={finding.severity} />
                      {isAccepted && (
                        <span className="bg-primary text-primary-foreground font-mono text-[10px] uppercase font-bold px-2 py-0.5">
                          ✓ Fix Accepted
                        </span>
                      )}
                      {isRejected && (
                        <span className="border border-border-light text-muted-foreground font-mono text-[10px] uppercase px-2 py-0.5">
                          ✕ Rejected
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      {finding.title}
                    </h3>
                  </div>

                  {/* Accept / Reject Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDecision(finding.id, "ACCEPTED")}
                      className={`h-8 px-3 font-mono text-xs uppercase tracking-wider transition-colors duration-100 ${
                        isAccepted
                          ? "bg-primary text-primary-foreground font-bold border border-primary"
                          : "border border-foreground bg-background hover:border-primary hover:text-primary"
                      }`}
                    >
                      Accept Fix
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecision(finding.id, "REJECTED")}
                      className={`h-8 px-3 font-mono text-xs uppercase tracking-wider transition-colors duration-100 ${
                        isRejected
                          ? "bg-muted-foreground text-background font-bold border border-muted-foreground"
                          : "border border-border-light text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* Side-by-Side Clause Diff */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mb-4">
                  {/* Original Spec */}
                  <div className="border border-border-light p-3 bg-card">
                    <div className="text-muted-foreground uppercase text-[10px] mb-1 font-bold">
                      Original Tender Text (Flagged)
                    </div>
                    <div className="font-body text-xs text-foreground italic">
                      {finding.currentSpec || "Clause omitted in original tender"}
                    </div>
                  </div>

                  {/* AI-Proposed Compliant Spec */}
                  <div className="border-2 border-foreground p-3 bg-muted">
                    <div className="text-foreground uppercase text-[10px] mb-1 font-bold flex items-center justify-between">
                      <span className="text-primary font-bold">AI Proposed Compliant Clause</span>
                      <span className="text-[9px] underline text-muted-foreground">Traceable to Standards</span>
                    </div>
                    <div className="font-body text-xs text-foreground font-semibold">
                      {finding.recommendedSpec || "Consult technical committee"}
                    </div>
                  </div>
                </div>

                {/* Traceability to Evidence */}
                {finding.evidence && finding.evidence.length > 0 && (
                  <div className="border-t border-border-light pt-2">
                    <button
                      type="button"
                      onClick={() => toggleEvidence(finding.id)}
                      className="flex items-center gap-1 font-mono text-xs uppercase text-muted-foreground hover:text-foreground"
                    >
                      {expandedEvidence[finding.id] ? (
                        <>
                          <ChevronUp className="h-3 w-3" /> Hide Traceability Evidence
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3" /> View Traceability Evidence ({finding.evidence.length})
                        </>
                      )}
                    </button>

                    {expandedEvidence[finding.id] && (
                      <div className="mt-2 space-y-1.5 p-3 bg-muted/40 border border-border-light font-body text-xs">
                        {finding.evidence.map((ev) => (
                          <div key={ev.id} className="text-foreground">
                            <span className="font-mono text-[10px] font-bold uppercase text-foreground mr-2">
                              [{ev.type}]:
                            </span>
                            {ev.content} (Confidence: {((ev.confidence || 0.95) * 100).toFixed(0)}%)
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer for Fix My Tender */}
        <div className="mt-6 border-t border-border-light pt-4 font-mono text-[11px] text-muted-foreground">
          <span className="font-bold uppercase text-foreground">Disclaimer:</span> Proposed specification modifications are generated from deterministic mock standards and public procurement rules. Final tender schedules require formal engineering approval.
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. COMPLETE FINDINGS AUDIT LIST                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              Detailed Findings & Defect Categorization
            </h2>
            <p className="font-body text-xs text-muted-foreground">
              Filter by statutory severity to prioritize remediation.
            </p>
          </div>

          {/* Severity Filter Pills */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {(["ALL", Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM, Severity.LOW] as const).map(
              (sev) => {
                const count =
                  sev === "ALL"
                    ? tender.findings.length
                    : tender.findings.filter((f) => f.severity === sev).length;

                return (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-3 py-1 uppercase tracking-wider transition-colors duration-100 ${
                      selectedSeverity === sev
                        ? "bg-primary text-primary-foreground font-bold border border-primary"
                        : "border border-border-light text-muted-foreground hover:text-foreground hover:border-foreground"
                    }`}
                  >
                    {sev} ({count})
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredFindings.map((finding) => (
            <DataCard
              key={finding.id}
              rulePosition="left"
              ruleWeight={
                finding.severity === Severity.CRITICAL
                  ? "ultra"
                  : finding.severity === Severity.HIGH
                  ? "thick"
                  : "medium"
              }
              className="space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={finding.severity} />
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    {finding.clause || "General Provision"}
                  </span>
                </div>
                {finding.standardIds && finding.standardIds.length > 0 && (
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-muted-foreground uppercase text-[10px]">Reference:</span>
                    {finding.standardIds.map((sid) => (
                      <Link
                        key={sid}
                        href={`/standards/${sid}`}
                        className="underline text-foreground hover:text-primary inline-flex items-center gap-0.5 transition-colors"
                      >
                        {sid} <ExternalLink className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <h3 className="font-serif text-lg font-bold text-foreground">
                {finding.title}
              </h3>

              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {finding.description}
              </p>
            </DataCard>
          ))}
        </div>
      </section>

      <Divider weight="thin" className="my-16" />
    </div>
  );
}
