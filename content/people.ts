export interface Person {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  links?: Array<{ label: string; href: string }>;
}

export const PEOPLE: Person[] = [
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Partner · Engineering',
    bio: 'Distributed systems engineer focused on high-throughput backend infrastructure, zero-downtime refactors, and telemetry.',
    links: [
      { label: 'GitHub', href: 'https://github.com/burnthestudio' },
      { label: 'X', href: 'https://x.com/burnthestudio' },
    ],
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Partner · Design Systems',
    bio: 'Brand and product designer building precise design tokens, typographic hierarchies, and minimal neo-brutalist interfaces.',
    links: [
      { label: 'ReadCV', href: 'https://read.cv' },
    ],
  },
  {
    id: 'alice',
    name: 'Alice Cooper',
    role: 'Partner · Product Strategy',
    bio: 'Product strategist specializing in core onboarding loops, activation metrics, and ruthless MVP scoping for high-growth startups.',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/company/burnthestudio' },
    ],
  },
];

export function getPersonById(id: string): Person | undefined {
  return PEOPLE.find((person) => person.id === id);
}

export function hasPeople(): boolean {
  return PEOPLE.length > 0;
}
