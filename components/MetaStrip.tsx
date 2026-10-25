import React from 'react';
import Link from 'next/link';

export interface MetaItem {
  label: string;
  value: React.ReactNode;
  href?: string;
  external?: boolean;
}

interface MetaStripProps {
  items: MetaItem[];
  className?: string;
}

export function MetaStrip({ items, className = '' }: MetaStripProps) {
  const visibleItems = items.filter((item) => item.value !== undefined && item.value !== null && item.value !== '');

  if (visibleItems.length === 0) return null;

  return (
    <div
      className={`border-2 border-ink bg-paper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 ${className}`}
    >
      {visibleItems.map((item, idx) => (
        <div key={`${item.label}-${idx}`} className="flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-1.5">
            {item.label}
          </span>
          <div className="font-body text-base text-ink font-medium">
            {item.href ? (
              item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline decoration-1 underline-offset-2 hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  <span>{item.value}</span>
                  <span className="font-mono text-xs">↗</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="hover:underline decoration-1 underline-offset-2 hover:text-gold transition-colors"
                >
                  {item.value}
                </Link>
              )
            ) : (
              item.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
