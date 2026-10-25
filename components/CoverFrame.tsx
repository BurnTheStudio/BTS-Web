import React from 'react';
import Image from 'next/image';

interface CoverFrameProps {
  src?: string;
  alt?: string;
  title: string;
  aspectRatio?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function CoverFrame({
  src,
  alt,
  title,
  aspectRatio = 'aspect-[16/9]',
  priority = false,
  className = '',
  sizes = '(max-width: 1280px) 100vw, 1280px',
}: CoverFrameProps) {
  return (
    <div
      className={`border-2 border-ink bg-ink shadow-hard overflow-hidden ${aspectRatio} relative ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-ink flex items-center justify-center p-8 text-center border-2 border-ink">
          <p className="font-display italic font-medium text-gold text-2xl md:text-3xl lg:text-4xl max-w-xl leading-tight">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
