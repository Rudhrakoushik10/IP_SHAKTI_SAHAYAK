'use client';

import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Building2,
  Percent,
  FileText,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Language, I18N } from '@/lib/i18n';
import { evaluateAbsRequirements, AbsFormState, AbsCheckResult } from '@/lib/abs-checker-logic';
import { MockSourceDocument, MOCK_CORPUS } from '@/lib/mock-corpus';

interface AbsHelperModalProps {
  lang: Language;
  onOpenCitation: (source: MockSourceDocument) => void;
}

export function AbsHelperModal({ lang, onOpenCitation }: AbsHelperModalProps) {
  const t = I18N[lang];

  const [formState, setFormState] = useState<AbsFormState>({
    entityType: 'indian_company',
    activityType: 'commercial_manufacturing',
    sourceOrigin: 'cultivated_farms',
    annualTurnoverBracket: 'under_1cr',
  });

  const result: AbsCheckResult = evaluateAbsRequirements(formState);

  return (
    <div id="abs-helper-section" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {lang === 'hi' ? 'जैविक विविधता एवं एबीएस अनुपालन विज़ार्ड' : 'Access & Benefit Sharing (ABS) Helper'}
              </h2>
              <p className="text-xs text-stone-500">
                {lang === 'hi'
                  ? 'जैविक विविधता अधिनियम, २००२ (BDA) के तहत राष्ट्रीय जैव विविधता प्राधिकरण (NBA) एवं राज्य बोर्ड (SBB) मूल्यांकन।'
                  : 'Decision support under Biological Diversity Act, 2002 for commercial utilization & patenting of Indian biological resources.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://nbaindia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-300 transition"
            >
              <span>nbaindia.org</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            </a>
            <a
              href="https://indiacode.nic.in/handle/123456789/2046"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg border border-stone-200 transition"
            >
              <span>India Code (BDA 2002)</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-600" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs (Left Column) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            {lang === 'hi' ? 'संस्था एवं गतिविधि विवरण' : 'Entity & Utilization Profile'}
          </h3>

          {/* 1. Entity Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              1. Entity Ownership & Nature
            </label>
            <select
              id="abs-entity-type"
              value={formState.entityType}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, entityType: e.target.value as any }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="indian_company">Indian Corporate / MSME / LLP (100% Indian Equity)</option>
              <option value="foreign_or_nri_company">Foreign Entity / NRI / Indian Co with Foreign Equity</option>
              <option value="indian_individual">Indian Citizen / Researcher (Individual)</option>
              <option value="vaidya_individual">Local Ayurvedic Vaidya / Traditional Healer</option>
            </select>
          </div>

          {/* 2. Activity Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              2. Planned Commercial Activity
            </label>
            <select
              id="abs-activity-type"
              value={formState.activityType}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, activityType: e.target.value as any }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="commercial_manufacturing">Commercial Manufacturing & Marketing</option>
              <option value="ipr_patent_filing">Applying for Intellectual Property / Patent (Form III)</option>
              <option value="export_biological_material">Exporting Raw Herbs / Bio-materials Abroad</option>
              <option value="research_only">Pure Non-Commercial Academic Research</option>
            </select>
          </div>

          {/* 3. Biological Material Sourcing */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              3. Biological Material Sourcing
            </label>
            <select
              id="abs-sourcing-origin"
              value={formState.sourceOrigin}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, sourceOrigin: e.target.value as any }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="cultivated_farms">Cultivated on Registered Indian Farms (with Traceability)</option>
              <option value="wild_forest">Wild Harvested from Forest / Community Land</option>
              <option value="mandi_ntc">Purchased as Normally Traded Commodity (Mandi / NTC)</option>
              <option value="foreign_import">Imported from Overseas (Non-Indian Origin)</option>
            </select>
          </div>

          {/* 4. Turnover Bracket */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              4. Annual Ex-Factory Turnover Bracket
            </label>
            <select
              id="abs-turnover-bracket"
              value={formState.annualTurnoverBracket}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, annualTurnoverBracket: e.target.value as any }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="under_1cr">Up to INR 1 Crore (0.1% ABS levy bracket)</option>
              <option value="1cr_to_3cr">INR 1 Crore to 3 Crore (0.2% ABS levy bracket)</option>
              <option value="above_3cr">Above INR 3 Crore (0.5% ABS levy bracket)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Compliance Evaluation (Right Column) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                Statutory Assessment
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                {result.governingAuthority}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-stone-500 block">Prescribed Form</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block mt-0.5">
                {result.prescribedForm}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
              Executive Statutory Summary
            </h4>
            <p className="text-xs text-stone-800 leading-relaxed font-medium">
              {lang === 'hi' ? result.summaryHi : result.summaryEn}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mb-0.5">
                <Percent className="w-3.5 h-3.5 text-stone-400" />
                <span>ABS Levy</span>
              </div>
              <p className="text-xs font-bold text-emerald-800">{result.levyPercentage}</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>Approval Type</span>
              </div>
              <p className="text-xs font-bold text-stone-800">
                {result.approvalRequired ? 'Prior Approval / Intimation' : 'Statutorily Exempt'}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mb-0.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                <span>Jurisdiction Body</span>
              </div>
              <p className="text-xs font-bold text-stone-800">{result.governingAuthority.split(' ')[0]}</p>
            </div>
          </div>

          {/* Action Checklist */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {lang === 'hi' ? 'अनिवार्य अनुपालन चेकलिस्ट' : 'Mandatory Compliance Checklist'}
            </h4>
            <div className="space-y-2">
              {(lang === 'hi' ? result.checklistHi : result.checklistEn).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Alerts if any */}
          {result.riskAlertsEn.length > 0 && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Legal Risk Warning:</span>
                <span>{lang === 'hi' ? result.riskAlertsHi[0] : result.riskAlertsEn[0]}</span>
              </div>
            </div>
          )}

          {/* Relevant Citations */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
              Related Mock Statutory Citations:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.relevantSourceIds.map((id) => {
                const doc = MOCK_CORPUS.find((c) => c.source_id === id);
                if (!doc) return null;
                return (
                  <button
                    key={id}
                    onClick={() => onOpenCitation(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{doc.source_id} ({doc.provision})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
