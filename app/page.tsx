import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ProblemsAccordion } from '@/components/ProblemsAccordion';
import { HowWeWork } from '@/components/HowWeWork';
import { ClosingCta } from '@/components/ClosingCta';
import { IndexRow } from '@/components/IndexRow';
import { getFeaturedProjects, getAllProjects } from '@/lib/projects';
import { getAllCollaborations } from '@/lib/collaborations';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/format';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { STUDIO } from '@/content/studio';

export default async function HomePage() {
  const allProjects = await getAllProjects();
  const featured = await getFeaturedProjects();
  const displayProjects = featured.length > 0 ? featured.slice(0, 3) : allProjects.slice(0, 3);

  const allCollabs = await getAllCollaborations();
  const displayCollabs = allCollabs.slice(0, 4);

  const allPosts = await getAllPosts();
  const displayPosts = allPosts.slice(0, 3);

  const sameAs: string[] = [];
  if (STUDIO.LINKEDIN) sameAs.push(STUDIO.LINKEDIN);
  if (STUDIO.X) sameAs.push(STUDIO.X);
  if (STUDIO.GITHUB) sameAs.push(STUDIO.GITHUB);
  if (STUDIO.INSTAGRAM) sameAs.push(STUDIO.INSTAGRAM);
  if (STUDIO.DRIBBBLE_OR_BEHANCE) sameAs.push(STUDIO.DRIBBBLE_OR_BEHANCE);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <ProblemsAccordion />

      {displayProjects.length > 0 && (
        <section id="work" className="bg-paper text-ink scroll-mt-20 py-24 md:py-36">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
                  SELECTED WORK
                </span>
                <h2 className="font-display font-semibold text-ink leading-display tracking-tightest text-4xl md:text-6xl lg:text-7xl">
                  Work
                </h2>
              </div>
              <Link
                href="/work"
                className="font-mono text-xs uppercase tracking-mono text-ink underline decoration-2 underline-offset-4 hover:text-gold transition-colors py-2 self-start md:self-auto font-medium"
              >
                All work →
              </Link>
            </div>

            <div className="border-t-2 border-ink">
              {displayProjects.map((project, idx) => {
                const prefix = String(idx + 1).padStart(2, '0');
                return (
                  <IndexRow
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    prefix={prefix}
                    title={project.title}
                    summary={project.summary}
                    tags={project.services}
                    metaRight={String(project.year)}
                    thumbnail={project.cover ? { src: project.cover, alt: project.coverAlt } : undefined}
                    isDraft={project.draft}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {displayCollabs.length > 0 && (
        <section id="collaborations" className="bg-paper text-ink scroll-mt-20 py-24 md:py-36 border-t-2 border-ink">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
                  COLLABORATIONS
                </span>
                <h2 className="font-display font-semibold text-ink leading-display tracking-tightest text-4xl md:text-6xl lg:text-7xl">
                  Collaborations
                </h2>
              </div>
              <Link
                href="/collaborations"
                className="font-mono text-xs uppercase tracking-mono text-ink underline decoration-2 underline-offset-4 hover:text-gold transition-colors py-2 self-start md:self-auto font-medium"
              >
                All collaborations →
              </Link>
            </div>

            <div className="border-t-2 border-ink">
              {displayCollabs.map((collab) => {
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
          </div>
        </section>
      )}

      {displayPosts.length > 0 && (
        <section id="journal" className="bg-paper text-ink scroll-mt-20 py-24 md:py-36 border-t-2 border-ink">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
                  FROM THE JOURNAL
                </span>
                <h2 className="font-display font-semibold text-ink leading-display tracking-tightest text-4xl md:text-6xl lg:text-7xl">
                  Journal
                </h2>
              </div>
              <Link
                href="/journal"
                className="font-mono text-xs uppercase tracking-mono text-ink underline decoration-2 underline-offset-4 hover:text-gold transition-colors py-2 self-start md:self-auto font-medium"
              >
                All articles →
              </Link>
            </div>

            <div className="border-t-2 border-ink">
              {displayPosts.map((post) => (
                <IndexRow
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  prefix={formatDate(post.publishedAt)}
                  title={post.title}
                  summary={post.summary}
                  tags={post.topics}
                  thumbnail={post.cover ? { src: post.cover, alt: post.coverAlt } : undefined}
                  isDraft={post.draft}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <HowWeWork />
      <ClosingCta />
    </>
  );
}
