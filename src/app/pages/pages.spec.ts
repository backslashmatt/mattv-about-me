import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { Type } from '@angular/core';

import HomePageComponent, { routeMeta as homeMeta } from './(home).page';
import ServicesPageComponent, { routeMeta as servicesMeta } from './services.page';
import AboutPageComponent, { routeMeta as aboutMeta } from './about.page';
import ContactPageComponent, { routeMeta as contactMeta } from './contact.page';
import NotFoundPageComponent, { routeMeta as notFoundMeta } from './[...not-found].page';

/**
 * These pages exist to convert a visitor, so the things worth protecting are the
 * ones that do the converting: the positioning, the route metadata that decides
 * how a shared link looks, and the presence of a route to /contact.
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
  it('should lead with the domain rather than a job title', () => {
    const heading = render(HomePageComponent).querySelector('h1')?.textContent ?? '';
    expect(heading).toContain('Inventory and build-out software');
  });

  it('should route the visitor to contact', () => {
    expect(render(HomePageComponent).querySelector('a[href="/contact"]')).not.toBeNull();
  });

  it('should name the three offers', () => {
    const text = render(HomePageComponent).textContent ?? '';
    expect(text).toContain('Inventory Data Health Check');
    expect(text).toContain('Retire One Legacy Inventory Tool');
    expect(text).toContain('Embedded for Integrators');
  });

  it('should link each offer to its section on the services page', () => {
    const html = render(HomePageComponent);
    for (const id of ['assessment', 'migration', 'fractional']) {
      expect(html.querySelector(`a[href="/services#${id}"]`)).not.toBeNull();
    }
  });

  it('should describe the offer in its meta description', () => {
    expect(descriptionOf(homeMeta)).toContain('inventory and construction build-out');
  });
});

describe('Services page', () => {
  it('should give each engagement a linkable anchor', () => {
    const html = render(ServicesPageComponent);
    for (const id of ['assessment', 'migration', 'fractional']) {
      expect(html.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it('should state what Matt does not take on, so the page qualifies as well as sells', () => {
    expect(render(ServicesPageComponent).textContent).toContain(
      'What I am not the right call for'
    );
  });

  it('should carry its own meta description', () => {
    expect(descriptionOf(servicesMeta)).toContain('health check');
  });
});

describe('About page', () => {
  it('should position Matt as independent rather than a job seeker', () => {
    expect(render(AboutPageComponent).textContent).toContain('Independent senior developer');
  });

  it('should close with a call to action', () => {
    expect(render(AboutPageComponent).querySelector('app-cta')).not.toBeNull();
  });

  it('should describe the consultancy in its meta description', () => {
    expect(descriptionOf(aboutMeta)).toContain('Lyra is his practice');
  });
});

describe('Contact page', () => {
  it('should expose a prefilled mailto as the single conversion action', () => {
    const href = render(ContactPageComponent)
      .querySelector('a[href^="mailto:"]')
      ?.getAttribute('href');

    expect(href).toContain('mailto:');
    expect(href).toContain('subject=Inventory%20system%20enquiry');
  });

  it('should set out what happens after the email', () => {
    expect(render(ContactPageComponent).textContent).toContain('What happens next');
  });

  it('should carry its own meta description', () => {
    expect(descriptionOf(contactMeta)).toContain('20-minute call');
  });
});

describe('Not found page', () => {
  it('should route a lost visitor back into the site', () => {
    const html = render(NotFoundPageComponent);
    expect(html.querySelector('a[href="/"]')).not.toBeNull();
    expect(html.querySelector('a[href="/services"]')).not.toBeNull();
  });

  it('should ask crawlers not to index it', () => {
    const meta = ('meta' in notFoundMeta ? notFoundMeta.meta : []) as {
      name?: string;
      content?: string;
    }[];
    expect(meta.find((tag) => tag.name === 'robots')?.content).toBe('noindex');
  });
});
