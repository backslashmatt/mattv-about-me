// Turns the prerendered not-found page into the static 404.html that Firebase
// Hosting serves, with a real 404 status, for any path that has no file.
//
// Analog prerenders '/404' (matched by the catch-all [...not-found] page) to
// 404/index.html and lists it in the sitemap. This moves it to 404.html, drops
// its canonical link (a not-found page has no canonical URL) and takes it out
// of the sitemap. Runs automatically after `npm run build`.
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const publicDir = join(import.meta.dirname, '..', 'dist', 'analog', 'public');
const prerendered = join(publicDir, '404', 'index.html');
const target = join(publicDir, '404.html');
const sitemap = join(publicDir, 'sitemap.xml');

if (!existsSync(prerendered)) {
  console.error(`postbuild-404: ${prerendered} not found; is '/404' still in the prerender routes?`);
  process.exit(1);
}

const html = readFileSync(prerendered, 'utf8').replace(/<link rel="canonical"[^>]*>/g, '');
writeFileSync(target, html);
rmSync(join(publicDir, '404'), { recursive: true });

if (existsSync(sitemap)) {
  // Remove only the entry for the site-root /404, wherever <loc> sits in it.
  const xml = readFileSync(sitemap, 'utf8')
    .replace(/\s*<url>(?:(?!<\/url>)[\s\S])*?<loc>https?:\/\/[^/<]+\/404<\/loc>[\s\S]*?<\/url>/g, '')
    // Analog writes the namespace with https://, but the sitemaps.org protocol
    // defines it as http://, and Search Console checks it.
    .replaceAll('xmlns="https://www.sitemaps.org/', 'xmlns="http://www.sitemaps.org/');
  if (/<loc>https?:\/\/[^/<]+\/404<\/loc>/.test(xml)) {
    console.error('postbuild-404: could not remove /404 from sitemap.xml; check its format');
    process.exit(1);
  }
  writeFileSync(sitemap, xml);
}

console.log('postbuild-404: wrote 404.html and removed /404 from the sitemap');

// The live deploy runs on a push to main (firebase-hosting-merge.yml). Refuse
// to build it while any `placeholders` value from site.config.ts is still in
// the pages, so bracketed blanks can't reach lyraapps.com. PR previews and local
// builds still pass, so the blanks stay visible there for review.
if (process.env.GITHUB_REF === 'refs/heads/main' || process.env.REQUIRE_FINAL_COPY === '1') {
  // Take the markers straight from site.config.ts so a renamed or new
  // placeholder is caught too. Only the part before any ':' is matched, which
  // covers markers like "[EXAMPLE RESULT: ...]".
  const config = readFileSync(join(process.cwd(), 'src/app/site.config.ts'), 'utf8');
  const block = config.slice(config.indexOf('export const placeholders'));
  const markers = [...block.slice(0, block.indexOf('};')).matchAll(/'(\[[^'\]:]+)[^']*\]'/g)].map((m) => m[1]);
  if (!markers.length) {
    console.error('postbuild-404: found no placeholders in src/app/site.config.ts; check this script');
    process.exit(1);
  }
  const found = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith('.html') || entry.name.endsWith('.js')) {
        const text = readFileSync(path, 'utf8');
        const hits = markers.filter((m) => text.includes(m));
        if (hits.length) found.push(`${path.slice(publicDir.length + 1)}: ${hits.map((m) => `${m}]`).join(', ')}`);
      }
    }
  };
  walk(publicDir);
  if (found.length) {
    console.error('postbuild-404: placeholders still in the build; fill `placeholders` in src/app/site.config.ts:');
    for (const line of found) console.error(`  ${line}`);
    process.exit(1);
  }
}
