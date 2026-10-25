import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProjects, Service } from '@/lib/projects';
import { IndexRow } from '@/components/IndexRow';
import { Pagination } from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected case studies and production systems built by Burn The Studio.',
  alternates: {
    canonical: '/work',
  },
};

const ITEMS_PER_PAGE = 12;
const VALID_SERVICES: Service[] = ['Product', 'Design', 'Engineering'];

interface WorkPageProps {
  searchParams?: {
    service?: string;
    page?: string;
  };
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const allProjects = await getAllProjects();

  if (allProjects.length === 0) {
    notFound();
  }

  const selectedService = searchParams?.service;
  const isValidService = selectedService && VALID_SERVICES.includes(selectedService as Service);

  const filteredProjects = isValidService
    ? allProjects.filter((p) => p.services.includes(selectedService as Service))
    : allProjects;

  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const distinctServices = Array.from(
    new Set(allProjects.flatMap((p) => p.services))
  ) as Service[];

  return (
    <div className="bg-paper min-h-[calc(100vh-200px)]">
      <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-3 font-medium">
            WORK
          </span>
          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-5xl md:text-7xl lg:text-8xl">
            Work
          </h1>
        </div>

        {distinctServices.length > 1 && (
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b-2 border-ink">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone mr-2 font-medium">
              FILTER:
            </span>
            <Link
              href="/work"
              className={`font-mono text-xs uppercase tracking-mono px-3 py-1.5 border-2 border-ink transition-colors ${
                !isValidService ? 'bg-gold text-ink font-medium' : 'bg-paper text-ink hover:bg-gold/30'
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

        <div className="border-t-2 border-ink">
          {paginatedProjects.map((project, idx) => {
            const overallIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
            const prefix = String(overallIndex).padStart(2, '0');

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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/work"
          queryParams={{ service: isValidService ? selectedService : undefined }}
        />
      </div>
    </div>
  );
}
