// sitemap.xml ve robots.txt üretimi.
import { SITE, LANG_ORDER } from './config.mjs';
import { symbolUrl, homeUrl } from './templates.mjs';

export function buildSitemap(symbols) {
  const urls = [];
  for (const lang of LANG_ORDER) {
    urls.push(homeUrl(lang, { absolute: true }));
    for (const s of symbols) urls.push(symbolUrl(lang, s.slug, { absolute: true }));
  }
  const body = urls
    .map((u) => `  <url><loc>${u}</loc><changefreq>monthly</changefreq></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`;
}
