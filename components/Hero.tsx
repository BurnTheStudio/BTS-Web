import React from 'react';
import Image from 'next/image';
import { CONTACT_HREF, SITE_TAGLINE } from '@/lib/site';
import { Button } from './Button';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center bg-ink overflow-hidden">
      {/* Hairline grid */}
      <div className="absolute inset-0 grid-hairlines-dark pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-content mx-auto px-6 md:px-10 w-full py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Text */}
          <div className="flex flex-col items-start">
            <span className="font-mono text-[11px] uppercase tracking-mono text-gold mb-8">
              {SITE_TAGLINE}
            </span>

            <h1 className="font-display font-semibold text-paper leading-display tracking-tightest text-[clamp(3rem,7vw,7rem)]">
              Real problems,<br />
              <em className="italic font-medium text-gold">real fixes</em>
            </h1>

            <p className="font-body text-base md:text-lg text-paper/70 leading-relaxed max-w-prose mt-8 mb-12">
              Nine problems businesses hit again and again: what’s really causing each one, and how we solve it.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Button href={CONTACT_HREF} variant="gold">
                DM us your problem →
              </Button>
              <Button href="#problems" variant="underline">
                See the nine problems ↓
              </Button>
            </div>
          </div>

          {/* Logo block */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] bg-ink border-2 border-paper/20 p-10 sm:p-14 md:p-16 shadow-[8px_8px_0_0_var(--gold)]">
              <Image
                src="/logo.png"
                alt="Burn The Studio glossy gold ribbon mark"
                width={480}
                height={378}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-paper/10" />
    </section>
  );
}
