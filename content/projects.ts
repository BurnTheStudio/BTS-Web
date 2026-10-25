export interface Project {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  year: number | string;
  draft: boolean;
  featured: boolean;
  services: ('Product' | 'Design' | 'Engineering')[];
  client?: string;
  stack?: string[];
  links?: { label: string; href: string }[];
  problemIds?: string[];
  cover?: string;
  coverAlt?: string;
  content: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Core Loop Optimization & Retention Engineering',
    slug: 'retention-loop-redesign',
    summary:
      'Re-scoped the activation loop and cut four drop-off steps to flatten the 30-day retention curve.',
    publishedAt: '2026-02-15',
    year: 2026,
    draft: false,
    featured: true,
    services: ['Product', 'Engineering'],
    problemIds: ['retention', 'speed-to-market'],
    client: 'Telemetry SaaS',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    links: [{ label: 'Product Overview', href: 'https://example.com' }],
    content: `## The symptom

Healthy initial sign-ups and strong marketing attribution, but active customer cohort numbers dropped sharply after day three. The business was pouring acquisition spend into a leaking onboarding funnel while support teams handled repetitive configuration tickets.

## What was really going on

During user journey mapping, we identified that first-time users encountered six sequential modal steps before viewing any telemetry charts. The "aha" moment—seeing live cluster metrics—was hidden behind manual API token generation. Users abandoned the tab before experiencing core value.

## How we solved it

We ruthlessly eliminated four unnecessary setup forms, introduced instantaneous mock-data preview environments during onboarding, and engineered single-click automated provisioning. Behind the interface, we optimized initial database queries to deliver sub-100ms dashboard renders.

## What the client got

A direct two-step path from signup to live metrics, a 42% increase in week-one product activation, and a sustainable retention trajectory that unlocked the company's next venture financing round.`,
  },
  {
    title: 'Internal Operations & Inventory Engine',
    slug: 'internal-workflow-engine',
    summary:
      'Replaced brittle spreadsheets and group-chat approvals with a single-source internal operations platform.',
    publishedAt: '2026-01-20',
    year: 2026,
    draft: false,
    featured: true,
    services: ['Product', 'Design', 'Engineering'],
    problemIds: ['operations', 'performance'],
    client: 'Commerce Supply Logistics',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    links: [{ label: 'Architecture Note', href: 'https://example.com' }],
    content: `## The symptom

Order volume expanded from twenty shipments a day to several hundred, causing spreadsheet formulas to corrupt and dispatch updates to scatter across messaging groups. Traceability failed, resulting in delivery delays and inventory discrepancies.

## What was really going on

The operational team had outgrown generic spreadsheet templates, yet no documented specification of the warehouse logistics protocol existed. Staff were inventing ad-hoc workarounds under stress rather than following an automated linear system.

## How we solved it

Our studio spent forty-eight hours on-site documenting the actual dispatch cycle from intake to pallet loading. We engineered a purpose-built internal application with role-based permissions, automated barcode verification, and instant inventory reconciliation.

## What the client got

Over twenty hours recovered across the warehouse team every single week, zero formula corruption incidents, and an auditable source of truth capable of scaling to ten thousand shipments daily.`,
  },
  {
    title: 'Design System & Interface Architecture',
    slug: 'enterprise-design-system',
    summary:
      'Unified fragmented UI across three web portals with a high-contrast tokenized design system.',
    publishedAt: '2025-11-10',
    year: 2025,
    draft: false,
    featured: true,
    services: ['Design', 'Engineering'],
    problemIds: ['brand', 'conversion'],
    client: 'Apex Financial Systems',
    stack: ['Figma', 'Tailwind CSS', 'TypeScript', 'React'],
    content: `## The symptom

Enterprise buyers were questioning high subscription fees during procurement calls because legacy web portals felt fragmented, generic, and unpolished compared to competitors.

## What was really going on

Engineering teams had shipped thirty bespoke UI components across different repositories over three years without shared tokens, consistent typographic scale, or baseline design principles.

## How we solved it

We established a comprehensive token-driven design architecture rooted in honest structure and precise typographic finish. We standardized grid scales, button interactions, and table densities, shipping clean, accessible React components straight into the client codebase.

## What the client got

A cohesive, institutional-grade product appearance that immediately reinforced premium market positioning, shortened enterprise deal closing cycles, and halved frontend development time for future features.`,
  },
  {
    title: 'Zero-Downtime Monolith Modernization',
    slug: 'legacy-architecture-audit',
    summary:
      'Audited critical payment pipelines, wrapped core workflows in automated tests, and safely refactored legacy microservices.',
    publishedAt: '2025-09-05',
    year: 2025,
    draft: false,
    featured: false,
    services: ['Engineering'],
    problemIds: ['legacy-code', 'capacity'],
    client: 'SecureFlow Payments',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    content: `## The symptom

Every minor feature release triggered regression alerts on critical checkout screens. The internal development team dreaded modifying the core billing module, and cycle velocity ground to a halt.

## What was really going on

Key architects had departed two years prior without system documentation or test coverage. Fragile side-effects were coupled across disparate database triggers.

## How we solved it

Rather than proposing a risky, multi-year total rewrite, our studio systematically audited code paths, installed strict regression harness suites, and dismantled legacy bottlenecks in weekly, verified production slices.

## What the client got

A hardened payment pipeline with 99.99% uptime, reliable release cycles, and a codebase that internal engineers can extend with complete confidence.`,
  },
];
