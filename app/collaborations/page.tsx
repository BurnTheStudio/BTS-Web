import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCollaborations } from '@/lib/collaborations';
import { IndexRow } from '@/components/IndexRow';
import { Pagination } from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Collaborations',
  description: 'Joint initiatives, publications, open source and talks with studio partners.',
  alternates: {
    canonical: '/collaborations',
  },
};

const ITEMS_PER_PAGE = 12;

interface CollaborationsPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function CollaborationsPage({ searchParams }: CollaborationsPageProps) {
  const allCollaborations = await getAllCollaborations();

  if (allCollaborations.length === 0) {
    notFound();
  }

  const partnerMap = new Map<string, { name: string; url?: string }>();
  for (const collab of allCollaborations) {
    for (const p of collab.partners) {
      if (!partnerMap.has(p.name)) {
        partnerMap.set(p.name, { name: p.name, url: p.url });
      }
    }
  }
  const uniquePartners = Array.from(partnerMap.values());

  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const totalPages = Math.ceil(allCollaborations.length / ITEMS_PER_PAGE);
  const paginatedCollaborations = allCollaborations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-paper min-h-[calc(100vh-200px)]">
      <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-3 font-medium">
            COLLABORATIONS
          </span>
          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-5xl md:text-7xl lg:text-8xl">
            Collaborations
          </h1>
        </div>

        {uniquePartners.length > 0 && (
          <div className="mb-12 pb-6 border-b-2 border-ink">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
              PARTNERS
            </span>
            <div className="font-mono text-xs uppercase tracking-mono text-ink/80 flex flex-wrap items-center gap-x-3 gap-y-1">
              {uniquePartners.map((partner, idx) => (
                <React.Fragment key={partner.name}>
                  {idx > 0 && <span className="text-stone select-none">·</span>}
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold hover:underline decoration-1 underline-offset-2"
                    >
                      {partner.name}
                    </a>
                  ) : (
                    <span>{partner.name}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="border-t-2 border-ink">
          {paginatedCollaborations.map((collab) => {
            const partnerNames = collab.partners.map((p) => p.name).join(', ');

            return (
              <IndexRow
                key={collab.slug}
                href={`/collaborations/${collab.slug}`}
                prefix={String(collab.year)}
                title={collab.title}
                summary={collab.summary}
                tags={[collab.kind]}
                metaRight={partnerNames}
                thumbnail={collab.cover ? { src: collab.cover, alt: collab.coverAlt } : undefined}
                isDraft={collab.draft}
              />
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/collaborations"
        />
      </div>
    </div>
  );
}
