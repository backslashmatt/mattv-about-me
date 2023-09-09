import { ScullyConfig, setPluginConfig } from "@scullyio/scully";

import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-bash';

import "@scullyio/scully-plugin-puppeteer";
setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "about-me",
  distFolder: "./dist/about-me", // output directory of your Angular build artifacts
  outDir: "./dist/static", // directory for scully build artifacts
  defaultPostRenderers: [],
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog',
      },
    },
  },
};
