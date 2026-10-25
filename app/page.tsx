import React from 'react';
import { Hero } from '@/components/Hero';
import { ProblemsAccordion } from '@/components/ProblemsAccordion';
import { WorkIndex } from '@/components/WorkIndex';
import { HowWeWork } from '@/components/HowWeWork';
import { ClosingCta } from '@/components/ClosingCta';
import { getFeaturedProjects } from '@/lib/projects';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ProblemsAccordion />
      {featuredProjects.length > 0 && (
        <WorkIndex projects={featuredProjects} isHomePage />
      )}
      <HowWeWork />
      <ClosingCta />
    </>
  );
}
