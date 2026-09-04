'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { Language, I18N } from '@/lib/i18n';
import { MockSourceDocument, MOCK_CORPUS } from '@/lib/mock-corpus';

interface TkdlExplainerModalProps {
  lang: Language;
  onOpenCitation: (source: MockSourceDocument) => void;
  onTestQueryInChat: (query: string) => void;
}

export function TkdlExplainerModal({
  lang,
  onOpenCitation,
  onTestQueryInChat,
}: TkdlExplainerModalProps) {
  const t = I18N[lang];
  const [searchTerm, setSearchTerm] = useState('');

  const tkdlSampleRecords = [
    {
      formulation: 'Triphala Churna (Amalaki, Haritaki, Bibhitaki)',
      classicalText: 'Charaka Samhita, Chikitsa Sthana 1:2',
      ipcCode: 'A61K 36/42 (Medicinal preparations from botanical sources)',
      patentStatus: 'Statutory Non-Patentable subject matter (Section 3(p))',
      priorArtImpact: 'Cites 34M+ digitized pages preventing biopiracy globally.',
    },
    {
      formulation: 'Turmeric (Curcumin) Wound Healing Topical Paste',
      classicalText: 'Sushruta Samhita, Sutra Sthana 37',
      ipcCode: 'A61K 36/9066 (Zingiberaceae preparations)',
      patentStatus: 'Revoked USPTO Patent No. 5,401,504 via CSIR-TKDL challenge.',
      priorArtImpact: 'Landmark biopiracy case establishing defensive publication supremacy.',
    },
    {
      formulation: 'Neem (Azadirachta indica) Fungicidal Formulation',
      classicalText: 'Upavana Vinoda (Ancient Sanskrit Agro-botanical treatise)',
      ipcCode: 'A01N 65/26 (Biopesticides from Meliaceae)',
      patentStatus: 'Revoked EPO Patent No. 0436257 via TKDL & Indian Govt evidence.',
      priorArtImpact: 'Proves prior public domain usage across international patent offices.',
    },
  ];

  return (
    <div id="tkdl-explainer-section" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-stone-900">
              {lang === 'hi'
                ? 'पारंपरिक ज्ञान डिजिटल लाइब्रेरी (TKDL) एवं पूर्व-कला गाइड'
                : 'Traditional Knowledge Digital Library (TKDL) & Prior Art Guide'}
            </h2>
            <p className="text-xs text-stone-500">
              {lang === 'hi'
                ? 'सीएसआईआर-आयुष पहल: ३.४ करोड़ पृष्ठों का वर्गीकरण जो जैव-चोरी (Biopiracy) को रोकता है और पेटेंट योग्यता तय करता है।'
                : 'CSIR-AYUSH defensive database translating ancient Ayurvedic texts into IPC taxonomy to prevent biopiracy.'}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://tkdl.res.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-300 transition"
            >
              <span>tkdl.res.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            </a>
            <a
              href="https://ipindia.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg border border-stone-200 transition"
            >
              <span>ipindia.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Comparison Grid: What is Excluded vs What CAN be Patented */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Excluded Card */}
        <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-900">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <h3 className="font-bold text-sm">
              {lang === 'hi' ? 'गैर-पेटेंट योग्य (धारा ३(पी) रोक)' : 'Statutorily Non-Patentable (Section 3(p))'}
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-rose-950">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                <strong>Exact Classical Recipes:</strong> Formulations cited in Charaka, Sushruta, Sahasrayogam or Bhavaprakasha.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                <strong>Mere Admixtures (Sec 3(e)):</strong> Mixing known Ayurvedic herbs without proving experimental synergism.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                <strong>Direct Traditional Use Claims:</strong> Claiming known therapeutic indications (e.g. Ashwagandha for stress relief).
              </span>
            </li>
          </ul>
        </div>

        {/* Patentable Card */}
        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <h3 className="font-bold text-sm">
              {lang === 'hi' ? 'क्या पेटेंट कराया जा सकता है?' : 'What CAN Be Patented in Ayurveda?'}
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-emerald-950">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                <strong>Proven Synergistic Formulations:</strong> Combinations showing measurable synergy index (Combination Index &lt; 1.0).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                <strong>Novel Drug Delivery Systems:</strong> Phytosomes, liposomes, nano-suspensions enhancing bioavailability.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                <strong>Phytopharmaceutical Fractions:</strong> Purified extracts with 4+ quantified biomarkers (CDSCO pathway).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                <strong>Novel Process Extraction:</strong> High-yield, solvent-free green extraction technology apparatus.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive TKDL Database Inspector */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              {lang === 'hi' ? 'टीकेडीएल पूर्व-कला केस स्टडीज' : 'TKDL Defensive Publication Case Studies'}
            </h3>
            <p className="text-xs text-stone-500">
              Examining international biopiracy rejections cited by USPTO, EPO, and IPO.
            </p>
          </div>
          <button
            onClick={() =>
              onTestQueryInChat('I have a formulation from a traditional text. Can I patent it?')
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition self-start"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            {lang === 'hi' ? 'डेमो परिदृश्य चलाएं' : 'Run TKDL Demo Query'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tkdlSampleRecords.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {rec.ipcCode}
                </span>
                <h4 className="font-bold text-xs text-stone-900 mt-2">{rec.formulation}</h4>
                <p className="text-[11px] text-stone-600 mt-1">
                  <strong>Text Origin:</strong> {rec.classicalText}
                </p>
              </div>
              <div className="text-[11px] text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200/80">
                <span className="font-semibold text-rose-800 block mb-0.5">Status:</span>
                <span>{rec.patentStatus}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Citation Links */}
        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={() => onOpenCitation(MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-013')!)}
            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            View MOCK-IN-013 (CSIR-TKDL Protocol)
          </button>
          <span className="text-stone-300">•</span>
          <button
            onClick={() => onOpenCitation(MOCK_CORPUS.find((c) => c.source_id === 'MOCK-IN-001')!)}
            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            View MOCK-IN-001 (Section 3(p) Exclusion)
          </button>
        </div>
      </div>
    </div>
  );
}
