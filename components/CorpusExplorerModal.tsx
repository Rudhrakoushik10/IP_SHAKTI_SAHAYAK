'use client';

import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  ShieldCheck,
  Tag,
  ExternalLink,
  BookOpen,
  Building2,
  CheckCircle2,
  FileCheck2,
  Scale,
  Globe2,
} from 'lucide-react';
import { MOCK_CORPUS, MockSourceDocument, AuthoritativeDatasetKey } from '@/lib/mock-corpus';
import { AUTHORITATIVE_DATASETS } from '@/lib/authoritative-datasets';
import { Language } from '@/lib/i18n';

interface CorpusExplorerModalProps {
  lang: Language;
  onOpenCitation: (source: MockSourceDocument) => void;
}

export function CorpusExplorerModal({ lang, onOpenCitation }: CorpusExplorerModalProps) {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [selectedDataset, setSelectedDataset] = useState<string>('All');

  const topics = [
    'All',
    'Patentability',
    'Traditional Knowledge / TKDL',
    'ABS / Biodiversity',
    'Drugs & Cosmetics',
    'Food / Ayurveda-Aahar',
    'Cosmetics',
    'International / Export',
  ];

  const filteredCorpus = MOCK_CORPUS.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.provision.toLowerCase().includes(search.toLowerCase()) ||
      doc.authority.toLowerCase().includes(search.toLowerCase()) ||
      doc.summary.toLowerCase().includes(search.toLowerCase()) ||
      doc.source_id.toLowerCase().includes(search.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesTopic = selectedTopic === 'All' || doc.topic === selectedTopic;
    const matchesJurisdiction =
      selectedJurisdiction === 'All' || doc.jurisdiction === selectedJurisdiction || doc.jurisdiction === 'Both';
    const matchesDataset =
      selectedDataset === 'All' || doc.dataset_origin === selectedDataset;

    return matchesSearch && matchesTopic && matchesJurisdiction && matchesDataset;
  });

  return (
    <div id="corpus-explorer-section" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-stone-900">
                  {lang === 'hi' ? 'प्रामाणिक कॉर्पस एवं सार्वजनिक डेटासेट' : 'Authoritative Corpus & Public Datasets'}
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  {MOCK_CORPUS.length} Verified Provisions
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {lang === 'hi'
                  ? 'कॉर्पस खुले, आधिकारिक सार्वजनिक स्रोतों (TKDL, India Code, IP India, NBA) से संकलित किया गया है।'
                  : 'Assembled from open, authoritative public sources: TKDL, India Code, IP India, and NBA.'}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Primary Public Datasets Hub */}
        <div className="mt-6 pt-5 border-t border-stone-100">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                {lang === 'hi' ? 'अधिकृत सार्वजनिक डेटासेट स्रोत' : 'Open Authoritative Public Repositories'}
              </h3>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Click to visit live portals or filter records
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {AUTHORITATIVE_DATASETS.map((ds) => {
              const count = MOCK_CORPUS.filter((c) => c.dataset_origin === ds.id).length;
              const isSelected = selectedDataset === ds.id;

              return (
                <div
                  key={ds.id}
                  id={`dataset-card-${ds.id}`}
                  className={`p-3.5 rounded-xl border transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-stone-50/70 border-stone-200 hover:border-emerald-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold bg-white text-emerald-800 px-2 py-0.5 rounded border border-stone-200">
                        {ds.domain}
                      </span>
                      <span className="text-[10px] font-bold text-stone-600 bg-stone-200/70 px-1.5 py-0.5 rounded-full">
                        {count} items
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-stone-900 leading-snug line-clamp-2">
                      {ds.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                      {lang === 'hi' ? ds.descriptionHi : ds.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/70 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedDataset(isSelected ? 'All' : ds.id)}
                      className={`text-[11px] font-semibold px-2 py-1 rounded-lg transition ${
                        isSelected
                          ? 'bg-emerald-800 text-white'
                          : 'bg-white hover:bg-emerald-100 text-emerald-800 border border-stone-200'
                      }`}
                    >
                      {isSelected ? 'Showing' : 'Filter Corpus'}
                    </button>
                    <a
                      href={ds.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 hover:text-emerald-800 transition"
                      title={`Visit ${ds.domain}`}
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              id="corpus-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'hi' ? 'कानून, धारा या विषय खोजें...' : 'Search by section, act, authority, or keyword...'}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-stone-900"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              id="corpus-topic-filter"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-stone-900"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              id="corpus-jurisdiction-filter"
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-stone-900"
            >
              <option value="All">All Jurisdictions</option>
              <option value="India">India</option>
              <option value="International">International</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              id="corpus-dataset-filter"
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-stone-900"
            >
              <option value="All">All Datasets</option>
              <option value="tkdl">TKDL (tkdl.res.in)</option>
              <option value="indiacode">India Code (indiacode.nic.in)</option>
              <option value="ipindia">IP India (ipindia.gov.in)</option>
              <option value="nbaindia">NBA / ABS (nbaindia.org)</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>
      </div>

      {/* Corpus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCorpus.map((doc) => (
          <div
            key={doc.source_id}
            id={`corpus-card-${doc.source_id}`}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  {doc.source_id}
                </span>
                <span className="text-[10px] font-semibold font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                  {doc.dataset_origin === 'tkdl' && 'tkdl.res.in'}
                  {doc.dataset_origin === 'indiacode' && 'indiacode.nic.in'}
                  {doc.dataset_origin === 'ipindia' && 'ipindia.gov.in'}
                  {doc.dataset_origin === 'nbaindia' && 'nbaindia.org'}
                  {doc.dataset_origin === 'international' && doc.jurisdiction}
                </span>
              </div>

              <h4 className="font-bold text-xs text-stone-900 line-clamp-2 mb-1 group-hover:text-emerald-800 transition">
                {doc.title}
              </h4>
              <p className="text-[11px] font-semibold text-emerald-700 mb-2">
                {doc.provision}
              </p>
              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-3">
                {doc.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-2">
              <div className="flex flex-wrap gap-1">
                {doc.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenCitation(doc)}
                  className="flex-1 py-1.5 rounded-lg bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 text-xs font-semibold border border-stone-200 flex items-center justify-center gap-1 transition"
                >
                  <span>Inspect Excerpt & Metadata</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <a
                  href={doc.authoritative_source_url || doc.url_placeholder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-stone-50 hover:bg-emerald-100 text-stone-600 hover:text-emerald-900 border border-stone-200 transition"
                  title="Open live authoritative database"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
