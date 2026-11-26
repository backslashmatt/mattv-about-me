import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { Type } from '@angular/core';

import HomePageComponent, { routeMeta as homeMeta } from './(home).page';
import ServicesPageComponent, { routeMeta as servicesMeta } from './services.page';
import ContactPageComponent, { routeMeta as contactMeta } from './contact.page';
import NotFoundPageComponent, { routeMeta as notFoundMeta } from './[...not-found].page';
import { apps } from '../site.config';

/**
 * The site leads with Lyra's apps, then its services, and names Matt only on
 * the contact page. These specs protect that shape, the route metadata that
 * decides how a shared link looks, and the route to /contact.
 */
const render = <T>(component: Type<T>) => {
  TestBed.configureTestingModule({
    imports: [component],
    providers: [provideRouter([])],
  });
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
};

const descriptionOf = (meta: typeof homeMeta) =>
  (('meta' in meta ? meta.meta : undefined) as { name?: string; content?: string }[])?.find(
    (tag) => tag.name === 'description'
  )?.content ?? '';

afterEach(() => TestBed.resetTestingModule());

describe('Home page', () => {
  it('should lead with the apps rather than a person', () => {
    const heading = render(HomePageComponent).querySelector('h1')?.textContent ?? '';
    expect(heading).toContain('Apps for making plans');
  });

  it('should give every app its own card and anchor', () => {
    const html = render(HomePageComponent);
    for (const app of apps) {
      expect(html.querySelector(`#${app.id} h3`)?.textContent).toContain(app.name);
    }
  });

  it('should link out only to apps that are live', () => {
    const html = render(HomePageComponent);
    for (const app of apps) {
      const link = html.querySelector(`#${app.id} a[href^="https://"]`);
      if (app.url) {
        expect(link?.getAttribute('href')).toBe(app.url);
      } else {
        expect(link).toBeNull();
      }
    }
  });

  it('should name the three services and link each to its section', () => {
    const html = render(HomePageComponent);
    const text = html.textContent ?? '';
    expect(text).toContain('Inventory Data Health Check');
    expect(text).toContain('Retire One Legacy Inventory Tool');
    expect(text).toContain('Embedded for Integrators');
    for (const id of ['assessment', 'migration', 'fractional']) {
      expect(html.querySelector(`a[href="/services#${id}"]`)).not.toBeNull();
    }
  });

  it('should route the visitor to contact', () => {
    expect(render(HomePageComponent).querySelector('a[href="/contact"]')).not.toBeNull();
  });

  it('should name the apps in its meta description', () => {
    const description = descriptionOf(homeMeta);
    for (const app of apps) {
      expect(description).toContain(app.name);
    }
  });
});

describe('Services page', () => {
  it('should give each engagement a linkable anchor', () => {
    const html = render(ServicesPageComponent);
    for (const id of ['assessment', 'migration', 'fractional']) {
      expect(html.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it('should state what Lyra does not take on, so the page qualifies as well as sells', () => {
    expect(render(ServicesPageComponent).textContent).toContain(
      'When Lyra is not the right call'
    );
  });

  it('should point its closing action at the retirement offer', () => {
    expect(
      render(ServicesPageComponent).querySelector('app-cta a[href="/services#migration"]')
    ).not.toBeNull();
  });

  it('should carry its own meta description', () => {
    expect(descriptionOf(servicesMeta)).toContain('health check');
  });
});

describe('Contact page', () => {
  it('should expose a prefilled mailto as the single conversion action', () => {
    const href = render(ContactPageComponent)
      .querySelector('a[href^="mailto:"]')
      ?.getAttribute('href');

    expect(href).toContain('mailto:');
    expect(href).toContain('subject=Lyra%20enquiry');
  });

  it('should say who reads the email', () => {
    expect(render(ContactPageComponent).querySelector('h1 + p')?.textContent).toContain(
      'Matt Verry'
    );
  });

  it('should set out what happens after the email', () => {
    expect(render(ContactPageComponent).textContent).toContain('What happens next');
  });

  it('should carry its own meta description', () => {
    expect(descriptionOf(contactMeta)).toContain('pitch-n');
  });
});

describe('Not found page', () => {
  it('should route a lost visitor back into the site', () => {
    const html = render(NotFoundPageComponent);
    expect(html.querySelector('a[href="/"]')).not.toBeNull();
    expect(html.querySelector('a[href="/#apps"]')).not.toBeNull();
  });

  it('should ask crawlers not to index it', () => {
    const meta = ('meta' in notFoundMeta ? notFoundMeta.meta : []) as {
      name?: string;
      content?: string;
    }[];
    expect(meta.find((tag) => tag.name === 'robots')?.content).toBe('noindex');
  });
});
