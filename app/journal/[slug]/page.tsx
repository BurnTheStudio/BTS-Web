import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { getPersonById } from '@/content/people';
import { PROBLEMS } from '@/content/problems';
import { MdxComponents } from '@/components/MdxComponents';
import { ClosingCta } from '@/components/ClosingCta';
import { CoverFrame } from '@/components/CoverFrame';
import { Tag } from '@/components/Tag';
import { TableOfContents } from '@/components/TableOfContents';
import { IndexRow } from '@/components/IndexRow';
import { formatDate, calculateReadingTime, extractTocHeadings } from '@/lib/format';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const isProduction = process.env.NODE_ENV === 'production';
  const posts = await getAllPosts({ includeDrafts: !isProduction });
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const canonical = post.canonicalUrl || `/journal/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical,
      types: {
        'application/rss+xml': '/journal/rss.xml',
      },
    },
    openGraph: {
      title: `${post.title} · Burn The Studio`,
      description: post.summary,
      ...(post.cover
        ? {
            images: [
              {
                url: post.cover,
                alt: post.coverAlt || post.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function JournalPostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const allPosts = await getAllPosts({ includeDrafts: !isProduction });
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  // Author byline
  const person = post.author ? getPersonById(post.author) : undefined;
  const byline = person ? `${person.name} · ${person.role}` : 'BURNTHESTUDIO';

  const dateStr = formatDate(post.publishedAt);
  const readingTime = calculateReadingTime(post.content);
  const tocHeadings = extractTocHeadings(post.content);
  const relatedPosts = await getRelatedPosts(post, 2);

  // Resolved problems
  const matchedProblems = post.problemIds
    ? PROBLEMS.filter((prob) => post.problemIds?.includes(prob.id))
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/journal/${post.slug}`,
    },
    author: person
      ? {
          '@type': 'Person',
          name: person.name,
          jobTitle: person.role,
        }
      : {
          '@type': 'Organization',
          name: 'Burn The Studio',
        },
    ...(post.cover ? { image: `${SITE_URL}${post.cover}` } : {}),
  };

  return (
    <article className="bg-paper min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header Block */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
              {dateStr}
            </span>
            <span className="font-mono text-xs text-stone">/</span>
            <span className="font-mono text-xs uppercase tracking-mono text-stone font-medium">
              {readingTime}
            </span>
            {post.draft && (
              <span className="font-mono text-[10px] uppercase tracking-mono bg-ink text-gold border border-gold px-2 py-0.5 font-medium ml-2">
                DRAFT
              </span>
            )}
          </div>

          <h1 className="font-display font-medium text-ink leading-display tracking-tightest text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8">
            {post.title}
          </h1>

          <p className="font-body text-lg md:text-xl text-ink leading-relaxed max-w-[62ch] mb-8">
            {post.summary}
          </p>

          {/* Byline */}
          <div className="pt-4 border-t-2 border-ink">
            <span className="font-mono text-xs uppercase tracking-mono text-stone">
              BY {byline}
            </span>
          </div>
        </div>

        {/* Cover Image in 2px frame */}
        {post.cover && (
          <div className="mb-14 md:mb-20">
            <CoverFrame
              src={post.cover}
              alt={post.coverAlt}
              title={post.title}
              priority
            />
          </div>
        )}

        {/* Layout with sticky TOC column for posts with 3+ h2 headings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className={tocHeadings.length >= 3 ? 'lg:col-span-8' : 'lg:col-span-10'}>
            {/* Mobile TOC */}
            <TableOfContents headings={tocHeadings} className="lg:hidden" />

            <div className="prose-clean max-w-none">
              <MDXRemote source={post.content} components={MdxComponents} />
            </div>
          </div>

          {/* Desktop sticky TOC */}
          {tocHeadings.length >= 3 && (
            <div className="hidden lg:block lg:col-span-4">
              <TableOfContents headings={tocHeadings} />
            </div>
          )}
        </div>

        {/* Post Footer: Topics and Problems Tags */}
        <div className="border-t-2 border-ink pt-8 mb-16 flex flex-col gap-6">
          {post.topics && post.topics.length > 0 && (
            <div>
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
                TOPICS
              </span>
              <div className="flex flex-wrap gap-2">
                {post.topics.map((topic) => (
                  <Tag
                    key={topic}
                    label={topic}
                    href={`/journal?topic=${topic}`}
                    variant="paper"
                  />
                ))}
              </div>
            </div>
          )}

          {matchedProblems.length > 0 && (
            <div>
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
                RELATED PROBLEMS
              </span>
              <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Previous and Next strips */}
        <div className="border-t-2 border-ink pt-8 mb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/journal/${prevPost.slug}`}
              className="border-2 border-ink p-6 hover:bg-gold transition-colors block bg-paper"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
                ← PREVIOUS ARTICLE
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/journal/${nextPost.slug}`}
              className="border-2 border-ink p-6 hover:bg-gold transition-colors block text-left md:text-right bg-paper"
            >
              <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-2 font-medium">
                NEXT ARTICLE →
              </span>
              <span className="font-display text-xl text-ink font-medium">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Up to 2 Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-20 pt-12 border-t-2 border-ink">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-3 font-medium">
              READ NEXT
            </span>
            <h2 className="font-display font-medium text-3xl md:text-4xl text-ink mb-8">
              Related articles
            </h2>
            <div className="border-t-2 border-ink">
              {relatedPosts.map((p) => (
                <IndexRow
                  key={p.slug}
                  href={`/journal/${p.slug}`}
                  prefix={formatDate(p.publishedAt)}
                  title={p.title}
                  summary={p.summary}
                  tags={p.topics}
                  metaRight={calculateReadingTime(p.content)}
                  thumbnail={p.cover ? { src: p.cover, alt: p.coverAlt } : undefined}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <ClosingCta />
    </article>
  );
}
