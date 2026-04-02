/// <reference types="vitest" />
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

export default defineConfig({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      ssr: false,
      prerender: {
        routes: [],
      },
      content: {
        highlighter: 'prism',
        prismOptions: {
          additionalLangs: ['typescript', 'javascript', 'json', 'html', 'css', 'bash'],
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
  },
});
