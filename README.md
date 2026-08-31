# Matt Verry - Consulting Site

The site for my independent consulting practice: modernizing legacy .NET and
Angular applications. Built with [Analog](https://analogjs.org/),
[Angular](https://angular.dev/) v22, and [Tailwind CSS](https://tailwindcss.com/),
prerendered to static HTML and deployed on
[Firebase Hosting](https://firebase.google.com/docs/hosting).

Inspired and based on [Nelson's blog](https://github.com/nelsongutidev).

## Who the site is for

Every page is aimed at one reader: someone responsible for a business-critical
.NET/Angular application that has fallen behind, who is under external pressure
(an audit, a cloud mandate, an unsupported framework, a departure) to do
something about it.

The site funnels that reader toward a single action — booking a fixed-fee
**Modernization Assessment** — through a three-step service ladder:

1. **Modernization Assessment** — small, fixed scope, ends in a written plan
2. **Migration & Modernization** — the delivery engagement
3. **Fractional Technical Lead** — retained, part-time continuity

Keep that reader in mind when changing copy. Anything that reads as a résumé
rather than an offer is off-target.

### Before this goes live

Two things need real values, and both are marked `TODO(matt)` in the source:

- **Canonical domain.** `site.url` in `src/app/site.config.ts` and `SITE_URL` in
  `vite.config.ts` both point at `https://matt-v.web.app`. They feed the sitemap,
  canonical links, and Open Graph tags, so update both (and the `Sitemap:` line in
  `public/robots.txt`) once a custom domain is attached.
- **Prices.** The services copy says "fixed fee" without naming a number, because
  I did not have your real rates. Adding concrete figures to
  `src/app/pages/services.page.ts` will convert considerably better than leaving
  the buyer to guess.

Worth adding when you have them: named client work, outcomes with numbers
attached, and testimonials. There is no placeholder markup for these — invented
proof would be worse than none — but they are the single biggest missing
credibility signal on the site.

## Structure

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `src/app/pages/(home).page.ts` | Positioning, symptoms, service ladder, principles |
| `/services` | `src/app/pages/services.page.ts` | The three engagements in detail |
| `/about` | `src/app/pages/about.page.ts` | Credibility for a buyer evaluating a consultant |
| `/contact` | `src/app/pages/contact.page.ts` | The conversion destination |
| `/blog` | `src/app/pages/blog/index.page.ts` | Writing, as supporting authority |
| `*` | `src/app/pages/[...not-found].page.ts` | 404, marked `noindex` |

Shared pieces live in `src/app/components/`: `header`, `footer`, `social-links`,
and `cta` (the closing call-to-action band reused across marketing pages).

## Requirements

Node `^24.15.0 || >=26.0.0` — that is, Node 24 LTS at 24.15 or later, or Node
26 and above. Note that this excludes Node 25: Angular 22 supports only
even-numbered (LTS) Node lines. This is the range enforced by the `engines`
field in `package.json`; `.nvmrc` pins the version used locally and in CI.

## Development server

```bash
npm run dev
```

App will be served at `http://localhost:5173`.

## Build

```bash
npm run build
```

Output is generated in `dist/analog/public` for static hosting, which is the
directory Firebase Hosting serves (see `firebase.json`).

Every route is **prerendered to static HTML** at build time (`ssr: true` plus
`static: true` in `vite.config.ts`). This matters: without it the site ships as
an empty shell, and search crawlers and link unfurlers see no content, title, or
description. There is no server to deploy — the prerender pass runs at build
time and the output is plain static files.

The build also emits `sitemap.xml`. Draft posts (`published: false`) are excluded
from both the prerender and the sitemap.

### SEO

Each page exports a `routeMeta` with a `title` and the tag set built by
`pageMeta()` in `src/app/seo.ts` (description, Open Graph, Twitter card).
`CanonicalLinkService` maintains the `<link rel="canonical">`, since route
metadata can carry meta tags but not link tags. All of it is baked into the
prerendered HTML.

## Tests

```bash
npm test
```

Vitest runs the specs in `src/**/*.spec.ts` in a jsdom environment, using
`vitest.config.ts` (separate from the app's `vite.config.ts`).

The page specs in `src/app/pages/pages.spec.ts` assert on positioning copy and
the presence of the contact route on purpose — they are there to catch a
well-meaning edit that quietly turns the site back into a résumé.

## Blog

Blog posts are markdown files in `src/content/blog/`. They are presented as
"Writing" and exist to demonstrate depth to a prospective client, so posts about
migration problems pull more weight here than general tutorials.

Add a new `.md` file with frontmatter to create a post:

```markdown
---
title: 'My Post'
description: 'A short description'
date: 'Mon Jan 1 2024'
tags:
    - Angular
published: true
slug: 'my-post'
---

Your content here...
```

Posts with `published: true` appear on the blog page automatically, and are
prerendered and added to the sitemap. Posts with `published: false` are excluded
from the build entirely.

## Can I use this project?

Feel free to use this code. Create your own blog or site, style it however you like, and ship it. Just try to make it your own.
