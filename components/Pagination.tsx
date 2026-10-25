import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: Record<string, string | undefined>;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  queryParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildUrl(page: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      if (value && key !== 'page') {
        params.set(key, value);
      }
    }
    if (page > 1) {
      params.set('page', String(page));
    }
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      className="flex items-center justify-between border-t-2 border-ink pt-8 mt-12"
      aria-label="Pagination"
    >
      <div>
        {hasPrev ? (
          <Link
            href={buildUrl(currentPage - 1)}
            className="font-mono text-xs uppercase tracking-mono text-ink px-4 py-2 border-2 border-ink bg-paper hover:bg-gold transition-colors inline-flex items-center min-h-[44px]"
          >
            ← Newer
          </Link>
        ) : (
          <span className="font-mono text-xs uppercase tracking-mono text-stone/50 px-4 py-2 border-2 border-transparent inline-flex items-center min-h-[44px]">
            ← Newer
          </span>
        )}
      </div>

      <div className="font-mono text-xs uppercase tracking-mono text-stone">
        PAGE {currentPage} OF {totalPages}
      </div>

      <div>
        {hasNext ? (
          <Link
            href={buildUrl(currentPage + 1)}
            className="font-mono text-xs uppercase tracking-mono text-ink px-4 py-2 border-2 border-ink bg-paper hover:bg-gold transition-colors inline-flex items-center min-h-[44px]"
          >
            Older →
          </Link>
        ) : (
          <span className="font-mono text-xs uppercase tracking-mono text-stone/50 px-4 py-2 border-2 border-transparent inline-flex items-center min-h-[44px]">
            Older →
          </span>
        )}
      </div>
    </nav>
  );
}
