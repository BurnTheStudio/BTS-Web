export interface CollaborationPartner {
  name: string;
  url?: string;
  role?: string;
}

export interface Collaboration {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  year: number | string;
  kind: 'Project' | 'Publication' | 'Event' | 'Open source' | 'Talk';
  draft: boolean;
  featured: boolean;
  partners: CollaborationPartner[];
  projectSlug?: string;
  problemIds?: string[];
  links?: { label: string; href: string }[];
  cover?: string;
  coverAlt?: string;
  content: string;
}

export const COLLABORATIONS: Collaboration[] = [
  {
    title: 'Distributed State Synchronization Protocol',
    slug: 'distributed-state-sync',
    summary:
      'Collaborative research and reference implementation for conflict-free state resolution in local-first web applications.',
    publishedAt: '2026-01-25',
    year: 2026,
    kind: 'Open source',
    draft: false,
    featured: true,
    partners: [
      {
        name: 'StateLabs Foundation',
        url: 'https://example.com',
        role: 'Protocol Research',
      },
      {
        name: 'EdgeVector Core',
        url: 'https://example.com',
        role: 'Benchmark Verification',
      },
    ],
    projectSlug: 'retention-loop-redesign',
    problemIds: ['performance', 'legacy-code'],
    links: [
      {
        label: 'GitHub Repository',
        href: 'https://github.com/burnthestudio',
      },
    ],
    content: `## Collaborative Overview

A joint open-source initiative with StateLabs investigating zero-allocation binary protocol layers for peer-to-peer data consistency across edge nodes.

## The Engineering Challenge

Existing synchronization libraries generated substantial JSON serialization overhead during continuous telemetry updates, causing frame drops on lower-powered devices.

## What Was Delivered

We co-authored and released a lightweight state engine compiled to WebAssembly with automated property-based test suites, cutting payload sizes by 68%.`,
  },
  {
    title: 'The Product Systems Benchmark',
    slug: 'product-systems-benchmark',
    summary:
      'Annual comparative study on design token synchronization and latency across forty European tech scale-ups.',
    publishedAt: '2025-12-05',
    year: 2025,
    kind: 'Publication',
    draft: false,
    featured: true,
    partners: [
      {
        name: 'Systemic Design Institute',
        url: 'https://example.com',
        role: 'Research Partner',
      },
    ],
    problemIds: ['brand', 'operations'],
    links: [
      {
        label: 'Read Report',
        href: 'https://example.com',
      },
    ],
    content: `## Collaborative Overview

Burn The Studio partnered with the Systemic Design Institute to audit and evaluate how modern product teams manage design token drift between Figma libraries and production codebases.

## Research Findings

Eighty-five percent of surveyed growth companies maintain divergent style definitions between design files and CSS bundles, creating redundant pull requests and visual inconsistencies.

## Framework Release

The publication details a three-stage automated pipeline enabling bi-directional token validation from git commits to production UI components.`,
  },
  {
    title: 'Shipping Cadence & The Weekly Slice',
    slug: 'shipping-cadence-keynote',
    summary:
      'Technical keynote delivered on breaking enterprise backlogs into weekly production releases without compromise.',
    publishedAt: '2025-10-18',
    year: 2025,
    kind: 'Talk',
    draft: false,
    featured: false,
    partners: [
      {
        name: 'ProductOps Summit London',
        url: 'https://example.com',
        role: 'Conference Host',
      },
    ],
    problemIds: ['speed-to-market', 'capacity'],
    links: [
      {
        label: 'Watch Keynote',
        href: 'https://example.com',
      },
    ],
    content: `## Session Overview

A breakdown presented to two hundred engineering leads demonstrating why multi-month waterfall scopes consistently delay MVP launches, and how to institute a strict weekly shipping rhythm.

## Key Principles Covered

1. Cut the scope to the single core transaction loop.
2. Measure database latency and user drop-off before authoring new features.
3. Deliver working software in client repositories every seven days.`,
  },
];
