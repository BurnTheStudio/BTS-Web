import React from 'react';
import { slug } from 'github-slugger';
import { Figure } from './Figure';

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (React.isValidElement(node) && node.props && node.props.children) {
    return getTextContent(node.props.children);
  }
  return '';
}

export const MdxComponents = {
  h2: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getTextContent(children);
    const headingId = id || (text ? slug(text) : undefined);

    return (
      <h2
        id={headingId}
        className="group font-display font-semibold text-ink leading-display tracking-tightest mt-16 mb-6 border-b-2 border-ink pb-3 text-[clamp(2rem,4vw,3rem)] flex items-baseline justify-between scroll-mt-24"
        {...props}
      >
        <span>{children}</span>
        {headingId && (
          <a
            href={`#${headingId}`}
            aria-label={`Link to section ${text}`}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 font-mono text-sm text-stone hover:text-gold transition-opacity ml-4 select-none"
          >
            #
          </a>
        )}
      </h2>
    );
  },

  h3: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getTextContent(children);
    const headingId = id || (text ? slug(text) : undefined);

    return (
      <h3
        id={headingId}
        className="group font-display font-medium text-2xl md:text-3xl text-ink leading-tight mt-10 mb-4 flex items-baseline justify-between scroll-mt-24"
        {...props}
      >
        <span>{children}</span>
        {headingId && (
          <a
            href={`#${headingId}`}
            aria-label={`Link to section ${text}`}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 font-mono text-xs text-stone hover:text-gold transition-opacity ml-3 select-none"
          >
            #
          </a>
        )}
      </h3>
    );
  },

  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="font-body text-base md:text-[18px] leading-[1.7] text-ink max-w-[62ch] mb-6"
      {...props}
    >
      {children}
    </p>
  ),

  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside ml-6 space-y-2 font-body text-base md:text-[18px] leading-[1.7] text-ink max-w-[62ch] mb-6"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside ml-6 space-y-2 font-body text-base md:text-[18px] leading-[1.7] text-ink max-w-[62ch] mb-6"
      {...props}
    >
      {children}
    </ol>
  ),

  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-ink pl-6 py-2 my-8 font-display italic text-2xl md:text-3xl text-ink max-w-[62ch]"
      {...props}
    >
      {children}
    </blockquote>
  ),

  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-ink underline decoration-2 underline-offset-4 hover:bg-gold transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },

  hr: () => <hr className="border-t-2 border-ink my-12" />,

  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 border-2 border-ink">
      <table className="w-full border-collapse font-body text-sm text-ink text-left" {...props}>
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="border-b-2 border-ink bg-paper p-3.5 font-mono text-xs uppercase tracking-mono text-stone font-medium" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-ink/15 p-3.5 font-body text-sm text-ink" {...props}>
      {children}
    </td>
  ),

  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono text-xs md:text-sm bg-ink text-paper px-1.5 py-0.5" {...props}>
      {children}
    </code>
  ),

  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-ink text-paper border-2 border-ink p-6 font-mono text-xs md:text-sm overflow-x-auto my-8"
      {...props}
    >
      {children}
    </pre>
  ),

  Figure,
  img: () => null,
};
