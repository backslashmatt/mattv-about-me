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

  it('should follow redirects to the destination URL', async () => {
    service.init();
    await router.navigateByUrl('/old');

    expect(canonical()).toBe(`${site.url}/services`);
  });
});
