import React from 'react';

export interface TocHeading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: TocHeading[];
  className?: string;
}

export function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  if (headings.length < 3) return null;

  return (
    <aside className={className}>
      <div className="lg:hidden mb-8 border-2 border-ink bg-paper">
        <details className="group">
          <summary className="font-mono text-xs uppercase tracking-mono p-4 cursor-pointer flex items-center justify-between select-none font-medium text-ink">
            <span>CONTENTS ({headings.length})</span>
            <span className="font-mono text-sm text-stone group-open:hidden">+</span>
            <span className="font-mono text-sm text-stone hidden group-open:inline">—</span>
          </summary>
          <nav className="p-4 border-t-2 border-ink flex flex-col gap-3" aria-label="Table of contents">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className="font-mono text-xs tracking-mono text-ink/80 hover:text-ink hover:underline decoration-1 underline-offset-2"
              >
                {h.text}
              </a>
            ))}
          </nav>
        </details>
      </div>

      <div className="hidden lg:block sticky top-28 self-start border-2 border-ink p-6 bg-paper w-64 max-h-[calc(100vh-140px)] overflow-y-auto">
        <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-4 font-medium">
          CONTENTS
        </span>
        <nav className="flex flex-col gap-3" aria-label="Table of contents">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className="font-mono text-xs tracking-mono text-ink/70 hover:text-ink hover:underline decoration-1 underline-offset-2 transition-colors"
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
