'use client';

import React from 'react';
import { X, ExternalLink, ShieldCheck, BookMarked, Calendar, Building2, Tag } from 'lucide-react';
import { MockSourceDocument } from '@/lib/mock-corpus';
import { Language } from '@/lib/i18n';

interface CitationDrawerProps {
  source: MockSourceDocument | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function CitationDrawer({ source, isOpen, onClose, lang }: CitationDrawerProps) {
  if (!isOpen || !source) return null;

  return (
    <div
      id="citation-drawer-overlay"
      className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex justify-end transition-opacity"
      onClick={onClose}
    >
      <div
        id="citation-drawer-panel"
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-start justify-between gap-3 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-300">
                MOCK CORPUS RECORD
              </span>
              <span className="font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {source.source_id}
              </span>
            </div>
            <h3 className="text-sm font-bold text-stone-900 leading-snug">
              {source.title}
            </h3>
          </div>
          <button
            id="close-citation-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-5 text-xs text-stone-700">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
            <div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mb-0.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                <span>Authority</span>
              </div>
              <p className="font-medium text-stone-800">{source.authority}</p>
            </div>

            <div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mb-0.5">
                <BookMarked className="w-3.5 h-3.5 text-stone-400" />
                <span>Provision / Section</span>
              </div>
              <p className="font-bold text-emerald-800">{source.provision}</p>
            </div>

            <div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mb-0.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Version Date</span>
              </div>
              <p className="font-medium text-stone-800">{source.version_date}</p>
            </div>

            <div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>Jurisdiction</span>
              </div>
              <p className="font-medium text-stone-800">{source.jurisdiction}</p>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
              Executive Summary
            </h4>
            <p className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-stone-800 leading-relaxed font-medium">
              {source.summary}
            </p>
          </div>

          {/* Full Excerpt */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
              Statutory Excerpt (Mock Evidence)
            </h4>
            <div className="p-3.5 bg-stone-900 text-stone-100 rounded-xl text-[11px] font-mono leading-relaxed border border-stone-800">
              {source.content}
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mb-1.5">
              <Tag className="w-3 h-3" />
              <span>Taxonomy Index Tags</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {source.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-mono text-[10px] border border-stone-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Authoritative Dataset Origin & Official Link */}
          <div className="pt-3 border-t border-stone-200 space-y-2">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Authoritative Public Dataset Origin
            </h4>
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-stone-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  {source.dataset_origin === 'tkdl' && 'Traditional Knowledge Digital Library (TKDL)'}
                  {source.dataset_origin === 'indiacode' && 'Statutes & Rules — India Code'}
                  {source.dataset_origin === 'ipindia' && 'IP India Public Databases (InPASS / CGPDTM)'}
                  {source.dataset_origin === 'nbaindia' && 'National Biodiversity Authority / ABS (NBA)'}
                  {source.dataset_origin === 'international' && 'International Regulatory Repository'}
                </span>
                <span className="font-mono text-[10px] text-emerald-800 font-semibold bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                  {source.dataset_origin === 'tkdl' && 'tkdl.res.in'}
                  {source.dataset_origin === 'indiacode' && 'indiacode.nic.in'}
                  {source.dataset_origin === 'ipindia' && 'ipindia.gov.in'}
                  {source.dataset_origin === 'nbaindia' && 'nbaindia.org'}
                  {source.dataset_origin === 'international' && 'Official Treaty/Agency'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                {source.dataset_origin === 'tkdl' &&
                  'Corpus excerpt derived from CSIR-TKDL digitized traditional knowledge archives and IPC patent examination agreements.'}
                {source.dataset_origin === 'indiacode' &&
                  'Corpus provision codified from the official digital repository of Central Acts at India Code (indiacode.nic.in).'}
                {source.dataset_origin === 'ipindia' &&
                  'Corpus reference mapped from CGPDTM official guidelines and public search registries at ipindia.gov.in.'}
                {source.dataset_origin === 'nbaindia' &&
                  'Corpus rule aligned with the National Biodiversity Authority ABS guidelines and biological resource access forms.'}
                {source.dataset_origin === 'international' &&
                  'Corpus standard grounded in international botanical drug guidance and genetic resource treaties.'}
              </p>
              <a
                href={source.authoritative_source_url || source.url_placeholder}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg border border-emerald-300 transition shadow-2xs"
              >
                <span>Visit Authoritative Portal</span>
                <ExternalLink className="w-3 h-3 text-emerald-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 mt-auto bg-stone-50 text-center">
          <button
            id="dismiss-drawer-bottom-btn"
            onClick={onClose}
            className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition"
          >
            {lang === 'hi' ? 'उद्धरण बंद करें' : 'Close Citation Inspector'}
          </button>
        </div>
      </div>
    </div>
  );
}
