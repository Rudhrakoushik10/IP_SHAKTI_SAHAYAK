'use client';

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-stone-200 text-center space-y-3">
        <h3 className="font-bold text-stone-900">Module Notice</h3>
        <p className="text-xs text-stone-600">
          {error?.message || 'Something went wrong while rendering this section.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
