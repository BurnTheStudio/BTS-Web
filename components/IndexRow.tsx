import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface IndexRowProps {
  href: string;
  prefix: string;
  title: string;
  summary?: string;
  tags?: string[];
  metaRight?: string | React.ReactNode;
  thumbnail?: {
    src?: string;
    alt?: string;
  };
  isDraft?: boolean;
  className?: string;
}

export function IndexRow({
  href,
  prefix,
  title,
  summary,
  tags = [],
  metaRight,
  thumbnail,
  isDraft = false,
  className = '',
}: IndexRowProps) {
  return (
    <Link
      href={href}
      className={`group block border-b-2 border-ink p-6 md:p-8 bg-paper hover:bg-gold transition-colors duration-150 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div
          className={`flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8 ${
            thumbnail ? 'md:col-span-8' : 'md:col-span-9'
          }`}
        >
          <span className="font-mono text-lg md:text-xl font-medium tracking-mono text-ink shrink-0">
            {prefix}
          </span>

          <div>
            <div className="flex items-center gap-3 flex-wrap mb-1.5">
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-ink font-medium leading-tight">
                {title}
              </h3>
              {isDraft && (
                <span className="font-mono text-[10px] uppercase tracking-mono bg-ink text-gold border border-gold px-2 py-0.5 font-medium">
                  DRAFT
                </span>
              )}
            </div>

            {summary && (
              <p className="font-body text-sm md:text-base text-ink/80 max-w-[54ch]">
                {summary}
              </p>
            )}
          </div>
        </div>

        <div
          className={`flex flex-col gap-2 ${
            thumbnail ? 'md:col-span-2' : 'md:col-span-3 md:items-end'
          }`}
        >
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] md:text-[11px] uppercase tracking-mono text-stone group-hover:text-ink/90 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {metaRight && (
            <div className="font-mono text-xs text-stone group-hover:text-ink/80">
              {metaRight}
            </div>
          )}
        </div>

        {thumbnail && (
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <div className="w-24 h-16 md:w-28 md:h-18 relative border-2 border-ink bg-ink overflow-hidden shrink-0">
              {thumbnail.src ? (
                <Image
                  src={thumbnail.src}
                  alt={thumbnail.alt || title}
                  fill
                  sizes="(max-width: 768px) 96px, 112px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-ink flex items-center justify-center p-2 text-center">
                  <span className="font-display italic text-xs text-gold line-clamp-2">
                    {title}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
