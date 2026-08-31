import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withPrismHighlighter } from '@analogjs/content/prism-highlighter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    // The site is prerendered, so every route arrives as real HTML. Hydration
    // reuses that markup instead of throwing it away and re-rendering.
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideContent(withMarkdownRenderer(), withPrismHighlighter()),
  ],
};
