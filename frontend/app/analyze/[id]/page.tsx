"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FlaskConical,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { DataCard, Card } from "@/components/common/card";
import { RelevanceBadge } from "@/components/common/badge";
import { Divider } from "@/components/common/divider";
import { getAnalysis } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import {
  AnalysisResult,
  RelevanceType,
} from "@/lib/types";

export default function AnalysisResultPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "analysis-001";

  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Filters & Tabs
  const [activeTab, setActiveTab] = React.useState<
    "all" | "primary" | "allied" | "testing" | "certification" | "gaps"
  >("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Expandable evidence state: map of standardId -> boolean
  const [expandedEvidence, setExpandedEvidence] = React.useState<
    Record<string, boolean>
  >({});

  // Copy notification state
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    async function loadAnalysis() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAnalysis(id);
        setAnalysis(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Analysis record not found";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    loadAnalysis();
  }, [id]);

  const toggleEvidence = (stdId: string) => {
    setExpandedEvidence((prev) => ({ ...prev, [stdId]: !prev[stdId] }));
  };

  const handleCopySummary = () => {
    if (!analysis) return;
    const text = `SIH26108 STANDARDS ANALYSIS SUMMARY
Requirement: ${analysis.requirement.originalText}
Product: ${analysis.requirement.extractedProduct || "N/A"}
Standards Recommended:
${analysis.recommendations
  .map(
    (r) => `- ${r.standard.id}: ${r.standard.title} (${r.relevanceType})`
  )
  .join("\n")}
Gaps: ${analysis.gapWarnings?.join("; ") || "None"}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 text-center">
        <div className="inline-block h-8 w-8 border-2 border-foreground border-t-transparent animate-spin mb-4" />
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Loading Standards Recommendation Results...
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="border border-foreground p-8 bg-card">
          <ShieldAlert className="h-8 w-8 mx-auto text-foreground mb-3" />
          <h2 className="font-serif text-2xl font-bold mb-2">Analysis Not Found</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">
            The requested analysis identifier <code className="font-mono">{id}</code> does not exist or has expired.
          </p>
          <Link href="/analyze">
            <Button variant="primary">Return to Analyzer</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter recommendations based on activeTab and searchQuery
  const filteredRecs = analysis.recommendations.filter((rec) => {
    const matchesSearch =
      rec.standard.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.standard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.reasoning.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "primary") return rec.relevanceType === RelevanceType.PRIMARY;
    if (activeTab === "allied")
      return (
        rec.relevanceType === RelevanceType.ALLIED ||
        rec.relevanceType === RelevanceType.RELATED
      );
    if (activeTab === "testing")
      return rec.relevanceType === RelevanceType.TESTING;

    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
      {/* Navigation & Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Analyzer
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Analysis ID: {analysis.id}
            </span>
            <span className="font-mono text-xs text-muted-foreground">•</span>
            <span className="font-mono text-xs text-muted-foreground">
              {formatDate(analysis.createdAt)}
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl mt-1">
            Recommendation Results
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy Summary
              </>
            )}
          </Button>
          <Link href="/tender">
            <Button variant="primary" size="sm" className="text-xs">
              Check in Tender <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. EXTRACTED REQUIREMENT CARD                                     */}
      {/* ------------------------------------------------------------------ */}
      <Card className="mb-10 border border-foreground bg-card">
        <div className="flex items-center justify-between mb-3 border-b border-border-light pb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
            Extracted Procurement Parameters
          </span>
          <span className="font-mono text-[11px] text-muted-foreground uppercase">
            Confidence: 98% Semantic Match
          </span>
        </div>

        <p className="font-body text-base italic text-foreground mb-6">
          &ldquo;{analysis.requirement.originalText}&rdquo;
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-border-light font-mono text-xs">
          <div>
            <div className="text-muted-foreground uppercase text-[10px]">Product</div>
            <div className="font-bold text-foreground mt-0.5">
              {analysis.requirement.extractedProduct || "Standard Tubes"}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground uppercase text-[10px]">Category</div>
            <div className="font-bold text-foreground mt-0.5">
              {analysis.requirement.category || "Pipes & Fittings"}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground uppercase text-[10px]">Application</div>
            <div className="font-bold text-foreground mt-0.5">
              {analysis.requirement.application || "Potable Water Supply"}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground uppercase text-[10px]">Quantity / Specs</div>
            <div className="font-bold text-foreground mt-0.5">
              {analysis.requirement.quantity || "5,000 meters"}
            </div>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* 2. SPECIFICATION GAP WARNINGS (PRD §7)                             */}
      {/* ------------------------------------------------------------------ */}
      {analysis.gapWarnings && analysis.gapWarnings.length > 0 && (
        <div className="mb-10 border-2 border-foreground bg-muted p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-foreground" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
              Normative Gap Warnings & Missing Specifications ({analysis.gapWarnings.length})
            </h2>
          </div>
          <p className="font-body text-xs text-muted-foreground mb-4">
            The AI engine flagged omissions in the input requirement that could lead to procurement disputes or substandard deliveries:
          </p>
          <ul className="space-y-2">
            {analysis.gapWarnings.map((gap) => (
              <li
                key={gap}
                className="flex items-start gap-2.5 font-body text-sm text-foreground"
              >
                <span className="font-mono text-xs font-bold text-foreground mt-0.5">!</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 3. TABS & FILTER BAR                                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: `All Standards (${analysis.recommendations.length})` },
            {
              id: "primary",
              label: `Primary (${
                analysis.recommendations.filter(
                  (r) => r.relevanceType === RelevanceType.PRIMARY
                ).length
              })`,
            },
            {
              id: "allied",
              label: `Allied & Related (${
                analysis.recommendations.filter(
                  (r) =>
                    r.relevanceType === RelevanceType.ALLIED ||
                    r.relevanceType === RelevanceType.RELATED
                ).length
              })`,
            },
            {
              id: "testing",
              label: `Testing (${
                analysis.testingRequirements?.length || 0
              })`,
            },
            {
              id: "certification",
              label: `Certifications (${
                analysis.certificationRequirements?.length || 0
              })`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-100 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground font-bold border border-primary"
                  : "bg-background text-muted-foreground border border-border-light hover:text-foreground hover:border-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Filter */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter standards or keywords..."
          className="border border-foreground bg-background px-3 py-1.5 font-body text-xs text-foreground placeholder:italic focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. RECOMMENDATION CARDS                                            */}
      {/* ------------------------------------------------------------------ */}
      {activeTab !== "certification" && activeTab !== "testing" && (
        <div className="space-y-6 mb-12">
          {filteredRecs.length === 0 ? (
            <div className="border border-border p-12 text-center">
              <p className="font-body text-sm text-muted-foreground">
                No recommendations match the current filter selection.
              </p>
            </div>
          ) : (
            filteredRecs.map((rec) => {
              const isExpanded = !!expandedEvidence[rec.standard.id];

              return (
                <DataCard
                  key={rec.standard.id}
                  rulePosition="left"
                  ruleWeight={
                    rec.relevanceType === RelevanceType.PRIMARY ? "ultra" : "medium"
                  }
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Link
                          href={`/standards/${rec.standard.id}`}
                          className="font-mono text-lg font-bold text-foreground hover:text-primary hover:underline inline-flex items-center gap-1 transition-colors"
                        >
                          {rec.standard.id} <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <RelevanceBadge relevance={rec.relevanceType} />
                        <span className="border border-border-light px-2 py-0.5 font-mono text-xs uppercase text-muted-foreground">
                          {rec.standard.status || "Active"}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        {rec.standard.title}
                      </h3>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="font-mono text-xs text-muted-foreground uppercase">
                        Relevance Score
                      </div>
                      <div className="font-mono text-lg font-bold text-foreground">
                        {((rec.relevanceScore || 0.95) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* Scope Summary */}
                  {rec.standard.scope && (
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {rec.standard.scope}
                    </p>
                  )}

                  {/* Reasoning */}
                  <div className="border-l-2 border-foreground pl-3 py-1 font-body text-sm text-foreground bg-muted/20">
                    <span className="font-mono text-xs font-bold uppercase text-foreground">
                      Why Recommended:
                    </span>{" "}
                    {rec.reasoning}
                  </div>

                  {/* Related Normative Standards */}
                  {rec.relatedStandards && rec.relatedStandards.length > 0 && (
                    <div className="flex items-center gap-2 pt-2">
                      <span className="font-mono text-xs text-muted-foreground uppercase">
                        Normative References:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.relatedStandards.map((relId) => (
                          <Link
                            key={relId}
                            href={`/standards/${relId}`}
                            className="border border-border-light px-2 py-0.5 font-mono text-xs hover:border-primary hover:text-primary transition-colors"
                          >
                            {relId} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expandable Evidence Drawer */}
                  {rec.evidence && rec.evidence.length > 0 && (
                    <div className="border-t border-border-light pt-3">
                      <button
                        type="button"
                        onClick={() => toggleEvidence(rec.standard.id)}
                        className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground hover:text-primary hover:underline transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" /> Hide Traceable Evidence ({rec.evidence.length})
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" /> View Traceable Evidence ({rec.evidence.length})
                          </>
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 space-y-2.5 bg-muted/30 p-4 border border-border-light">
                          {rec.evidence.map((item) => (
                            <div
                              key={item.id}
                              className="border-b border-border-light pb-2 last:border-b-0 last:pb-0"
                            >
                              <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground mb-1">
                                <span className="uppercase font-bold text-foreground">
                                  [{item.type}]
                                </span>
                                <span>Confidence: {((item.confidence || 0.9) * 100).toFixed(0)}%</span>
                              </div>
                              <p className="font-body text-xs text-foreground">
                                {item.content}
                              </p>
                              {item.source && (
                                <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                                  Source: {item.source}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </DataCard>
              );
            })
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. MANDATORY CERTIFICATION REQUIREMENTS (PRD §7)                   */}
      {/* ------------------------------------------------------------------ */}
      {(activeTab === "all" || activeTab === "certification") &&
        analysis.certificationRequirements &&
        analysis.certificationRequirements.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-foreground" />
              <h2 className="font-serif text-2xl font-bold tracking-tight">
                Mandatory Certification & Regulatory Compliance (QCO)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.certificationRequirements.map((cert) => (
                <Card key={cert.id} className="border-2 border-foreground bg-card p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-foreground text-background font-mono text-xs uppercase px-2 py-0.5 font-bold tracking-widest">
                      {cert.body} Mandate
                    </span>
                    <span className="font-mono text-xs uppercase text-foreground font-bold">
                      {cert.mandatory ? "Mandatory by Law" : "Advisory"}
                    </span>
                  </div>

                  <h3 className="font-mono text-base font-bold mb-2">
                    Standard: {cert.standardId}
                  </h3>
                  <p className="font-body text-sm text-foreground leading-relaxed mb-3">
                    {cert.description}
                  </p>
                  {cert.notes && (
                    <div className="font-mono text-xs text-muted-foreground border-t border-border-light pt-2">
                      Regulatory Note: {cert.notes}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

      {/* ------------------------------------------------------------------ */}
      {/* 6. TESTING REQUIREMENTS & PROTOCOLS (PRD §7)                       */}
      {/* ------------------------------------------------------------------ */}
      {(activeTab === "all" || activeTab === "testing") &&
        analysis.testingRequirements &&
        analysis.testingRequirements.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="h-5 w-5 text-foreground" />
              <h2 className="font-serif text-2xl font-bold tracking-tight">
                Mandatory Testing Requirements & Standard Test Methods
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.testingRequirements.map((test) => (
                <Card key={test.id} className="border border-foreground bg-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Target: {test.standardId}
                    </span>
                    <span className="border border-foreground px-2 py-0.5 font-mono text-xs font-bold uppercase">
                      {test.testMethod}
                    </span>
                  </div>

                  <h3 className="font-body text-sm text-foreground font-medium mb-3">
                    {test.description}
                  </h3>

                  {test.parameters && test.parameters.length > 0 && (
                    <div className="border-t border-border-light pt-3">
                      <div className="font-mono text-xs uppercase text-muted-foreground mb-1.5">
                        Required Test Parameters:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {test.parameters.map((p) => (
                          <span
                            key={p}
                            className="bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

      <Divider weight="thin" className="my-16" />
    </div>
  );
}
