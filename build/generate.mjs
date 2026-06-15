// Ana üretici: sembolleri oku, tüm dillerde sayfaları + index + sitemap + robots üret.
// Çıktı repo köküne yazılır; GitHub Pages doğrudan servis eder.
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { LANGS, LANG_ORDER } from './config.mjs';
import { loadSymbols, relatedFor } from './symbols.mjs';
import { renderSymbolPage, renderIndexPage, symbolUrl, homeUrl } from './templates.mjs';
import { buildSitemap, buildRobots } from './seo.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Üretilen dizinler — clean build için silinip yeniden oluşturulur.
const GEN_DIRS = ['ruya', 'en', 'ar'];

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
}

function absAlternates(kind, slug) {
  const out = {};
  for (const l of LANG_ORDER) {
    out[l] = kind === 'index'
      ? homeUrl(l, { absolute: true })
      : symbolUrl(l, slug, { absolute: true });
  }
  return out;
}

function main() {
  const symbols = loadSymbols();
  let pages = 0;

  // Temizle (privacy.html, support.html, CNAME, .well-known, data, build, docs korunur).
  for (const d of GEN_DIRS) {
    const p = join(ROOT, d);
    if (existsSync(p)) rmSync(p, { recursive: true, force: true });
  }

  // Sembol sayfaları (her dil).
  symbols.forEach((symbol, idx) => {
    const related = relatedFor(symbols, idx, 6);
    for (const lang of LANG_ORDER) {
      const html = renderSymbolPage({
        lang,
        symbol,
        related,
        alternates: absAlternates('symbol', symbol.slug),
      });
      // symbolUrl kök-göreli yol döndürür; başındaki '/' atılır.
      const rel = symbolUrl(lang, symbol.slug).replace(/^\//, '');
      write(rel, html);
      pages++;
    }
  });

  // Index sayfaları.
  for (const lang of LANG_ORDER) {
    const html = renderIndexPage({
      lang,
      symbols,
      alternates: absAlternates('index'),
    });
    const L = LANGS[lang];
    const rel = L.pathPrefix ? `${L.pathPrefix}/index.html` : 'index.html';
    write(rel, html);
    pages++;
  }

  // sitemap + robots.
  write('sitemap.xml', buildSitemap(symbols));
  write('robots.txt', buildRobots());

  console.log(`✓ ${symbols.length} sembol × ${LANG_ORDER.length} dil = ${pages} sayfa üretildi.`);
  console.log(`✓ sitemap.xml (${symbols.length * LANG_ORDER.length + LANG_ORDER.length} URL) + robots.txt`);
}

main();
