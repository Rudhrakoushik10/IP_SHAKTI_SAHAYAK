'use client';

import React from 'react';
import {
  Scale,
  Sparkles,
  Globe,
  Languages,
  BookOpen,
  HelpCircle,
  FileCheck2,
  Database,
  Layers,
  ChevronDown,
  FileText,
} from 'lucide-react';
import { SystemLogo } from '@/components/SystemLogo';
import { Language, I18N } from '@/lib/i18n';
import { DEMO_SCENARIOS, DemoScenario } from '@/lib/demo-scenarios';
import { ProductCategory } from '@/lib/classification-logic';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  jurisdiction: 'India' | 'International';
  onJurisdictionChange: (j: 'India' | 'International') => void;
  currentCategory: ProductCategory;
  activeTab: 'dashboard' | 'chat' | 'classify' | 'abs' | 'tkdl' | 'corpus' | 'docs';
  onTabChange: (tab: 'dashboard' | 'chat' | 'classify' | 'abs' | 'tkdl' | 'corpus' | 'docs') => void;
  onSelectScenario: (scenario: DemoScenario) => void;
}

export function Header({
  lang,
  onLanguageChange,
  jurisdiction,
  onJurisdictionChange,
  currentCategory,
  activeTab,
  onTabChange,
  onSelectScenario,
}: HeaderProps) {
  const t = I18N[lang];

  return (
    <header id="main-app-header" className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between">
            <button
              id="brand-logo-button"
              onClick={() => onTabChange('dashboard')}
              className="flex items-center gap-3 text-left focus:outline-hidden group"
            >
              <SystemLogo size="md" className="group-hover:scale-105 transition-transform" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-stone-900 tracking-tight">
                    {t.appTitle}
                  </span>
                  <span
                    id="system-prototype-badge"
                    className="bg-amber-100 text-amber-900 border border-amber-300/80 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs"
                  >
                    Prototype
                  </span>
                  <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    SIH 2026
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {t.appSubtitle}
                </p>
              </div>
            </button>

            {/* Mobile Lang and Jurisdiction */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                id="mobile-lang-toggle"
                onClick={() => onLanguageChange(lang === 'en' ? 'hi' : 'en')}
                className="px-2.5 py-1 text-xs font-semibold rounded-md border border-stone-300 bg-stone-50 text-stone-700"
              >
                {lang === 'en' ? 'हिन्दी' : 'EN'}
              </button>
            </div>
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Scripted Demo Quick Picker */}
            <div className="relative inline-block text-left">
              <select
                id="scenario-quick-selector"
                onChange={(e) => {
                  const sc = DEMO_SCENARIOS.find((s) => s.id === e.target.value);
                  if (sc) onSelectScenario(sc);
                  e.target.value = '';
                }}
                defaultValue=""
                className="text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
              >
                <option value="" disabled>
                  ⚡ {t.selectScenario}
                </option>
                {DEMO_SCENARIOS.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {lang === 'hi' ? sc.titleHi : sc.titleEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Jurisdiction Toggle */}
            <div className="inline-flex rounded-lg border border-stone-300 bg-stone-100 p-0.5 text-xs font-medium">
              <button
                id="toggle-jurisdiction-india"
                onClick={() => onJurisdictionChange('India')}
                className={`px-3 py-1 rounded-md transition-all ${
                  jurisdiction === 'India'
                    ? 'bg-white text-emerald-800 font-bold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🇮🇳 {t.jurisdictionIndia}
              </button>
              <button
                id="toggle-jurisdiction-intl"
                onClick={() => onJurisdictionChange('International')}
                className={`px-3 py-1 rounded-md transition-all ${
                  jurisdiction === 'International'
                    ? 'bg-white text-blue-800 font-bold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🌐 {t.jurisdictionIntl}
              </button>
            </div>

            {/* Language Selector */}
            <button
              id="header-lang-selector"
              onClick={() => onLanguageChange(lang === 'en' ? 'hi' : 'en')}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition"
              title="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5 text-stone-500" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav id="header-nav-tabs" className="flex items-center gap-1 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-stone-100 pt-2">
          <button
            id="tab-btn-dashboard"
            onClick={() => onTabChange('dashboard')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            {t.navDashboard}
          </button>
          <button
            id="tab-btn-classify"
            onClick={() => onTabChange('classify')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'classify'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {t.navAnalyze}
          </button>
          <button
            id="tab-btn-chat"
            onClick={() => onTabChange('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'chat'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            {t.navChat}
          </button>
          <button
            id="tab-btn-abs"
            onClick={() => onTabChange('abs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'abs'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            {t.navAbs}
          </button>
          <button
            id="tab-btn-tkdl"
            onClick={() => onTabChange('tkdl')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'tkdl'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t.navTkdl}
          </button>
          <button
            id="tab-btn-corpus"
            onClick={() => onTabChange('corpus')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'corpus'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            {t.navCorpus}
          </button>
          <button
            id="tab-btn-docs"
            onClick={() => onTabChange('docs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'docs'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            {t.navDocs}
          </button>
        </nav>
      </div>
    </header>
  );
}
