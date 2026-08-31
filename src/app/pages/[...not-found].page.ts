import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { pageTitle } from '../seo';

export const routeMeta: RouteMeta = {
  title: pageTitle('Page not found'),
  meta: [
    { name: 'description', content: 'This page does not exist.' },
    // Keep dead URLs out of the index rather than letting them rank.
    { name: 'robots', content: 'noindex' },
  ],
};

@Component({
  imports: [RouterLink],
  template: `
    <div class="max-w-2xl mx-auto px-6 py-28 md:py-36 text-center">
      <p class="text-accent-700 font-bold tracking-wide uppercase text-sm mb-4">404</p>
      <h1 class="text-4xl md:text-5xl font-bold text-ink-900 tracking-tight mb-5">
        That page isn't here
      </h1>
      <p class="text-lg text-ink-600 leading-relaxed mb-9">
        The link may be out of date, or the page may have moved. These are the ones
        worth your time anyway.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a routerLink="/"
           class="px-6 py-3 bg-ink-900 text-white rounded-lg font-medium hover:bg-accent-700 transition-colors">
          Back to the homepage
        </a>
        <a routerLink="/services"
           class="px-6 py-3 bg-white text-ink-700 rounded-lg font-medium hover:bg-ink-50 transition-colors border border-ink-200">
          See what I do
        </a>
      </div>
    </div>
  `,
})
export default class NotFoundPageComponent {}
