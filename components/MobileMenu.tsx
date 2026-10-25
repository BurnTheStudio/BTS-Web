'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CONTACT_HREF } from '@/lib/site';

export interface NavLinkItem {
  label: string;
  href: string;
  activePath?: string;
}

interface MobileMenuProps {
  navLinks: NavLinkItem[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape & return focus
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Trap focus inside panel when open
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    firstElement?.focus();
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="font-mono text-xs uppercase tracking-mono text-ink border-2 border-ink bg-paper px-4 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center btn-press hover:bg-gold transition-colors"
      >
        {isOpen ? 'CLOSE' : 'MENU'}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-16 md:top-20 bottom-0 bg-paper border-b-2 border-ink z-50 p-6 flex flex-col justify-between overflow-y-auto"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isActive = link.activePath
                ? pathname.startsWith(link.activePath)
                : pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-mono text-base uppercase tracking-mono py-3 border-b-2 border-ink transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-ink font-semibold underline decoration-2 underline-offset-4'
                      : 'text-ink/80 hover:text-gold'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-sm">→</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6">
            <Link
              href={CONTACT_HREF}
              onClick={() => setIsOpen(false)}
              className="w-full font-mono text-xs uppercase tracking-mono font-medium bg-gold text-ink border-2 border-ink px-6 py-4 text-center min-h-[44px] inline-flex items-center justify-center shadow-hard btn-press"
            >
              DM us your problem →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
