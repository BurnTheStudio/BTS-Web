import React from 'react';
import Image from 'next/image';

export const MdxComponents = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-display font-medium text-3xl md:text-4xl text-ink leading-display tracking-tightest mt-14 mb-4 border-b-2 border-ink pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-display font-medium text-2xl md:text-3xl text-ink leading-display mt-8 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="font-body text-[16px] md:text-[17px] leading-[1.6] text-ink max-w-[62ch] mb-6"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside space-y-2 font-body text-[16px] md:text-[17px] leading-[1.6] text-ink max-w-[62ch] mb-6 pl-2"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside space-y-2 font-body text-[16px] md:text-[17px] leading-[1.6] text-ink max-w-[62ch] mb-6 pl-2"
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
  figure: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <figure className="border-2 border-ink p-4 my-8 bg-paper max-w-content" {...props}>
      {children}
    </figure>
  ),
  figcaption: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <figcaption
      className="font-mono text-xs uppercase tracking-mono text-stone mt-3"
      {...props}
    >
      {children}
    </figcaption>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono text-sm bg-ink text-paper px-1.5 py-0.5" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-ink text-paper border-2 border-ink p-6 font-mono text-sm overflow-x-auto my-6"
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-ink underline decoration-2 underline-offset-4 hover:bg-gold/30 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="border-2 border-ink my-8 bg-ink overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src || ''}
        alt={alt || ''}
        className="w-full h-auto block"
        loading="lazy"
        {...props}
      />
    </div>
  ),
};
