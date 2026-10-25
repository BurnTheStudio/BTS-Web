import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { PROBLEMS } from '@/content/problems';
import { MdxComponents } from '@/components/MdxComponents';
import { ClosingCta } from '@/components/ClosingCta';

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
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} · Burn The Studio`,
      description: project.summary,
      images: [
        {
          url: project.cover,
          alt: project.coverAlt,
        },
      ],
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

  // Resolve matching problems if problemIds specified
  const matchedProblems = project.problemIds
    ? PROBLEMS.filter((prob) => project.problemIds?.includes(prob.id))
    : [];

  return (
    <article className="bg-paper min-h-screen">
      <div className="max-w-content mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Header Block */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-mono text-stone">
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
          </div>

          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8">
            {project.title}
          </h1>

          <p className="font-body text-lg md:text-xl text-ink leading-relaxed max-w-[62ch]">
            {project.summary}
          </p>
        </div>

        {/* Cover Image in 2px bordered frame with hard Ink offset shadow */}
        <div className="mb-14 md:mb-20">
          <div className="border-2 border-ink shadow-hard bg-ink overflow-hidden">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Hard-bordered Meta Strip */}
        <div className="border-2 border-ink bg-paper grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 mb-16">
          {project.client && (
            <div>
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-1">
                CLIENT
              </span>
              <span className="font-body text-base text-ink font-medium">{project.client}</span>
            </div>
          )}

          <div>
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-1">
              YEAR
            </span>
            <span className="font-body text-base text-ink font-medium">{project.year}</span>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-1">
              SERVICES
            </span>
            <span className="font-body text-base text-ink font-medium">
              {project.services.join(' · ')}
            </span>
          </div>

          {project.stack && project.stack.length > 0 && (
            <div>
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-1">
                STACK
              </span>
              <span className="font-body text-base text-ink font-medium">
                {project.stack.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Solved Problems Tagging (if problemIds provided) */}
        {matchedProblems.length > 0 && (
          <div className="mb-16 p-6 border-2 border-ink bg-paper">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3">
              PROBLEMS SOLVED FROM THE DECK:
            </span>
            <div className="flex flex-wrap gap-3">
              {matchedProblems.map((prob) => (
                <Link
                  key={prob.id}
                  href={`/#problems`}
                  className="font-mono text-xs uppercase tracking-mono px-3 py-1.5 border-2 border-ink bg-gold text-ink hover:bg-gold/80 transition-colors"
                >
                  {prob.number} · {prob.title} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Case Study MDX Body */}
        <div className="prose-clean max-w-none mb-20">
          <MDXRemote source={project.content} components={MdxComponents} />
        </div>

        {/* Project Links (if available) */}
        {project.links && project.links.length > 0 && (
          <div className="mb-20 pt-8 border-t-2 border-ink">
            <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-4">
              EXTERNAL LINKS
            </span>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-mono px-4 py-2 border-2 border-ink bg-paper text-ink hover:bg-gold transition-colors inline-flex items-center gap-2"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Previous / Next Project Strips */}
        <div className="border-t-2 border-ink pt-8 mb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="border-2 border-ink p-6 hover:bg-gold transition-colors block"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2">
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
              className="border-2 border-ink p-6 hover:bg-gold transition-colors block text-left md:text-right"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2">
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

      {/* Standard Closing CTA */}
      <ClosingCta />
    </article>
  );
}
