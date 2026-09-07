/**
 * SIH26108 — Shared Domain Types
 *
 * Single source of truth for all frontend domain types.
 * Used by both mock fixtures and eventual FastAPI integration.
 *
 * DO NOT put UI-specific component props in this file.
 * DO NOT create duplicate type definitions in component files.
 *
 * Derived from:
 *   - PRD §13 (Core Frontend Data Types)
 *   - PRD §14 (API Endpoints)
 *   - Architecture §8 (Mock-First Contract)
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/** Relevance classification for a standard recommendation (PRD §7, §13) */
export enum RelevanceType {
  PRIMARY = "PRIMARY",
  ALLIED = "ALLIED",
  TESTING = "TESTING",
  SAFETY = "SAFETY",
  INSTALLATION = "INSTALLATION",
  CONDITIONAL = "CONDITIONAL",
  RELATED = "RELATED",
}

/** Finding severity for tender analysis (PRD §9, §13) */
export enum Severity {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  INFO = "INFO",
}

// ---------------------------------------------------------------------------
// Core Domain Types
// ---------------------------------------------------------------------------

/**
 * Result of AI extraction from a natural-language requirement input.
 * PRD §6: requirement input → extraction → standards recommendations.
 */
export interface RequirementExtraction {
  id: string;
  originalText: string;
  extractedProduct?: string;
  category?: string;
  application?: string;
  technicalParameters?: string[];
  quantity?: string;
  language?: string;
  createdAt: string; // ISO 8601
}

/**
 * An Indian Standard (IS/BIS) record.
 * PRD §8: Standard Details screen fields.
 */
export interface Standard {
  id: string;
  title: string;
  scope?: string;
  category?: string;
  status?: string; // e.g. "Active", "Superseded", "Withdrawn"
  currentVersion?: string;
  year?: number;
  amendments?: Amendment[];
  normativeReferences?: string[]; // IDs of referenced standards
  certificationNotes?: string;
  relationships?: StandardRelationship[];
}

/** Amendment/revision entry for a Standard's timeline (PRD §8) */
export interface Amendment {
  number: string;
  year: number;
  description?: string;
}

/**
 * A single standard recommended by the AI for a given requirement.
 * PRD §7: recommendation card fields.
 */
export interface StandardRecommendation {
  standard: Standard;
  relevanceType: RelevanceType;
  relevanceScore?: number; // 0–1
  reasoning: string; // "Why recommended?" explanation
  evidence: EvidenceItem[];
  relatedStandards?: string[]; // IDs
}

/**
 * Evidence supporting a recommendation (PRD §7, §8: "Why recommended?" evidence panel).
 */
export interface EvidenceItem {
  id: string;
  type: string; // e.g. "semantic_match", "keyword", "normative_reference"
  content: string;
  source?: string;
  confidence?: number; // 0–1
}

/**
 * Explicit relationship between two standards (PRD §8).
 */
export interface StandardRelationship {
  sourceId: string;
  targetId: string;
  relationshipType: RelevanceType;
  description?: string;
}

/**
 * Certification/regulatory requirement tied to a standard (PRD §7, §8).
 */
export interface CertificationRequirement {
  id: string;
  standardId: string;
  body: string; // Certifying body, e.g. "BIS", "NABL"
  description: string;
  mandatory: boolean;
  notes?: string;
}

/**
 * Testing/test-method requirement tied to a standard (PRD §7, §8).
 */
export interface TestingRequirement {
  id: string;
  standardId: string;
  testMethod: string; // e.g. "IS 1239 Part 1"
  description: string;
  parameters?: string[];
}

/**
 * A single finding from the Tender Health Check (PRD §9).
 */
export interface TenderFinding {
  id: string;
  type: string; // e.g. "outdated_reference", "missing_standard", "ambiguous_clause"
  severity: Severity;
  title: string;
  description: string;
  clause?: string;
  currentSpec?: string;
  recommendedSpec?: string;
  standardIds?: string[]; // Related standard IDs
  evidence?: EvidenceItem[];
}

/**
 * Full result of a tender document analysis (PRD §9, §10).
 */
export interface TenderAnalysis {
  id: string;
  fileName: string;
  uploadedAt: string; // ISO 8601
  healthScore: number; // 0–100 (prototype indicator, not legal certification)
  findings: TenderFinding[];
  detectedProducts?: string[];
  standardsFound?: string[]; // Standard IDs found in the tender
  standardsRecommended?: string[]; // Standard IDs the AI recommends
  summary?: string;
}

/**
 * Lightweight summary for the history/list view (PRD §12).
 */
export interface AnalysisSummary {
  id: string;
  inputType: "requirement" | "tender";
  productSummary: string;
  date: string; // ISO 8601
  resultCount: number;
  tenderScore?: number; // Only for tender analyses
}

/**
 * Full analysis result returned by getAnalysis().
 * Composition of extraction + recommendations (Architecture §8, PRD §7).
 */
export interface AnalysisResult {
  id: string;
  requirement: RequirementExtraction;
  recommendations: StandardRecommendation[];
  certificationRequirements?: CertificationRequirement[];
  testingRequirements?: TestingRequirement[];
  gapWarnings?: string[]; // Missing requirements / specification gaps (PRD §7)
  summary?: string;
  createdAt: string; // ISO 8601
}

/**
 * Structured API error response (Architecture §9).
 */
export interface ApiError {
  message: string;
  statusCode: number;
  details?: string;
}
