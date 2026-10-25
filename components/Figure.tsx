import React from 'react';
import Image from 'next/image';

export interface FigureProps {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  caption?: string;
  className?: string;
}

export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  className = '',
}: FigureProps) {
  const numWidth = typeof width === 'string' ? parseInt(width, 10) : width;
  const numHeight = typeof height === 'string' ? parseInt(height, 10) : height;

  return (
    <figure className={`my-10 border-2 border-ink bg-paper p-3 md:p-4 ${className}`}>
      <div className="relative border border-ink/20 overflow-hidden bg-ink">
        <Image
          src={src}
          alt={alt}
          width={numWidth}
          height={numHeight}
          className="w-full h-auto block"
        />
      </div>
      {caption && (
        <figcaption className="font-mono text-xs uppercase tracking-mono text-stone mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
