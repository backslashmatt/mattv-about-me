import type { MetaTag } from '@analogjs/router';
import { absoluteUrl, site } from './site.config';

export interface PageSeo {
  /** Page title, without the site-name suffix. */
  title: string;
  description: string;
  /** Route path, e.g. `/services`. Used for the canonical and og:url. */
  path: string;
  /** Absolute or root-relative image path. Defaults to the site OG image. */
  image?: string;
  type?: 'website' | 'article';
}

/**
 * Builds the full meta tag set for a page: description, Open Graph, and Twitter
 * card. Analog applies these on navigation via `routeMeta.meta`, and bakes them
 * into the prerendered HTML at build time so crawlers and link unfurlers see
 * them without running JavaScript.
 *
 * The canonical `<link>` is not a meta tag, so it is handled separately by
 * `CanonicalLinkService`.
 */
export function pageMeta({
  title,
  description,
  path,
  image = site.ogImage,
  type = 'website',
}: PageSeo): MetaTag[] {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  return [
    { name: 'description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: site.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: imageUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: site.twitterHandle },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
  ];
}

/** Page titles read `<page> — Matt Verry` in the browser tab and SERPs. */
export const pageTitle = (title: string): string => `${title} — ${site.name}`;
