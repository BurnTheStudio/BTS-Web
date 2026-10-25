# Burn The Studio

A minimal neo-brutalist marketing website and case study platform for **Burn The Studio** (Product · Design · Engineering). Built with Next.js App Router, TypeScript, and Tailwind CSS.

---

## 1. Running Locally

Clone the repository and install dependencies with `pnpm` (or `npm`):

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To run a production build:

```bash
pnpm build
pnpm start
```

---

## 2. Adding a Project

Each project lives as an MDX document inside `content/projects/<slug>.mdx`. Images should be stored in `/public/projects/<slug>/`.

### Frontmatter Reference

```yaml
---
title: "Project Title"
slug: "project-slug"
year: 2026
summary: "A single concise sentence describing what was delivered."
services:
  - "Product"
  - "Design"
  - "Engineering"
problemIds: # Optional: IDs matching problems in content/problems.ts
  - "retention"
  - "performance"
client: "Client Name" # Optional
cover: "/projects/project-slug/cover.png"
coverAlt: "Descriptive alt text for the cover image"
featured: true # true to show on homepage (up to 3 featured)
publishedAt: "2026-03-01"
links: # Optional external links
  - label: "Live System"
    href: "https://example.com"
stack: # Optional technology stack tags
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
draft: false # Set to false to publish
---
```

### Body Headings Convention

Following the studio's deck structure, case studies are recommended to use these four semantic sections:

```markdown
## The symptom

Describe what the client was experiencing before engagement.

## What was really going on

Explain the root cause identified during technical and design audit.

## How we solved it

Detail the architecture, execution, and weekly iteration slices.

## What the client got

List tangible, measurable outcomes, latency improvements, and shipped deliverables.
```

---

## 3. Publishing a Project

Projects are created in draft mode by default (`draft: true`).

To publish a project to production:
1. Open `content/projects/<slug>.mdx`.
2. Update the frontmatter:
   ```yaml
   draft: false
   ```
3. When at least one project has `draft: false`, the `/work` route becomes active, the "Work" link automatically appears in the navigation, and featured items appear on the homepage.

---

## 4. Changing the Contact Link

The contact link is defined in a single source of truth:

- File: `lib/site.ts`
- Constant: `CONTACT_HREF`

```typescript
// lib/site.ts

// TODO: replace with real DM link or email
export const CONTACT_HREF = "https://twitter.com/messages/compose?recipient_id=...";
```

Every "DM us your problem →" button and link throughout the application automatically reads from this constant.
