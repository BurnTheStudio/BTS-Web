import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  variant?: 'gold' | 'ink' | 'paper' | 'underline';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export function Button({
  href,
  variant = 'gold',
  children,
  className = '',
  onClick,
  target,
  rel,
}: ButtonProps) {
  if (variant === 'underline') {
    return (
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`inline-flex items-center justify-center font-mono text-[11px] md:text-xs uppercase tracking-mono text-paper/70 hover:text-gold underline decoration-2 underline-offset-4 min-h-[44px] px-2 transition-colors ${className}`}
      >
        {children}
      </Link>
    );
  }

  const base = 'inline-flex items-center justify-center font-mono text-[11px] md:text-xs font-medium uppercase tracking-mono border-2 min-h-[44px] px-6 py-3 select-none btn-press';

  const styles = {
    gold: 'bg-gold text-ink border-gold shadow-[4px_4px_0_0_var(--paper)] hover:shadow-[6px_6px_0_0_var(--paper)]',
    ink: 'bg-ink text-paper border-paper shadow-[4px_4px_0_0_var(--gold)] hover:shadow-[6px_6px_0_0_var(--gold)]',
    paper: 'bg-paper text-ink border-ink shadow-hard hover:shadow-hard-hover',
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
