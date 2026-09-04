'use client';

import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Building2,
  Mail,
  Phone,
  Download,
  Copy,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { Language } from '@/lib/i18n';
import { ProductCategory } from '@/lib/classification-logic';

interface HumanEscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentQuery: string;
  category: ProductCategory;
  jurisdiction: 'India' | 'International';
}

export function HumanEscalationModal({
  isOpen,
  onClose,
  lang,
  currentQuery,
  category,
  jurisdiction,
}: HumanEscalationModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const escalationPacket = `IP-SAKTI SAHAYAK — IPR FACILITATION BRIEF
==================================================
Date: ${new Date().toLocaleDateString()}
Target Body: AYUSH Patent Cell / TIFAC Patent Facilitation Centre (PFC)
Jurisdiction: ${jurisdiction}
Assessed Product Category: ${category}

USER QUERY / FORMULATION BRIEF:
"${currentQuery || 'Ayurveda Intellectual Property Assessment'}"

PRELIMINARY AI TRIAGE FINDINGS:
- Classification: ${category}
- Statutory Screening: Evaluated under Indian Patents Act 1970 (Sec 3p/3e/3d) & Biological Diversity Act 2002.
- Safe Abstention Trigger: Professional patentability search and legal representation required.

RECOMMENDED FACILITATION ACTIONS:
1. Conduct complete freedom-to-operate and novelty search on CSIR-TKDL & IPO Patent Database.
2. File NBA Form III application prior to patent grant.
3. Review State AYUSH Manufacturing Licensing dossier under Drugs & Cosmetics Rules.
==================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(escalationPacket);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="escalation-modal-overlay"
      className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="escalation-modal-card"
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {lang === 'hi' ? 'मानव विशेषज्ञ रेफरल एवं एस्केलेशन' : 'Human IPR Facilitator Escalation'}
              </h3>
              <p className="text-xs text-stone-500">
                PRD FR-11: Official Government Facilitation & Patent Attorney Referral
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Directory of Bodies */}
        <div className="space-y-2.5 text-xs text-stone-700">
          <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
            Recognized AYUSH & IPR Facilitation Bodies (India)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>AYUSH Patent Cell</span>
              </div>
              <p className="text-[11px] text-stone-600 mb-1.5">
                Ministry of AYUSH, Govt of India — Guidance for traditional researchers & startups.
              </p>
              <div className="text-[10px] text-stone-500 space-y-0.5">
                <div>Email: patentcell-ayush@gov.in</div>
                <div>Helpdesk: 1800-11-22-02</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>TIFAC Patent Facilitation</span>
              </div>
              <p className="text-[11px] text-stone-600 mb-1.5">
                Dept of Science & Tech (DST) — Subsidized patent filing support for MSMEs & innovators.
              </p>
              <div className="text-[10px] text-stone-500 space-y-0.5">
                <div>Email: tifac-pfc@nic.in</div>
                <div>Website: tifac.org.in</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exportable Brief */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
            <span>Generated IPR Triage Brief:</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 text-[11px] font-bold"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Triage Packet
                </>
              )}
            </button>
          </div>
          <pre className="p-3 bg-stone-900 text-stone-100 rounded-xl text-[10px] font-mono whitespace-pre-wrap max-h-36 overflow-y-auto border border-stone-800 leading-relaxed">
            {escalationPacket}
          </pre>
        </div>

        {/* Footer actions */}
        <div className="pt-2 flex justify-end gap-2 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition"
          >
            {lang === 'hi' ? 'वापस जाएं' : 'Return to Sahayak'}
          </button>
        </div>
      </div>
    </div>
  );
}
