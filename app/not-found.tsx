import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-ink min-h-[calc(100svh-200px)] flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-lg">
        <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-4">
          404
        </span>
        <h1 className="font-display font-semibold text-paper leading-display tracking-tightest text-5xl md:text-6xl mb-6">
          Page not found
        </h1>
        <p className="font-body text-base text-paper/60 leading-relaxed mb-10">
          The requested page does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="font-mono text-[11px] font-medium uppercase tracking-mono bg-gold text-ink border-2 border-gold px-6 py-3 min-h-[44px] inline-flex items-center justify-center shadow-[4px_4px_0_0_var(--paper)] btn-press hover:shadow-[6px_6px_0_0_var(--paper)]"
        >
          Return home \u2192
        </Link>
      </div>
    </div>
  );
}
