import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllLegalPages, getLegalPageBySlug } from '@/lib/legal';
import { MdxComponents } from '@/components/MdxComponents';
import { formatDate } from '@/lib/format';

export const dynamicParams = false;

interface LegalPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const pages = await getAllLegalPages();
  return pages.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const page = await getLegalPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.title,
    description: `${page.title} for Burn The Studio.`,
    alternates: {
      canonical: `/legal/${page.slug}`,
    },
  };
}

export default async function LegalDetailPage({ params }: LegalPageProps) {
  const page = await getLegalPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const updatedStr = formatDate(page.updatedAt);

  return (
    <article className="bg-paper min-h-[calc(100vh-200px)]">
      <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="mb-12 md:mb-16 border-b-2 border-ink pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
              LEGAL
            </span>
            <span className="font-mono text-xs text-stone">/</span>
            <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
              UPDATED {updatedStr}
            </span>
          </div>

          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-4xl sm:text-6xl md:text-7xl">
            {page.title}
          </h1>
        </div>

        <div className="prose-clean max-w-none mb-20">
          <MDXRemote source={page.content} components={MdxComponents} />
        </div>
      </div>
    </article>
  );
}
