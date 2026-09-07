/**
 * Mock Requirement Extraction Fixtures
 *
 * Shared by both developers. Append-only — add new fixtures,
 * don't rewrite existing ones to avoid merge conflicts.
 */

import type { RequirementExtraction } from "@/lib/types";

export const REQUIREMENT_STEEL_PIPES: RequirementExtraction = {
  id: "req-001",
  originalText:
    "Supply of 50mm diameter galvanized mild steel pipes conforming to relevant Indian Standards for municipal water supply network in Zone-3, Jaipur. Pipes must withstand minimum 20 kg/cm² hydraulic test pressure. Total quantity approximately 12,000 running meters. Must include compatible fittings and joints.",
  extractedProduct: "Galvanized Mild Steel Pipes",
  category: "Steel & Metal Products",
  application: "Municipal Water Supply",
  technicalParameters: [
    "Diameter: 50mm",
    "Material: Galvanized Mild Steel",
    "Hydraulic test pressure: ≥20 kg/cm²",
    "Type: Threaded / socketed joints",
  ],
  quantity: "12,000 running meters",
  language: "en",
  createdAt: "2026-09-07T10:30:00Z",
};

export const REQUIREMENT_CONCRETE_MIX: RequirementExtraction = {
  id: "req-002",
  originalText:
    "Procurement of ready-mix concrete M30 grade for construction of RCC bridge deck slab for NH-48 bypass. Concrete must use OPC 43 grade cement, conform to design mix as per applicable IS codes, and achieve 28-day compressive strength of 30 MPa. Estimated volume: 850 cubic meters. Supplier must provide mix design report and cube test certificates.",
  extractedProduct: "Ready-Mix Concrete M30",
  category: "Concrete & Cement",
  application: "Bridge Deck Slab — RCC Construction",
  technicalParameters: [
    "Grade: M30",
    "Cement: OPC 43 Grade",
    "28-day compressive strength: ≥30 MPa",
    "Design mix as per IS 10262",
  ],
  quantity: "850 cubic meters",
  language: "en",
  createdAt: "2026-09-07T14:15:00Z",
};

export const ALL_REQUIREMENTS: RequirementExtraction[] = [
  REQUIREMENT_STEEL_PIPES,
  REQUIREMENT_CONCRETE_MIX,
];

export const REQUIREMENTS_BY_ID: Record<string, RequirementExtraction> = Object.fromEntries(
  ALL_REQUIREMENTS.map((r) => [r.id, r])
);
