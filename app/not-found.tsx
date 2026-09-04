import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 text-center shadow-xs space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          404 Not Found
        </span>
        <h2 className="text-2xl font-bold text-stone-900">Page Not Found</h2>
        <p className="text-stone-600 text-sm">
          The requested page or statutory resource could not be located in IP-SAKTI Sahayak.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold transition"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
