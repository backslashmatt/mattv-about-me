import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { provideFileRouter } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withPrismHighlighter } from '@analogjs/content/prism-highlighter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Anchor scrolling makes in-site links such as /services#migration land on
    // their section; scroll restoration starts each new page at the top.
    provideFileRouter(
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // Without this a second click on /#apps is a same-URL navigation the
      // router ignores, so the page would not scroll back to the apps.
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    // The site is prerendered, so every route arrives as real HTML. Hydration
    // reuses that markup instead of throwing it away and re-rendering.
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideContent(withMarkdownRenderer(), withPrismHighlighter()),
  ],
};
