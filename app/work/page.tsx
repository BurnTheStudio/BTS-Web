import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProjects, Service } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected case studies and production systems built by Burn The Studio.',
  alternates: {
    canonical: '/work',
  },
};

interface WorkPageProps {
  searchParams?: {
    service?: string;
  };
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const allProjects = await getAllProjects();

  // If zero published projects exist, /work returns notFound()
  if (allProjects.length === 0) {
    notFound();
  }

  const selectedService = searchParams?.service;

  // Filter by service if query param is set
  const filteredProjects = selectedService
    ? allProjects.filter((p) => p.services.includes(selectedService as Service))
    : allProjects;

  // Determine distinct services for server-rendered filter
  const distinctServices = Array.from(
    new Set(allProjects.flatMap((p) => p.services))
  ) as Service[];

  return (
    <div className="bg-paper min-h-[calc(100vh-200px)]">
      <div className="max-w-content mx-auto px-4 md:px-8 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-3">
            WORK
          </span>
          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-5xl md:text-7xl lg:text-8xl">
            Work
          </h1>
        </div>

        {/* Server-rendered filter: only if more than one service tag exists */}
        {distinctServices.length > 1 && (
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b-2 border-ink">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone mr-2">
              FILTER:
            </span>
            <Link
              href="/work"
              className={`font-mono text-xs uppercase tracking-mono px-3 py-1.5 border-2 border-ink transition-colors ${
                !selectedService ? 'bg-gold text-ink font-medium' : 'bg-paper text-ink hover:bg-gold/30'
              }`}
            >
              All
            </Link>
            {distinctServices.map((service) => (
              <Link
                key={service}
                href={`/work?service=${service}`}
                className={`font-mono text-xs uppercase tracking-mono px-3 py-1.5 border-2 border-ink transition-colors ${
                  selectedService === service
                    ? 'bg-gold text-ink font-medium'
                    : 'bg-paper text-ink hover:bg-gold/30'
                }`}
              >
                {service}
              </Link>
            ))}
          </div>
        )}

        {/* Full-width index rows */}
        <div className="border-t-2 border-ink">
          {filteredProjects.map((project, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block border-b-2 border-ink p-6 md:p-8 hover:bg-gold transition-colors duration-150"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-xl md:text-2xl font-medium tracking-mono text-ink">
                      {indexStr}
                    </span>

                    <div>
                      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-ink font-medium leading-tight mb-2">
                        {project.title}
                      </h2>
                      <p className="font-body text-sm md:text-base text-ink/80 max-w-[54ch]">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="font-mono text-[10px] md:text-[11px] uppercase tracking-mono text-stone group-hover:text-ink/90 font-medium"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-stone group-hover:text-ink/80">
                      {project.year}
                    </span>
                  </div>

                  <div className="md:col-span-2 flex justify-start md:justify-end">
                    <div className="w-24 h-16 md:w-28 md:h-18 relative border-2 border-ink bg-ink overflow-hidden flex-shrink-0">
                      <Image
                        src={project.cover}
                        alt={project.coverAlt}
                        fill
                        sizes="(max-width: 768px) 96px, 112px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
