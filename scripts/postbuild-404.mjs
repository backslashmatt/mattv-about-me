// Turns the prerendered not-found page into the static 404.html that Firebase
// Hosting serves, with a real 404 status, for any path that has no file.
//
// Analog prerenders '/404' (matched by the catch-all [...not-found] page) to
// 404/index.html and lists it in the sitemap. This moves it to 404.html, drops
// its canonical link (a not-found page has no canonical URL) and takes it out
// of the sitemap. Runs automatically after `npm run build`.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
  const xml = readFileSync(sitemap, 'utf8').replace(
    /\s*<url>(?:(?!<\/url>)[\s\S])*?<loc>https?:\/\/[^/<]+\/404<\/loc>[\s\S]*?<\/url>/g,
    ''
  );
  if (/<loc>https?:\/\/[^/<]+\/404<\/loc>/.test(xml)) {
    console.error('postbuild-404: could not remove /404 from sitemap.xml; check its format');
    process.exit(1);
  }
  writeFileSync(sitemap, xml);
}

console.log('postbuild-404: wrote 404.html and removed /404 from the sitemap');
