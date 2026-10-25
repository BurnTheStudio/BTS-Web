import React from 'react';
import Link from 'next/link';

interface CommonProps {
  variant?: 'primary' | 'secondary' | 'underline' | 'gold' | 'ink';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  type?: never;
}

interface ActionButtonProps extends CommonProps {
  href?: never;
  type?: 'button' | 'submit' | 'reset';
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button({
  href,
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  onClick,
  target,
  rel,
  disabled,
}: ButtonProps) {
  if (variant === 'underline') {
    if (href) {
      return (
        <Link
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className={`font-mono text-xs uppercase tracking-mono text-ink hover:text-gold underline decoration-2 underline-offset-4 transition-colors inline-flex items-center min-h-[44px] ${className}`}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`font-mono text-xs uppercase tracking-mono text-ink hover:text-gold underline decoration-2 underline-offset-4 transition-colors inline-flex items-center min-h-[44px] ${className}`}
      >
        {children}
      </button>
    );
  }

  const base =
    'inline-flex items-center justify-center font-mono text-xs uppercase tracking-mono font-medium border-2 min-h-[44px] px-6 py-3 select-none btn-press transition-colors disabled:opacity-50 disabled:pointer-events-none';

  const variantStyles = {
    primary:
      'bg-gold text-ink border-ink shadow-hard hover:shadow-hard-hover',
    secondary:
      'bg-ink text-paper border-ink shadow-[4px_4px_0_0_var(--gold)] hover:shadow-[6px_6px_0_0_var(--gold)]',
    gold:
      'bg-gold text-ink border-gold shadow-[4px_4px_0_0_var(--paper)] hover:shadow-[6px_6px_0_0_var(--paper)]',
    ink:
      'bg-ink text-paper border-ink shadow-[4px_4px_0_0_var(--paper)] hover:shadow-[6px_6px_0_0_var(--paper)]',
  };

  const style = variantStyles[variant] || variantStyles.primary;

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`${base} ${style} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${style} ${className}`}
    >
      {children}
    </button>
  );
}
