import React from 'react';
import { Metadata } from 'next';
import { STUDIO } from '@/content/studio';
import { CONTACT_HREF } from '@/lib/site';
import { Button } from '@/components/Button';
import { MetaStrip, MetaItem } from '@/components/MetaStrip';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach Burn The Studio directly via DM, email, or brief inquiry.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const showForm = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_TO_EMAIL &&
    process.env.CONTACT_FROM_EMAIL
  );

  const contactItems: MetaItem[] = [
    {
      label: 'DM',
      value: 'Direct Message',
      href: CONTACT_HREF,
      external: !CONTACT_HREF.startsWith('#') && !CONTACT_HREF.startsWith('/'),
    },
    ...(STUDIO.EMAIL
      ? [
          {
            label: 'EMAIL',
            value: STUDIO.EMAIL,
            href: `mailto:${STUDIO.EMAIL}`,
          },
        ]
      : []),
    ...(STUDIO.LINKEDIN
      ? [
          {
            label: 'LINKEDIN',
            value: 'LinkedIn',
            href: STUDIO.LINKEDIN,
            external: true,
          },
        ]
      : []),
    ...(STUDIO.INSTAGRAM
      ? [
          {
            label: 'INSTAGRAM',
            value: 'Instagram',
            href: STUDIO.INSTAGRAM,
            external: true,
          },
        ]
      : []),
    ...(STUDIO.X
      ? [
          {
            label: 'X',
            value: 'X / Twitter',
            href: STUDIO.X,
            external: true,
          },
        ]
      : []),
    ...(STUDIO.GITHUB
      ? [
          {
            label: 'GITHUB',
            value: 'GitHub',
            href: STUDIO.GITHUB,
            external: true,
          },
        ]
      : []),
    ...(STUDIO.DRIBBBLE_OR_BEHANCE
      ? [
          {
            label: 'PORTFOLIO',
            value: 'Dribbble / Behance',
            href: STUDIO.DRIBBBLE_OR_BEHANCE,
            external: true,
          },
        ]
      : []),
    ...(STUDIO.LOCATION
      ? [
          {
            label: 'LOCATION',
            value: STUDIO.LOCATION,
          },
        ]
      : []),
  ];

  return (
    <div className="bg-paper min-h-[calc(100vh-200px)]">
      <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-16 md:mb-20 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-4 font-medium">
            IF YOU REMEMBER ONE THING
          </span>

          <h1 className="font-display font-semibold text-ink leading-display tracking-tightest text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8">
            Name the real problem, <em className="italic font-medium">and half the work is done.</em>
          </h1>

          <p className="font-body text-lg md:text-xl text-ink/80 leading-relaxed max-w-[62ch] mb-10">
            If one of these sounds familiar, send us a message. We’ll help you find the root cause, even if the answer isn’t us.
          </p>

          <Button href={CONTACT_HREF} variant="primary">
            DM us your problem →
          </Button>
        </div>

        <div className="mb-16">
          <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-4 font-medium">
            DIRECT CHANNELS
          </span>
          <MetaStrip items={contactItems} />
        </div>

        {showForm && <ContactForm />}
      </div>
    </div>
  );
}
