import { pageMeta, pageTitle } from './seo';
import { site } from './site.config';

describe('pageMeta', () => {
  const meta = pageMeta({
    title: 'Services',
    description: 'What Matt does.',
    path: '/services',
  });

  const contentOf = (key: 'name' | 'property', value: string) =>
    meta.find((tag) => (tag as Record<string, string>)[key] === value)?.content;

  it('should set the description on both the meta tag and the social cards', () => {
    expect(contentOf('name', 'description')).toBe('What Matt does.');
    expect(contentOf('property', 'og:description')).toBe('What Matt does.');
    expect(contentOf('name', 'twitter:description')).toBe('What Matt does.');
  });

  it('should build an absolute og:url from the route path', () => {
    expect(contentOf('property', 'og:url')).toBe(`${site.url}/services`);
  });

  it('should make the share image absolute, as unfurlers require', () => {
    expect(contentOf('property', 'og:image')).toBe(`${site.url}${site.ogImage}`);
    expect(contentOf('name', 'twitter:image')).toBe(`${site.url}${site.ogImage}`);
  });

  it('should leave an already-absolute image untouched', () => {
    const withRemote = pageMeta({
      title: 'T',
      description: 'D',
      path: '/',
      image: 'https://cdn.example.com/card.png',
    });
    const image = withRemote.find(
      (tag) => (tag as Record<string, string>)['property'] === 'og:image'
    );
    expect(image?.content).toBe('https://cdn.example.com/card.png');
  });

  it('should default to a website card and allow articles to opt out', () => {
    expect(contentOf('property', 'og:type')).toBe('website');

    const article = pageMeta({ title: 'T', description: 'D', path: '/about', type: 'article' });
    const type = article.find(
      (tag) => (tag as Record<string, string>)['property'] === 'og:type'
    );
    expect(type?.content).toBe('article');
  });

  it('should request a large summary card', () => {
    expect(contentOf('name', 'twitter:card')).toBe('summary_large_image');
  });
});

describe('pageTitle', () => {
  it('should suffix the site name so tabs and search results stay identifiable', () => {
    expect(pageTitle('Contact')).toBe(`Contact — ${site.name}`);
  });
});
