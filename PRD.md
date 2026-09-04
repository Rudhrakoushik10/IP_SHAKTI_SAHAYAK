# Product Requirements Document (PRD)

**Project Name:** IP-SAKTI Sahayak (Intellectual Property & Statutory Ayurveda Knowledge Tool for Innovation)  
**Hackathon Initiative:** Smart India Hackathon (SIH) 2026  
**Problem Statement:** AI-Assisted Decision Support System for Intellectual Property Rights (IPR), Patentability Assessment, Access & Benefit Sharing (ABS), and Regulatory Classification in Ayurveda & AYUSH Traditional Knowledge  
**Version:** 1.1.0 (Production-Grade Presentation Baseline)  
**Document Status:** Approved & Maintained Baseline  
**Last Updated:** September 2026  

---

## 1. Executive Summary & Problem Context

### 1.1 The Context
Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Sowa-Rigpa (AYUSH) encompass thousands of years of codified clinical formulation heritage in India. With surging global consumer demand for botanical pharmaceuticals, plant-derived cosmetics, and nutraceuticals, Indian researchers, startups, and Ayurvedic physicians (Vaidyas) are racing to innovate and commercialize formulations.

However, translating Ayurvedic knowledge into intellectual property assets is governed by a uniquely rigorous and punitive intersection of domestic patent laws, international patent treaties, and national biodiversity statutes.

### 1.2 The Core Problem & Industry Roadblocks
Grassroots innovators and pharmaceutical formulation scientists face four critical systemic barriers:

1. **The Patentability Conundrum & Anti-Biopiracy Statutory Bars:**
   - **Section 3(p) of the Patents Act, 1970:** Explicitly bars any invention which in effect is traditional knowledge or an aggregation or duplication of known properties of traditionally known components.
   - **Section 3(e) of the Patents Act, 1970:** Prohibits mere admixtures resulting only in aggregation of the properties of the components without statistically significant synergistic efficacy.
   - **Section 3(d) of the Patents Act, 1970:** Restricts the patentability of new forms or derivatives of known substances unless they demonstrate significantly enhanced therapeutic efficacy.
   - **International Patent Doctrines:** Innovators filing international applications frequently face rejections under **US 35 U.S.C. 101** (the *Mayo/Myriad/Alice* natural product doctrines) or **EPO Article 53/54/56** due to insufficient differentiation from prior art documented in India's Traditional Knowledge Digital Library (TKDL).

2. **Regulatory Classification Disconnect:**
   - Innovators routinely fail to identify which of the 6 distinct statutory pathways governs their formulation:
     1. *Classical Ayurvedic Medicine* (Governed by First Schedule texts of Drugs and Cosmetics Act, 1940)
     2. *Ayurvedic Proprietary Medicine* (Section 3(a) of Drugs and Cosmetics Act, 1940)
     3. *Phytopharmaceutical Drug* (Rule 122E / New Drugs & Clinical Trials Rules, 2019 under CDSCO)
     4. *Ayurveda Aahar* (FSSAI AYUSH Regulations, 2022)
     5. *Ayurvedic Cosmetic* (Drugs and Cosmetics Rules, Part XIII)
     6. *New Botanical Drug / Novel Drug Delivery System (NDDS)* (Chemical/biological patent pathway)
   - Selecting the wrong pathway leads to either rejected patent claims, invalid marketing authorizations, or multi-year regulatory delays.

3. **Access & Benefit Sharing (ABS) Non-Compliance & Criminal Liabilities:**
   - Under the **Biological Diversity Act, 2002** (as amended in 2023):
     - **Section 3 & Form I:** Non-Indian citizens, foreign companies, and Indian entities with foreign shareholding or management must obtain mandatory prior approval from the National Biodiversity Authority (NBA) before obtaining Indian biological resources.
     - **Section 6 & Form III:** Mandatory prior approval from the NBA before applying for any intellectual property right inside or outside India based on Indian biological resources or associated traditional knowledge.
     - **Section 7:** Indian commercial entities must give prior intimation to the concerned State Biodiversity Board (SBB).
   - Under Section 55 of the Act, contravention of Section 3 or Section 6 carries severe penalties, patent revocation risks under Section 64 of the Patents Act, and commercial embargoes.

4. **The Hallucination Danger of Generic Large Language Models:**
   - Generic generative AI platforms invent statutory clauses, conflate Indian Patent Office (IPO) rules with US USPTO practices, and hallucinate patent approval guarantees. In legal affairs, reliance on false AI advice produces catastrophic commercial and legal fallout.

### 1.3 Solution Hypothesis: IP-SAKTI Sahayak
IP-SAKTI Sahayak resolves this through the fundamental architectural tenet of **"Evidence Before Fluency"**:
- **Dual-Tier Grounded Architecture:** All insights are strictly grounded against an ingested corpus of 24 verified legal statutes, statutory forms, and administrative guidelines.
- **Deterministic Rule Engines:** Classification and ABS compliance calculations are evaluated using deterministic algorithmic trees rather than probabilistic guesses.
- **Safe Abstention & Human Facilitator Referral:** Detects speculative inquiries (e.g. patent grant guarantees) and generates formal referral briefs to the Ministry of AYUSH Patent Cell and TIFAC Patent Facilitation Centre.
- **Bilingual Grassroots Parity:** Instant toggling between English and Hindi across questionnaires, citations, and summaries.

---

## 2. Product Vision, Persona Profiles & User Journeys

### 2.1 Vision Statement
To provide an authoritative, source-grounded intellectual property and regulatory decision support copilot that protects India's sovereign biological heritage against biopiracy while empowering AYUSH innovators to commercialize world-class, patentable formulations.

### 2.2 User Personas & Real-World Journeys

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             User Journey Flowchart                               │
│                                                                                  │
│   [Vaidya / Scientist / Founder]                                                 │
│               │                                                                  │
│               ├──> 1. Run 4-Step Product Classification Wizard                   │
│               │        └─> Output: Statutory Class + Patentability Outlook       │
│               │                                                                  │
│               ├──> 2. Run Biological Diversity Act (ABS) Wizard                  │
│               │        └─> Output: NBA Form I/III Requirement + SBB Intimation   │
│               │                                                                  │
│               ├──> 3. Consult Grounded AI Chat Assistant                         │
│               │        └─> Output: Evidence-backed reasoning with [CITATIONS]    │
│               │                                                                  │
│               └──> 4. If Speculative / Complex Patent Scenario:                  │
│                        └─> Trigger Safe Abstention ──> Export Referral Brief     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Persona 1: Vaidya Dr. Rajesh Sharma (Ayurvedic Practitioner)
- **Background:** 54-year-old physician operating an Ayurvedic clinic and research pharmacy in Varanasi.
- **Scenario:** Formulated a modified polyherbal decoction combining classical *Triphala* (Amalaki, Haritaki, Bibhitaki) with *Guduchi* (*Tinospora cordifolia*) and *Haridra* (*Curcuma longa*) for diabetic neuropathy.
- **Needs:** Needs to know if his combination is patentable in India, whether TKDL examiner searches will cite Section 3(p), and what experimental synergy data is required under Section 3(e).
- **User Journey:** Selects the "Classical Formulation (Curcumin + Piperine)" scenario $\rightarrow$ reviews the Section 3(p) vs Section 3(e) breakdown $\rightarrow$ inspects the exact statutory text in the Citation Drawer $\rightarrow$ learns that standard admixtures are barred unless synergistic bioenhancement is quantitatively documented.

#### Persona 2: Dr. Ananya Deshmukh (Phytopharmaceutical R&D Scientist)
- **Background:** 32-year-old Lead Formulation Scientist at an Indian herbal biotech startup in Pune.
- **Scenario:** Developing a standardized purified fraction of *Boswellia serrata* (Shallaki) enriched to 65% 3-O-acetyl-11-keto-beta-boswellic acid (AKBA) with an advanced phospholipid nano-carrier.
- **Needs:** Wants to file a Patent Cooperation Treaty (PCT) international patent application and license the formulation as a Phytopharmaceutical Drug under CDSCO Rule 122E.
- **User Journey:** Enters formulation details into the 4-Step Classification Wizard $\rightarrow$ gets classified as *Phytopharmaceutical Drug* $\rightarrow$ checks ABS obligations and discovers mandatory NBA Form III prior approval under Section 6 before filing PCT $\rightarrow$ switches jurisdiction to International to evaluate US 35 U.S.C. 101 subject-matter eligibility.

#### Persona 3: Vikram Mehta (D2C Wellness Entrepreneur)
- **Background:** 27-year-old founder of a digital health nutraceutical brand in Bengaluru.
- **Scenario:** Created an *Ashwagandha* (*Withania somnifera*) and *Brahmi* (*Bacopa monnieri*) effervescent cognitive energy tablet with fruit flavors.
- **Needs:** Confused whether the product can be sold under FSSAI as Ayurveda Aahar, or if it must be licensed under the State AYUSH Licensing Authority as an Ayurvedic Proprietary Medicine.
- **User Journey:** Completes the Classification Wizard $\rightarrow$ system identifies it as *Ayurveda Aahar* (FSSAI) $\rightarrow$ warns that disease treatment claims (e.g. "Cures ADHD/Alzheimer's") are prohibited under FSSAI regulations, whereas general stress relief and cognitive wellness claims are permissible.

---

## 3. UI/UX Design System Specifications & Standards

To ensure software craftsmanship, accessibility, and visual dignity appropriate for a government-facing legal intelligence system, IP-SAKTI Sahayak strictly adheres to the following design system rules:

### 3.1 Color Palette Architecture & Contrast Ratios
- **Neutral Surface Palette:** Warm, sophisticated stone scale (`#fafaf9` canvas background, `#ffffff` card surface, `#f5f5f4` muted containers, `#e7e5e4` crisp dividers, `#1c1917` off-black primary text).
- **Primary Domain Accent (AYUSH Heritage):** Emerald Green (`#064e3b` deep, `#047857` primary, `#10b981` bright, `#ecfdf5` badge tint).
- **Secondary Domain Accent (Legal & Statutory):** Deep Indigo / Classic Blue (`#1e3a8a` deep, `#2563eb` interactive, `#eff6ff` tag tint).
- **Warning & Compliance Alert Accent:** Warm Amber (`#78350f` text, `#d97706` icon, `#fef3c7` badge background).
- **Strict Anti-Slop Constraints:**
  - Zero generic purple-to-blue gradients.
  - Zero glowing cyan borders or faux dark-mode neon shadows.
  - Zero gradient text.
  - Strict compliance with WCAG AA: Minimum contrast ratio of 4.5:1 for body copy and 3.0:1 for large display elements.

### 3.2 Typographic Hierarchy & Proportional Scales
- **Typeface Selection:**
  - Display & Headings: High-character sans-serif with refined geometric construction and tight letter-spacing (`tracking-tight`).
  - Body & Legal Text: Clean, accessible neutral sans-serif designed for legibility at 14px–16px with line height of 1.5–1.7.
  - Statutory Codes & Citations: Tabular monospace font (`font-mono`) for section identifiers, statutory tags, and legal keys.
- **Mathematical Scale (Minor Third 1.200 / Major Second 1.125):**
  - Page Title: 24px–28px (`text-2xl` / `text-3xl`), font-bold, leading-tight.
  - Section Heading: 18px–20px (`text-lg` / `text-xl`), font-bold, leading-snug.
  - Sub-heading / Card Title: 14px–15px (`text-sm` / `text-base`), font-semibold.
  - Body Copy: 13px–14px (`text-xs` / `text-sm`), font-normal, leading-relaxed (constrained to 65–75 characters per line).
  - Badges & Footers: 11px–12px (`text-[11px]` / `text-xs`), font-medium, uppercase tracking-wide.
  - Control Labels: Always single-line, zero wrapping or hyphenation within buttons or pill tags.

### 3.3 Spatial Geometry & Spacing Math
- **Container Hierarchy:** Outer container padding ($P_{outer}$) must always equal or exceed inner component padding ($P_{inner}$):
  $$\text{Container Outer Padding } (24\text{px}) \ge \text{Card Inner Padding } (16\text{px}) \ge \text{Element Padding } (8\text{px})$$
- **Nested Border Radius Rule:** To prevent corner clipping or awkward visual gaps:
  $$R_{\text{inner}} = R_{\text{outer}} - P_{\text{padding}}$$
  - Outer modal: $R = 24\text{px}$, Padding = $16\text{px} \implies$ Inner card: $R = 8\text{px}$.
- **Touch Targets:** All interactive controls maintain a minimum touch target bounding box of $44 \times 44\text{px}$ on mobile screens.
- **Button Padding Ratio:** Horizontal button padding is strictly $2\times$ vertical button padding (e.g. `py-2 px-4` or `py-2.5 px-5`).

---

## 4. Detailed Functional Requirements (FR) & Acceptance Criteria

### FR-1: Grounded Dual-Tier RAG Engine
* **FR-1.1:** Natural Language Query Processor accepting formulation descriptions, botanical species names (Latin binomials and Sanskrit names), and legal inquiries.
* **FR-1.2:** Lexical & Semantic Retrieval over the 24-document statutory corpus. Top 3–5 most relevant statutory provisions are extracted with verified citation tokens (`[IPA-3P]`, `[BDA-SEC6]`, etc.).
* **FR-1.3:** Primary Tier: Server-side Gemini 2.5 (`gemini-2.5-flash`) generation enforcing strict prompt grounding: no fact may be stated unless substantiated by retrieved legal provisions.
* **FR-1.4:** Secondary Tier (Deterministic Fallback): If the external AI API is unconfigured, throttled, or offline, the system instantly executes `synthesizeDeterministicResponse()` using exact statutory clause mapping.
* **Acceptance Criteria:**
  1. *Given* a query about Section 3(p), *when* submitted, *then* the response must contain clickable citation `[IPA-3P]` within 2.5 seconds.
  2. *Given* an offline environment or absent API key, *when* a query is sent, *then* the system must return a structured fallback response without errors or blank screens.

### FR-2: 6-Tier Product Classification Decision Matrix
* **FR-2.1:** Interactive 4-step guided decision workflow assessing:
  1. Base Formulation Type (Classical Text vs Modified Formulation vs Purified Fraction vs Food/Nutraceutical vs Cosmetic vs New Entity).
  2. Level of Processing & Extraction (Whole Churna vs Hydroalcoholic Extract vs Standardized Fraction with HPLC vs NDDS).
  3. Medical Claims & Indications (Classical text indication vs Disease treatment claim vs Nutritional wellness vs Beautification).
  4. Clinical Trial & Standardization Readiness (Classical GMP vs Stability testing vs Human clinical trials).
* **FR-2.2:** Deterministic Categorization into one of 6 statutory classes:
  1. Classical Ayurvedic Medicine
  2. Ayurvedic Proprietary Medicine
  3. Phytopharmaceutical Drug
  4. Ayurveda Aahar
  5. Ayurvedic Cosmetic
  6. New Botanical Drug / NDDS
* **FR-2.3:** Actionable synthesis displaying governing authority, statutory basis, clinical requisites, and patentability probability score.
* **Acceptance Criteria:**
  1. *Given* an input of Classical text recipe + whole powder + classical claims, *then* the system must output *Classical Ayurvedic Medicine* and designate Patentability as *Statutorily Barred under Section 3(p)*.
  2. *Given* an input of standardized fraction + HPLC fingerprint + Phase I/II/III clinical trials, *then* the system must output *Phytopharmaceutical Drug* under CDSCO Rule 122E.

### FR-3: Biological Diversity Act (ABS) Compliance Wizard
* **FR-3.1:** Entity assessment evaluating whether the applicant is an Indian citizen/entity or Foreign/NRI/Foreign-held entity.
* **FR-3.2:** Resource classification determining whether the biological material is a wild/cultivated Indian herb, a value-added product, or an exempted Normally Traded Commodity (NTAC).
* **FR-3.3:** Statutory Determination:
  - Output requirement for **Form I** under Section 3 (NBA prior approval for access).
  - Output requirement for **Form III** under Section 6 (NBA prior approval before filing patent inside or outside India).
  - Output requirement for **Section 7** intimation to State Biodiversity Boards.
  - Calculate standard benefit-sharing levies (0.1%–0.5% of ex-factory gross sales or 3%–5% of patent royalties).
* **Acceptance Criteria:**
  1. *Given* a foreign-held company using Indian Ashwagandha, *then* the wizard must flag mandatory NBA Form I and NBA Form III approval before filing any patent.
  2. *Given* an Indian entity, *then* the wizard must require Section 7 SBB intimation and Section 6 Form III prior to patent filing.

### FR-4: Traditional Knowledge Digital Library (TKDL) & Anti-Biopiracy Guide
* **FR-4.1:** Interactive explainer on CSIR's TKDL repository (34+ million pages of translated Ayurvedic, Unani, and Siddha texts).
* **FR-4.2:** Detailed statutory boundary differentiating:
  - *Non-Patentable:* Routine mixing, classical recipes, cosmetic vehicle substitutions.
  - *Patentable:* Statistically significant synergistic combinations (e.g. bioenhancer ratios like Curcumin:Piperine at 100:1), novel nanoparticle drug delivery systems (liposomes/phytosomes), and non-obvious isolated chemical entities.
* **Acceptance Criteria:**
  1. Interactive comparison table clearly contrasting Section 3(p) prior art bars with Section 3(e) synergistic patentable claims.

### FR-5: Multi-Jurisdiction Comparative Analysis Lens
* **FR-5.1:** Toggle between **India (IPO)** and **International (USPTO / EPO / PCT)** frameworks.
* **FR-5.2:** Comparative statutory mapping showing:
  - Section 3(p) vs US 35 U.S.C. 101 Natural Product Doctrine (*Mayo/Myriad* guidelines requiring markedly different characteristics).
  - Section 3(e) synergism vs EPO Article 56 Inventive Step.
  - Mandatory NBA Form III requirement prior to foreign PCT filing.
* **Acceptance Criteria:**
  1. Toggling to International updates chat context, statutory references, and citation drawers to US and European patent law equivalents.

### FR-6: Safe Abstention & Human Facilitator Referral Brief
* **FR-6.1:** Speculative intent detector that triggers when users demand patent guarantees or definitive legal outcomes.
* **FR-6.2:** Safe abstention banner affirming that AI cannot guarantee patent grants or substitute for certified patent agents.
* **FR-6.3:** Referral brief generator creating a structured dossier containing:
  - Innovation description and applicant nationality
  - Preliminary product classification
  - Applicable ABS statutory forms (Form I, Form III, Section 7)
  - Key retrieved statutory citations
  - Direct routing information for the **Ministry of AYUSH Patent Cell** and **TIFAC Patent Facilitation Centre (PFC)**.
* **Acceptance Criteria:**
  1. Querying "Guarantee that my patent will be granted by IPO" must invoke the Safe Abstention message and present the "Generate Referral Brief" button.

### FR-7: Full Bilingual Support (English & Hindi)
* **FR-7.1:** Universal language toggle between English and Hindi (हिन्दी).
* **FR-7.2:** Localized navigation, wizards, option labels, demo scenarios, chat interfaces, and statutory citations.
* **Acceptance Criteria:**
  1. Switching to Hindi translates all UI components without page reload or loss of current wizard state.

### FR-8: SIH 2026 Presentation Scenarios & Corpus Explorer
* **FR-8.1:** 5 pre-configured, 1-click presentation scenarios in the header and dashboard for live jury demonstrations.
* **FR-8.2:** Searchable, filterable Corpus Explorer modal showcasing all 24 statutory documents with bilingual text and authority tags.

---

## 5. Edge Cases & Exception Handling Matrix

| Scenario / Edge Case | Legal & Statutory Complexity | System Behavior & Mitigation |
| :--- | :--- | :--- |
| **Classical Recipe with Synthetic Carrier** | Formulation combines a classical Triphala recipe with a modern synthetic PEG-based liposome. | System flags that while the herbal composition is barred under Section 3(p), the novel delivery vehicle or formulation method may be patentable if novel and non-obvious. |
| **Foreign Entity Buying from Local Market** | A foreign pharmaceutical company purchases Ashwagandha from a local spice market in Delhi, assuming it is exempt as an NTAC (Normally Traded Commodity). | System warns that under Section 40 of BDA 2002, NTAC exemption applies ONLY to general trade/consumption, NOT to commercial utilization in research or patent filing. Form I and Form III approval remain mandatory. |
| **Patent Filed Before NBA Approval** | Applicant filed an Indian patent application without obtaining Section 6 Form III approval first. | System alerts the user that Section 6 approval must be obtained BEFORE patent grant; failure to do so renders the patent liable for revocation under Section 64(1)(p) and invites Section 55 penalties. |
| **Zero-Grant Outcome Demand** | User asks: "Give me 100% guarantee that my turmeric ointment will pass examination." | Triggers Safe Abstention protocol; explains that patent grants are discretionary judicial proceedings of the Patent Office; generates Facilitator Referral Brief for TIFAC PFC. |
| **Network or API Outage** | External Gemini API returns 429 quota exhaustion or network timeout. | System seamlessly falls back to `synthesizeDeterministicResponse()` in `retrieval-service.ts`, providing full citation-backed responses without disruption. |

---

## 6. Statutory Cross-Compliance Matrix

| Governing Act & Section | Regulatory Agency | Required Procedural Action | Statutory Consequence of Non-Compliance |
| :--- | :--- | :--- | :--- |
| **Patents Act, 1970 — Sec 3(p)** | Indian Patent Office (IPO) | Prove non-traditional novelty or non-obvious synthetic modification. | First Examination Report (FER) refusal; complete rejection of claims. |
| **Patents Act, 1970 — Sec 3(e)** | Indian Patent Office (IPO) | Submit comparative in vitro / in vivo data demonstrating synergistic index $> 1.0$. | Rejection as mere admixture aggregating known properties. |
| **Patents Act, 1970 — Sec 10(4)(d)** | Indian Patent Office (IPO) | Disclose geographical origin and source of biological material in specification. | Ground for pre-grant and post-grant opposition under Section 25; revocation under Section 64. |
| **Biological Diversity Act, 2002 — Sec 3** | National Biodiversity Authority (NBA) | Submit **Form I** approval before accessing biological resource (foreign entities). | Section 55 penal provisions (imprisonment up to 5 years, financial penalties); seizure of materials. |
| **Biological Diversity Act, 2002 — Sec 6** | National Biodiversity Authority (NBA) | Submit **Form III** approval before applying for IPR inside or outside India. | Embargo on commercialization; mandatory revocation of patent under Section 64(1)(p). |
| **Biological Diversity Act, 2002 — Sec 7** | State Biodiversity Board (SBB) | Submit prior written intimation before commercial harvesting. | Notice of illegal access; benefit-sharing fee recovery proceedings. |
| **Drugs & Cosmetics Act, 1940 — Sec 3(a)** | State AYUSH Licensing Authority | Manufacture strictly according to formulas in First Schedule classical texts. | Classification as misbranded or spurious drug; cancellation of manufacturing license. |
| **New Drugs Rules, 2019 — Rule 122E** | Central Drugs Standard Control Organisation (CDSCO) | Submit non-clinical toxicology data and Phase I–III clinical trial results. | Cannot market as Phytopharmaceutical drug; limited to proprietary herbal license. |
| **FSSAI (Ayurveda Aahar) Regs, 2022** | Food Safety & Standards Authority of India | Register as Ayurveda Aahar; restrict claims to general wellness; display logo. | Heavy FSSAI penalties for mislabeling; prohibition of medicinal disease-cure claims. |

---

## 7. Non-Functional Requirements & Performance SLAs

* **NFR-1 Latency & Speed:**
  - Interactive Step Wizard Calculations: $< 50\text{ms}$.
  - Statutory Retrieval Query: $< 100\text{ms}$.
  - Gemini AI Generation: $< 2.5\text{s}$ (with fallback triggered on timeout $> 4.0\text{s}$).
* **NFR-2 Reliability & Zero-Crash SLA:**
  - 100% operational uptime during offline or quota-limited demo conditions via dual-tier deterministic fallback.
* **NFR-3 Security & Confidentiality:**
  - Proprietary formulations submitted during session are ephemeral and processed in-memory. Zero persistent logging of confidential recipes.
* **NFR-4 Usability & Accessibility:**
  - 100% WCAG AA compliance with tested contrast levels.
  - Zero UI elements clipped, overlapping, or requiring manual horizontal scrolling.
  - Semantic HTML elements with unique `id` attributes for every interactive button, input, and card.
