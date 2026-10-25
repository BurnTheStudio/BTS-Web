import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';
import { IndexRow } from '@/components/IndexRow';
import { Pagination } from '@/components/Pagination';
import { formatDate, calculateReadingTime } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Articles, systems thinking, and technical notes from Burn The Studio.',
  alternates: {
    canonical: '/journal',
    types: {
      'application/rss+xml': '/journal/rss.xml',
    },
  },
};

const ITEMS_PER_PAGE = 10;

interface JournalPageProps {
  searchParams?: {
    topic?: string;
    page?: string;
  };
}

export default async function JournalPage({ searchParams }: JournalPageProps) {
  const allPosts = await getAllPosts();

  if (allPosts.length === 0) {
    notFound();
  }

  const distinctTopics = Array.from(
    new Set(allPosts.flatMap((p) => p.topics || []))
  );

  const selectedTopic = searchParams?.topic;
  const isValidTopic = selectedTopic && distinctTopics.includes(selectedTopic);

  const filteredPosts = isValidTopic
    ? allPosts.filter((p) => p.topics && p.topics.includes(selectedTopic))
    : allPosts;

  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-paper min-h-[calc(100vh-200px)]">
      <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-mono text-stone block mb-3 font-medium">
            JOURNAL
          </span>
          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-5xl md:text-7xl lg:text-8xl">
            Journal
          </h1>
        </div>

        {distinctTopics.length > 1 && (
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b-2 border-ink">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone mr-2 font-medium">
              TOPIC:
            </span>
            <Link
              href="/journal"
              className={`font-mono text-xs uppercase tracking-mono px-3 py-1.5 border-2 border-ink transition-colors ${
                !isValidTopic ? 'bg-gold text-ink font-medium' : 'bg-paper text-ink hover:bg-gold/30'
              }`}
            >
              All
            </Link>
            {distinctTopics.map((topic) => (
              <Link
                key={topic}
                href={`/journal?topic=${topic}`}
                className={`font-mono text-xs uppercase tracking-mono px-3 py-1.5 border-2 border-ink transition-colors ${
                  selectedTopic === topic
                    ? 'bg-gold text-ink font-medium'
                    : 'bg-paper text-ink hover:bg-gold/30'
                }`}
              >
                {topic}
              </Link>
            ))}
          </div>
        )}

        <div className="border-t-2 border-ink">
          {paginatedPosts.map((post) => {
            const readingTime = calculateReadingTime(post.content);
            const dateStr = formatDate(post.publishedAt);

            return (
              <IndexRow
                key={post.slug}
                href={`/journal/${post.slug}`}
                prefix={dateStr}
                title={post.title}
                summary={post.summary}
                tags={post.topics}
                metaRight={readingTime}
                thumbnail={post.cover ? { src: post.cover, alt: post.coverAlt } : undefined}
                isDraft={post.draft}
              />
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/journal"
          queryParams={{ topic: isValidTopic ? selectedTopic : undefined }}
        />
      </div>
    </div>
  );
}
