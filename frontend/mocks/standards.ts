/**
 * Mock Standards Fixtures
 *
 * Shared by both developers. Append-only — add new fixtures,
 * don't rewrite existing ones to avoid merge conflicts.
 */

import type { Standard, Amendment, StandardRelationship } from "@/lib/types";
import { RelevanceType } from "@/lib/types";

// ---------------------------------------------------------------------------
// Standards
// ---------------------------------------------------------------------------

export const STANDARD_IS_1239: Standard = {
  id: "IS-1239-Part-1",
  title: "Steel Tubes, Tubulars and Other Wrought Steel Fittings — Specification (Part 1: Steel Tubes)",
  scope:
    "Covers requirements for mild steel tubes for water, gas, sewage, and air lines including dimensions, weight, tolerances, and hydrostatic test pressures.",
  category: "Steel & Metal Products",
  status: "Active",
  currentVersion: "2004",
  year: 2004,
  amendments: [
    { number: "Amd 1", year: 2008, description: "Revised dimensional tolerance tables" },
    { number: "Amd 2", year: 2012, description: "Updated test pressure requirements" },
  ] satisfies Amendment[],
  normativeReferences: ["IS-228", "IS-1387", "IS-1608"],
  certificationNotes:
    "Mandatory BIS Certification Mark (ISI mark) under BIS Compulsory Registration Scheme for steel tubes.",
  relationships: [
    {
      sourceId: "IS-1239-Part-1",
      targetId: "IS-1239-Part-2",
      relationshipType: RelevanceType.ALLIED,
      description: "Part 2 covers fittings used with Part 1 tubes",
    },
    {
      sourceId: "IS-1239-Part-1",
      targetId: "IS-1608",
      relationshipType: RelevanceType.TESTING,
      description: "Tensile testing method for tube material",
    },
    {
      sourceId: "IS-1239-Part-1",
      targetId: "IS-3589",
      relationshipType: RelevanceType.RELATED,
      description: "Electrically welded steel pipes for water/gas/sewage — larger diameters",
    },
  ] satisfies StandardRelationship[],
};

export const STANDARD_IS_1608: Standard = {
  id: "IS-1608",
  title: "Metallic Materials — Tensile Testing at Ambient Temperature",
  scope:
    "Specifies the method of tensile testing of metallic materials at room temperature including definitions, test pieces, and determination of properties.",
  category: "Testing Methods",
  status: "Active",
  currentVersion: "2005",
  year: 2005,
  amendments: [
    { number: "Amd 1", year: 2010, description: "Revised extensometer gauge length requirements" },
  ],
  normativeReferences: [],
  certificationNotes: undefined,
  relationships: [],
};

export const STANDARD_IS_3589: Standard = {
  id: "IS-3589",
  title: "Electrically Welded Steel Pipes for Water, Gas and Sewage Purposes — Specification",
  scope:
    "Requirements for electrically welded / submerged-arc welded steel pipes of 168.3 mm and above outside diameter for water, gas, sewage, and similar purposes.",
  category: "Steel & Metal Products",
  status: "Active",
  currentVersion: "2001",
  year: 2001,
  amendments: [],
  normativeReferences: ["IS-1608", "IS-1239-Part-1"],
  certificationNotes: "BIS license required for manufacturing and supply.",
  relationships: [
    {
      sourceId: "IS-3589",
      targetId: "IS-1239-Part-1",
      relationshipType: RelevanceType.RELATED,
      description: "Covers smaller-diameter steel tubes for similar applications",
    },
  ],
};

export const STANDARD_IS_10262: Standard = {
  id: "IS-10262",
  title: "Concrete Mix Proportioning — Guidelines",
  scope:
    "Provides guidelines for proportioning concrete mixes using Indian-manufactured cements, aggregates, and admixtures for required workability and compressive strength.",
  category: "Concrete & Cement",
  status: "Active",
  currentVersion: "2019",
  year: 2019,
  amendments: [],
  normativeReferences: ["IS-456", "IS-383", "IS-9103"],
  certificationNotes: undefined,
  relationships: [
    {
      sourceId: "IS-10262",
      targetId: "IS-456",
      relationshipType: RelevanceType.PRIMARY,
      description: "IS 456 governs structural design using concrete proportioned per IS 10262",
    },
    {
      sourceId: "IS-10262",
      targetId: "IS-516",
      relationshipType: RelevanceType.TESTING,
      description: "Compressive strength testing of hardened concrete",
    },
    {
      sourceId: "IS-10262",
      targetId: "IS-383",
      relationshipType: RelevanceType.ALLIED,
      description: "Specification for coarse and fine aggregates from natural sources",
    },
  ],
};

export const STANDARD_IS_456: Standard = {
  id: "IS-456",
  title: "Plain and Reinforced Concrete — Code of Practice",
  scope:
    "Code of practice for general structural use of plain and reinforced concrete covering design, materials, construction, and quality control.",
  category: "Concrete & Cement",
  status: "Active",
  currentVersion: "2000",
  year: 2000,
  amendments: [
    { number: "Amd 1", year: 2005, description: "Revised durability requirements" },
    { number: "Amd 2", year: 2013, description: "Updated seismic provisions" },
  ],
  normativeReferences: ["IS-10262", "IS-1786", "IS-383"],
  certificationNotes: undefined,
  relationships: [],
};

// Convenience lookup
export const ALL_STANDARDS: Standard[] = [
  STANDARD_IS_1239,
  STANDARD_IS_1608,
  STANDARD_IS_3589,
  STANDARD_IS_10262,
  STANDARD_IS_456,
];

export const STANDARDS_BY_ID: Record<string, Standard> = Object.fromEntries(
  ALL_STANDARDS.map((s) => [s.id, s])
);
