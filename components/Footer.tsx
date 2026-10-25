import React from 'react';
import Link from 'next/link';
import { CONTACT_HREF, SITE_WORDMARK, SITE_TAGLINE } from '@/lib/site';
import { STUDIO } from '@/content/studio';
import { LegalPage } from '@/lib/legal';

interface FooterProps {
  hasWork?: boolean;
  hasCollaborations?: boolean;
  hasJournal?: boolean;
  hasStudio?: boolean;
  legalPages?: LegalPage[];
}

export function Footer({
  hasWork = false,
  hasCollaborations = false,
  hasJournal = false,
  hasStudio = false,
  legalPages = [],
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks: Array<{ label: string; href: string }> = [];
  if (STUDIO.EMAIL) {
    socialLinks.push({ label: STUDIO.EMAIL, href: `mailto:${STUDIO.EMAIL}` });
  }
  if (STUDIO.LINKEDIN) {
    socialLinks.push({ label: 'LinkedIn', href: STUDIO.LINKEDIN });
  }
  if (STUDIO.INSTAGRAM) {
    socialLinks.push({ label: 'Instagram', href: STUDIO.INSTAGRAM });
  }
  if (STUDIO.X) {
    socialLinks.push({ label: 'X', href: STUDIO.X });
  }
  if (STUDIO.GITHUB) {
    socialLinks.push({ label: 'GitHub', href: STUDIO.GITHUB });
  }
  if (STUDIO.DRIBBBLE_OR_BEHANCE) {
    socialLinks.push({ label: 'Dribbble / Behance', href: STUDIO.DRIBBBLE_OR_BEHANCE });
  }

  return (
    <footer className="relative bg-ink text-paper border-t-2 border-paper/20 overflow-hidden">
      <div className="absolute inset-0 grid-hairlines-dark pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-content mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-paper/15">
          <div className="lg:col-span-6 flex flex-col gap-3">
            <span className="font-mono text-sm md:text-base font-medium tracking-mono text-paper uppercase">
              {SITE_WORDMARK}
            </span>
            <span className="font-mono text-xs uppercase tracking-mono text-stone">
              {SITE_TAGLINE}
            </span>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone mb-1 block">
              NAVIGATION
            </span>
            <Link
              href="/#problems"
              className="font-mono text-xs uppercase tracking-mono text-paper/80 hover:text-gold transition-colors self-start py-0.5"
            >
              Problems
            </Link>
            {hasWork && (
              <Link
                href="/work"
                className="font-mono text-xs uppercase tracking-mono text-paper/80 hover:text-gold transition-colors self-start py-0.5"
              >
                Work
              </Link>
            )}
            {hasCollaborations && (
              <Link
                href="/collaborations"
                className="font-mono text-xs uppercase tracking-mono text-paper/80 hover:text-gold transition-colors self-start py-0.5"
              >
                Collaborations
              </Link>
            )}
            {hasJournal && (
              <Link
                href="/journal"
                className="font-mono text-xs uppercase tracking-mono text-paper/80 hover:text-gold transition-colors self-start py-0.5"
              >
                Journal
              </Link>
            )}
            {hasStudio && (
              <Link
                href="/studio"
                className="font-mono text-xs uppercase tracking-mono text-paper/80 hover:text-gold transition-colors self-start py-0.5"
              >
                Studio
              </Link>
            )}
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-mono text-paper/80 hover:text-gold transition-colors self-start py-0.5"
            >
              Contact
            </Link>
            {hasJournal && (
              <Link
                href="/journal/rss.xml"
                className="font-mono text-xs uppercase tracking-mono text-stone hover:text-gold transition-colors self-start py-0.5"
              >
                RSS Feed
              </Link>
            )}
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone mb-1 block">
              CONNECT
            </span>
            <Link
              href={CONTACT_HREF}
              className="font-mono text-xs uppercase tracking-mono text-gold hover:underline decoration-1 underline-offset-4 transition-colors self-start py-0.5"
            >
              DM us your problem →
            </Link>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="font-mono text-xs uppercase tracking-mono text-paper/70 hover:text-gold transition-colors self-start py-0.5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-stone tracking-mono">
          <div>© {currentYear} Burn The Studio</div>

          {legalPages.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {legalPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/legal/${page.slug}`}
                  className="hover:text-gold uppercase transition-colors underline decoration-1 underline-offset-2"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
