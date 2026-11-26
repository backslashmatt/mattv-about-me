# Lyra - lyraapps.com

The site for Lyra (Lyra Software Applications LLC): its public apps, pitch-n,
rep-n and quest-n, and its .NET and Angular services for companies. Built with
[Analog](https://analogjs.org/), [Angular](https://angular.dev/) v22, and
[Tailwind CSS](https://tailwindcss.com/), prerendered to static HTML and
deployed on [Firebase Hosting](https://firebase.google.com/docs/hosting).

Inspired and based on [Nelson's blog](https://github.com/nelsongutidev).

## What the site is about

The site is about Lyra, not about Matt (his call, Nov 2026). It leads with the
apps, then the services, and names Matt only on the contact page. His name,
photo, email address and personal profiles stay off every other page, and no
other page speaks in the first person. `src/app/copy-guard.spec.ts` fails the
build if that slips.

**The apps** live in `apps` in `src/app/site.config.ts`. Each one has a status
badge, and only an app with a `url` gets a link out. Describe what an app does
today, from its own copy or design docs in the lyra repo, rather than features
it does not have yet. When rep-n or quest-n goes live, give it a `url` and a new
status.

**The services** are three offers for teams with a business-critical inventory
or construction build-out system:

1. **Inventory Data Health Check** (`/services#assessment`): a short assessment
   that ends in a written plan
2. **Retire One Legacy Inventory Tool** (`/services#migration`): old and new
   side by side until an agreed switch-off date
3. **Embedded for Integrators** (`/services#fractional`): senior .NET and
   Angular depth on an integrator's team

The site describes what Lyra does and leaves rates, prices, engagement lengths
and hours to a conversation (Matt's call, Nov 2026). Keep them off the pages.
Worth adding when you have them: named client work and testimonials. Invented
proof would be worse than none.

### Before this goes live

- **Point lyraapps.com at Firebase Hosting.** `site.url`, `SITE_URL` in
  `vite.config.ts` and the `Sitemap:` line in `public/robots.txt` already use
  `https://lyraapps.com`; the domain has to be connected to this Firebase site.
- **Social links.** The links in `social-links` (shown on the contact page)
  still point at existing personal accounts; drop any that are no longer used.

## Structure

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `src/app/pages/(home).page.ts` | The apps, then a summary of the services |
| `/services` | `src/app/pages/services.page.ts` | The three engagements in detail |
| `/contact` | `src/app/pages/contact.page.ts` | How to get in touch; the only page that names Matt |
| `/blog` | `src/app/pages/blog/index.page.ts` | Writing, as supporting authority |
| `*` | `src/app/pages/[...not-found].page.ts` | 404, marked `noindex`; also built as `404.html` |

Shared pieces live in `src/app/components/`: `header`, `footer`, `social-links`
(Matt's profiles, shown on the contact page only), and `cta` (the closing
call-to-action band reused across pages). The old `/about` page is gone;
`firebase.json` redirects it to the home page. The default share image is
`public/assets/og-card.png`.

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

`/404` is prerendered too, and `scripts/postbuild-404.mjs` (run automatically as
`postbuild`) moves it to `404.html` and drops it from the sitemap. Hosting has no
catch-all rewrite, so a path with no file gets that page with a real HTTP 404
status instead of the home page with a 200.

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

The page specs in `src/app/pages/pages.spec.ts` assert on the apps-first shape
and the presence of the contact route on purpose, and `copy-guard.spec.ts`
keeps rates, time commitments, Matt's name and first-person copy off the pages
other than contact. They are there to catch a well-meaning edit that quietly
turns the site back into a résumé.

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
