import { DOCUMENT, Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
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
    // Only when a navigation has already finished. Before the first one the
    // router reports '/' with nothing matched, which would briefly mark a 404
    // page as the home page and strip its noindex.
    if (this.#router.routerState.snapshot.root.firstChild) {
      this.#update(this.#router.url);
    }
    this.#router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.#update(event.urlAfterRedirects));
  }

  #update(url: string): void {
    const head = this.#document.head;
    if (!head) return;

    // A not-found page has no canonical URL; pointing one at the bad path would
    // undo the static 404.html, which ships without one.
    if (this.#isNotFound()) {
      head.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
      return;
    }

    // Route meta only replaces the tags the next route declares, so the 404
    // page's noindex would otherwise linger after navigating away from it in
    // the app. No other page declares robots, so it is safe to drop here.
    head.querySelectorAll('meta[name="robots"][content="noindex"]').forEach((el) => el.remove());

    // Strip query and fragment: they never belong in a canonical URL.
    const path = url.split(/[?#]/)[0];
    const href = absoluteUrl(path === '/' ? '' : path);

    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', href);

    // Keep og:url on the same URL. Pages using pageMeta() already set it, but
    // markdown routes (blog posts) would otherwise keep the home page default.
    this.#document
      .querySelector<HTMLMetaElement>('meta[property="og:url"]')
      ?.setAttribute('content', href);
  }

  /**
   * True when any matched route is the catch-all. Analog builds
   * `{ path: '**', loadChildren }` and puts the `[...not-found]` page in a
   * child with `path: ''`, so the leaf alone never shows `**`.
   */
  #isNotFound(): boolean {
    for (
      let route: ActivatedRouteSnapshot | null = this.#router.routerState.snapshot.root;
      route;
      route = route.firstChild
    ) {
      if (route.routeConfig?.path === '**') return true;
    }
    return false;
  }
}
