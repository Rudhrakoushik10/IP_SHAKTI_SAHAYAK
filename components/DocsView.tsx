'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  Cpu,
  Copy,
  Check,
  Search,
  Download,
  BookOpen,
  Code2,
  TableProperties,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Language } from '@/lib/i18n';

interface DocsViewProps {
  lang: Language;
}

const PRD_SECTIONS = [
  { id: 'prd-exec', label: '1. Executive Summary & Problems' },
  { id: 'prd-principles', label: '2. Vision & Core Principles' },
  { id: 'prd-personas', label: '3. User Personas & Real Journeys' },
  { id: 'prd-design', label: '4. UI/UX Design System Specifications' },
  { id: 'prd-fr', label: '5. Functional Requirements (FR-1 to FR-8)' },
  { id: 'prd-edge', label: '6. Edge Cases & Exception Handling' },
  { id: 'prd-compliance', label: '7. Statutory Cross-Compliance Matrix' },
  { id: 'prd-nfr', label: '8. Non-Functional Requirements (NFR)' },
];

const TECH_SECTIONS = [
  { id: 'tech-arch', label: '1. High-Level Architecture & Flow' },
  { id: 'tech-stack-table', label: '2. Technology Stack Matrix' },
  { id: 'tech-contracts', label: '3. Formal REST API Contracts' },
  { id: 'tech-rag-tier', label: '4. Grounded Dual-Tier RAG Engine' },
  { id: 'tech-corpus-index', label: '5. 24-Document Legal Corpus Index' },
  { id: 'tech-decision-trees', label: '6. Deterministic Algorithms & Trees' },
  { id: 'tech-security-deploy', label: '7. Security & Cloud Run Hosting' },
  { id: 'tech-maintenance-proto', label: '8. Extension Protocols' },
];

export function DocsView({ lang }: DocsViewProps) {
  const [activeDoc, setActiveDoc] = useState<'prd' | 'techstack'>('prd');
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopyPath = () => {
    const path = activeDoc === 'prd' ? '/PRD.md' : '/TECH_STACK.md';
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const fileName = activeDoc === 'prd' ? 'PRD.md' : 'TECH_STACK.md';
    const textContent =
      activeDoc === 'prd'
        ? `# Product Requirements Document (PRD)\n\nProject: IP-SAKTI Sahayak\nLocation: /PRD.md\nStatus: Maintained Production Baseline`
        : `# Technology Stack & Architecture\n\nProject: IP-SAKTI Sahayak\nLocation: /TECH_STACK.md\nStatus: Maintained Production Baseline`;

    const blob = new Blob([textContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredPrdSections = useMemo(() => {
    if (!searchTerm.trim()) return PRD_SECTIONS;
    return PRD_SECTIONS.filter(s => s.label.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const filteredTechSections = useMemo(() => {
    if (!searchTerm.trim()) return TECH_SECTIONS;
    return TECH_SECTIONS.filter(s => s.label.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  return (
    <div id="docs-view-container" className="space-y-6">
      {/* Top Banner with Strict Mathematical Spacing & Clean Typography */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
              SIH 2026 Core Specifications
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium whitespace-nowrap">
              v1.1.0 Baseline
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
            {lang === 'hi'
              ? 'प्रोजेक्ट पीआरडी एवं तकनीकी स्टैक विनिर्देश'
              : 'Product Requirements (PRD) & Tech Stack Specification'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
            {lang === 'hi'
              ? 'यह आधिकारिक विनिर्देश कोडबेस में `/PRD.md` एवं `/TECH_STACK.md` के रूप में सुरक्षित हैं। इनमें डिज़ाइन सिस्टम, एपीआई अनुबंध, वैधानिक नियम तथा वास्तुकला समाहित हैं।'
              : 'Official production specifications maintained directly in the workspace at `/PRD.md` and `/TECH_STACK.md`. Includes design system standards, REST API contracts, and statutory trees.'}
          </p>
        </div>

        {/* Controls: Doc Switcher & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              id="tab-btn-doc-prd"
              onClick={() => setActiveDoc('prd')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                activeDoc === 'prd'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>PRD.md</span>
            </button>
            <button
              id="tab-btn-doc-techstack"
              onClick={() => setActiveDoc('techstack')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                activeDoc === 'techstack'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Cpu className="w-4 h-4 text-blue-700" />
              <span>TECH_STACK.md</span>
            </button>
          </div>

          <button
            id="docs-copy-path-btn"
            onClick={handleCopyPath}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
            title="Copy root file path"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="font-mono">{copied ? 'Copied' : activeDoc === 'prd' ? '/PRD.md' : '/TECH_STACK.md'}</span>
          </button>

          <button
            id="docs-download-md-btn"
            onClick={handleDownloadMd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition shadow-xs"
            title="Export Markdown copy"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sticky Sidebar + Rich Document Body */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs sticky top-20 space-y-4">
            {/* Search within document */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="docs-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'hi' ? 'विषय खोजें...' : 'Filter sections...'}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition"
              />
            </div>

            <div>
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                <span>{activeDoc === 'prd' ? 'PRD Table of Contents' : 'Architecture Sections'}</span>
              </h3>

              <nav className="space-y-1 text-xs max-h-[55vh] overflow-y-auto pr-1">
                {activeDoc === 'prd'
                  ? filteredPrdSections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="block py-1.5 px-2.5 rounded-lg text-stone-600 hover:text-emerald-950 hover:bg-emerald-50 transition leading-snug"
                      >
                        {sec.label}
                      </a>
                    ))
                  : filteredTechSections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="block py-1.5 px-2.5 rounded-lg text-stone-600 hover:text-blue-950 hover:bg-blue-50 transition leading-snug"
                      >
                        {sec.label}
                      </a>
                    ))}
              </nav>
            </div>

            {/* Document metadata block */}
            <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500 space-y-1">
              <div className="flex justify-between">
                <span>Standard:</span>
                <span className="font-semibold text-stone-800">ISO/IEC 25010</span>
              </div>
              <div className="flex justify-between">
                <span>Accessibility:</span>
                <span className="font-semibold text-emerald-700">WCAG AA Compliant</span>
              </div>
              <div className="flex justify-between">
                <span>Corpus Size:</span>
                <span className="font-semibold text-stone-800">24 Statutory Acts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Content Viewer */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-10">
            {activeDoc === 'prd' ? (
              /* ================= PRD VIEWER ================= */
              <div className="space-y-10 text-stone-800">
                {/* Header */}
                <div className="border-b border-stone-200 pb-5">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Official Product Specifications
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                    Product Requirements Document (PRD)
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    IP-SAKTI Sahayak • Intellectual Property & Statutory Ayurveda Knowledge Tool for Innovation
                  </p>
                </div>

                {/* Section 1: Exec Summary & Problem */}
                <section id="prd-exec" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-emerald-600 pl-3">
                    1. Executive Summary & Problem Context
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Commercializing Ayurvedic formulations requires navigating complex, overlapping intellectual property statutes, statutory anti-biopiracy exclusions, and mandatory biological diversity approvals.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs space-y-1.5">
                      <span className="font-bold text-amber-950 block">Patents Act Section 3(p) & 3(e) Exclusions</span>
                      <p className="text-stone-700 leading-relaxed">
                        Inventions which are traditional knowledge or aggregations of known properties are barred under Section 3(p). Mere admixtures without synergistic quantitative proof are barred under Section 3(e).
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs space-y-1.5">
                      <span className="font-bold text-blue-950 block">Biological Diversity Act (ABS) Mandates</span>
                      <p className="text-stone-700 leading-relaxed">
                        Mandatory Section 3 (Form I) for foreign entities accessing bio-resources, and Section 6 (Form III) approval prior to applying for patents inside or outside India, backed by Section 55 penalties.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 2: Vision & Principles */}
                <section id="prd-principles" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-emerald-600 pl-3">
                    2. Product Vision & Architectural Tenets
                  </h3>
                  <div className="p-5 rounded-2xl bg-emerald-900 text-white space-y-2">
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Foundational Mandate: Evidence Before Fluency</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
                      &ldquo;Every generated finding, recommendation, or classification MUST be strictly grounded in an official, verifiable statutory clause. Generative fluency without citation is treated as a defect.&rdquo;
                    </p>
                  </div>
                </section>

                {/* Section 3: Personas */}
                <section id="prd-personas" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-emerald-600 pl-3">
                    3. Target User Personas & Practical Scenarios
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Dr. Rajesh Sharma</span>
                      <span className="text-[11px] font-semibold text-emerald-800 block">Ayurvedic Clinician (Varanasi)</span>
                      <p className="text-stone-600 text-[12px] leading-relaxed">
                        Evaluates whether adding *Guduchi* to classical *Triphala* passes Section 3(p) and what synergistic data is needed under Section 3(e).
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Dr. Ananya Deshmukh</span>
                      <span className="text-[11px] font-semibold text-blue-800 block">Phytopharma Lead (Pune)</span>
                      <p className="text-stone-600 text-[12px] leading-relaxed">
                        Filing PCT international patent for standardized *Boswellia* extract with 65% AKBA, requiring CDSCO Rule 122E and NBA Form III approval.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Vikram Mehta</span>
                      <span className="text-[11px] font-semibold text-amber-800 block">D2C Founder (Bengaluru)</span>
                      <p className="text-stone-600 text-[12px] leading-relaxed">
                        Determining if *Ashwagandha* effervescent tablets fit FSSAI Ayurveda Aahar regulations or require AYUSH Proprietary Medicine licensing.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4: Design System Specifications */}
                <section id="prd-design" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-emerald-600 pl-3">
                    4. UI/UX Design System Specifications & Standards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/80 space-y-1.5">
                      <span className="font-bold text-stone-900 block">1. Color Token Hierarchy</span>
                      <p className="text-stone-600 leading-relaxed">
                        Sophisticated neutral canvas (`#fafaf9`), card white (`#ffffff`), and deep stone text (`#1c1917`). Deep Emerald (`#064e3b`), Amber cautions, and Indigo legal accents.
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-800 block">WCAG AA Contrast Compliant</span>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/80 space-y-1.5">
                      <span className="font-bold text-stone-900 block">2. Typographic Scale</span>
                      <p className="text-stone-600 leading-relaxed">
                        Minor Third (1.200) ratio for dense, scannable UI. Headings with tight tracking, body text relaxed (line height 1.5–1.7), monospace tags for statutory keys.
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-800 block">Line-lengths capped at 65–75ch</span>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/80 space-y-1.5">
                      <span className="font-bold text-stone-900 block">3. Spatial Geometry</span>
                      <p className="text-stone-600 leading-relaxed">
                        Outer padding &ge; inner padding (P_outer &ge; P_inner). Nested border radius formula: R_inner = R_outer - Padding. Button horizontal padding is strictly 2x vertical.
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-800 block">Zero UI Clipping or Overflow</span>
                    </div>
                  </div>
                </section>

                {/* Section 5: Functional Requirements */}
                <section id="prd-fr" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-emerald-600 pl-3">
                    5. Functional Requirements Matrix (FR-1 to FR-8)
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-stone-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-100 font-bold text-stone-800 border-b border-stone-200">
                        <tr>
                          <th className="p-3">Req ID</th>
                          <th className="p-3">Module</th>
                          <th className="p-3">Functional Description</th>
                          <th className="p-3">Statutory Basis</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        <tr>
                          <td className="p-3 font-mono font-bold text-emerald-800">FR-1</td>
                          <td className="p-3 font-semibold">Dual-Tier RAG Engine</td>
                          <td className="p-3 text-stone-600">Retrieval over 24 statutory documents with Gemini 2.5 synthesis and deterministic zero-hallucination fallback.</td>
                          <td className="p-3 font-mono text-[11px]">Patents Act 1970</td>
                          <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap">Production Ready</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-emerald-800">FR-2</td>
                          <td className="p-3 font-semibold">6-Tier Classification</td>
                          <td className="p-3 text-stone-600">4-step decision tree categorizing into Classical, Proprietary, Phytopharma, Ayurveda Aahar, Cosmetic, or NDDS.</td>
                          <td className="p-3 font-mono text-[11px]">DCA 1940 & FSSAI 2022</td>
                          <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap">Production Ready</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-emerald-800">FR-3</td>
                          <td className="p-3 font-semibold">ABS Compliance Wizard</td>
                          <td className="p-3 text-stone-600">Evaluates entity nationality and resource origin to output Form I, Form III, or Section 7 SBB requirements.</td>
                          <td className="p-3 font-mono text-[11px]">BDA 2002 Sec 3/6/7</td>
                          <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap">Production Ready</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-emerald-800">FR-4</td>
                          <td className="p-3 font-semibold">TKDL & Anti-Biopiracy</td>
                          <td className="p-3 text-stone-600">Educational guide on CSIR 34-million folio database, Section 3(p) prior art, and patentable synergistic combinations.</td>
                          <td className="p-3 font-mono text-[11px]">CSIR Guidelines</td>
                          <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap">Production Ready</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-emerald-800">FR-5</td>
                          <td className="p-3 font-semibold">Dual-Jurisdiction Switch</td>
                          <td className="p-3 text-stone-600">Dynamic comparative toggle between Indian Patent Office (IPO) and International (USPTO 35 U.S.C. 101 & EPO EPC).</td>
                          <td className="p-3 font-mono text-[11px]">PCT & 35 U.S.C. 101</td>
                          <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap">Production Ready</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-emerald-800">FR-6</td>
                          <td className="p-3 font-semibold">Safe Abstention & Referral</td>
                          <td className="p-3 text-stone-600">Detects speculative patent grant queries, triggers safe abstention notice, and generates referral brief for AYUSH Patent Cell.</td>
                          <td className="p-3 font-mono text-[11px]">Legal Ethics Guardrail</td>
                          <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap">Production Ready</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-emerald-800">FR-7</td>
                          <td className="p-3 font-semibold">Bilingual Engine</td>
                          <td className="p-3 text-stone-600">Complete English and Hindi (हिन्दी) parity across UI, questionnaires, scenarios, and statutory citations.</td>
                          <td className="p-3 font-mono text-[11px]">AYUSH Language Mandate</td>
                          <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap">Production Ready</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-emerald-800">FR-8</td>
                          <td className="p-3 font-semibold">SIH 2026 Scenarios</td>
                          <td className="p-3 text-stone-600">5 scripted 1-click presentation demo scenarios built into the header and dashboard for live jury review.</td>
                          <td className="p-3 font-mono text-[11px]">SIH Evaluation Spec</td>
                          <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px] whitespace-nowrap">Production Ready</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Section 6: Edge Cases */}
                <section id="prd-edge" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-emerald-600 pl-3">
                    6. Edge Cases & Exception Handling Matrix
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Classical Recipe with Synthetic Carrier</span>
                      <p className="text-stone-600 leading-relaxed">
                        While the herbal mixture itself is barred under Section 3(p), the novel delivery vehicle (liposome/nano-carrier) or synthesis process can be protected.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Foreign Company Buying from Local Bazaar</span>
                      <p className="text-stone-600 leading-relaxed">
                        Under Section 40 of BDA 2002, NTAC commodity exemption applies only to direct trade/consumption, NEVER for commercial research or patent filing. Form I and III remain mandatory.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 7: Statutory Matrix */}
                <section id="prd-compliance" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-emerald-600 pl-3">
                    7. Statutory Cross-Compliance Matrix
                  </h3>
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="font-bold text-stone-900">Act & Section</span>
                      <span className="font-bold text-stone-900">Enforcement Authority & Consequence</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-mono text-emerald-800">Patents Act Section 3(p)</span>
                      <span className="text-stone-600">IPO: Statutory rejection of traditional knowledge formulations</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-mono text-emerald-800">Patents Act Section 3(e)</span>
                      <span className="text-stone-600">IPO: Rejection as mere admixture unless synergy proved</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-mono text-blue-800">BDA 2002 Section 6 (Form III)</span>
                      <span className="text-stone-600">NBA: Patent invalidation under Section 64 & Section 55 penalties</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-mono text-amber-800">DCA Rule 122E (Phytopharma)</span>
                      <span className="text-stone-600">CDSCO: Mandates non-clinical toxicology + Phase I–III trials</span>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              /* ================= TECH STACK VIEWER ================= */
              <div className="space-y-10 text-stone-800">
                {/* Header */}
                <div className="border-b border-stone-200 pb-5">
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                    Full-Stack Technical Architecture
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                    Technology Stack & Architecture Specification
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Next.js 15+ App Router • Grounded Dual-Tier RAG • Deterministic Algorithmic Systems
                  </p>
                </div>

                {/* Section 1: Architecture Overview */}
                <section id="tech-arch" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-blue-600 pl-3">
                    1. High-Level Architecture & End-to-End Flow
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    IP-SAKTI Sahayak decouples probabilistic text generation from deterministic statutory evaluation.
                  </p>
                  <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto">
                    <pre>{`User Query ──> Intent Classifier ──> Lexical & Semantic Retrieval (24 Statutory Acts)
                                          │
        ┌─────────────────────────────────┴─────────────────────────────────┐
        ▼                                                                   ▼
  Primary Tier: Gemini 2.5 GenAI                             Secondary Tier: Deterministic Synthesizer
 (Grounded strictly by retrieved clauses)                   (Zero-Quota, Zero-Crash Presentation Fallback)
        │                                                                   │
        └─────────────────────────────────┬─────────────────────────────────┘
                                          ▼
                  JSON Response with Clickable Statutory Citation Drawer`}</pre>
                  </div>
                </section>

                {/* Section 2: Core Matrix */}
                <section id="tech-stack-table" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-blue-600 pl-3">
                    2. Core Technology Matrix
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Next.js 15 App Router</span>
                      <span className="text-[11px] font-semibold text-emerald-800 block">Framework & Routing</span>
                      <p className="text-stone-500 leading-relaxed">Server-rendered components, API endpoints, and production static bundling.</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">@google/genai SDK</span>
                      <span className="text-[11px] font-semibold text-emerald-800 block">AI & LLM Client</span>
                      <p className="text-stone-500 leading-relaxed">Official TypeScript SDK for server-side gemini-2.5-flash generation.</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Tailwind CSS v4</span>
                      <span className="text-[11px] font-semibold text-emerald-800 block">Styling Engine</span>
                      <p className="text-stone-500 leading-relaxed">Modern utility classes configured with @tailwindcss/postcss and custom color tokens.</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Motion</span>
                      <span className="text-[11px] font-semibold text-emerald-800 block">Spring Physics</span>
                      <p className="text-stone-500 leading-relaxed">Silky step transitions for 4-step wizards and slide-over drawers.</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">Lucide React</span>
                      <span className="text-[11px] font-semibold text-emerald-800 block">Icon Library</span>
                      <p className="text-stone-500 leading-relaxed">Clean SVG iconography representing legal, medical, and scientific actions.</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1">
                      <span className="font-bold text-stone-900 block">TypeScript 5.9</span>
                      <span className="text-[11px] font-semibold text-emerald-800 block">Type Safety</span>
                      <p className="text-stone-500 leading-relaxed">Strict compiler checks across all statutory models and i18n dictionaries.</p>
                    </div>
                  </div>
                </section>

                {/* Section 3: REST API Contracts */}
                <section id="tech-contracts" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-blue-600 pl-3">
                    3. Formal REST API Specifications & Contracts
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-bold font-mono">POST</span>
                        <span className="font-mono font-bold text-stone-800">/api/chat</span>
                      </div>
                      <p className="text-stone-600">Accepts user queries, retrieves citations, runs grounded Gemini or deterministic fallback.</p>
                      <pre className="p-2.5 rounded-lg bg-stone-900 text-stone-100 font-mono text-[11px] overflow-x-auto">
{`Request:  { message: string, jurisdiction: "India"|"International", productCategory: string, language: "en"|"hi" }
Response: { text: string, citations: Citation[], isSpeculative: boolean, suggestedActions: string[] }`}
                      </pre>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold font-mono">POST</span>
                        <span className="font-mono font-bold text-stone-800">/api/classify</span>
                      </div>
                      <p className="text-stone-600">Evaluates base formulation, extraction method, claims, and clinical trial status.</p>
                      <pre className="p-2.5 rounded-lg bg-stone-900 text-stone-100 font-mono text-[11px] overflow-x-auto">
{`Request:  { baseFormulation, processingLevel, claims, clinicalReadiness, language }
Response: { category, governingAuthority, statutoryRule, patentabilityOutlook, clinicalRequisites, keyCitations }`}
                      </pre>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold font-mono">POST</span>
                        <span className="font-mono font-bold text-stone-800">/api/abs-check</span>
                      </div>
                      <p className="text-stone-600">Calculates NBA Form I, Form III, or Section 7 SBB intimation obligations under BDA 2002.</p>
                    </div>
                  </div>
                </section>

                {/* Section 4: Grounded Corpus */}
                <section id="tech-corpus-index" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-blue-600 pl-3">
                    4. 24-Document Verified Legal Corpus Breakdown
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 font-semibold text-emerald-900">
                      IPO Patents Act (6 docs)
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 font-semibold text-blue-900">
                      NBA Biodiversity Act (4 docs)
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 font-semibold text-amber-900">
                      Drugs & Cosmetics Act (4 docs)
                    </div>
                    <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200 font-semibold text-purple-900">
                      FSSAI Ayurveda Aahar (2 docs)
                    </div>
                    <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 font-semibold text-rose-900">
                      TKDL & CSIR Guides (2 docs)
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-50/80 border border-cyan-200 font-semibold text-cyan-900">
                      USPTO & EPO Statutes (6 docs)
                    </div>
                  </div>
                </section>

                {/* Section 5: Security & Cloud Run */}
                <section id="tech-security-deploy" className="space-y-3">
                  <h3 className="text-base font-bold text-stone-900 border-l-4 border-blue-600 pl-3">
                    5. Security Architecture & Cloud Run Containerization
                  </h3>
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2 leading-relaxed">
                    <p>
                      <strong>Server-Side Secret Key Protection:</strong> <code>GEMINI_API_KEY</code> is never exposed to the client or browser bundle. It is accessed strictly in Next.js server route handlers.
                    </p>
                    <p>
                      <strong>Port 3000 Routing:</strong> Deployed in Cloud Run behind an NGINX reverse proxy listening strictly on port 3000.
                    </p>
                    <p>
                      <strong>Zero Crash SLA:</strong> The dual-tier architecture guarantees complete functional execution even when external network access is blocked during offline jury presentations.
                    </p>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
