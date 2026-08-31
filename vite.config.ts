import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

/**
 * TODO(matt): keep in sync with `site.url` in `src/app/site.config.ts`.
 * Vite config cannot import from `src`, so the canonical origin is repeated
 * here for the sitemap only.
 */
const SITE_URL = 'https://matt-v.web.app';

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
          '/about',
          '/contact',
          '/blog',
          {
            contentDir: 'src/content/blog',
            transform: (file) => {
              // Drafts stay out of the static build and the sitemap.
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
