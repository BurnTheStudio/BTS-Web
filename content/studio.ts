// Studio Facts seeded for Burn The Studio.
import { PEOPLE } from './people';

export const STUDIO = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://burnthestudio.com',
  DM_LINK: process.env.NEXT_PUBLIC_DM_LINK || 'https://x.com/burnthestudio',
  EMAIL: 'hello@burnthestudio.com',
  LINKEDIN: 'https://linkedin.com/company/burnthestudio',
  INSTAGRAM: '',
  X: 'https://x.com/burnthestudio',
  GITHUB: 'https://github.com/burnthestudio',
  DRIBBBLE_OR_BEHANCE: '',
  LOCATION: 'London · Remote',
  FOUNDED: '2024',
  ABOUT_STATEMENT:
    'We partner with ambitious founders and engineering teams to diagnose systemic bottlenecks across Product, Design, and Engineering. We build production-grade systems that scale from day one, not throwaway prototypes.',
  SERVICE_PRODUCT:
    'Core loop discovery, retention architecture, and ruthless roadmap prioritization to reach first-time value.',
  SERVICE_DESIGN:
    'Scalable design systems, typography-first user interfaces, and brand-defining digital product experiences.',
  SERVICE_ENGINEERING:
    'High-throughput web architecture, robust distributed backends, and reliable full-stack web applications.',
};

export function hasStudioContent(): boolean {
  return Boolean(
    (STUDIO.ABOUT_STATEMENT && STUDIO.ABOUT_STATEMENT.trim().length > 0) ||
    PEOPLE.length > 0
  );
}
