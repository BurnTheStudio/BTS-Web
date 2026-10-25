# Burn The Studio

A minimal neo-brutalist marketing platform and editorial system for **Burn The Studio** (Product · Design · Engineering). Built with Next.js App Router, React Server Components, TypeScript, and Tailwind CSS.

---

## 1. Running Locally

Clone the repository and install dependencies with `pnpm` (or `npm`):

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify type correctness and linter rules:

```bash
pnpm lint
npx tsc --noEmit
```

To create a production build:

```bash
pnpm build
pnpm start
```

---

## 2. Filling in STUDIO FACTS

All facts about the studio and team live in two structured TypeScript files:

1. **Studio Identity & Channels**: `content/studio.ts`
   ```typescript
   export const STUDIO = {
     SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://burnthestudio.com',
     DM_LINK: process.env.NEXT_PUBLIC_DM_LINK || 'https://...',
     EMAIL: 'contact@burnthestudio.com',
     LINKEDIN: 'https://linkedin.com/company/...',
     INSTAGRAM: '',
     X: 'https://x.com/...',
     GITHUB: 'https://github.com/...',
     DRIBBBLE_OR_BEHANCE: '',
     LOCATION: 'London, UK',
     FOUNDED: '2024',
     ABOUT_STATEMENT: 'We build real software for real problems...',
     SERVICE_PRODUCT: 'Core loop validation and roadmap definition.',
     SERVICE_DESIGN: 'Design systems and high-finish interfaces.',
     SERVICE_ENGINEERING: 'Scalable web applications and low-latency infrastructure.',
   };
   ```
   *Rule: Blank fields omit their UI components entirely. No placeholders or invented handles.*

2. **Team Members**: `content/people.ts`
   ```typescript
   export const PEOPLE: Person[] = [
     {
       id: 'alice',
       name: 'Alice Cooper',
       role: 'Partner · Engineering',
       bio: 'Former distributed systems engineer building reliable tools.',
       photo: '/team/alice.jpg',
       links: [{ label: 'GitHub', href: 'https://github.com/...' }],
     },
   ];
   ```
   *Rule: Adding an `ABOUT_STATEMENT` or at least one team member activates the `/studio` route.*

---

## 3. Adding Content

Content is organized into collections under `content/`. Every entry is a validated MDX document.

### Scaffolding Command (`pnpm new`)

Generate new draft entries quickly:

```bash
# New Case Study
pnpm new project "Core Loop Redesign"

# New Collaboration
pnpm new collab "Distributed Systems Protocol"

# New Journal Post
pnpm new post "Isolating Bottlenecks"
```

This creates a draft MDX file with a matching slug, today's date, and the recommended section structure.

---

### Collection References

#### A. Projects (`content/projects/<slug>.mdx`)

```yaml
---
title: "Project Title"
slug: "project-slug"
summary: "One-sentence summary (max 160 characters)."
publishedAt: "2026-03-01"
year: 2026
draft: true
featured: true
services:
  - "Product"
  - "Design"
  - "Engineering"
client: "Client Name" # Optional
cover: "/projects/project-slug/cover.png" # Optional path
coverAlt: "Descriptive alt text for cover" # Required if cover is provided
problemIds: # Optional: IDs matching content/problems.ts
  - "retention"
  - "performance"
stack: # Optional
  - "Next.js"
  - "TypeScript"
links: # Optional
  - label: "Live System"
    href: "https://example.com"
---
```

**Recommended Headings Convention:**
```markdown
## The symptom
Describe the initial client symptom before engagement.

## What was really going on
Detail the underlying technical or structural root cause.

## How we solved it
Explain the architecture, design system, and shipping process.

## What the client got
List measurable results and shipped software.
```

#### B. Collaborations (`content/collaborations/<slug>.mdx`)

```yaml
---
title: "Collaboration Title"
slug: "collab-slug"
summary: "One-sentence summary (max 160 characters)."
publishedAt: "2026-03-01"
year: 2026
kind: "Open source" # "Project" | "Publication" | "Event" | "Open source" | "Talk"
draft: true
featured: true
partners:
  - name: "Partner Organization"
    url: "https://example.com" # Optional
    role: "Lead Research" # Optional
projectSlug: "related-project-slug" # Optional: links to a case study
problemIds: # Optional
  - "speed-to-market"
links: # Optional
  - label: "Read Paper"
    href: "https://example.com"
---
```

#### C. Journal Articles (`content/journal/<slug>.mdx`)

```yaml
---
title: "Article Title"
slug: "article-slug"
summary: "One-sentence summary (max 160 characters)."
publishedAt: "2026-03-01"
draft: true
featured: false
author: "alice" # Optional ID from content/people.ts
topics: # Lowercase kebab-case strings, max 4
  - "architecture"
  - "performance"
canonicalUrl: "https://external.com/post" # Optional cross-post canonical link
problemIds: # Optional
  - "legacy-code"
---
```

*Articles with 3 or more `## ` headings automatically render a server-side Table of Contents.*

#### D. Legal Pages (`content/legal/<slug>.mdx`)

```yaml
---
title: "Privacy Policy"
slug: "privacy"
updatedAt: "2026-03-01"
---

Markdown body styled with article typography.
```

---

## 4. Publishing Content

Entries are created in draft mode (`draft: true`).

To publish an entry:
1. Open the `.mdx` file.
2. Change `draft: true` to `draft: false`.
3. Commit and deploy:
   ```bash
   git commit -am "Publish case study"
   git push
   ```

**Content Gating Rules:**
- `/work` activates only when at least 1 project is published.
- `/collaborations` activates only when at least 1 collaboration is published.
- `/journal` and `/journal/rss.xml` activate only when at least 1 article is published.
- `/studio` activates when `ABOUT_STATEMENT` is filled or team members exist.
- When gated off, routes return `404`, hide navigation and footer links, and omit sitemap entries.

---

## 5. Environment Variables

Create `.env.local` based on `.env.example`:

```bash
# Base URL for canonical tags, OG images, and sitemap
NEXT_PUBLIC_SITE_URL=https://burnthestudio.com

# Direct Message link for all CTA buttons
NEXT_PUBLIC_DM_LINK=https://twitter.com/messages/compose?recipient_id=...

# Optional Privacy-Friendly Analytics (Plausible)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=burnthestudio.com

# Optional Brief Contact Form (Resend REST API)
# When these three are set, the brief form renders on /contact
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=hello@burnthestudio.com
CONTACT_FROM_EMAIL=no-reply@burnthestudio.com
```

*Note: The website builds and deploys cleanly to Vercel with zero required environment variables.*

---

## 6. Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Import the project in Vercel.
3. Keep default settings (`Framework: Next.js`, `Root Directory: ./`).
4. Set optional environment variables in Vercel Project Settings if desired.
5. Deploy.

---

## 7. Swapping the Content Loader for a Headless CMS

The application uses an isolated architecture designed for seamless headless CMS migration:

1. **Generic Loader**: `lib/content.ts`
   - Handles file reading, Zod schema validation, slug verification, and reference checks.
2. **Typed Wrappers**:
   - `lib/projects.ts`
   - `lib/collaborations.ts`
   - `lib/posts.ts`
   - `lib/legal.ts`

**How to migrate to Sanity, Contentful, or Strapi:**
Replace the internals of `lib/content.ts` (or the specific wrapper files) with your CMS API queries. Because all page components and layouts consume only the typed wrapper functions (`getAllProjects()`, `getPostBySlug()`, etc.), zero modifications to page components, styling, or routing are required.
