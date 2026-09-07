/**
 * SIH26108 — API Service Layer
 *
 * TEMPORARY MOCK IMPLEMENTATIONS
 * ==============================
 * All functions below return mock data from `@/mocks/*` fixtures.
 * When the FastAPI backend is ready, replace the mock bodies with
 * real fetch() calls — the function signatures will not change.
 *
 * Rules:
 *   - Components MUST call these functions rather than using raw fetch().
 *   - All return types use shared interfaces from `@/lib/types.ts`.
 *   - Mock responses are deterministic: known IDs return specific fixtures.
 *   - Unknown IDs throw an ApiError-shaped rejection.
 *
 * Derived from:
 *   - Architecture §8 (Mock-First Contract)
 *   - PRD §14 (API Endpoints)
 */

import type {
  AnalysisResult,
  AnalysisSummary,
  ApiError,
  Standard,
  TenderAnalysis,
} from "@/lib/types";

import { ANALYSIS_RESULTS_BY_ID, ALL_ANALYSIS_SUMMARIES } from "@/mocks/analyses";
import { ALL_STANDARDS, STANDARDS_BY_ID } from "@/mocks/standards";
import { TENDER_ANALYSES_BY_ID } from "@/mocks/tenders";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Simulate network latency (200–500ms) */
function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Create a rejected promise matching the ApiError interface */
function rejectNotFound(entity: string, id: string): Promise<never> {
  const error: ApiError = {
    message: `${entity} not found: ${id}`,
    statusCode: 404,
    details: `No ${entity.toLowerCase()} exists with the given identifier.`,
  };
  return Promise.reject(error);
}

// ---------------------------------------------------------------------------
// Requirement Analysis (PRD §6–7, POST /api/analyze, GET /api/analyses/{id})
// ---------------------------------------------------------------------------

export interface AnalyzeRequirementInput {
  requirementText: string;
  product?: string;
  category?: string;
  application?: string;
  language?: string;
}

/**
 * Submit a requirement for AI analysis.
 * Returns a deterministic analysis ID so getAnalysis() can look it up.
 */
export async function analyzeRequirement(
  _input: AnalyzeRequirementInput
): Promise<{ analysisId: string }> {
  await delay(400);
  // Mock: always returns the first demo analysis ID.
  // A real backend would create a new analysis and return its ID.
  return { analysisId: "analysis-001" };
}

/**
 * Retrieve a completed analysis by ID.
 * Returns the full AnalysisResult including requirement, recommendations,
 * certifications, testing requirements, and gap warnings.
 */
export async function getAnalysis(id: string): Promise<AnalysisResult> {
  await delay(300);
  const result = ANALYSIS_RESULTS_BY_ID[id];
  if (!result) return rejectNotFound("Analysis", id);
  return result;
}

// ---------------------------------------------------------------------------
// Tender Analysis (PRD §9–10, POST /api/tender/analyze, GET /api/tender/analyses/{id})
// ---------------------------------------------------------------------------

export interface AnalyzeTenderInput {
  fileName: string;
  // In production, this would include the file or a reference to it.
  // For the mock layer, we only need metadata.
}

/**
 * Submit a tender document for health-check analysis.
 * Returns a deterministic tender-analysis ID.
 */
export async function analyzeTender(
  _input: AnalyzeTenderInput
): Promise<{ analysisId: string }> {
  await delay(500);
  return { analysisId: "tender-analysis-001" };
}

/**
 * Retrieve a completed tender analysis by ID.
 */
export async function getTenderAnalysis(id: string): Promise<TenderAnalysis> {
  await delay(300);
  const result = TENDER_ANALYSES_BY_ID[id];
  if (!result) return rejectNotFound("Tender analysis", id);
  return result;
}

// ---------------------------------------------------------------------------
// Standards Explorer (PRD §11, GET /api/standards, GET /api/standards/{id})
// ---------------------------------------------------------------------------

export interface SearchStandardsParams {
  query?: string;
  category?: string;
  status?: string;
}

/**
 * Search / list standards. Applies basic case-insensitive filtering
 * against the mock dataset.
 */
export async function searchStandards(
  params?: SearchStandardsParams
): Promise<Standard[]> {
  await delay(250);

  let results = ALL_STANDARDS;

  if (params?.query) {
    const q = params.query.toLowerCase();
    results = results.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        (s.scope && s.scope.toLowerCase().includes(q))
    );
  }

  if (params?.category) {
    results = results.filter((s) => s.category === params.category);
  }

  if (params?.status) {
    results = results.filter((s) => s.status === params.status);
  }

  return results;
}

/**
 * Retrieve a single standard by ID.
 */
export async function getStandard(id: string): Promise<Standard> {
  await delay(200);
  const standard = STANDARDS_BY_ID[id];
  if (!standard) return rejectNotFound("Standard", id);
  return standard;
}

// ---------------------------------------------------------------------------
// History (PRD §12 — uses analysis summaries)
// ---------------------------------------------------------------------------

/**
 * Retrieve all past analysis summaries for the history view.
 * Not one of the six required functions, but useful for both developers.
 */
export async function getAnalysisHistory(): Promise<AnalysisSummary[]> {
  await delay(200);
  return ALL_ANALYSIS_SUMMARIES;
}
