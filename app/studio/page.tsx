import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { STUDIO, hasStudioContent } from '@/content/studio';
import { PEOPLE } from '@/content/people';
import { hasPublishedProjects } from '@/lib/projects';
import { HowWeWork } from '@/components/HowWeWork';
import { ClosingCta } from '@/components/ClosingCta';
import { MetaStrip, MetaItem } from '@/components/MetaStrip';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Burn The Studio disciplines, principles, and team.',
  alternates: {
    canonical: '/studio',
  },
};

export default async function StudioPage() {
  if (!hasStudioContent()) {
    notFound();
  }

  const hasWork = await hasPublishedProjects();

  const disciplines = [
    {
      name: 'Product',
      description: STUDIO.SERVICE_PRODUCT,
    },
    {
      name: 'Design',
      description: STUDIO.SERVICE_DESIGN,
    },
    {
      name: 'Engineering',
      description: STUDIO.SERVICE_ENGINEERING,
    },
  ];

  const metaItems: MetaItem[] = [
    ...(STUDIO.LOCATION ? [{ label: 'LOCATION', value: STUDIO.LOCATION }] : []),
    ...(STUDIO.FOUNDED ? [{ label: 'FOUNDED', value: STUDIO.FOUNDED }] : []),
  ];

  return (
    <div className="bg-paper min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-16 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-3 font-medium">
            STUDIO
          </span>
          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-5xl md:text-7xl lg:text-8xl">
            Studio
          </h1>
        </div>

        {STUDIO.ABOUT_STATEMENT && (
          <div className="mb-20 md:mb-28">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-6 font-medium">
              ABOUT
            </span>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink leading-tight max-w-4xl font-medium">
              {STUDIO.ABOUT_STATEMENT}
            </p>
          </div>
        )}

        <div className="mb-20 md:mb-28 pt-12 border-t-2 border-ink">
          <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-8 font-medium">
            DISCIPLINES
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disciplines.map((d) => {
              const content = (
                <div className="border-2 border-ink bg-paper p-8 flex flex-col justify-between min-h-[220px] hover:bg-gold transition-colors group">
                  <h2 className="font-display text-3xl md:text-4xl text-ink font-medium mb-4">
                    {d.name}
                  </h2>
                  {d.description ? (
                    <p className="font-body text-base text-ink/80 leading-relaxed">
                      {d.description}
                    </p>
                  ) : null}
                  {hasWork && (
                    <span className="font-mono text-xs uppercase tracking-mono text-ink mt-6 inline-flex items-center gap-1 font-medium">
                      <span>View {d.name} work</span>
                      <span>→</span>
                    </span>
                  )}
                </div>
              );

              if (hasWork) {
                return (
                  <Link key={d.name} href={`/work?service=${d.name}`}>
                    {content}
                  </Link>
                );
              }

              return <div key={d.name}>{content}</div>;
            })}
          </div>
        </div>

        {PEOPLE.length > 0 && (
          <div className="mb-20 md:mb-28 pt-12 border-t-2 border-ink">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-8 font-medium">
              TEAM
            </span>
            <div className="border-t-2 border-ink">
              {PEOPLE.map((person) => (
                <div
                  key={person.id}
                  className="border-b-2 border-ink p-6 md:p-8 bg-paper"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8">
                      <div className="flex items-baseline gap-4 mb-2">
                        <h2 className="font-display text-2xl md:text-3xl text-ink font-medium">
                          {person.name}
                        </h2>
                        <span className="font-mono text-xs uppercase tracking-mono text-stone">
                          {person.role}
                        </span>
                      </div>
                      <p className="font-body text-base text-ink/80 max-w-[54ch]">
                        {person.bio}
                      </p>
                      {person.links && person.links.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {person.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs uppercase tracking-mono text-ink hover:text-gold underline decoration-1 underline-offset-2"
                            >
                              {link.label} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {person.photo && (
                      <div className="md:col-span-4 flex justify-start md:justify-end">
                        <div className="w-24 h-24 md:w-28 md:h-28 relative border-2 border-ink bg-ink overflow-hidden">
                          <Image
                            src={person.photo}
                            alt={person.name}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {metaItems.length > 0 && (
          <div className="mb-20 md:mb-28">
            <MetaStrip items={metaItems} />
          </div>
        )}
      </div>

      <HowWeWork />
      <ClosingCta />
    </div>
  );
}
