'use client';

import React from 'react';
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-stone-50 p-4 font-sans text-stone-900">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 text-center shadow-sm space-y-4">
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
            Application Notice
          </span>
          <h2 className="text-xl font-bold text-stone-900">An unexpected state occurred</h2>
          <p className="text-stone-600 text-xs">
            {error?.message || 'The application encountered an error during request rendering.'}
          </p>
          <div>
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold transition"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
