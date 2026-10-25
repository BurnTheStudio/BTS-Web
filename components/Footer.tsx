import React from 'react';
import Link from 'next/link';
import { CONTACT_HREF, SITE_WORDMARK, SITE_TAGLINE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="relative bg-ink border-t-2 border-paper/10 overflow-hidden">
      <div className="absolute inset-0 grid-hairlines-dark pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-content mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="font-mono text-sm font-medium tracking-mono text-paper uppercase">
              {SITE_WORDMARK}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone">
              {SITE_TAGLINE}
            </span>
          </div>

          <Link
            href={CONTACT_HREF}
            className="font-mono text-[11px] uppercase tracking-mono text-paper/60 hover:text-gold underline decoration-1 underline-offset-4 transition-colors self-start md:self-auto py-1"
          >
            DM us your problem \u2192
          </Link>
        </div>
      </div>
    </footer>
  );
}
