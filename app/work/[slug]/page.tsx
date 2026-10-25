import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { PROBLEMS } from '@/content/problems';
import { MdxComponents } from '@/components/MdxComponents';
import { ClosingCta } from '@/components/ClosingCta';
import { MetaStrip, MetaItem } from '@/components/MetaStrip';
import { CoverFrame } from '@/components/CoverFrame';
import { Tag } from '@/components/Tag';

export const dynamicParams = false;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const isProduction = process.env.NODE_ENV === 'production';
  const projects = await getAllProjects({ includeDrafts: !isProduction });
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} · Burn The Studio`,
      description: project.summary,
      ...(project.cover
        ? {
            images: [
              {
                url: project.cover,
                alt: project.coverAlt || project.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const allProjects = await getAllProjects({ includeDrafts: !isProduction });
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const matchedProblems = project.problemIds
    ? PROBLEMS.filter((prob) => project.problemIds?.includes(prob.id))
    : [];

  const metaItems: MetaItem[] = [
    ...(project.client ? [{ label: 'CLIENT', value: project.client }] : []),
    { label: 'YEAR', value: String(project.year) },
    { label: 'SERVICES', value: project.services.join(' · ') },
    ...(project.stack?.length ? [{ label: 'STACK', value: project.stack.join(', ') }] : []),
  ];

  return (
    <article className="bg-paper min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
              {project.year}
            </span>
            <span className="font-mono text-xs text-stone">/</span>
            <div className="flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="font-mono text-xs uppercase tracking-mono text-stone font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
            {project.draft && (
              <span className="font-mono text-[10px] uppercase tracking-mono bg-ink text-gold border border-gold px-2 py-0.5 font-medium ml-2">
                DRAFT
              </span>
            )}
          </div>

          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8">
            {project.title}
          </h1>

          <p className="font-body text-lg md:text-xl text-ink leading-relaxed max-w-[62ch]">
            {project.summary}
          </p>
        </div>

        <div className="mb-14 md:mb-20">
          <CoverFrame
            src={project.cover}
            alt={project.coverAlt}
            title={project.title}
            priority
          />
        </div>

        <MetaStrip items={metaItems} className="mb-16" />

        {matchedProblems.length > 0 && (
          <div className="mb-16 p-6 border-2 border-ink bg-paper">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
              PROBLEMS SOLVED FROM THE DECK:
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
          <MDXRemote source={project.content} components={MdxComponents} />
        </div>

        {project.links && project.links.length > 0 && (
          <div className="mb-20 pt-8 border-t-2 border-ink">
            <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-4 font-medium">
              EXTERNAL LINKS
            </span>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link) => (
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
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="border-2 border-ink p-6 hover:bg-gold transition-colors block bg-paper"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
                ← PREVIOUS PROJECT
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="border-2 border-ink p-6 hover:bg-gold transition-colors block text-left md:text-right bg-paper"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
                NEXT PROJECT →
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {nextProject.title}
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
