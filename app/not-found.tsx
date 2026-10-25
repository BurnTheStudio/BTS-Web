import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-paper min-h-[calc(100vh-200px)] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg">
        <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-4 font-medium">
          404
        </span>
        <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-5xl md:text-7xl mb-6">
          Page not found
        </h1>
        <p className="font-body text-base md:text-lg text-ink/80 leading-relaxed mb-10 max-w-md mx-auto">
          The requested page does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="font-mono text-xs font-medium uppercase tracking-mono bg-gold text-ink border-2 border-ink px-6 py-3 min-h-[44px] inline-flex items-center justify-center shadow-hard btn-press hover:bg-gold/90 transition-colors"
        >
          Return home →
        </Link>
      </div>
    </div>
  );
}
