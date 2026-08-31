/**
 * Single source of truth for site-wide identity and SEO values.
 *
 * TODO(matt): `url` is the canonical origin used for the sitemap, canonical
 * links, and Open Graph tags. It currently points at the default Firebase
 * Hosting domain for the `matt-v` project. Change it here (and nowhere else)
 * once a custom domain is attached.
 */
export const site = {
  url: 'https://matt-v.web.app',
  name: 'Matt Verry',
  role: 'Legacy .NET & Angular Modernization',
  /** Used as the default social share image. Must be an absolute path. */
  ogImage: '/assets/MattV.jpg',
  email: 'matthew.verry@lyraapps.com',
  twitterHandle: '@mattv_dev',
} as const;

/** The one-line pitch, reused in meta tags and the footer. */
export const tagline =
  'I modernize the legacy .NET and Angular applications businesses still run on — without pausing the roadmap or breaking what already works.';

export const absoluteUrl = (path: string): string =>
  `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
