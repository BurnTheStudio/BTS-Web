import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROBLEMS, getProblemBySlug } from '@/content/problems';
import { getProjectsForProblem } from '@/lib/projects';
import { getPostsForProblem } from '@/lib/posts';
import { IndexRow } from '@/components/IndexRow';
import { ClosingCta } from '@/components/ClosingCta';
import { formatDate } from '@/lib/format';

export const dynamicParams = false;

interface ProblemPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PROBLEMS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProblemPageProps): Promise<Metadata> {
  const problem = getProblemBySlug(params.slug);
  if (!problem) return {};

  return {
    title: problem.title,
    description: problem.subline,
    alternates: {
      canonical: `/problems/${problem.slug}`,
    },
    openGraph: {
      title: `${problem.title} · Burn The Studio`,
      description: problem.subline,
    },
  };
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const problem = getProblemBySlug(params.slug);
  if (!problem) {
    notFound();
  }

  const currentIndex = PROBLEMS.findIndex((p) => p.slug === problem.slug);
  const prevProblem = currentIndex > 0 ? PROBLEMS[currentIndex - 1] : null;
  const nextProblem = currentIndex < PROBLEMS.length - 1 ? PROBLEMS[currentIndex + 1] : null;

  const matchedProjects = await getProjectsForProblem(problem.id);
  const matchedPosts = await getPostsForProblem(problem.id);

  const parts = [
    { num: '01', label: 'SYMPTOM', text: problem.symptom },
    { num: '02', label: 'WHAT’S REALLY GOING ON', text: problem.reallyGoingOn },
    { num: '03', label: 'HOW WE SOLVE IT', text: problem.howWeSolve },
    { num: '04', label: 'WHAT YOU GET', text: problem.whatYouGet },
  ];

  return (
    <article className="bg-paper min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="flex items-center justify-between pb-6 border-b-2 border-ink mb-8 md:mb-12">
          <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
            PROBLEM {problem.number} · {problem.category}
          </span>
          <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
            {problem.number}/09
          </span>
        </div>

        <div className="mb-14 md:mb-20">
          <h1 className="font-display font-semibold text-ink leading-display tracking-tightest text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6">
            {problem.title}
          </h1>
          <p className="font-display italic text-xl md:text-2xl lg:text-3xl text-ink/80 max-w-[54ch]">
            {problem.subline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 md:mb-24">
          {parts.map((part) => (
            <div
              key={part.num}
              className="border-2 border-ink bg-paper p-6 sm:p-8 flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] uppercase tracking-mono text-stone font-medium">
                  {part.label}
                </span>
                <span className="font-mono text-xs text-stone tracking-mono font-medium">
                  {part.num}
                </span>
              </div>
              <p className="font-body text-base md:text-lg text-ink leading-relaxed mt-auto">
                {part.text}
              </p>
            </div>
          ))}
        </div>

        {matchedProjects.length > 0 && (
          <div className="mb-16 md:mb-24 pt-12 border-t-2 border-ink">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
              CASE STUDIES
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-ink mb-8">
              Work on this problem
            </h2>
            <div className="border-t-2 border-ink">
              {matchedProjects.map((p, idx) => (
                <IndexRow
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  prefix={String(idx + 1).padStart(2, '0')}
                  title={p.title}
                  summary={p.summary}
                  tags={p.services}
                  metaRight={String(p.year)}
                  thumbnail={p.cover ? { src: p.cover, alt: p.coverAlt } : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {matchedPosts.length > 0 && (
          <div className="mb-16 md:mb-24 pt-12 border-t-2 border-ink">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
              ARTICLES
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-ink mb-8">
              Writing on this problem
            </h2>
            <div className="border-t-2 border-ink">
              {matchedPosts.map((post) => (
                <IndexRow
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  prefix={formatDate(post.publishedAt)}
                  title={post.title}
                  summary={post.summary}
                  tags={post.topics}
                  thumbnail={post.cover ? { src: post.cover, alt: post.coverAlt } : undefined}
                />
              ))}
            </div>
          </div>
        )}

        <div className="border-t-2 border-ink pt-8 mb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevProblem ? (
            <Link
              href={`/problems/${prevProblem.slug}`}
              className="border-2 border-ink p-6 bg-paper hover:bg-gold transition-colors block"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
                ← PROBLEM {prevProblem.number} · {prevProblem.category}
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {prevProblem.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProblem ? (
            <Link
              href={`/problems/${nextProblem.slug}`}
              className="border-2 border-ink p-6 bg-paper hover:bg-gold transition-colors block text-left md:text-right"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
                PROBLEM {nextProblem.number} · {nextProblem.category} →
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {nextProblem.title}
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
