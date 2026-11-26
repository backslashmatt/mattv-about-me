import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Rates, prices, engagement lengths and hours are talked through on a call,
// not published (Matt's call, Nov 2026). This fails if one creeps back into
// the page or component copy.
const banned =
  /\$\d|\b\d+[- ](minute|hour|week|month|year)s?\b|\b(one|two|three|four|six|eight|twelve)[- ](minute|hour|week|month|year)s?\b|fixed[- ](fee|price|quote)|retainer|day rate|hourly rate|month[- ]to[- ]month|hours a week/i;

const sources = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sources(path);
    return entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts') ? [path] : [];
  });

// The site is about Lyra's apps and services, not about Matt (his call, Nov
// 2026). His name, email address and personal profiles appear on the contact
// page only, and no other page speaks in the first person.
const personal = /\bMatt\b|Verry|mattv|matthew\.verry|backslashmatt/i;
const firstPerson = /\b(I|I'm|I've|I'll|I'd|me|my|mine|myself)\b/;
// Contact names him; social-links only renders on contact; site.config holds
// the email address the contact page shows.
const contactOnly = [
  'pages/contact.page.ts',
  'components/social-links/social-links.component.ts',
  'site.config.ts',
];
const speaksAsMatt = ['pages/contact.page.ts'];

const lines = (root: string) =>
  sources(root).flatMap((file) =>
    readFileSync(file, 'utf8')
      .split('\n')
      .map((line, i) => ({ rel: file.slice(root.length + 1).replace(/\\/g, '/'), line, i }))
  );

describe('site copy', () => {
  it('should not publish rates, prices or time commitments', () => {
    const root = join(process.cwd(), 'src/app');
    const hits = sources(root).flatMap((file) =>
      readFileSync(file, 'utf8')
        .split('\n')
        .map((line, i) => ({ line, i }))
        .filter(({ line }) => banned.test(line))
        .map(({ line, i }) => `${file.slice(root.length + 1)}:${i + 1}: ${line.trim()}`)
    );
    expect(hits).toEqual([]);
  });

  it('should name Matt only on the contact page', () => {
    const root = join(process.cwd(), 'src/app');
    const hits = lines(root)
      .filter(({ rel }) => !contactOnly.includes(rel))
      .filter(({ line }) => personal.test(line))
      .map(({ rel, line, i }) => `${rel}:${i + 1}: ${line.trim()}`);
    expect(hits).toEqual([]);
  });

  it('should not speak in the first person outside the contact page', () => {
    const root = join(process.cwd(), 'src/app');
    const hits = lines(root)
      .filter(({ rel }) => !speaksAsMatt.includes(rel))
      // Comments explain the code to whoever maintains it; they are not copy.
      .filter(({ line }) => !/^\s*(\/\/|\*|\/\*)/.test(line))
      .filter(({ line }) => firstPerson.test(line))
      .map(({ rel, line, i }) => `${rel}:${i + 1}: ${line.trim()}`);
    expect(hits).toEqual([]);
  });

  it('should keep Matt\'s name out of the blog posts too', () => {
    const root = join(process.cwd(), 'src/content');
    const posts = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return posts(path);
        return entry.name.endsWith('.md') ? [path] : [];
      });
    const hits = posts(root).flatMap((file) =>
      readFileSync(file, 'utf8')
        .split('\n')
        .map((line, i) => ({ line, i }))
        .filter(({ line }) => personal.test(line))
        .map(({ line, i }) => `${file.slice(root.length + 1)}:${i + 1}: ${line.trim()}`)
    );
    expect(hits).toEqual([]);
  });
});
