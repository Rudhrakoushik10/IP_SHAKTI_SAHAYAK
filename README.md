# IP-SAKTI Sahayak (आईपी-शक्ति सहायक)

### Intellectual Property & Statutory Ayurveda Knowledge Tool for Innovation
**A 100% Open Public Resource & Decision-Support System for Ayurveda IPR, Patentability Clarification, Access & Benefit Sharing (ABS), and Regulatory Guidance**

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026_Open_Hackathon-emerald.svg)](https://sih.gov.in)
[![Public Domain / Unpatented](https://img.shields.io/badge/Status-100%25_Public_Resource_•_Unpatented-blue.svg)](#-public-resource--open-hackathon-declaration)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.4-black.svg?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Bilingual](https://img.shields.io/badge/Language-English_•_हिन्दी-teal.svg)](#)

---

## 📢 Public Resource & Open Hackathon Declaration

> ### 🟢 ZERO PROPRIETARY CLAIMS • NOTHING IS PATENTED • 100% OPEN PUBLIC GOOD
>
> This project was developed as an open submission for the **Smart India Hackathon (SIH)**. 
> 
> **Explicit Open Resource Affirmations:**
> - **Nothing is Patented:** No component, software algorithm, workflow, dataset, or output of IP-SAKTI Sahayak is patented, filed for patent protection, or treated as proprietary intellectual property.
> - **Public Domain Traditional Knowledge:** We unequivocally affirm that India's codified Ayurvedic knowledge (spanning the *Charaka Samhita*, *Sushruta Samhita*, *Ashtanga Hridaya*, and classical AYUSH texts) belongs in perpetuity to the sovereign public domain and the common heritage of humanity. It cannot and should not be privatized or monopolized.
> - **Freely Accessible Digital Public Good:** The entire codebase, legal decision-support logic, statutory rule models, and translation dictionaries are open source under the permissive **MIT License**. Anyone—especially students, grassroots Vaidyas, rural Ayurvedic cooperatives, MSME manufacturers, and academic researchers—may inspect, fork, modify, deploy, and build upon this work freely without royalties or licensing fees.
> - **Exclusively Grounded in Public Government Records:** All statutory provisions and legal rules are derived strictly from official public domain repositories published by the Government of India (India Code, IP India/CGPDTM guidelines, CSIR Traditional Knowledge Digital Library public notices, National Biodiversity Authority gazettes, and FSSAI notifications).

---

## 📌 Executive Summary & Problem Context

India possesses over 5,000 years of codified formulation science across the AYUSH systems (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Sowa-Rigpa). With increasing worldwide interest in plant-derived medicines, botanical pharmaceuticals, and dietary supplements, researchers, grassroots innovators, and Ayurvedic drug manufacturers (Vaidyas and MSMEs) face a convoluted web of domestic and international patent laws, anti-biopiracy treaties, and biodiversity mandates.

Navigating Ayurvedic innovation entails understanding four critical systemic barriers:

1. **Statutory Patentability Exclusions in Indian Law:**
   - **Section 3(p) of the Patents Act, 1970:** Specifically excludes inventions that are essentially traditional knowledge or an aggregation/duplication of known properties of traditionally known components.
   - **Section 3(e) of the Patents Act, 1970:** Prohibits mere admixtures resulting only in the aggregation of properties without demonstrably synergistic therapeutic enhancement.
   - **Section 3(d) of the Patents Act, 1970:** Restricts patenting of new forms or derivatives of known substances without significant improvement in therapeutic efficacy.
   - **International Dimensions:** Global filings face strict prior-art hurdles at the USPTO (35 U.S.C. 101/102/103) and EPO (Article 53/54/56) due to prior art documented in India's Traditional Knowledge Digital Library (TKDL).

2. **Regulatory Classification Disconnect:**
   - Innovators struggle to discern whether a formulation qualifies as:
     1. *Classical Ayurvedic Medicine* (First Schedule authorized treatises, Drugs & Cosmetics Act 1940)
     2. *Ayurvedic Proprietary Medicine* (Section 3(a), Drugs & Cosmetics Act 1940)
     3. *Phytopharmaceutical Drug* (Rule 122E / New Drugs & Clinical Trials Rules 2019, CDSCO)
     4. *Ayurveda Aahar* (FSSAI AYUSH Regulations 2022)
     5. *Ayurvedic Cosmetic* (Drugs & Cosmetics Rules Part XIII)
     6. *Novel Drug Delivery System (NDDS) / Botanical Drug* (Chemical & pharmaceutical patent regime)

3. **Access & Benefit Sharing (ABS) & Criminal Liabilities:**
   - Under the **Biological Diversity Act, 2002** (amended 2023), non-Indian entities or Indian companies with foreign equity/management must obtain mandatory prior approval from the **National Biodiversity Authority (NBA)** under Section 3 / Form I before accessing Indian biological resources, and under Section 6 / Form III before applying for patents. Non-compliance entails severe statutory penalties.

4. **Hallucination Risk in Generic AI:**
   - Conventional LLMs regularly invent fictitious patent sections, hallucinate case law, or confuse food regulations with pharmaceutical licenses.

**IP-SAKTI Sahayak** solves this challenge through an **"Evidence Before Fluency"** architecture: combining deterministic statutory decision trees with grounded dual-tier Retrieval-Augmented Generation (RAG) tied directly to authentic government databases and codified statutes.

---

## 🏛️ Authoritative Open Public Datasets & Legal Sources

The system's legal knowledge base is compiled strictly from verified, open public repositories published by the Government of India and international IP bodies:

| Dataset / Repository | Governing Authority | Canonical Domain | Role in System Architecture |
| :--- | :--- | :--- | :--- |
| **Traditional Knowledge Digital Library (TKDL)** | CSIR & Ministry of AYUSH | [`tkdl.res.in`](https://tkdl.res.in) | Defensive prior-art verification, Section 3(p) exclusions, IPC classification mapping, and landmark biopiracy case records (Turmeric USPTO, Neem EPO). |
| **Statutes & Rules (India Code)** | Ministry of Law and Justice, GoI | [`indiacode.nic.in`](https://indiacode.nic.in) | Full codified legal texts of The Patents Act 1970, Drugs & Cosmetics Act 1940, Biological Diversity Act 2002, and FSSAI Regulations. |
| **IP India Public Portals** | Office of CGPDTM, DPIIT, MoCI | [`ipindia.gov.in`](https://ipindia.gov.in) | Guidelines for Patent Applications in Traditional Knowledge, InPASS patent search protocols, Trademark NICE classes, and GI Registry provisions. |
| **National Biodiversity Authority (NBA)** | Ministry of Environment, Forest & Climate Change | [`nbaindia.org`](https://nbaindia.org) | Access & Benefit Sharing (ABS) guidelines, Form I/III application workflows, State Biodiversity Board (SBB) intimations, and fee levy schedules. |
| **Food Safety and Standards Authority of India (FSSAI)** | Ministry of Health & Family Welfare | [`fssai.gov.in`](https://fssai.gov.in) | Food Safety and Standards (Ayurveda Aahar) Regulations, 2022, Schedule A permissible botanical ingredients, and labeling mandates. |

---

## ⚡ Key Features

- **🛡️ Evidence-Grounded Legal Assistant:**
  Multi-factor statutory retrieval engine that extracts relevant legal provisions before synthesizing responses. Every assertion includes direct source citations with authority, section numbers, and source excerpts.

- **⚖️ 4-Step Deterministic Classification Engine:**
  Structured questionnaire evaluating textual citations, active ingredients, processing methods, and intended use to route formulations to one of 6 statutory categories.

- **🌿 ABS Compliance Wizard:**
  Evaluates entity ownership (Indian MSME vs. foreign equity/NRI), biological resource origin, and utilization intent to determine whether NBA Form I, Form III, or State Biodiversity Board (SBB) intimation is required under the Biological Diversity Act.

- **📚 TKDL & Prior Art Explainer:**
  Interactive module distinguishing patentable innovations (purified synergistic extracts, novel delivery vehicles, synthetic derivatives) from statutorily excluded matter (classical formulations, mere admixtures under Section 3(e)).

- **🔍 Interactive Citation Inspector Drawer:**
  Allows users and examiners to click any citation badge (`[MOCK-IN-001]`, etc.) to view the complete statutory excerpt, legal summary, applicability parameters, and authoritative source URLs.

- **🚨 Safe Abstention & Facilitator Escalation:**
  Triggers a protective abstention when user inquiries fall outside Ayurvedic IPR scope, providing a one-click referral brief generator for the AYUSH Patent Facilitation Cell or certified patent attorneys.

- **🌐 Native Bilingual Interface:**
  Full parity between English and Hindi (हिन्दी) across all classification questionnaires, guidance screens, and legal citations.

- **🎯 Scripted Presentation Demo Scenarios:**
  Built-in 1-click test scenarios covering key use cases for rapid evaluation during hackathon demonstrations:
  1. *Classical Triphala Churna* (Section 3(p) traditional knowledge exclusion)
  2. *Synergistic Polyherbal Extract* (Section 3(e) synergism validation)
  3. *Novel Nano-Curcumin Topical Gel* (Patentable NDDS formulation)
  4. *Foreign Joint Venture Botanical Research* (Mandatory NBA Form I / III approval)
  5. *Ayurveda Aahar Functional Beverage* (FSSAI food regulation vs. Ayush medicine)

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT APPLICATION                             │
│       Next.js 15 App Router + React 19 + Tailwind CSS v4 + Motion           │
│                                                                             │
│  [Dashboard Hub]  [Classification Wizard]  [ABS Helper]  [TKDL Guide]       │
│  [Citation Drawer]  [Escalation Brief Generator]  [Bilingual i18n Switcher]  │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │ JSON API Requests
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SERVER-SIDE API LAYER (Next.js)                     │
│                                                                             │
│  /api/chat       ──> Dual-Tier RAG Controller & Gemini Integration           │
│  /api/classify   ──> Deterministic 6-Tier Product Classification Engine     │
│  /api/abs-check  ──> Biological Diversity Act (BDA) Statutory Rule Engine   │
│  /api/retrieve   ──> Multi-Factor Legal Search (Keyword + Authority Weight) │
│  /api/sources    ──> Authoritative Statutory Corpus Registry                │
│  /api/health     ──> Service Health & Corpus Validation                     │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│        GROUNDED GEMINI AI           │ │        STATUTORY LEGAL CORPUS       │
│  - System Prompt with Strict Rules  │ │  - 24 Codified Legal Provisions     │
│  - "Evidence Before Fluency" Policy │ │  - TKDL Guidelines (tkdl.res.in)    │
│  - Structured Output Parsing        │ │  - The Patents Act (indiacode)      │
│  - Safe Fallback Mode if Offline    │ │  - Biological Diversity Act (NBA)   │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
.
├── app/
│   ├── api/
│   │   ├── abs-check/route.ts      # Biological Diversity Act compliance API
│   │   ├── chat/route.ts           # Grounded RAG conversational endpoint
│   │   ├── classify/route.ts       # Deterministic product classification API
│   │   ├── feedback/route.ts       # Citation relevance feedback endpoint
│   │   ├── health/route.ts         # Service health & readiness check
│   │   ├── retrieve/route.ts       # Legal corpus retrieval endpoint
│   │   └── sources/route.ts        # Authoritative corpus metadata catalog
│   ├── globals.css                 # Tailwind CSS v4 stylesheets
│   ├── layout.tsx                  # Root layout and metadata configuration
│   ├── not-found.tsx               # Client-side 404 handler
│   └── page.tsx                    # Main interactive application view
├── components/
│   ├── AbsHelperModal.tsx          # ABS compliance wizard
│   ├── ChatSection.tsx             # Grounded chat with streaming citations
│   ├── CitationDrawer.tsx          # Deep-dive legal provision inspector
│   ├── ClassificationWorkflow.tsx  # 4-Step interactive questionnaire
│   ├── CorpusExplorerModal.tsx     # Searchable 24-provision statutory browser
│   ├── DashboardView.tsx           # Main hub & dataset directory
│   ├── DisclaimerBanner.tsx        # Statutory decision-support disclaimer
│   ├── DocsView.tsx                # Integrated PRD and Tech Stack viewer
│   ├── Header.tsx                  # Brand header with language switcher
│   ├── HumanEscalationModal.tsx    # AYUSH patent attorney referral brief
│   ├── SystemLogo.tsx              # Vector emblem of IP-SAKTI Sahayak
│   └── TkdlExplainerModal.tsx      # TKDL & prior art educational module
├── lib/
│   ├── abs-checker-logic.ts        # NBA / SBB decision tree rules
│   ├── authoritative-datasets.ts   # Metadata registry for official portals
│   ├── classification-logic.ts     # 6-Tier formulation classifier logic
│   ├── demo-scenarios.ts           # Scripted live demonstration test cases
│   ├── i18n.ts                     # English & Hindi translation dictionaries
│   ├── mock-corpus.ts              # 24 Verified statutory provisions
│   ├── retrieval-service.ts        # Scoring and relevance retrieval engine
│   └── utils.ts                    # Utility helpers (cn, formatting)
├── PRD.md                          # Full Product Requirements Document
├── TECH_STACK.md                   # Engineering & Architecture Specification
├── package.json                    # Project dependencies & scripts
├── tsconfig.json                   # TypeScript compiler configuration
└── next.config.ts                  # Next.js framework configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.18.0` or later (Node 20+ recommended)
- **Package Manager**: `npm` (v9+), `pnpm` (v8+), or `bun`
- **Gemini API Key**: (Optional for AI synthesis; the application includes a deterministic offline legal fallback if no key is supplied)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ip-sakti-sahayak.git
cd ip-sakti-sahayak
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Populate the required keys:

```env
# Optional: Google Gemini API Key for server-side synthesis
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** If `GEMINI_API_KEY` is not provided, the application will automatically activate its built-in **Deterministic Legal Fallback Engine**, ensuring full functional evaluation with complete statutory citations even without external network access.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 🔌 API Reference

### `POST /api/chat`
Performs intent classification, context retrieval from the legal corpus, and synthesizes a citation-grounded response.
- **Request Body:**
  ```json
  {
    "message": "Can I patent an Ayurvedic herbal extract with enhanced bioavailability?",
    "jurisdiction": "India",
    "category": "Proprietary Medicine",
    "language": "en"
  }
  ```
- **Response:**
  ```json
  {
    "answer": "...",
    "citations": [
      {
        "source_id": "MOCK-IN-002",
        "authority": "The Patents Act, 1970",
        "provision": "Section 3(e)",
        "summary": "Mere admixture prohibition..."
      }
    ],
    "actionable_next_steps": ["Conduct synergistic efficacy assays..."],
    "confidence": "high"
  }
  ```

### `POST /api/classify`
Evaluates formulation parameters and assigns one of 6 statutory categories with regulatory justifications.
- **Request Body:**
  ```json
  {
    "textualCitation": true,
    "activeIngredientType": "classical_herb",
    "processingMethod": "standard_classical",
    "intendedUse": "therapeutic"
  }
  ```
- **Response:**
  ```json
  {
    "category": "Classical Ayurvedic Medicine",
    "governingLaw": "Drugs and Cosmetics Act, 1940 (First Schedule)",
    "patentable": false,
    "reasoning": "Formulations directly mentioned in authoritatively codified texts are statutorily barred from patenting under Section 3(p)."
  }
  ```

### `POST /api/abs-check`
Runs the Biological Diversity Act decision tree to establish mandatory NBA or SBB filings.
- **Request Body:**
  ```json
  {
    "entityType": "foreign_or_nri_company",
    "activityType": "commercial_utilization",
    "resourceOrigin": "direct_wild_collection"
  }
  ```
- **Response:**
  ```json
  {
    "approvalRequired": "NBA Form I",
    "statutoryBasis": "Biological Diversity Act, 2002 - Section 3",
    "riskLevel": "High (Non-bailable criminal penal liability for non-compliance)"
  }
  ```

### `GET /api/sources`
Returns the complete catalog of 24 statutory provisions mapped to their authoritative government origins.

---

## 🧪 Presentation Scenarios (SIH Evaluation Guide)

For a rapid, zero-friction demonstration during review sessions, five deterministic scenarios can be launched with a single click from the **Dashboard**:

1. **Scenario 1: Classical Triphala Churna**
   - *Query:* "Can I patent Triphala Churna for digestion?"
   - *Outcome:* Immediate Section 3(p) non-patentability bar; identifies TKDL reference and classical text origin (Charaka Samhita).
2. **Scenario 2: Synergistic Polyherbal Formulation**
   - *Query:* "Can I patent a combination of Curcumin and Piperine?"
   - *Outcome:* Flags Section 3(e) mere admixture bar; outlines strict requirement for comparative synergy data (Combination Index < 1.0).
3. **Scenario 3: Novel Nano-Curcumin Delivery System (NDDS)**
   - *Query:* "Is a phospholipid nanocarrier for turmeric patentable?"
   - *Outcome:* Evaluates under Section 3(d); clarifies that novel delivery systems showing enhanced bioavailability are eligible subject matter.
4. **Scenario 4: Foreign Research Collaboration & Export**
   - *Query:* "We are an Indian startup with 15% Singapore VC funding. Can we file a US patent on Brahmi?"
   - *Outcome:* Mandates NBA Form I and Form III approvals under Section 3 and Section 6 of the Biological Diversity Act before filing abroad.
5. **Scenario 5: Ayurveda Aahar Nutrition Bar**
   - *Query:* "Can I sell Ashwagandha energy bars under an AYUSH drug license?"
   - *Outcome:* Re-routes to the FSSAI Ayurveda Aahar Regulations 2022; details labelling restrictions against making therapeutic drug claims on food packages.

---

## ⚖️ Legal Disclaimer

> **IMPORTANT NOTICE:** IP-SAKTI Sahayak is an educational and informational decision-support tool created for the Smart India Hackathon (SIH) 2026. The guidance, classifications, and statutory citations generated by this system do not constitute certified legal counsel, patent prosecution advice, or official regulatory clearance from the Ministry of AYUSH, CDSCO, the Indian Patent Office, or the National Biodiversity Authority. Users must consult registered patent attorneys and regulatory affairs specialists prior to commercialization or patent filings.

---

## 📄 License & Public Access

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License
Copyright (c) 2026 IP-SAKTI Sahayak Project Team (Smart India Hackathon 2026)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files, to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies...
```

All statutory texts, regulatory schedules, and historical case summaries cited in this project originate from the public domain of the Government of India.

---

<div align="center">
  <sub>Developed for Smart India Hackathon (SIH) 2026 • Dedicated to Open Science, Public Digital Goods, and Ethical Stewardship of Indian Traditional Medicine.</sub>
</div>
