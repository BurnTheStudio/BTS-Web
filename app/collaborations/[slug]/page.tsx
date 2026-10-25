import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllCollaborations, getCollaborationBySlug } from '@/lib/collaborations';
import { getProjectBySlug } from '@/lib/projects';
import { PROBLEMS } from '@/content/problems';
import { MdxComponents } from '@/components/MdxComponents';
import { ClosingCta } from '@/components/ClosingCta';
import { MetaStrip, MetaItem } from '@/components/MetaStrip';
import { CoverFrame } from '@/components/CoverFrame';
import { Tag } from '@/components/Tag';

export const dynamicParams = false;

interface CollaborationPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const isProduction = process.env.NODE_ENV === 'production';
  const collabs = await getAllCollaborations({ includeDrafts: !isProduction });
  return collabs.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: CollaborationPageProps): Promise<Metadata> {
  const collab = await getCollaborationBySlug(params.slug);
  if (!collab) return {};

  return {
    title: collab.title,
    description: collab.summary,
    alternates: {
      canonical: `/collaborations/${collab.slug}`,
    },
    openGraph: {
      title: `${collab.title} · Burn The Studio`,
      description: collab.summary,
      ...(collab.cover
        ? {
            images: [
              {
                url: collab.cover,
                alt: collab.coverAlt || collab.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function CollaborationDetailPage({ params }: CollaborationPageProps) {
  const collab = await getCollaborationBySlug(params.slug);

  if (!collab) {
    notFound();
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const allCollabs = await getAllCollaborations({ includeDrafts: !isProduction });
  const currentIndex = allCollabs.findIndex((c) => c.slug === collab.slug);
  const prevCollab = currentIndex > 0 ? allCollabs[currentIndex - 1] : null;
  const nextCollab =
    currentIndex >= 0 && currentIndex < allCollabs.length - 1
      ? allCollabs[currentIndex + 1]
      : null;

  const linkedProject = collab.projectSlug
    ? await getProjectBySlug(collab.projectSlug)
    : null;

  const matchedProblems = collab.problemIds
    ? PROBLEMS.filter((prob) => collab.problemIds?.includes(prob.id))
    : [];

  const partnersNode = (
    <div className="flex flex-col gap-1">
      {collab.partners.map((p) => {
        const text = p.role ? `${p.name} (${p.role})` : p.name;
        if (p.url) {
          return (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-1 underline-offset-2 hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              <span>{text}</span>
              <span className="font-mono text-xs">↗</span>
            </a>
          );
        }
        return <span key={p.name}>{text}</span>;
      })}
    </div>
  );

  const metaItems: MetaItem[] = [
    { label: 'PARTNERS', value: partnersNode },
    { label: 'KIND', value: collab.kind },
    { label: 'YEAR', value: String(collab.year) },
  ];

  return (
    <article className="bg-paper min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
              {collab.kind}
            </span>
            <span className="font-mono text-xs text-stone">/</span>
            <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
              {collab.year}
            </span>
            {collab.draft && (
              <span className="font-mono text-[10px] uppercase tracking-mono bg-ink text-gold border border-gold px-2 py-0.5 font-medium ml-2">
                DRAFT
              </span>
            )}
          </div>

          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8">
            {collab.title}
          </h1>

          <p className="font-body text-lg md:text-xl text-ink leading-relaxed max-w-[62ch]">
            {collab.summary}
          </p>
        </div>

        {collab.cover && (
          <div className="mb-14 md:mb-20">
            <CoverFrame
              src={collab.cover}
              alt={collab.coverAlt}
              title={collab.title}
              priority
            />
          </div>
        )}

        <MetaStrip items={metaItems} className="mb-16" />

        {collab.projectSlug && (
          <div className="mb-16 p-6 border-2 border-ink bg-paper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-1 font-medium">
                RELATED CASE STUDY
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {linkedProject?.title || collab.projectSlug}
              </span>
            </div>
            <Link
              href={`/work/${collab.projectSlug}`}
              className="font-mono text-xs uppercase tracking-mono px-4 py-2 border-2 border-ink bg-gold text-ink hover:bg-gold/80 transition-colors self-start sm:self-auto inline-flex items-center gap-1.5"
            >
              <span>View Case Study</span>
              <span>→</span>
            </Link>
          </div>
        )}

        {matchedProblems.length > 0 && (
          <div className="mb-16 p-6 border-2 border-ink bg-paper">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
              PROBLEMS ADDRESSED:
            </span>
            <div className="flex flex-wrap gap-3">
              {matchedProblems.map((prob) => (
                <Tag
                  key={prob.id}
                  label={`${prob.number} · ${prob.title} →`}
                  href={`/problems/${prob.slug}`}
                  variant="gold"
                />
              ))}
            </div>
          </div>
        )}

        <div className="prose-clean max-w-none mb-20">
          <MDXRemote source={collab.content} components={MdxComponents} />
        </div>

        {collab.links && collab.links.length > 0 && (
          <div className="mb-20 pt-8 border-t-2 border-ink">
            <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-4 font-medium">
              EXTERNAL LINKS
            </span>
            <div className="flex flex-wrap gap-4">
              {collab.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-mono px-4 py-2.5 border-2 border-ink bg-paper text-ink hover:bg-gold transition-colors inline-flex items-center gap-2"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-sm">↗</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="border-t-2 border-ink pt-8 mb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevCollab ? (
            <Link
              href={`/collaborations/${prevCollab.slug}`}
              className="border-2 border-ink p-6 hover:bg-gold transition-colors block bg-paper"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
                ← PREVIOUS COLLABORATION
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {prevCollab.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextCollab ? (
            <Link
              href={`/collaborations/${nextCollab.slug}`}
              className="border-2 border-ink p-6 hover:bg-gold transition-colors block text-left md:text-right bg-paper"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
                NEXT COLLABORATION →
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {nextCollab.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      <ClosingCta />
    </article>
  );
}
