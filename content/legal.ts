export interface LegalPage {
  title: string;
  slug: string;
  updatedAt: string;
  content: string;
}

export const LEGAL_PAGES: LegalPage[] = [
  {
    title: 'Privacy Policy',
    slug: 'privacy',
    updatedAt: '2026-02-01',
    content: `## 1. Overview

Burn The Studio operates this website with strict minimal data retention principles. We believe that privacy is preserved through structural minimization: we do not use tracking cookies, we do not deploy invasive analytics scripts, and we do not sell or monetize visitor telemetry.

## 2. Information Collected

If you choose to submit a project inquiry through our direct communication channels or brief form, we receive the details you explicitly submit:
- Your name and return email address.
- The business challenge and message content you provide.

This information is utilized solely to evaluate your technical inquiry and formulate an appropriate response.

## 3. Analytics

We may deploy privacy-friendly, cookieless telemetry (such as self-hosted Plausible Analytics) to measure aggregate page views and device viewport classes. No persistent identifiers or cross-site tracking fingerprints are ever stored on your client machine.

## 4. Contact

For inquiries regarding data privacy or to request the deletion of any prior correspondence, contact the studio directly at \`hello@burnthestudio.com\`.`,
  },
  {
    title: 'Terms of Service',
    slug: 'terms',
    updatedAt: '2026-02-01',
    content: `## 1. Studio Engagements

All technical, product, and design engagements conducted by Burn The Studio are governed by bespoke Master Services Agreements executed directly between the studio and the client entity. Nothing on this website constitutes a binding offer of contract or guarantee of engagement availability.

## 2. Intellectual Property & Ownership

As a foundational principle of our studio practice, all custom software, design tokens, documentation, and architecture engineered during a client engagement belong exclusively to the client upon full payment of agreed fees. We do not retain proprietary lock-in on custom codebases.

## 3. Website Content

All written articles, case study summaries, and visual marks published on this website are the property of Burn The Studio or their respective partners, protected under international copyright conventions.

## 4. Inquiries

Direct inquiries regarding engagement terms or studio availability should be directed to \`hello@burnthestudio.com\`.`,
  },
];
