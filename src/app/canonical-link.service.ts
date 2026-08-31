import { DOCUMENT, Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { absoluteUrl } from './site.config';

/**
 * Keeps a single `<link rel="canonical">` in the document head pointed at the
 * current route. Route metadata can carry meta tags but not link tags, so this
 * fills the gap — during prerendering it runs once per route, baking the right
 * canonical into each static HTML file.
 */
@Injectable({ providedIn: 'root' })
export class CanonicalLinkService {
  readonly #document = inject(DOCUMENT);
  readonly #router = inject(Router);

  init(): void {
    this.#update(this.#router.url);
    this.#router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.#update(event.urlAfterRedirects));
  }

  #update(url: string): void {
    const head = this.#document.head;
    if (!head) return;

    // Strip query and fragment: they never belong in a canonical URL.
    const path = url.split(/[?#]/)[0];

    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', absoluteUrl(path === '/' ? '' : path));
  }
}
