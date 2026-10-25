import React from 'react';
import Link from 'next/link';

interface TagProps {
  label: string;
  href?: string;
  variant?: 'paper' | 'gold' | 'ink';
  className?: string;
}

export function Tag({ label, href, variant = 'paper', className = '' }: TagProps) {
  const variantStyles = {
    paper: 'bg-paper text-ink border-ink hover:bg-gold/20',
    gold: 'bg-gold text-ink border-ink hover:bg-gold/80',
    ink: 'bg-ink text-paper border-paper/30 hover:border-gold hover:text-gold',
  };

  const baseStyles =
    'inline-flex items-center font-mono text-[10px] md:text-[11px] uppercase tracking-mono px-2.5 py-1 border-2 select-none';

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} hover:underline decoration-1 underline-offset-2 transition-colors ${className}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {label}
    </span>
  );
}
