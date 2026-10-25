import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/projects';

interface WorkIndexProps {
  projects: Project[];
  isHomePage?: boolean;
}

export function WorkIndex({ projects, isHomePage = false }: WorkIndexProps) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="bg-paper text-ink scroll-mt-20">
      <div className="max-w-content mx-auto px-6 md:px-10 py-24 md:py-36">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="text-center md:text-left w-full md:w-auto">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3">
              {isHomePage ? 'SELECTED WORK' : 'WORK'}
            </span>
            <h2 className="font-display font-semibold text-ink leading-display tracking-tightest text-4xl md:text-6xl lg:text-7xl">
              Work
            </h2>
          </div>
          {isHomePage && (
            <Link href="/work" className="font-mono text-[11px] uppercase tracking-mono text-ink underline decoration-2 underline-offset-4 hover:text-gold transition-colors py-2 self-center md:self-auto">
              All work \u2192
            </Link>
          )}
        </div>

        {/* Index rows */}
        <div className="border-t-2 border-ink">
          {projects.map((project, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block border-b-2 border-ink px-6 md:px-8 py-6 md:py-8 hover:bg-gold transition-colors duration-150"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-lg md:text-xl font-medium tracking-mono text-ink">{indexStr}</span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-ink font-medium leading-tight mb-1">{project.title}</h3>
                      <p className="font-body text-sm text-ink/70 max-w-[54ch]">{project.summary}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.services.map((s) => (
                        <span key={s} className="font-mono text-[10px] uppercase tracking-mono text-stone group-hover:text-ink/80">{s}</span>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-stone group-hover:text-ink/70">{project.year}</span>
                  </div>
                  <div className="md:col-span-2 flex justify-start md:justify-end">
                    <div className="w-24 h-16 md:w-28 md:h-[72px] relative border-2 border-ink bg-ink overflow-hidden">
                      <Image src={project.cover} alt={project.coverAlt} fill sizes="112px" className="object-cover" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
