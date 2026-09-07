# Mock Data Fixtures

Shared mock data for the SIH26108 frontend prototype. Both Developer A and Developer B consume these fixtures through `lib/api.ts`.

## Structure

| File | Contents | Primary Owner |
|---|---|---|
| `requirements.ts` | `RequirementExtraction` fixtures | Shared / Dev A |
| `standards.ts` | `Standard` records with relationships | Shared |
| `recommendations.ts` | `StandardRecommendation`, `EvidenceItem`, `CertificationRequirement`, `TestingRequirement` | Shared / Dev B |
| `tenders.ts` | `TenderAnalysis` and `TenderFinding` fixtures | Shared / Dev B |
| `analyses.ts` | `AnalysisResult` (full) and `AnalysisSummary` (history) | Shared |

## Conventions

1. **Append-only**: Add new fixtures rather than rewriting existing ones to avoid merge conflicts.
2. **Typed**: All fixtures must satisfy the interfaces in `lib/types.ts`.
3. **Deterministic IDs**: Use predictable IDs (e.g. `analysis-001`, `tender-analysis-001`) so `lib/api.ts` can look them up by ID.
4. **Lookup maps**: Each file exports a `*_BY_ID` record for fast ID-based access.
5. **Realistic content**: Fixtures should represent plausible Indian Standards / BIS procurement scenarios.

## Current Demo IDs

- `analysis-001` → Steel pipes requirement analysis
- `analysis-002` → Concrete mix requirement analysis
- `tender-analysis-001` → Water supply tender health check
- `req-001` → Steel pipes requirement extraction
- `req-002` → Concrete mix requirement extraction
