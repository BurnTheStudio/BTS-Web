import React from 'react';
import Link from 'next/link';
import { Project } from '@/lib/projects';
import { IndexRow } from './IndexRow';

interface WorkIndexProps {
  projects: Project[];
  isHomePage?: boolean;
}

export function WorkIndex({ projects, isHomePage = false }: WorkIndexProps) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="bg-paper text-ink scroll-mt-20 py-24 md:py-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="text-center md:text-left w-full md:w-auto">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
              {isHomePage ? 'SELECTED WORK' : 'WORK'}
            </span>
            <h2 className="font-display font-semibold text-ink leading-display tracking-tightest text-4xl md:text-6xl lg:text-7xl">
              Work
            </h2>
          </div>
          {isHomePage && (
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-mono text-ink underline decoration-2 underline-offset-4 hover:text-gold transition-colors py-2 self-center md:self-auto font-medium"
            >
              All work →
            </Link>
          )}
        </div>

        <div className="border-t-2 border-ink">
          {projects.map((project, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            return (
              <IndexRow
                key={project.slug}
                href={`/work/${project.slug}`}
                prefix={indexStr}
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
  );
}
