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
});
