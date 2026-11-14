/**
 * Single source of truth for site-wide identity and SEO values.
 *
 * `url` is the canonical origin used for the sitemap, canonical links, and Open
 * Graph tags. It must match `SITE_URL` in `vite.config.ts` and the `Sitemap:`
 * line in `public/robots.txt`.
 */
export const site = {
  url: 'https://lyraapps.com',
  /** The brand visitors see: tab titles, og:site_name, header and footer. */
  name: 'Lyra',
  legalName: 'Lyra Software Applications LLC',
  founder: 'Matt Verry',
  role: 'Inventory and construction build-out systems',
  /** Used as the default social share image. Must be an absolute path. */
  ogImage: '/assets/MattV.jpg',
  email: 'matthew.verry@lyraapps.com',
  // TODO(matt): drop this (and the Twitter link in social-links) if you no
  // longer post there; it is sent as twitter:site on every page.
  twitterHandle: '@mattv_dev',
} as const;

/** The one-line pitch, reused in meta tags and the footer. */
export const tagline =
  'I fix and replace the inventory and construction build-out systems large operations depend on.';

/**
 * TODO(matt): facts only you can give. Each value below renders on the site
 * exactly as written, so the bracketed text stays visible in previews until it
 * is replaced. Search the repo for `placeholders.` to see every use.
 */
export const placeholders = {
  /** Years designing and building these systems, e.g. "15". */
  years: '[YEARS]',
  /** One result you can name, with the client anonymised if needed. */
  exampleResult:
    '[EXAMPLE RESULT: one system replaced, hours saved or sites rolled out]',
  /** Length of the "Retire one legacy inventory tool" engagement. */
  retireWeeks: '[WEEKS]',
  assessmentPrice: '[ASSESSMENT PRICE]',
  retirePrice: '[RETIREMENT PRICE]',
  embeddedRate: '[DAY RATE OR MONTHLY RETAINER]',
  /** Hours a week available to an integrator's team. */
  embeddedHours: '[HOURS]',
} as const;

export const absoluteUrl = (path: string): string =>
  `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
