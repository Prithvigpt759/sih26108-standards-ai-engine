/**
 * Mock Analysis Summary Fixtures (History view)
 *
 * Shared by both developers. Append-only — add new fixtures
 * rather than rewriting existing ones to reduce merge conflicts.
 */

import type { AnalysisSummary, AnalysisResult } from "@/lib/types";
import { REQUIREMENT_STEEL_PIPES, REQUIREMENT_CONCRETE_MIX } from "./requirements";
import {
  RECOMMENDATIONS_STEEL_PIPES,
  RECOMMENDATIONS_CONCRETE_MIX,
  ALL_CERTIFICATION_REQUIREMENTS,
  ALL_TESTING_REQUIREMENTS,
} from "./recommendations";

// ---------------------------------------------------------------------------
// Full AnalysisResult objects (returned by getAnalysis)
// ---------------------------------------------------------------------------

export const ANALYSIS_RESULT_PIPES: AnalysisResult = {
  id: "analysis-001",
  requirement: REQUIREMENT_STEEL_PIPES,
  recommendations: RECOMMENDATIONS_STEEL_PIPES,
  certificationRequirements: ALL_CERTIFICATION_REQUIREMENTS,
  testingRequirements: ALL_TESTING_REQUIREMENTS,
  gapWarnings: [
    "Tender does not specify galvanization coating thickness — consider referencing IS 4736.",
    "No mention of end-protection or packaging requirements for transit.",
  ],
  summary:
    "3 standards identified: IS 1239 Part 1 (Primary), IS 1608 (Testing), IS 3589 (Related). BIS certification is mandatory. 2 specification gaps found.",
  createdAt: "2026-09-07T10:32:00Z",
};

export const ANALYSIS_RESULT_CONCRETE: AnalysisResult = {
  id: "analysis-002",
  requirement: REQUIREMENT_CONCRETE_MIX,
  recommendations: RECOMMENDATIONS_CONCRETE_MIX,
  certificationRequirements: [],
  testingRequirements: [],
  gapWarnings: [
    "No admixture standard referenced — consider IS 9103 for chemical admixtures.",
  ],
  summary:
    "2 standards identified: IS 10262 (Primary), IS 456 (Allied). 1 specification gap found.",
  createdAt: "2026-09-07T14:18:00Z",
};

export const ALL_ANALYSIS_RESULTS: AnalysisResult[] = [
  ANALYSIS_RESULT_PIPES,
  ANALYSIS_RESULT_CONCRETE,
];

export const ANALYSIS_RESULTS_BY_ID: Record<string, AnalysisResult> = Object.fromEntries(
  ALL_ANALYSIS_RESULTS.map((a) => [a.id, a])
);

// ---------------------------------------------------------------------------
// Lightweight summaries for history list (PRD §12)
// ---------------------------------------------------------------------------

export const ANALYSIS_SUMMARY_PIPES: AnalysisSummary = {
  id: "analysis-001",
  inputType: "requirement",
  productSummary: "Galvanized Mild Steel Pipes — Municipal Water Supply",
  date: "2026-09-07T10:32:00Z",
  resultCount: 3,
};

export const ANALYSIS_SUMMARY_CONCRETE: AnalysisSummary = {
  id: "analysis-002",
  inputType: "requirement",
  productSummary: "Ready-Mix Concrete M30 — Bridge Deck Slab",
  date: "2026-09-07T14:18:00Z",
  resultCount: 2,
};

export const ANALYSIS_SUMMARY_TENDER: AnalysisSummary = {
  id: "tender-analysis-001",
  inputType: "tender",
  productSummary: "Jaipur Zone-3 Water Supply Tender",
  date: "2026-09-07T11:00:00Z",
  resultCount: 5,
  tenderScore: 42,
};

export const ALL_ANALYSIS_SUMMARIES: AnalysisSummary[] = [
  ANALYSIS_SUMMARY_PIPES,
  ANALYSIS_SUMMARY_CONCRETE,
  ANALYSIS_SUMMARY_TENDER,
];
