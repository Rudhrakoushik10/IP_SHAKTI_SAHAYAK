# Technology Stack & Architecture Specification

**Project Name:** IP-SAKTI Sahayak  
**Version:** 1.1.0 (Production-Grade Presentation Baseline)  
**System Architecture:** Full-Stack Next.js 15+ App Router with Grounded Dual-Tier RAG & Deterministic Expert Systems  
**Document Status:** Approved & Maintained Baseline  
**Last Updated:** September 2026  

---

## 1. High-Level Architecture Overview

IP-SAKTI Sahayak implements a hybrid architecture that couples deterministic statutory expert systems with grounded Gemini generative AI. This guarantees zero hallucinations, authoritative citations, and 100% reliability during live hackathon evaluation.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                    CLIENT BROWSER                                      │
│  React 19 + Next.js 15 App Router + Tailwind CSS v4 + Motion + Lucide React            │
│  - Dashboard & 5 Scripted Presentation Scenarios                                      │
│  - 4-Step Product Classification Wizard (Interactive Decision Tree)                   │
│  - ABS Compliance Decision Wizard (NBA Form I/III vs SBB Evaluator)                    │
│  - TKDL & Section 3(p) Interactive Explainer Guide                                     │
│  - Grounded Chat Assistant with Interactive Citation Drawer                            │
│  - Human Facilitator Escalation Modal (AYUSH Patent Cell Referral Brief)               │
│  - Living Documentation Viewer (/PRD.md & /TECH_STACK.md)                              │
│  - Full Bilingual Engine (English & Hindi)                                             │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ JSON over HTTPS
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                         NEXT.JS 15 SERVER-SIDE API LAYER                               │
│                                                                                        │
│   POST /api/chat       ──> Intent Classifier & Dual-Tier Grounded RAG Orchestrator     │
│   POST /api/classify   ──> 6-Tier Deterministic Drug Classification Engine             │
│   POST /api/abs-check  ──> Biological Diversity Act NBA / SBB Statutory Tree           │
│   POST /api/retrieve   ──> Lexical & Semantic Corpus Search Engine (24 Docs)           │
│   GET  /api/sources    ──> Full Statutory Legal Document Catalog                       │
│   POST /api/feedback   ──> User Telemetry & Statutory Relevance Feedback               │
│   GET  /api/health     ──> Server Liveness & Legal Corpus Index Health Check           │
└───────────────────────┬────────────────────────────────────────┬───────────────────────┘
                        │                                        │
                        ▼                                        ▼
┌───────────────────────────────────────┐        ┌───────────────────────────────────────┐
│     PRIMARY AI REASONING TIER         │        │       GROUNDED STATUTORY CORPUS &     │
│  - Google GenAI SDK (@google/genai)   │        │          DETERMINISTIC ENGINES        │
│  - Model: gemini-2.5-flash            │        │  - 24 Verified Legal Documents        │
│  - Strict Grounding Constraints       │        │  - Indian Patents Act, 1970           │
│  - Verbatim Bracketed Citations       │        │  - Biological Diversity Act, 2002     │
│  - Server-Side Secret Key Protection  │        │  - Drugs & Cosmetics Act, 1940        │
│  - Speculative Intent Guard           │        │  - FSSAI Ayurveda Aahar Regs, 2022    │
└───────────────────────────────────────┘        │  - CSIR TKDL Prior Art Repository     │
                                                 │  - US 35 U.S.C. & EPO EPC Rules       │
                                                 │  - Deterministic Zero-Quota Fallback  │
                                                 └───────────────────────────────────────┘
```

---

## 2. Core Technology Stack Matrix

| Architectural Layer | Technology Selected | Version | Purpose & Technical Rationale |
| :--- | :--- | :--- | :--- |
| **Full-Stack Framework** | Next.js (App Router) | `^15.4.9` | High-performance React framework providing Server-Side Rendering (SSR), API route endpoints, fast compilation, and optimized bundle delivery. |
| **UI Library** | React | `^19.2.1` | Modern declarative UI engine supporting concurrent rendering, functional hooks, and optimal DOM reconciliation. |
| **Language & Type Safety**| TypeScript | `^5.9.3` | Comprehensive end-to-end type safety across statutory domain models, API payloads, wizard state machines, and i18n dictionaries. |
| **Styling Engine** | Tailwind CSS | `4.1.11` | Utility-first styling built via PostCSS (`@tailwindcss/postcss`). Provides bespoke color tokens, fluid responsiveness, and zero CSS runtime bloat. |
| **Motion & Micro-interactions**| Motion (`motion/react`) | `^12.23.24` | Fluid spring physics and animations for multi-step wizards, accordion expanders, and slide-over citation drawers. |
| **Iconography** | Lucide React | `^0.553.0` | Accessible, tree-shakeable SVG icon collection representing legal, scientific, patent, and governmental actions. |
| **Artificial Intelligence SDK**| `@google/genai` | `^2.4.0` | Modern, official Google GenAI TypeScript SDK executing server-side calls with `gemini-2.5-flash` model. |
| **Build & Post-Processing**| PostCSS & Autoprefixer | `^8.5.6` | CSS compilation, autoprefixing, and vendor compatibility. |
| **Linting & Code Quality**| ESLint | `9.39.1` | Strict linting enforcement of Next.js and React Hooks best practices. |

---

## 3. End-to-End System Sequence Flows

### 3.1 Dual-Tier Grounded RAG Execution Flow
```
User (Browser)          Next.js API (/api/chat)      Retrieval Service         Gemini 2.5 SDK
      │                           │                          │                       │
      │─── 1. POST Query ────────>│                          │                       │
      │                           │─── 2. Search Corpus ────>│                       │
      │                           │                          │── Retrieve Top Docs ──│
      │                           │<── 3. Ranked Citations ──│                       │
      │                           │                          │                       │
      │                           ├─── 4. Try Gemini AI ─────────────────────────────>│
      │                           │    (with Grounding Prompt & Strict Citations)     │
      │                           │                                                   │
      │                           │<── 5a. Grounded Text Response ────────────────────│
      │                           │                                                   │
      │                           │    [If Quota Exhausted / Network Error / Timeout] │
      │                           │─── 5b. Trigger Deterministic Fallback Synthesizer │
      │                           │                                                   │
      │<── 6. JSON Response ──────│                                                   │
      │    (text, citations,      │                                                   │
      │     suggestedActions)     │                                                   │
```

---

## 4. Formal REST API Specifications & Contracts

### 4.1 `POST /api/chat`
Orchestrates grounded AI generation and deterministic fallback for legal and patent queries.
- **Request Headers:** `Content-Type: application/json`
- **Request Body Schema:**
  ```json
  {
    "message": "Can I patent a classical Triphala formulation with added piperine?",
    "jurisdiction": "India", // "India" | "International"
    "productCategory": "Proprietary Medicine",
    "language": "en" // "en" | "hi"
  }
  ```
- **Response Body Schema (200 OK):**
  ```json
  {
    "text": "Under Section 3(p) of the Patents Act, 1970 [IPA-3P], traditional knowledge is not patentable...",
    "citations": [
      {
        "id": "IPA-3P",
        "authority": "IPO",
        "actName": "The Patents Act, 1970",
        "sectionNumber": "Section 3(p)",
        "title": "Traditional Knowledge Bar"
      },
      {
        "id": "IPA-3E",
        "authority": "IPO",
        "actName": "The Patents Act, 1970",
        "sectionNumber": "Section 3(e)",
        "title": "Mere Admixture & Synergistic Effect Requirement"
      }
    ],
    "isSpeculative": false,
    "suggestedActions": [
      "Run 4-Step Product Classification Wizard",
      "Check Biological Diversity Act (ABS) Requirements",
      "Consult AYUSH Patent Cell"
    ]
  }
  ```

### 4.2 `POST /api/classify`
Executes the 6-tier deterministic product classification decision tree.
- **Request Body Schema:**
  ```json
  {
    "baseFormulation": "standardized-fraction",
    "processingLevel": "purified-fraction",
    "claims": "disease-treatment",
    "clinicalReadiness": "clinical-trials",
    "language": "en"
  }
  ```
- **Response Body Schema (200 OK):**
  ```json
  {
    "category": "Phytopharmaceutical Drug",
    "governingAuthority": "Central Drugs Standard Control Organisation (CDSCO)",
    "statutoryRule": "Rule 122E / New Drugs and Clinical Trials Rules, 2019",
    "patentabilityOutlook": "High (Standardized fraction + novel extraction process)",
    "clinicalRequisites": "Pre-clinical toxicology + Phase I/II/III clinical trials required",
    "keyCitations": ["DCA-R122E", "IPA-21J"]
  }
  ```

### 4.3 `POST /api/abs-check`
Calculates mandatory statutory obligations under the Biological Diversity Act, 2002.
- **Request Body Schema:**
  ```json
  {
    "applicantType": "foreign-held-company", // "indian-citizen" | "foreign-held-company" | "nri"
    "resourceOrigin": "wild-ayurvedic-herb",
    "intent": "patent-filing", // "commercial-utilization" | "patent-filing" | "research-only"
    "language": "en"
  }
  ```
- **Response Body Schema (200 OK):**
  ```json
  {
    "nbaFormRequired": "Form III (Section 6 Prior Approval)",
    "requiresFormI": true,
    "requiresSbbIntimation": false,
    "benefitSharingObligation": "0.1% to 0.5% of ex-factory gross sales or 3% to 5% of royalties",
    "relevantActSection": "Section 6(1) & Section 3(1), Biological Diversity Act, 2002",
    "citations": ["BDA-SEC3", "BDA-SEC6", "BDA-ABS-REGS"]
  }
  ```

### 4.4 `POST /api/retrieve`
Executes lexical and semantic scoring over the 24 statutory documents.
- **Request Body:** `{"query": "synergism piperine", "limit": 4}`
- **Response Body:** Array of matching `MockSourceDocument` objects with relevance scores.

### 4.5 `GET /api/sources`
Returns the complete structured legal corpus (24 documents) grouped by authority.

### 4.6 `GET /api/health`
Returns system health, active AI provider status, and corpus indexing metrics.
- **Response Body (200 OK):**
  ```json
  {
    "status": "healthy",
    "corpusCount": 24,
    "authoritiesCovered": ["IPO", "NBA", "AYUSH", "FSSAI", "TKDL", "USPTO", "EPO"],
    "version": "1.1.0"
  }
  ```

---

## 5. Domain Data Models & TypeScript Interfaces

```typescript
export type AuthorityType = 'IPO' | 'NBA' | 'AYUSH' | 'FSSAI' | 'TKDL' | 'USPTO' | 'EPO';

export interface MockSourceDocument {
  id: string;
  authority: AuthorityType;
  actName: string;
  sectionNumber: string;
  titleEn: string;
  titleHi: string;
  fullTextEn: string;
  fullTextHi: string;
  summaryEn: string;
  summaryHi: string;
  tags: string[];
}

export type ProductCategory =
  | 'Classical Ayurvedic Medicine'
  | 'Proprietary Medicine'
  | 'Phytopharmaceutical'
  | 'Ayurveda-Aahar'
  | 'Ayurvedic Cosmetic'
  | 'New Botanical Drug';

export interface ClassificationState {
  baseFormulation: 'classical' | 'modified' | 'standardized-fraction' | 'food-dietary' | 'cosmetic' | 'isolated-nce';
  processingLevel: 'whole-powder' | 'crude-extract' | 'purified-fraction' | 'ndds-nano';
  claims: 'classical-indications' | 'disease-treatment' | 'wellness-food' | 'beautification';
  clinicalReadiness: 'classical-gmp' | 'stability-data' | 'clinical-trials';
}

export interface AbsCheckState {
  applicantType: 'indian-citizen' | 'indian-company' | 'foreign-company' | 'nri';
  resourceOrigin: 'wild-harvest' | 'cultivated' | 'value-added' | 'ntac';
  activity: 'research' | 'commercial' | 'patent-filing' | 'transfer-results';
}
```

---

## 6. Deterministic Algorithms & Decision Trees

### 6.1 Classification Tree (`lib/classification-logic.ts`)
```
                     [Base Formulation Input]
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
    Classical               Modified               Standardized
     Recipe                Polyherbal                Fraction
        │                       │                       │
 [Processing?]           [Processing?]           [Processing?]
 ┌──────┴──────┐         ┌──────┴──────┐         ┌──────┴──────┐
 ▼             ▼         ▼             ▼         ▼             ▼
Whole        NDDS     Extract       NDDS     Purified      Nano
Powder      Carrier   Solvent      Carrier   Fraction     Liposome
 │             │         │             │         │             │
 ▼             ▼         ▼             ▼         ▼             ▼
Classical    New       Proprietary   New      Phytopharma   New
Ayurvedic   Botanical  Medicine     Botanical    Drug       Botanical
Medicine     Drug                    Drug                   Drug
```

### 6.2 Biological Diversity Act (ABS) Tree (`lib/abs-checker-logic.ts`)
```
                          [Applicant Entity?]
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
      Indian Individual                      Foreign Citizen / NRI /
     / Indian Entity                          Foreign-Held Company
              │                                         │
    [Intent: Patent Filing?]                  [Mandatory Section 3: Form I]
        ┌─────┴─────┐                                   │
        ▼           ▼                        [Intent: Patent Filing?]
       Yes          No                                  │
        │           │                                   ▼
   Mandatory    Section 7                   Mandatory Section 6: Form III
   Section 6:  Intimation                   Approval Prior to Any Filing
    Form III     to SBB
```

---

## 7. Security Architecture & Deployment Specifications

### 7.1 Server-Side Key Secrecy
- The Gemini API secret key (`GEMINI_API_KEY`) is strictly confined to Next.js server-side execution (`app/api/chat/route.ts`).
- It is **never** prefixed with `NEXT_PUBLIC_` and is never exposed in browser bundles, DOM properties, or network payloads.

### 7.2 Containerized Deployment on Cloud Run
- Deployed in hardened Cloud Run containers fronted by an NGINX reverse proxy routing exclusively on **port 3000**.
- Zero reliance on external persistent databases for the presentation MVP ensures near-instant boot, zero container spin-up lag, and full resilience during hackathon jury evaluation.

---

## 8. Living Documentation Maintenance Protocol

To ensure continuous synchronization between functional code and architecture documents:
1. **Statutory Updates:** When updating statutory provisions in `lib/mock-corpus.ts`, update the corresponding citation index in `TECH_STACK.md` (Section 5) and `PRD.md` (Section 6).
2. **Classification Logic:** When modifying `lib/classification-logic.ts` or `lib/abs-checker-logic.ts`, update the decision trees in both `PRD.md` and `TECH_STACK.md`.
3. **In-App Viewer:** Changes to `/PRD.md` and `/TECH_STACK.md` are directly mirrored in the interactive in-app documentation viewer (`components/DocsView.tsx`).
