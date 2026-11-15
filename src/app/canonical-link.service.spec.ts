import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { Component } from '@angular/core';

import { CanonicalLinkService } from './canonical-link.service';
import { site } from './site.config';

@Component({ template: '' })
class BlankComponent {}

describe('CanonicalLinkService', () => {
  let service: CanonicalLinkService;
  let router: Router;
  let document: Document;

  const canonical = () =>
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.getAttribute('href');

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: BlankComponent },
          { path: 'services', component: BlankComponent },
          { path: 'old', redirectTo: 'services' },
          // Analog's shape for the [...not-found] page: the page sits in a
          // child with path '' under the '**' route.
          { path: '**', children: [{ path: '', component: BlankComponent }] },
        ]),
      ],
    });

    service = TestBed.inject(CanonicalLinkService);
    router = TestBed.inject(Router);
    document = TestBed.inject(DOCUMENT);
    document.head.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
  });

  it('should add a canonical link for the current route', async () => {
    service.init();
    await router.navigateByUrl('/services');

    expect(canonical()).toBe(`${site.url}/services`);
  });

  it('should reuse the single canonical element across navigations', async () => {
    service.init();
    await router.navigateByUrl('/services');
    await router.navigateByUrl('/');

    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(canonical()).toBe(`${site.url}/`);
  });

  it('should strip query strings and fragments', async () => {
    service.init();
    await router.navigateByUrl('/services?utm_source=newsletter#assessment');

    expect(canonical()).toBe(`${site.url}/services`);
  });

  it('should drop the canonical link on the not-found route', async () => {
    service.init();
    await router.navigateByUrl('/services');
    await router.navigateByUrl('/no/such/page');

    expect(canonical()).toBeUndefined();
  });

  it('should remove a leftover noindex once a real page loads', async () => {
    const robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex');
    document.head.appendChild(robots);

    service.init();
    await router.navigateByUrl('/no/such/page');
    expect(document.head.querySelector('meta[name="robots"]')).not.toBeNull();

    await router.navigateByUrl('/services');
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('should keep og:url on the canonical URL', async () => {
    const ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', `${site.url}/`);
    document.head.appendChild(ogUrl);

    service.init();
    await router.navigateByUrl('/services');

    expect(ogUrl.getAttribute('content')).toBe(`${site.url}/services`);
    ogUrl.remove();
  });

  it('should follow redirects to the destination URL', async () => {
    service.init();
    await router.navigateByUrl('/old');

    expect(canonical()).toBe(`${site.url}/services`);
  });
});
