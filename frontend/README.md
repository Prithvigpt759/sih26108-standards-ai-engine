# SIH26108 — AI-Powered Standards Recommendation & Tender Compliance Engine

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![Status](https://img.shields.io/badge/Status-Hackathon_Prototype-brightgreen?style=for-the-badge)]()

> **Smart India Hackathon 2026 | Problem Statement 26108**  
> *Domain: Smart Automation / Public Procurement / Bureau of Indian Standards (BIS)*

---

## 📌 Executive Summary

Public procurement in India involves thousands of tenders published across platforms like the **Government e-Marketplace (GeM)**, Indian Railways, and public sector undertakings. A recurring challenge is the specification of **obsolete, incomplete, or ambiguous standards**, leading to supplier disputes, substandard deliveries, and legal complications.

**SIH26108 Standards AI Engine** is an intelligent, authoritative compliance platform designed for procurement officers, technical committees, and bidders. It bridges natural-language procurement requirements with formal statutory **Bureau of Indian Standards (BIS/IS)** frameworks:

1. **Translates** vague procurement descriptions into exact, applicable Indian Standards and normative reference chains.
2. **Flags** missing parameters (testing methods, safety criteria, dimensions) before tender publication.
3. **Audits** uploaded tender documents (PDF/TXT), detects non-compliant or superseded clauses, and computes a dynamic **Tender Health Score**.
4. **Remediates** flagged clauses in real time through an interactive side-by-side **"Fix My Tender" Studio**.

---

## ⚡ Key Capabilities & Modules

### 🔍 1. Natural-Language Requirement Analyzer (Module 01)
- Accepts unstructured procurement descriptions (e.g., *"5000 meters ERW galvanized steel pipes for drinking water supply in rural areas"*).
- Extracts core technical entities: product category, dimensions, grade, and application scope.
- Recommends standards classified into **Primary**, **Allied/Related**, **Testing Protocols**, and **Mandatory Certifications**.
- Provides explicit AI explainability with traceable reasoning citations.

### 🛡️ 2. Tender Health Check & Audit Engine (Module 02)
- Parses tender documents (PDF/TXT) using high-speed C-based text extraction.
- Cross-references clauses against the Indian Standards repository.
- Computes an authoritative **Tender Health Score (0–100)** measuring compliance risk.
- Displays detected defects categorized by statutory severity: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, and `INFO`.

### 🛠️ 3. "Fix My Tender" Remediation Studio (Module 03)
- Interactive side-by-side clause remediation tool.
- Displays the original flagged tender clause alongside an AI-generated, standards-compliant replacement clause.
- **Dynamic Score Recalculation**: Accepting or rejecting proposed fixes immediately updates the live Health Score in real time.
- Single-click export of a fully remediated tender specification schedule.

### 📚 4. Indian Standards Explorer & Knowledge Graph (Module 04)
- Deep catalog of Indian Standards (BIS/IS), normative dependencies, and test methods.
- Search and filter by Standard ID (e.g., `IS 1239`, `IS 456`), material type, or subject.
- Dual-mode inspection: Card grid view and dense tabular data table.
- Detail view showing full scope, revision timelines, amendment histories, and linked normative references.

### ⚖️ 5. Quality Control Order (QCO) & Certification Tracking (Module 05)
- Flags statutory certifications made mandatory by Central Government Quality Control Orders.
- Identifies compulsory **ISI Mark (Scheme I)** mandates and BIS License (CML Number) requirements.
- Distinguishes between statutory mandates enforceable by law and advisory best practices.

### 🕒 6. Audit Trail & History (Module 06)
- Session-based historical log of all past requirement analyses and tender audits.
- Instant access to historical findings, scores, and remediated documents.

---

## 📐 Architecture & Technology Stack

The platform is designed around a **decoupled, contract-first architecture**: the frontend communicates with the analysis engine through an explicit, typed contract layer (`lib/api.ts` and `lib/types.ts`) ensuring 1:1 schema parity with the FastAPI backend.

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER (Next.js 16 App Router)               │
│                                                                         │
│   Overview (/)      Requirement (/analyze)     Tender (/tender)         │
│   Standards (/standards)                       History & Settings       │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │               Minimalist Monochrome Design System               │   │
│   │    Tailwind CSS v4  •  Semantic Tokens  •  Zero-Radius/Shadow   │   │
│   │    Lucide Icons     •  Recharts  •  Accessible Severity Matrix  │   │
│   └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Typed Contract Layer
                                     │ (lib/api.ts ↔ lib/types.ts)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      BACKEND LAYER (FastAPI + Python 3.11)              │
│                                                                         │
│   REST Endpoints:                                                       │
│   • POST /api/analyze         (NLP Requirement Extraction)              │
│   • POST /api/tender/analyze  (Tender PDF Audit & Health Score)         │
│   • GET  /api/standards       (Normative Knowledge Base CRUD)           │
│                                                                         │
│   ┌────────────────────────┐  ┌─────────────────────────────────────┐   │
│   │   PyMuPDF (fitz)       │  │   Domain Services                   │   │
│   │   Tender PDF Parser    │  │   • Requirement Extractor           │   │
│   │                        │  │   • Recommendation Engine           │   │
│   └────────────────────────┘  │   • Tender Health Score Engine      │   │
│                               └─────────────────────────────────────┘   │
│                                                │                        │
│                                                ▼                        │
│                               ┌─────────────────────────────────────┐   │
│                               │   SQLAlchemy 2.0 ORM                │   │
│                               │   SQLite / PostgreSQL Database      │   │
│                               └─────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Complete Stack Breakdown

| Layer | Technology | Purpose & Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16.3.4 (App Router)** | Hybrid static/server rendering, fast routing, enterprise SEO and accessibility. |
| **UI Library** | **React 19.2.8** | Reactive state coordination, seamless component tree updates, client forms. |
| **Language** | **TypeScript 5 (Strict)** | Static typing, compile-time contract enforcement, zero runtime type errors. |
| **Styling** | **Tailwind CSS v4** | CSS-first token styling via custom properties (`globals.css`), zero JS runtime cost. |
| **Design Language** | **Minimalist Monochrome + Blue** | 85–90% neutral black/white foundation with electric blue (`#0052FF`) precision accent. |
| **Geometric Standard** | **Zero-Radius & Zero-Shadow** | Mathematical square aesthetic (`--radius: 0px`, `box-shadow: none`), enforced by CI. |
| **Icons & Visuals** | **Lucide React** | Lightweight, authoritative SVG icons for severity and statutory statuses. |
| **Backend Framework** | **FastAPI 0.115** | Async high-speed ASGI web service, native type validation, interactive `/docs`. |
| **Data Modeling** | **Pydantic v2** | Rust-backed schema validation, 1:1 schema parity with frontend TypeScript types. |
| **Database & ORM** | **SQLAlchemy 2.0 + SQLite** | Relational persistence, zero-setup local execution, instant upgrade path to PostgreSQL. |
| **Document Parser** | **PyMuPDF (`fitz`)** | Fast C-based text stream extraction from tender PDFs without external cloud APIs. |

---

## 🎨 Design System Philosophy: Minimalist Monochrome

Public procurement software handles statutory compliance, public funds, and legal specifications. A generic, consumer-style SaaS template diminishes authority. SIH26108 adheres to strict design principles:

- **Editorial Authority**: Clear typographical hierarchy using Playfair Display (Serif), Source Serif 4, and JetBrains Mono (Monospace) for data metrics.
- **Controlled Accent Layer**: Electric blue (`#0052FF → #4D7CFF`) is reserved strictly for primary interactive CTAs, active navigation indicators, and analytical highlights.
- **Accessible Severity Hierarchy**: Severity levels (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `INFO`) are distinguishable through structural border weight (`border-4` to `border-1`), fills, icons, and monospace labels — never by color alone.
- **Zero Drift Enforcement**: A dedicated CI linter (`npm run check:monochrome`) ensures no stray rounded corners or shadows ever enter the codebase.

---

## 📁 Repository Structure

```text
sih26108-standards-ai-engine/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML shell, fonts, light theme lock
│   │   ├── globals.css             # Semantic CSS tokens & monochrome rules
│   │   ├── page.tsx                # Hero overview & feature showcase
│   │   ├── analyze/
│   │   │   ├── page.tsx            # Requirement input & prompt chips
│   │   │   └── [id]/page.tsx       # Recommendation results, QCOs, testing protocols
│   │   ├── tender/
│   │   │   ├── page.tsx            # Tender upload & sample file loader
│   │   │   └── [id]/page.tsx       # Health Check Audit & "Fix My Tender" Studio
│   │   ├── standards/
│   │   │   ├── page.tsx            # BIS standards explorer (grid + table view)
│   │   │   └── [id]/page.tsx       # Specification detail, scope, and revision timeline
│   │   ├── history/page.tsx        # Audit trail of past analyses
│   │   └── settings/page.tsx       # System config & architecture status
│   ├── components/
│   │   ├── common/                 # Button, Card, Badge, Divider, Input, SkipLink
│   │   ├── layout/                 # Authoritative Header & Navigation
│   │   └── ui/                     # Accessible shadcn Table primitive
│   ├── lib/
│   │   ├── types.ts                # Shared TypeScript domain contracts
│   │   ├── api.ts                  # Mock-first typed service client layer
│   │   ├── monochrome.ts           # Severity & relevance styling helpers
│   │   ├── chart-theme.ts          # Accessible Recharts palette helper
│   │   └── utils.ts                # Class merging (cn) & date formatters
│   ├── mocks/                      # Deterministic mock fixtures for offline testing
│   ├── scripts/
│   │   └── check-monochrome.mjs    # CI linter enforcing zero-radius / zero-shadow
│   └── package.json
│
├── backend/                        # FastAPI AI Analysis Engine (Prototype)
│   ├── app/
│   │   ├── main.py                 # FastAPI application entrypoint & middleware
│   │   ├── database.py             # SQLAlchemy engine & session factory
│   │   ├── models.py               # Database ORM models (Standard, Amendment, Relation)
│   │   ├── schemas.py              # Pydantic request & response models
│   │   ├── seed.py                 # Initial BIS standards dataset seeder
│   │   ├── routes/                 # Standards, Analysis, Tender, and Health routes
│   │   └── services/               # Requirement extractor, tender analyzer, recommender
│   ├── data/                       # Standard definitions and relationship JSON graphs
│   └── requirements.txt
│
├── TECH_STACK.md                   # Comprehensive tech stack & architectural rationale
└── README.md                       # Project master documentation
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **Python**: `3.11+`
- **Package Managers**: `npm` (frontend) and `pip` (backend)

---

### 1. Running the Frontend

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

#### Running Quality Checks

```bash
# Verify zero-radius & zero-shadow monochrome design constraints
npm run check:monochrome

# Run TypeScript type safety check
npx tsc --noEmit

# Run ESLint
npm run lint

# Compile production build
npm run build
```

---

### 2. Running the Backend Engine

```bash
# Navigate to the backend directory
cd backend

# Create and activate a Python virtual environment
python3 -m venv .venv
source .venv/bin/activate       # On Windows: .venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the API server with live reloading
uvicorn app.main:app --reload --port 8000

# Open interactive API documentation in your browser
# Swagger UI: http://127.0.0.1:8000/docs
# ReDoc:      http://127.0.0.1:8000/redoc
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Input / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/analyze` | Extracts requirements & recommends standards | JSON `{ "query": "..." }` |
| `GET` | `/api/analyses/{id}` | Retrieves completed analysis details & QCOs | Path: `id` |
| `POST` | `/api/tender/analyze` | Audits tender document & returns Health Score | `multipart/form-data` (file) |
| `GET` | `/api/tender/{id}` | Retrieves tender audit & clause findings | Path: `id` |
| `GET` | `/api/standards` | Searches Indian Standards knowledge base | Query: `q`, `category`, `status` |
| `GET` | `/api/standards/{id}` | Retrieves detailed specification & history | Path: `id` |
| `GET` | `/health` | Service health status check | None |

---

## 🛡️ Verification & CI Standards

The repository enforces strict code quality gates:

- **100% Type-Safe**: `tsc --noEmit` validates all shared interfaces between services and components.
- **Zero Runtime Style Drift**: `check:monochrome` inspects all classes to ensure that no arbitrary shadows or rounded border radii bypass the design system.
- **Accessibility First**: Semantic HTML5 landmark tags (`<main>`, `<nav>`, `<header>`), dedicated `SkipLink` for keyboard navigation, and high-contrast WCAG AAA text ratios.
- **Offline Reliability**: Deterministic mock data allows full demonstration of all user workflows without relying on external network connectivity.

---

## ⚠️ Statutory Disclaimer

> **Analytical Prototype Disclaimer**:  
> This platform is developed as a prototype for **Smart India Hackathon 2026**. Recommendations, defect findings, and Health Scores generated by the AI engine represent automated draft guidance to assist procurement officers and tender creators. AI findings **do not constitute legal or statutory certification** and must be reviewed and verified by a qualified technical engineer prior to formal tender issuance.

---

## 👥 Contributors & Acknowledgements

- **Team SIH26108**
- Problem Statement: **SIH 26108 — AI-Based Standards Recommendation & Tender Compliance**
- Special thanks to the **Bureau of Indian Standards (BIS)** and the **Ministry of Consumer Affairs, Food & Public Distribution** for public technical documentation and standards frameworks.

---

<div align="center">
  <sub>Built with precision for <strong>Smart India Hackathon 2026</strong>.</sub>
</div>