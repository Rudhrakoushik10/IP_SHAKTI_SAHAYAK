'use client';

import React, { useState } from 'react';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { Header } from '@/components/Header';
import { DashboardView } from '@/components/DashboardView';
import { ClassificationWorkflow } from '@/components/ClassificationWorkflow';
import { ChatSection } from '@/components/ChatSection';
import { AbsHelperModal } from '@/components/AbsHelperModal';
import { TkdlExplainerModal } from '@/components/TkdlExplainerModal';
import { CorpusExplorerModal } from '@/components/CorpusExplorerModal';
import { CitationDrawer } from '@/components/CitationDrawer';
import { HumanEscalationModal } from '@/components/HumanEscalationModal';
import { DocsView } from '@/components/DocsView';
import { Language } from '@/lib/i18n';
import { MockSourceDocument } from '@/lib/mock-corpus';
import { DemoScenario } from '@/lib/demo-scenarios';
import { ProductCategory } from '@/lib/classification-logic';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'classify' | 'abs' | 'tkdl' | 'corpus' | 'docs'>('dashboard');
  const [jurisdiction, setJurisdiction] = useState<'India' | 'International'>('India');
  const [currentCategory, setCurrentCategory] = useState<ProductCategory>('Proprietary Medicine');

  // Modal / Drawer states
  const [selectedCitation, setSelectedCitation] = useState<MockSourceDocument | null>(null);
  const [isCitationDrawerOpen, setIsCitationDrawerOpen] = useState(false);
  const [isEscalationModalOpen, setIsEscalationModalOpen] = useState(false);
  const [escalationQuery, setEscalationQuery] = useState('');
  const [chatInitialQuery, setChatInitialQuery] = useState('');

  const handleOpenCitation = (source: MockSourceDocument) => {
    setSelectedCitation(source);
    setIsCitationDrawerOpen(true);
  };

  const handleOpenEscalation = (query: string) => {
    setEscalationQuery(query);
    setIsEscalationModalOpen(true);
  };

  const handleSelectScenario = (scenario: DemoScenario) => {
    setJurisdiction(scenario.suggestedJurisdiction);
    setCurrentCategory(scenario.suggestedCategory);
    setChatInitialQuery(scenario.queryEn);
    setActiveTab('chat');
  };

  const handleNavigateToChatWithQuery = (query: string, category: ProductCategory) => {
    setCurrentCategory(category);
    setChatInitialQuery(query);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Mandatory Disclaimer Banner (PRD Evidence-Before-Fluency Guardrail) */}
      <DisclaimerBanner lang={lang} />

      {/* 2. Unified Header & Navigation Bar */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        jurisdiction={jurisdiction}
        onJurisdictionChange={setJurisdiction}
        currentCategory={currentCategory}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSelectScenario={handleSelectScenario}
      />

      {/* 3. Main Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            lang={lang}
            jurisdiction={jurisdiction}
            currentCategory={currentCategory}
            onNavigateTab={setActiveTab}
            onSelectScenario={handleSelectScenario}
          />
        )}

        {activeTab === 'classify' && (
          <ClassificationWorkflow
            lang={lang}
            onCategorySelected={setCurrentCategory}
            onNavigateToChatWithQuery={handleNavigateToChatWithQuery}
            onNavigateToAbs={() => setActiveTab('abs')}
          />
        )}

        {activeTab === 'chat' && (
          <ChatSection
            key={`${currentCategory}-${jurisdiction}-${chatInitialQuery}`}
            lang={lang}
            jurisdiction={jurisdiction}
            currentCategory={currentCategory}
            onOpenCitation={handleOpenCitation}
            onOpenEscalation={handleOpenEscalation}
            initialQuery={chatInitialQuery}
          />
        )}

        {activeTab === 'abs' && (
          <AbsHelperModal
            lang={lang}
            onOpenCitation={handleOpenCitation}
          />
        )}

        {activeTab === 'tkdl' && (
          <TkdlExplainerModal
            lang={lang}
            onOpenCitation={handleOpenCitation}
            onTestQueryInChat={(query) => {
              setChatInitialQuery(query);
              setActiveTab('chat');
            }}
          />
        )}

        {activeTab === 'corpus' && (
          <CorpusExplorerModal
            lang={lang}
            onOpenCitation={handleOpenCitation}
          />
        )}

        {activeTab === 'docs' && (
          <DocsView lang={lang} />
        )}
      </main>

      {/* 4. Slide-over Citation Drawer */}
      <CitationDrawer
        source={selectedCitation}
        isOpen={isCitationDrawerOpen}
        onClose={() => setIsCitationDrawerOpen(false)}
        lang={lang}
      />

      {/* 5. Human Facilitator Escalation Modal */}
      <HumanEscalationModal
        isOpen={isEscalationModalOpen}
        onClose={() => setIsEscalationModalOpen(false)}
        lang={lang}
        currentQuery={escalationQuery}
        category={currentCategory}
        jurisdiction={jurisdiction}
      />

      {/* 6. Footer with SIH 2026 Presentation MVP Attributions */}
      <footer className="border-t border-stone-200 bg-white py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-stone-800">IP-SAKTI Sahayak</span> — Smart India Hackathon 2026 Presentation MVP
            <p className="text-[11px] text-stone-400 mt-0.5">
              Developed for AI-assisted Ayurveda IPR and Regulatory Decision Support.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setActiveTab('docs')}
              className="text-stone-600 hover:text-emerald-800 font-bold flex items-center gap-1"
            >
              <span>PRD & Tech Stack</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('corpus')}
              className="text-stone-600 hover:text-emerald-800 font-medium"
            >
              Mock Corpus (24)
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('tkdl')}
              className="text-stone-600 hover:text-emerald-800 font-medium"
            >
              TKDL Guide
            </button>
            <span>•</span>
            <button
              onClick={() => handleOpenEscalation('General IPR Inquiry')}
              className="text-emerald-800 hover:underline font-bold"
            >
              AYUSH Patent Cell Helpdesk
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
