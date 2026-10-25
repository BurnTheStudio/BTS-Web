import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { hasPublishedProjects } from '@/lib/projects';
import { hasPublishedCollaborations } from '@/lib/collaborations';
import { hasPublishedPosts } from '@/lib/posts';
import { getAllLegalPages } from '@/lib/legal';
import { hasStudioContent } from '@/content/studio';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Product, Design and Engineering`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE_NAME} · Product, Design and Engineering`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} · Product, Design and Engineering`,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const hasWork = await hasPublishedProjects();
  const hasCollaborations = await hasPublishedCollaborations();
  const hasJournal = await hasPublishedPosts();
  const hasStudio = hasStudioContent();
  const legalPages = await getAllLegalPages();

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-body selection:bg-gold selection:text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] font-mono text-xs uppercase tracking-mono bg-gold text-ink border-2 border-ink px-4 py-3"
        >
          Skip to main content
        </a>
        <Header
          hasWork={hasWork}
          hasCollaborations={hasCollaborations}
          hasJournal={hasJournal}
          hasStudio={hasStudio}
        />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer
          hasWork={hasWork}
          hasCollaborations={hasCollaborations}
          hasJournal={hasJournal}
          hasStudio={hasStudio}
          legalPages={legalPages}
        />
      </body>
    </html>
  );
}
