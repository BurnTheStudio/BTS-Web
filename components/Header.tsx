'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CONTACT_HREF, SITE_WORDMARK } from '@/lib/site';

interface HeaderProps {
  hasPublishedProjects: boolean;
}

export function Header({ hasPublishedProjects }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const problemsHref = isHome ? '#problems' : '/#problems';
  const howWeWorkHref = isHome ? '#how-we-work' : '/#how-we-work';

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-none border-b-2 border-paper/10">
      <div className="max-w-content mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Burn The Studio home">
          <div className="relative w-8 h-6 flex-shrink-0">
            <Image src="/logo.png" alt="Burn The Studio ribbon mark" width={32} height={25} className="w-full h-full object-contain" />
          </div>
          <span className="font-mono text-[10px] md:text-xs font-medium tracking-mono text-paper uppercase">
            {SITE_WORDMARK}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          <Link href={problemsHref} className="font-mono text-[11px] uppercase tracking-mono text-paper/70 hover:text-gold transition-colors py-2">Problems</Link>
          <Link href={howWeWorkHref} className="font-mono text-[11px] uppercase tracking-mono text-paper/70 hover:text-gold transition-colors py-2">How we work</Link>
          {hasPublishedProjects && (
            <Link href="/work" className="font-mono text-[11px] uppercase tracking-mono text-paper/70 hover:text-gold transition-colors py-2">Work</Link>
          )}
          <Link
            href={CONTACT_HREF}
            className="font-mono text-[11px] font-medium uppercase tracking-mono bg-gold text-ink border-2 border-gold px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center shadow-[4px_4px_0_0_var(--paper)] btn-press hover:shadow-[6px_6px_0_0_var(--paper)]"
          >
            DM us your problem \u2192
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden font-mono text-[11px] uppercase tracking-mono text-paper border-2 border-paper/30 px-4 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center btn-press hover:border-gold hover:text-gold"
        >
          {isOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div id="mobile-nav-panel" className="md:hidden border-t-2 border-paper/10 bg-ink px-6 py-10 flex flex-col gap-6">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            <Link href={problemsHref} onClick={() => setIsOpen(false)} className="font-mono text-sm uppercase tracking-mono text-paper/70 hover:text-gold py-2 border-b border-paper/10">Problems</Link>
            <Link href={howWeWorkHref} onClick={() => setIsOpen(false)} className="font-mono text-sm uppercase tracking-mono text-paper/70 hover:text-gold py-2 border-b border-paper/10">How we work</Link>
            {hasPublishedProjects && (
              <Link href="/work" onClick={() => setIsOpen(false)} className="font-mono text-sm uppercase tracking-mono text-paper/70 hover:text-gold py-2 border-b border-paper/10">Work</Link>
            )}
          </nav>
          <Link
            href={CONTACT_HREF}
            onClick={() => setIsOpen(false)}
            className="font-mono text-xs font-medium uppercase tracking-mono bg-gold text-ink border-2 border-gold px-6 py-3.5 text-center min-h-[44px] inline-flex items-center justify-center shadow-[4px_4px_0_0_var(--paper)] btn-press"
          >
            DM us your problem \u2192
          </Link>
        </div>
      )}
    </header>
  );
}
