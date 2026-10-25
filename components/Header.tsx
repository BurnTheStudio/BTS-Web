'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CONTACT_HREF, SITE_WORDMARK } from '@/lib/site';
import { MobileMenu, NavLinkItem } from './MobileMenu';

interface HeaderProps {
  hasWork?: boolean;
  hasCollaborations?: boolean;
  hasJournal?: boolean;
  hasStudio?: boolean;
}

export function Header({
  hasWork = false,
  hasCollaborations = false,
  hasJournal = false,
  hasStudio = false,
}: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const navLinks: NavLinkItem[] = [
    {
      label: 'Problems',
      href: isHome ? '#problems' : '/#problems',
    },
    ...(hasWork
      ? [{ label: 'Work', href: '/work', activePath: '/work' }]
      : []),
    ...(hasCollaborations
      ? [
          {
            label: 'Collaborations',
            href: '/collaborations',
            activePath: '/collaborations',
          },
        ]
      : []),
    ...(hasJournal
      ? [{ label: 'Journal', href: '/journal', activePath: '/journal' }]
      : []),
    ...(hasStudio
      ? [{ label: 'Studio', href: '/studio', activePath: '/studio' }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper border-b-2 border-ink">
      <div className="max-w-content mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Burn The Studio home">
          <div className="relative w-8 h-6 shrink-0">
            <Image
              src="/logo.png"
              alt="Burn The Studio ribbon mark"
              width={32}
              height={25}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-mono text-xs md:text-sm font-medium tracking-mono text-ink uppercase">
            {SITE_WORDMARK}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = link.activePath
              ? pathname.startsWith(link.activePath)
              : false;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`font-mono text-xs uppercase tracking-mono text-ink hover:text-gold transition-colors py-2 relative ${
                  isActive ? 'underline decoration-2 underline-offset-8 font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href={CONTACT_HREF}
            className="font-mono text-xs font-medium uppercase tracking-mono bg-gold text-ink border-2 border-ink px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center shadow-hard btn-press hover:bg-gold/90 transition-colors"
          >
            DM us your problem →
          </Link>
        </nav>

        <MobileMenu navLinks={navLinks} />
      </div>
    </header>
  );
}
