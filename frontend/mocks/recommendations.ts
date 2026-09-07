/**
 * Mock Recommendation Fixtures
 *
 * Linked StandardRecommendations with evidence for the steel-pipes requirement.
 * Shared by both developers. Append-only.
 */

import type {
  StandardRecommendation,
  EvidenceItem,
  CertificationRequirement,
  TestingRequirement,
} from "@/lib/types";
import { RelevanceType } from "@/lib/types";
import {
  STANDARD_IS_1239,
  STANDARD_IS_1608,
  STANDARD_IS_3589,
  STANDARD_IS_10262,
  STANDARD_IS_456,
} from "./standards";

// ---------------------------------------------------------------------------
// Evidence items
// ---------------------------------------------------------------------------

const EVIDENCE_SEMANTIC_PIPE: EvidenceItem = {
  id: "ev-001",
  type: "semantic_match",
  content:
    'Requirement mentions "galvanized mild steel pipes" for "water supply" — directly matches IS 1239 Part 1 scope.',
  source: "AI semantic analysis",
  confidence: 0.95,
};

const EVIDENCE_PRESSURE_MATCH: EvidenceItem = {
  id: "ev-002",
  type: "keyword",
  content:
    "Specified hydraulic test pressure (20 kg/cm²) aligns with IS 1239 Part 1 Table 3 test pressure requirements.",
  source: "Parameter matching",
  confidence: 0.88,
};

const EVIDENCE_TENSILE_REF: EvidenceItem = {
  id: "ev-003",
  type: "normative_reference",
  content:
    "IS 1239 Part 1 normatively references IS 1608 for tensile testing of pipe material — required for acceptance testing.",
  source: "Normative reference chain",
  confidence: 0.92,
};

const EVIDENCE_PIPE_DIAMETER: EvidenceItem = {
  id: "ev-004",
  type: "semantic_match",
  content:
    "50mm nominal bore falls within IS 1239 scope (6mm–150mm). For diameters ≥168.3mm OD, IS 3589 would apply instead.",
  source: "Dimension analysis",
  confidence: 0.90,
};

// ---------------------------------------------------------------------------
// Recommendations for req-001 (steel pipes)
// ---------------------------------------------------------------------------

export const RECOMMENDATIONS_STEEL_PIPES: StandardRecommendation[] = [
  {
    standard: STANDARD_IS_1239,
    relevanceType: RelevanceType.PRIMARY,
    relevanceScore: 0.95,
    reasoning:
      "IS 1239 Part 1 is the directly applicable Indian Standard for mild steel tubes used in water, gas, and sewage lines. The specified 50mm diameter and hydraulic test pressure fall within this standard's scope.",
    evidence: [EVIDENCE_SEMANTIC_PIPE, EVIDENCE_PRESSURE_MATCH, EVIDENCE_PIPE_DIAMETER],
    relatedStandards: ["IS-1239-Part-2", "IS-3589"],
  },
  {
    standard: STANDARD_IS_1608,
    relevanceType: RelevanceType.TESTING,
    relevanceScore: 0.88,
    reasoning:
      "IS 1608 specifies the tensile testing method normatively referenced by IS 1239 Part 1. Required for acceptance testing and quality verification of supplied pipes.",
    evidence: [EVIDENCE_TENSILE_REF],
    relatedStandards: ["IS-1239-Part-1"],
  },
  {
    standard: STANDARD_IS_3589,
    relevanceType: RelevanceType.RELATED,
    relevanceScore: 0.55,
    reasoning:
      "IS 3589 covers electrically welded steel pipes for similar applications (water/gas/sewage) but for larger diameters (≥168.3mm OD). Included for awareness in case the project scope expands.",
    evidence: [EVIDENCE_PIPE_DIAMETER],
    relatedStandards: ["IS-1239-Part-1"],
  },
];

// ---------------------------------------------------------------------------
// Recommendations for req-002 (concrete mix)
// ---------------------------------------------------------------------------

export const RECOMMENDATIONS_CONCRETE_MIX: StandardRecommendation[] = [
  {
    standard: STANDARD_IS_10262,
    relevanceType: RelevanceType.PRIMARY,
    relevanceScore: 0.93,
    reasoning:
      "IS 10262 provides the guidelines for concrete mix proportioning (design mix) explicitly referenced in the requirement for M30 grade concrete.",
    evidence: [
      {
        id: "ev-010",
        type: "keyword",
        content:
          'Requirement explicitly states "design mix as per IS 10262" and specifies M30 grade (30 MPa at 28 days).',
        source: "Keyword extraction",
        confidence: 0.97,
      },
    ],
    relatedStandards: ["IS-456", "IS-383"],
  },
  {
    standard: STANDARD_IS_456,
    relevanceType: RelevanceType.ALLIED,
    relevanceScore: 0.90,
    reasoning:
      "IS 456 is the code of practice for plain and reinforced concrete structural design. The RCC bridge deck slab must conform to IS 456 for structural safety and durability.",
    evidence: [
      {
        id: "ev-011",
        type: "semantic_match",
        content:
          '"RCC bridge deck slab" indicates reinforced concrete construction governed by IS 456.',
        source: "AI semantic analysis",
        confidence: 0.91,
      },
    ],
    relatedStandards: ["IS-10262"],
  },
];

// ---------------------------------------------------------------------------
// Certification & Testing Requirements
// ---------------------------------------------------------------------------

export const CERTIFICATION_BIS_PIPE: CertificationRequirement = {
  id: "cert-001",
  standardId: "IS-1239-Part-1",
  body: "BIS (Bureau of Indian Standards)",
  description:
    "Mandatory BIS Certification Mark (ISI mark) required under the BIS Compulsory Registration Scheme for steel tubes used in water supply.",
  mandatory: true,
  notes: "Suppliers must hold a valid BIS license. Verify license number before procurement.",
};

export const TESTING_TENSILE: TestingRequirement = {
  id: "test-001",
  standardId: "IS-1239-Part-1",
  testMethod: "IS 1608",
  description:
    "Tensile testing of pipe material at ambient temperature to verify yield strength and elongation properties.",
  parameters: ["Yield stress (MPa)", "Tensile strength (MPa)", "Elongation (%)"],
};

export const TESTING_HYDRAULIC: TestingRequirement = {
  id: "test-002",
  standardId: "IS-1239-Part-1",
  testMethod: "IS 1239 Part 1 — Clause 11",
  description:
    "Each pipe must withstand the specified hydraulic test pressure for not less than 5 seconds without leakage.",
  parameters: ["Test pressure (kg/cm²)", "Duration (seconds)", "Leakage (pass/fail)"],
};

export const ALL_CERTIFICATION_REQUIREMENTS: CertificationRequirement[] = [
  CERTIFICATION_BIS_PIPE,
];

export const ALL_TESTING_REQUIREMENTS: TestingRequirement[] = [
  TESTING_TENSILE,
  TESTING_HYDRAULIC,
];
