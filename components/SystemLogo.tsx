'use client';

import React from 'react';

interface SystemLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'emerald' | 'dark' | 'light';
}

/**
 * Official Emblem Logo for IP-SAKTI Sahayak
 * Fuses Ayurvedic healing flora (sacred medicinal leaf & sprout) with
 * statutory legal protection (Shield of Law, Balanced Scales of Justice, and Chakra seal).
 */
export function SystemLogo({
  size = 'md',
  showText = false,
  className = '',
  variant = 'emerald',
}: SystemLogoProps) {
  const dimensionMap = {
    sm: { box: 'w-8 h-8', svg: 32, icon: 'w-4 h-4' },
    md: { box: 'w-10 h-10', svg: 40, icon: 'w-5 h-5' },
    lg: { box: 'w-14 h-14', svg: 56, icon: 'w-7 h-7' },
    xl: { box: 'w-20 h-20', svg: 80, icon: 'w-10 h-10' },
  };

  const currentDim = dimensionMap[size] || dimensionMap.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* SVG Emblem Mark */}
      <div
        className={`${currentDim.box} relative flex items-center justify-center rounded-2xl shadow-xs transition-transform duration-200 select-none overflow-hidden`}
        title="IP-SAKTI Sahayak — Official System Emblem"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Gradient & Shield Base */}
          <defs>
            <linearGradient id="ipsaktiShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="50%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="ipsaktiGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="ipsaktiLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="60%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Shield Outer Container */}
          <rect width="100" height="100" rx="22" fill="url(#ipsaktiShieldGrad)" />

          {/* Concentric Regulatory Chakra Ring (24 Rays / Spokes representation) */}
          <circle
            cx="50"
            cy="50"
            r="43"
            stroke="url(#ipsaktiGoldGrad)"
            strokeWidth="1.5"
            strokeDasharray="2.5 3.5"
            opacity="0.8"
          />
          <circle cx="50" cy="50" r="39" stroke="#10b981" strokeWidth="0.75" opacity="0.4" />

          {/* Statutory Shield Silhouette */}
          <path
            d="M50 14L22 24V46C22 66 34 82 50 88C66 82 78 66 78 46V24L50 14Z"
            fill="#022c22"
            stroke="url(#ipsaktiGoldGrad)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity="0.95"
          />

          {/* Inner Balanced Scales of Justice (Legal / Patent / Regulatory) */}
          {/* Central Pillar */}
          <line x1="50" y1="28" x2="50" y2="72" stroke="url(#ipsaktiGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Base Stand */}
          <path d="M40 72H60" stroke="url(#ipsaktiGoldGrad)" strokeWidth="3" strokeLinecap="round" />

          {/* Scale Crossbeam */}
          <line x1="28" y1="36" x2="72" y2="36" stroke="url(#ipsaktiGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="36" r="3.5" fill="url(#ipsaktiGoldGrad)" />

          {/* Left Scale Pan (Ayurveda / Traditional Knowledge) */}
          <line x1="32" y1="36" x2="28" y2="48" stroke="#fcd34d" strokeWidth="1.2" />
          <line x1="32" y1="36" x2="36" y2="48" stroke="#fcd34d" strokeWidth="1.2" />
          <path d="M25 48Q32 54 39 48" stroke="url(#ipsaktiGoldGrad)" strokeWidth="2" fill="#047857" fillOpacity="0.6" />

          {/* Right Scale Pan (Statutory Law / Patents / ABS Compliance) */}
          <line x1="68" y1="36" x2="64" y2="48" stroke="#fcd34d" strokeWidth="1.2" />
          <line x1="68" y1="36" x2="72" y2="48" stroke="#fcd34d" strokeWidth="1.2" />
          <path d="M61 48Q68 54 75 48" stroke="url(#ipsaktiGoldGrad)" strokeWidth="2" fill="#047857" fillOpacity="0.6" />

          {/* Central Ayurvedic Sacred Leaf / Sprout of Knowledge */}
          {/* Ascending medicinal botanical leaf overlay */}
          <path
            d="M50 40C43 49 44 60 50 67C56 60 57 49 50 40Z"
            fill="url(#ipsaktiLeafGrad)"
            stroke="#a7f3d0"
            strokeWidth="1.2"
          />
          {/* Leaf Midrib / Vein */}
          <path d="M50 43V64" stroke="#022c22" strokeWidth="1" strokeLinecap="round" />
          <path d="M50 51L46 48M50 56L46 53M50 51L54 48M50 56L54 53" stroke="#022c22" strokeWidth="0.8" strokeLinecap="round" />

          {/* Golden Knowledge Crown / Flame at Apex */}
          <circle cx="50" cy="24" r="2.2" fill="#fef08a" />
          <path d="M50 18L52 22H48L50 18Z" fill="#fbbf24" />
        </svg>
      </div>

      {/* Brand Text (Optional) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-stone-900 tracking-tight text-base sm:text-lg">
              IP-SAKTI <span className="text-emerald-800 font-bold">Sahayak</span>
            </span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Ayurveda IPR & Regulatory Knowledge Assistant
          </span>
        </div>
      )}
    </div>
  );
}
