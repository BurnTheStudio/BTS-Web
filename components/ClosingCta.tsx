import React from 'react';
import { CONTACT_HREF } from '@/lib/site';
import { Button } from './Button';

export function ClosingCta() {
  return (
    <section id="contact-cta" className="bg-paper scroll-mt-20 py-20 md:py-32">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="bg-gold border-2 border-ink shadow-hard p-8 sm:p-12 md:p-16 lg:p-20 text-center">
          <span className="font-mono text-[11px] uppercase tracking-mono text-ink font-medium block mb-6">
            IF YOU REMEMBER ONE THING
          </span>

          <h2 className="font-display font-semibold text-ink leading-display tracking-tightest text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 max-w-4xl mx-auto">
            Name the real problem, <em className="italic font-medium">and half the work is done.</em>
          </h2>

          <p className="font-body text-base md:text-lg text-ink/80 leading-relaxed max-w-prose mx-auto mb-12">
            If one of these sounds familiar, send us a message. We’ll help you find the root cause, even if the answer isn’t us.
          </p>

          <Button href={CONTACT_HREF} variant="ink">
            DM us your problem →
          </Button>
        </div>
      </div>
    </section>
  );
}
