import { slug } from 'github-slugger';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function formatDate(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  if (isNaN(d.getTime())) return '';

  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export function calculateReadingTime(content: string): string {
  const clean = content.replace(/<[^>]+>/g, '').replace(/```[\s\S]*?```/g, '');
  const words = clean.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} MIN READ`;
}

export interface TocHeading {
  id: string;
  text: string;
}

export function extractTocHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const text = match[1].replace(/[*_`]/g, '').trim();
      if (text) {
        headings.push({ id: slug(text), text });
      }
    }
  }

  return headings;
}
