export interface Post {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  draft: boolean;
  featured: boolean;
  author?: string;
  topics?: string[];
  canonicalUrl?: string;
  problemIds?: string[];
  cover?: string;
  coverAlt?: string;
  content: string;
}

export const POSTS: Post[] = [
  {
    title: 'Measuring Systemic Bottlenecks Before Touching Code',
    slug: 'measuring-before-touching-code',
    summary:
      'Why measuring database query contention and payload serialization isolates root causes faster than speculative rewrites.',
    publishedAt: '2026-02-28',
    draft: false,
    featured: true,
    author: 'marcus',
    topics: ['architecture', 'performance'],
    problemIds: ['performance', 'legacy-code'],
    content: `## The instinct to rewrite prematurely

When teams observe degradations in interactive latency, the immediate proposal is frequently a comprehensive rewrite of the application tier. Engineers blame the framework, designers blame asset weights, and product managers despair over stalled roadmap milestones.

In eighty percent of production audits we perform, the proposed rewrite is entirely unnecessary. The real bottleneck is almost never the framework choice; it is unindexed database queries, redundant network waterfalls, or misconfigured connection pooling.

## Establishing baseline telemetry

Before modifying a single line of application logic, our studio establishes deterministic telemetry around the critical user path:

1. Time to First Byte (TTFB) at the CDN edge.
2. Database connection pool saturation under peak concurrent traffic.
3. Payload weight transferred over mobile cellular connections.
4. Client-side layout shifts and long task execution blocks.

Without hard numbers captured on real production traffic, any code optimization is merely an expensive guess.

## Isolating the high-cardinality bottleneck

Once metrics are in place, the highest-leverage intervention invariably surfaces. Rather than touching fifty files, we typically optimize three critical database queries, introduce deterministic caching boundaries, and eliminate unbatched round trips.

## The resolution sequence

Ship the fix in an isolated, verifiable branch. Re-measure the exact baseline under identical traffic conditions. Prove the latency decrease with verifiable data before touching the next module.`,
  },
  {
    title: 'Ruthless Scoping: Why Most MVPs Fail to Ship',
    slug: 'ruthless-mvp-scoping',
    summary:
      'Twelve months into development and still almost ready. How to identify the real core loop and ship in weekly increments.',
    publishedAt: '2026-02-04',
    draft: false,
    featured: true,
    author: 'alice',
    topics: ['product', 'strategy'],
    problemIds: ['speed-to-market', 'capacity'],
    content: `## The expanding roadmap trap

A founder starts with a clean idea. Six months later, the roadmap contains a notification center, multi-tenant billing tiers, social logins, dark mode toggles, and complex team permission matrices. The launch date recedes every sprint.

This is the classic "almost ready" dilemma. Every proposed feature is defended as essential, yet the product has never encountered an actual customer.

## Finding the solitary core loop

An MVP exists to answer a single existential question: does the customer receive tangible value from the core loop?

Everything else is secondary:
- If the core loop does not convert, billing configurations do not matter.
- If the core loop fails to retain, team permission hierarchies do not matter.
- If the first session leaves the user confused, dark mode is an expensive distraction.

## Cutting scope until it hurts

We force teams to strip ninety percent of secondary requirements. We identify the single screen where customer problem meets product resolution. We fix the delivery date, freeze requirements, and assemble the software in weekly shipping slices.

## The power of real traffic

When a lean product is in real users' hands, speculation ends. The questions that debated internally for three months are resolved in forty-eight hours by actual behavioral analytics.`,
  },
  {
    title: 'Typography as Interface Infrastructure',
    slug: 'typography-as-infrastructure',
    summary:
      'Why type hierarchies and strict token constraints establish trust and speed faster than decorative illustrations.',
    publishedAt: '2026-01-12',
    draft: false,
    featured: true,
    author: 'elena',
    topics: ['design', 'systems'],
    problemIds: ['brand', 'conversion'],
    content: `## The illusion of decorative interfaces

Many early-stage software companies mask underlying interface confusion by adding soft drop shadows, pastel gradients, and abstract 3D artwork. When users interact with the application, however, the hierarchy collapses: buttons are indistinguishable from badges, and tables are unreadable.

High-value software does not require decoration. It requires structured, legible typography that directs the eye without cognitive friction.

## Structural typographic scale

At Burn The Studio, we treat typography as structural engineering:
- Display headlines use a high-contrast serif with tight negative tracking to command authority.
- Body paragraphs follow a disciplined measure of 62 characters per line for sustained reading ease.
- Eyebrows, status tags, and tabular data leverage uppercase monospaced type with generous letter-spacing.

## Eliminating visual ambiguity

When borders are hard (2px solid), radius is zero, and contrast strictly passes WCAG AA standards, every interactive affordance becomes undeniable. The user immediately understands what is clickable, what is informative, and where their attention belongs.

## Trust through finish

A product that looks expensive commands premium pricing. When alignment is millimeter-exact and typographic rhythm never stumbles, customers trust the platform with their mission-critical business data.`,
  },
];
