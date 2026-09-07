/**
 * Mock Tender Analysis Fixtures
 *
 * Shared by both developers. Append-only — add new fixtures
 * rather than rewriting existing ones to reduce merge conflicts.
 */

import type { TenderAnalysis, TenderFinding } from "@/lib/types";
import { Severity } from "@/lib/types";

// ---------------------------------------------------------------------------
// Tender Findings
// ---------------------------------------------------------------------------

const FINDING_OUTDATED_PIPE_STD: TenderFinding = {
  id: "finding-001",
  type: "outdated_reference",
  severity: Severity.CRITICAL,
  title: "Outdated Standard Reference: IS 1239 (1990 edition)",
  description:
    "Tender clause references IS 1239:1990 which has been superseded by IS 1239:2004 with two subsequent amendments. Using the outdated edition may result in non-compliant procurement.",
  clause: "Clause 4.2 — Material Specification",
  currentSpec: "IS 1239:1990",
  recommendedSpec: "IS 1239 (Part 1):2004 / Amd 2:2012",
  standardIds: ["IS-1239-Part-1"],
  evidence: [
    {
      id: "ev-t01",
      type: "version_check",
      content:
        "IS 1239:1990 was superseded by IS 1239 (Part 1):2004. Two amendments (2008, 2012) have since been published.",
      source: "Standards version database",
      confidence: 0.98,
    },
  ],
};

const FINDING_MISSING_TESTING: TenderFinding = {
  id: "finding-002",
  type: "missing_standard",
  severity: Severity.HIGH,
  title: "Missing Testing Standard Reference",
  description:
    "Tender specifies tensile strength requirements for steel pipes but does not reference the applicable test method standard IS 1608.",
  clause: "Clause 5.1 — Acceptance Testing",
  currentSpec: undefined,
  recommendedSpec: "IS 1608:2005 — Metallic Materials — Tensile Testing at Ambient Temperature",
  standardIds: ["IS-1608"],
  evidence: [
    {
      id: "ev-t02",
      type: "gap_analysis",
      content:
        "Tensile testing requirements are mentioned but no IS/ISO test method is cited. IS 1608 is the normative reference for tensile testing of steel per IS 1239.",
      source: "Normative reference chain analysis",
      confidence: 0.91,
    },
  ],
};

const FINDING_NO_CERTIFICATION: TenderFinding = {
  id: "finding-003",
  type: "missing_standard",
  severity: Severity.HIGH,
  title: "No BIS Certification Requirement Specified",
  description:
    "Steel tubes for water supply fall under BIS Compulsory Registration Scheme. The tender does not require suppliers to hold a valid BIS license or supply ISI-marked products.",
  clause: "Clause 3.0 — Eligibility Criteria",
  currentSpec: undefined,
  recommendedSpec:
    "Add: Supplier must hold valid BIS license for IS 1239. All supplied pipes must bear ISI certification mark.",
  standardIds: ["IS-1239-Part-1"],
};

const FINDING_AMBIGUOUS_CLAUSE: TenderFinding = {
  id: "finding-004",
  type: "ambiguous_clause",
  severity: Severity.MEDIUM,
  title: "Ambiguous Hydraulic Test Pressure Specification",
  description:
    'Tender states pipes must withstand "adequate" hydraulic test pressure without specifying the exact value. IS 1239 Part 1 Table 3 specifies minimum test pressures by class and diameter.',
  clause: "Clause 5.3 — Hydrostatic Testing",
  currentSpec: '"Adequate hydraulic test pressure"',
  recommendedSpec:
    "Specify: Hydraulic test pressure as per IS 1239 (Part 1):2004 Table 3 — minimum 50 kg/cm² for 50mm medium class tubes",
  standardIds: ["IS-1239-Part-1"],
};

const FINDING_MISSING_INSTALLATION: TenderFinding = {
  id: "finding-005",
  type: "missing_standard",
  severity: Severity.LOW,
  title: "No Installation Standard Referenced",
  description:
    "Tender covers pipe supply but does not reference any installation standard or code of practice for laying water supply pipelines.",
  clause: undefined,
  currentSpec: undefined,
  recommendedSpec:
    "Consider referencing IS 5822 — Code of Practice for Laying of Pipes for Water Supply",
  standardIds: [],
};

// ---------------------------------------------------------------------------
// Tender Analysis
// ---------------------------------------------------------------------------

export const TENDER_ANALYSIS_PIPES: TenderAnalysis = {
  id: "tender-analysis-001",
  fileName: "Jaipur_Zone3_WaterSupply_Tender_2026.pdf",
  uploadedAt: "2026-09-07T11:00:00Z",
  healthScore: 42,
  findings: [
    FINDING_OUTDATED_PIPE_STD,
    FINDING_MISSING_TESTING,
    FINDING_NO_CERTIFICATION,
    FINDING_AMBIGUOUS_CLAUSE,
    FINDING_MISSING_INSTALLATION,
  ],
  detectedProducts: ["Galvanized Mild Steel Pipes", "Pipe Fittings", "Joints"],
  standardsFound: ["IS-1239-Part-1"],
  standardsRecommended: ["IS-1239-Part-1", "IS-1608", "IS-3589"],
  summary:
    "Tender has significant compliance gaps: references an outdated edition of IS 1239, lacks mandatory BIS certification requirement, and omits required testing standard references. 5 findings across Critical (1), High (2), Medium (1), and Low (1) severity.",
};

export const ALL_TENDER_ANALYSES: TenderAnalysis[] = [TENDER_ANALYSIS_PIPES];

export const TENDER_ANALYSES_BY_ID: Record<string, TenderAnalysis> = Object.fromEntries(
  ALL_TENDER_ANALYSES.map((t) => [t.id, t])
);
