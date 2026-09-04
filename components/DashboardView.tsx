'use client';

import React from 'react';
import {
  Scale,
  Layers,
  Sparkles,
  FileCheck2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Users,
  CheckCircle2,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { Language, I18N } from '@/lib/i18n';
import { DEMO_SCENARIOS, DemoScenario } from '@/lib/demo-scenarios';
import { ProductCategory } from '@/lib/classification-logic';
import { SystemLogo } from '@/components/SystemLogo';
import { AUTHORITATIVE_DATASETS } from '@/lib/authoritative-datasets';

interface DashboardViewProps {
  lang: Language;
  jurisdiction: 'India' | 'International';
  currentCategory: ProductCategory;
  onNavigateTab: (tab: 'dashboard' | 'chat' | 'classify' | 'abs' | 'tkdl' | 'corpus' | 'docs') => void;
  onSelectScenario: (sc: DemoScenario) => void;
}

export function DashboardView({
  lang,
  jurisdiction,
  currentCategory,
  onNavigateTab,
  onSelectScenario,
}: DashboardViewProps) {
  const t = I18N[lang];

  return (
    <div id="dashboard-view-container" className="space-y-8">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Background Subtle Watermark */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
          <Scale className="w-96 h-96" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2026 • Presentation MVP</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
              {lang === 'hi'
                ? 'आयुर्वेद नवाचार, आईपीआर एवं विनियामक अनुपालन सहायक'
                : 'Grounded AI Assistant for Ayurveda IPR & Regulatory Compliance'}
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
              {lang === 'hi'
                ? 'उत्पाद वर्गीकरण → अधिकार क्षेत्र चयन → विधिक साक्ष्य पुनर्प्राप्ति → सरल भाषा मार्गदर्शन → स्रोत उद्धरण → व्यावहारिक अगले कदम।'
                : 'Convert complex Ayurveda IPR and regulatory law into a guided workflow: Product Classification → Jurisdiction → Relevant Evidence → Plain-Language Guidance → Citation → Next Step.'}
            </p>

            {/* Quick Stats / Guardrails */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-emerald-100">
              <span className="bg-emerald-800/60 px-3 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                Evidence Before Fluency
              </span>
              <span className="bg-emerald-800/60 px-3 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-300" />
                24 Verified Mock Corpus Records
              </span>
              <span className="bg-emerald-800/60 px-3 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-300" />
                India & International Modes
              </span>
            </div>

            {/* Direct CTA Buttons */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                id="dash-classify-cta-btn"
                onClick={() => onNavigateTab('classify')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-900 rounded-xl text-xs font-bold transition shadow-xs"
              >
                <Layers className="w-4 h-4 text-emerald-800" />
                <span>{lang === 'hi' ? 'उत्पाद वर्गीकरण शुरू करें' : 'Start Product Classification'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="dash-chat-cta-btn"
                onClick={() => onNavigateTab('chat')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700/90 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition border border-emerald-500/30"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{lang === 'hi' ? 'सहायक से प्रश्न पूछें' : 'Ask Grounded Assistant'}</span>
              </button>

              <button
                id="dash-corpus-cta-btn"
                onClick={() => onNavigateTab('corpus')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 rounded-xl text-xs font-bold transition border border-emerald-700/60"
              >
                <Database className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'hi' ? 'प्रामाणिक डेटासेट' : 'Authoritative Datasets'}</span>
              </button>

              <button
                id="dash-docs-cta-btn"
                onClick={() => onNavigateTab('docs')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-800/80 hover:bg-stone-800 text-stone-200 rounded-xl text-xs font-bold transition border border-stone-700/60"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>{lang === 'hi' ? 'पीआरडी व तकनीकी स्टैक' : 'PRD & Tech Stack'}</span>
              </button>
            </div>
          </div>

          {/* System Logo Badge Display in Hero */}
          <div className="hidden md:flex flex-col items-center justify-center p-5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 backdrop-blur-xs shrink-0 self-center text-center shadow-lg">
            <SystemLogo size="lg" className="mb-2" />
            <span className="font-extrabold text-xs tracking-wider uppercase text-emerald-200">
              IP-SAKTI Sahayak
            </span>
            <span className="text-[10px] text-emerald-300/80 max-w-[140px] mt-0.5 leading-tight">
              Ayurveda IPR & Regulatory Intelligence
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Classification */}
        <button
          id="dash-card-classify"
          onClick={() => onNavigateTab('classify')}
          className="text-left p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-xs transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition">
              {lang === 'hi' ? 'उत्पाद वर्गीकरण' : 'Product Classification'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Routes into 6 statutory categories (Classical, Proprietary, Phytopharmaceutical, Ayurveda Aahar, Cosmetic, New Drug).
            </p>
          </div>
          <div className="mt-4 text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <span>4-Step Wizard</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>

        {/* Card 2: Assistant */}
        <button
          id="dash-card-assistant"
          onClick={() => onNavigateTab('chat')}
          className="text-left p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-xs transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition">
              {lang === 'hi' ? 'साक्ष्य-आधारित सहायक' : 'Grounded Assistant'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Structured answers citing Section 3(p), Section 3(e) synergism, and CDSCO/AYUSH licensing requirements.
            </p>
          </div>
          <div className="mt-4 text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <span>Ask Questions</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>

        {/* Card 3: ABS */}
        <button
          id="dash-card-abs"
          onClick={() => onNavigateTab('abs')}
          className="text-left p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-xs transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition">
              {lang === 'hi' ? 'एबीएस चेकलिस्ट (BDA)' : 'ABS Helper (BDA 2002)'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              National Biodiversity Authority (NBA) vs SBB compliance, Form I/III approval, and benefit sharing levies.
            </p>
          </div>
          <div className="mt-4 text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <span>Check Sourcing</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>

        {/* Card 4: TKDL */}
        <button
          id="dash-card-tkdl"
          onClick={() => onNavigateTab('tkdl')}
          className="text-left p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-xs transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition">
              {lang === 'hi' ? 'टीकेडीएल व पूर्व-कला' : 'TKDL & Prior Art'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              CSIR-TKDL database awareness, anti-biopiracy landmarks, and Section 3(p) non-patentability rules.
            </p>
          </div>
          <div className="mt-4 text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <span>Explore Guide</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>
      </div>

      {/* Authoritative Open Public Datasets Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-800" />
              <h2 className="text-lg font-bold text-stone-900">
                {lang === 'hi'
                  ? 'प्रामाणिक खुले सार्वजनिक डेटासेट एवं संदर्भ स्रोत'
                  : 'Authoritative Open Public Datasets & Legal Corpus'}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {lang === 'hi'
                ? 'सिस्टम का ज्ञानकोष खुले, प्रामाणिक सार्वजनिक स्रोतों से संकलित किया गया है: TKDL, India Code, IP India एवं NBA।'
                : 'The system knowledge base is assembled directly from open, authoritative public legal sources.'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('corpus')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition shrink-0"
          >
            <span>{lang === 'hi' ? 'सभी २४ विधिक प्रावधान देखें' : 'Explore All 24 Provisions'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AUTHORITATIVE_DATASETS.map((ds) => (
            <div
              key={ds.id}
              className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {ds.domain}
                  </span>
                  <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-full">
                    {ds.badge}
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-emerald-900 transition leading-snug">
                  {ds.shortName}
                </h3>
                <p className="text-[11px] text-stone-500 font-medium line-clamp-1 mt-0.5">
                  {ds.governingBody}
                </p>

                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {lang === 'hi' ? ds.descriptionHi : ds.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/70 space-y-2">
                <div className="text-[11px] text-stone-500 font-mono">
                  <span className="font-bold text-stone-700">Role: </span>
                  <span className="line-clamp-2">{ds.patentExaminationRole}</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => onNavigateTab('corpus')}
                    className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition"
                  >
                    <span>View Citations</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <a
                    href={ds.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-700 hover:text-emerald-800 bg-white px-2 py-1 rounded-lg border border-stone-200 hover:border-emerald-300 transition"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-emerald-700" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scripted Presentation Demo Scenarios Showcase */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <h2 className="text-lg font-bold text-stone-900">
                {lang === 'hi' ? 'स्क्रिप्टेड प्रस्तुति डेमो परिदृश्य (३-५ मिनट डेमो)' : 'Scripted Presentation Demo Scenarios'}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              PRD Section 9: 5 deterministic presentation scenarios for an airtight, zero-friction live demonstration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              id={`scenario-card-${scenario.id}`}
              className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/50 hover:border-emerald-300 transition flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 uppercase tracking-wider font-mono">
                    {scenario.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {scenario.suggestedJurisdiction}
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-emerald-900 transition leading-snug">
                  {lang === 'hi' ? scenario.titleHi : scenario.titleEn}
                </h3>

                <p className="text-xs text-stone-700 italic bg-white p-2.5 rounded-xl border border-stone-200/80 mt-2.5 font-medium">
                  &ldquo;{lang === 'hi' ? scenario.queryHi : scenario.queryEn}&rdquo;
                </p>

                <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                  {lang === 'hi' ? scenario.descriptionHi : scenario.descriptionEn}
                </p>
              </div>

              <button
                id={`run-scenario-${scenario.id}`}
                onClick={() => onSelectScenario(scenario)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-2xs"
              >
                <span>{lang === 'hi' ? 'यह डेमो परिदृश्य चलाएं' : 'Run Live Demo Scenario'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Six-Member Team Ownership Architecture Panel (From Tech Stack PDF) */}
      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-stone-700" />
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            SIH 2026 Team Architecture & Vertical Slice Ownership
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="font-bold text-emerald-800 block text-[11px]">Member 1</span>
            <span className="font-semibold text-stone-800 block mt-0.5">Product / UX</span>
            <span className="text-[10px] text-stone-500 block mt-1">Classification questions & demo journey</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="font-bold text-emerald-800 block text-[11px]">Member 2</span>
            <span className="font-semibold text-stone-800 block mt-0.5">Frontend</span>
            <span className="text-[10px] text-stone-500 block mt-1">React + Tailwind screens & citation drawers</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="font-bold text-emerald-800 block text-[11px]">Member 3</span>
            <span className="font-semibold text-stone-800 block mt-0.5">Backend</span>
            <span className="text-[10px] text-stone-500 block mt-1">REST API Contract & schema validation</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="font-bold text-emerald-800 block text-[11px]">Member 4</span>
            <span className="font-semibold text-stone-800 block mt-0.5">Data / RAG</span>
            <span className="text-[10px] text-stone-500 block mt-1">Mock legal corpus & retrieval ranking</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="font-bold text-emerald-800 block text-[11px]">Member 5</span>
            <span className="font-semibold text-stone-800 block mt-0.5">Safety / Domain</span>
            <span className="text-[10px] text-stone-500 block mt-1">Safe abstention, ABS & TK prior-art</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="font-bold text-emerald-800 block text-[11px]">Member 6</span>
            <span className="font-semibold text-stone-800 block mt-0.5">Integration</span>
            <span className="text-[10px] text-stone-500 block mt-1">Demo stability & QA validation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
