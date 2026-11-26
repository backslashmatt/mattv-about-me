import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

/**
 * Keep in sync with `site.url` in `src/app/site.config.ts`.
 * Vite config cannot import from `src`, so the canonical origin is repeated
 * here for the sitemap only.
 */
const SITE_URL = 'https://lyraapps.com';

export default defineConfig({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      // SSR is needed to render each route at build time. Combined with
      // `static: true` this produces a fully static site: real HTML per route,
      // no server to deploy. Without it the site ships as an empty shell and
      // crawlers and link unfurlers see no content, title, or description.
      ssr: true,
      static: true,
      prerender: {
        routes: [
          '/',
          '/services',
          '/contact',
          '/blog',
          // Matches the catch-all not-found page. Its HTML becomes 404.html (see
          // the post-build step below), which Firebase Hosting serves with a real
          // 404 status for any path that has no file.
          '/404',
          {
            contentDir: 'src/content/blog',
            transform: (file) => {
              // Drafts are not prerendered or listed in the sitemap. They are
              // still bundled and routable in the browser (Analog routes every
              // file in src/content), so keep anything private out of it.
              if (!file.attributes['published']) return false;
              const slug = file.attributes['slug'] || file.name;
              return `/blog/${slug}`;
            },
          },
        ],
        sitemap: {
          host: SITE_URL,
        },
      },
      content: {
        highlighter: 'prism',
        prismOptions: {
          additionalLangs: ['typescript', 'javascript', 'json', 'html', 'css', 'bash'],
        },
      },
    }),
  ],
});
