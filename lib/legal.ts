import { LEGAL_PAGES, LegalPage } from '@/content/legal';

export type { LegalPage };

export async function getAllLegalPages(): Promise<LegalPage[]> {
  return LEGAL_PAGES;
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPage | null> {
  return LEGAL_PAGES.find((p) => p.slug === slug) || null;
}

export async function hasLegalPages(): Promise<boolean> {
  return LEGAL_PAGES.length > 0;
}
