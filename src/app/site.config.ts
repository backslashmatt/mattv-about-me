/**
 * Single source of truth for site-wide identity and SEO values.
 *
 * `url` is the canonical origin used for the sitemap, canonical links, and Open
 * Graph tags. It must match `SITE_URL` in `vite.config.ts` and the `Sitemap:`
 * line in `public/robots.txt`.
 *
 * The site is about Lyra's apps and services. Its owner is named only on the
 * contact page (his call, Nov 2026), so his name, photo, email address and
 * personal profiles stay off every other page; his details live in
 * `contact-details.ts`. `copy-guard.spec.ts` enforces this.
 */
export const site = {
  url: 'https://lyraapps.com',
  /** The brand visitors see: tab titles, og:site_name, header and footer. */
  name: 'Lyra',
  legalName: 'Lyra Software Applications LLC',
  /** Used as the default social share image. Must be an absolute path. */
  ogImage: '/assets/og-card.png',
} as const;

/** The one-line pitch, reused in meta tags and the footer. */
export const tagline =
  'Lyra makes pitch-n, rep-n and quest-n, and builds and replaces business-critical .NET and Angular systems for other companies.';

export interface LyraApp {
  id: string;
  name: string;
  /** Where the app stands today, shown as a badge. */
  status: string;
  /** Set only once the app is live for anyone to use. */
  url?: string;
  /** Shown in place of the link while there is no `url`. */
  availability?: string;
  summary: string;
  body: string;
  points: string[];
}

/**
 * Lyra's public apps. Every line here comes from the app's own copy or design
 * docs in the lyra repo; keep it that way rather than describing features an
 * app does not have yet.
 */
export const apps: LyraApp[] = [
  {
    id: 'pitch-n',
    name: 'pitch-n',
    status: 'Live',
    url: 'https://pitch-n.net',
    summary: 'Turns "we should do something" into an actual plan.',
    body: 'Friends or family pitch ideas (where, when, what), vote them up, and the host locks in the winner.',
    points: [
      'Pitch places, dates and activities, with costs attached',
      'Vote for every pitch you like and talk it through in comments',
      'A final call, then one plan the whole group can see',
    ],
  },
  {
    id: 'rep-n',
    name: 'rep-n',
    status: 'Coming soon',
    availability: 'Coming to rep-n.com.',
    summary: "A private workout logger that keeps working in the gym's dead zones.",
    body: 'Log strength and cardio set by set on your phone, and see what you did last time while you train.',
    points: [
      'Personal records spotted automatically',
      'Templates for the workouts you repeat',
      'Keeps logging without signal and syncs when it is back',
    ],
  },
  {
    id: 'quest-n',
    name: 'quest-n',
    status: 'In design',
    availability: 'Not available yet.',
    summary: "One game that Lyra's goal apps feed, starting with rep-n.",
    body: 'What you log elsewhere levels up a single hero, with weekly quests and bosses that only a consistent month can beat.',
    points: [
      'Rewards consistency and never punishes a missed week',
      'Measured against your own baseline, not anyone else',
      'Rewards are cosmetic: titles, badges and trophies',
    ],
  },
];

export const absoluteUrl = (path: string): string =>
  `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
