'use client';

import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { Language, I18N } from '@/lib/i18n';

interface DisclaimerBannerProps {
  lang: Language;
}

export function DisclaimerBanner({ lang }: DisclaimerBannerProps) {
  const t = I18N[lang];

  return (
    <div
      id="disclaimer-banner"
      className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-900"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="font-semibold tracking-wide uppercase text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
            PRD MOCK DEMO
          </span>
          <p className="leading-snug">
            {t.disclaimerBanner}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-amber-800 font-medium">
          <Info className="w-3.5 h-3.5" />
          <span>Evidence Before Fluency</span>
        </div>
      </div>
    </div>
  );
}
