// HTML şablonları — support.html/privacy.html ile aynı tasarım dili (koyu tema).
import { SITE, LANGS, LANG_ORDER, DEFAULT_LANG } from './config.mjs';

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Bir sembolün belirli dildeki kanonik URL'i (domain dahil veya kök-göreli).
export function symbolUrl(lang, slug, { absolute = false } = {}) {
  const L = LANGS[lang];
  const prefix = L.pathPrefix ? `/${L.pathPrefix}` : '';
  const path = `${prefix}/${L.dreamSeg}/${slug}.html`;
  return absolute ? SITE.domain + path : path;
}

export function homeUrl(lang, { absolute = false } = {}) {
  const L = LANGS[lang];
  const path = L.pathPrefix ? `/${L.pathPrefix}/` : '/';
  return absolute ? SITE.domain + path : path;
}

const CSS = `
:root{--bg:#0f1020;--card:#1d2040;--accent:#8b7cf6;--accent-soft:#b3a9f9;--text:#e8e8f5;--muted:#a3a4c0;--border:#2c2f55}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:radial-gradient(1200px 600px at 50% -10%,#25264a 0%,var(--bg) 55%);color:var(--text);line-height:1.65;min-height:100vh;padding:0 20px 80px}
.wrap{max-width:760px;margin:0 auto}
header{text-align:center;padding:48px 0 28px}
.logo{width:64px;height:64px;border-radius:18px;background:linear-gradient(145deg,var(--accent) 0%,#5b4bc4 100%);display:inline-flex;align-items:center;justify-content:center;font-size:34px;box-shadow:0 12px 30px rgba(139,124,246,.35);text-decoration:none}
h1{font-size:27px;letter-spacing:-.5px;margin:18px 0 6px}
.tagline{color:var(--muted);font-size:15px}
.lang-switch{display:flex;gap:8px;justify-content:center;margin-top:20px;flex-wrap:wrap}
.lang-switch a{background:var(--card);color:var(--muted);border:1px solid var(--border);border-radius:999px;padding:6px 16px;font-size:14px;text-decoration:none;transition:.2s}
.lang-switch a.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:26px;margin-bottom:18px}
h2{font-size:19px;margin-bottom:12px;color:var(--accent-soft)}
p{margin-bottom:12px}
.scholar{color:var(--muted);font-size:14px;margin-top:6px}
.cta{display:block;text-align:center;background:var(--accent);color:#fff!important;padding:15px 26px;border-radius:14px;font-weight:600;text-decoration:none;box-shadow:0 8px 22px rgba(139,124,246,.3);font-size:16px}
.cta:hover{filter:brightness(1.08)}
.cta-note{color:var(--muted);font-size:14px;text-align:center;margin-top:12px}
.badges{display:flex;gap:12px;justify-content:center;margin-top:16px;flex-wrap:wrap}
.badges a{color:var(--accent-soft);font-size:14px;text-decoration:none;border:1px solid var(--border);border-radius:10px;padding:8px 14px}
.related{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.related a{background:rgba(139,124,246,.12);color:var(--accent-soft);border:1px solid var(--border);border-radius:999px;padding:7px 14px;font-size:14px;text-decoration:none}
.related a:hover{background:rgba(139,124,246,.22)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.grid a{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;text-decoration:none;color:var(--text);font-weight:500;transition:.2s}
.grid a:hover{border-color:var(--accent)}
.back{display:inline-block;margin-bottom:18px;color:var(--muted);font-size:14px;text-decoration:none}
footer{text-align:center;color:var(--muted);font-size:13px;margin-top:36px}
footer a{color:var(--muted)}
`;

function langSwitch(currentLang, urls) {
  return `<nav class="lang-switch">${LANG_ORDER.map((l) => {
    const label = { tr: 'Türkçe', en: 'English', ar: 'العربية' }[l];
    const cls = l === currentLang ? ' class="active"' : '';
    return `<a href="${urls[l]}"${cls}>${label}</a>`;
  }).join('')}</nav>`;
}

function headBlock({ lang, dir, title, desc, canonical, alternates, jsonLd, ogTitle }) {
  const hreflang = LANG_ORDER.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${alternates[l]}">`
  ).join('\n  ');
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${canonical}">
  ${hreflang}
  <link rel="alternate" hreflang="x-default" href="${alternates[DEFAULT_LANG]}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Onirist">
  <meta property="og:title" content="${esc(ogTitle || title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
  <style>${CSS}</style>
</head>`;
}

function ctaBlock(L) {
  // Platforma göre mağaza seçen akıllı CTA (universal link .well-known canlı olunca yükseltilir).
  return `<a class="cta" id="appCta" href="${SITE.play}" rel="nofollow">${esc(L.ctaPrimary)}</a>
    <p class="cta-note">${esc(L.ctaNote)}</p>
    <div class="badges">
      <a href="${SITE.appStore}" rel="nofollow">App Store</a>
      <a href="${SITE.play}" rel="nofollow">Google Play</a>
    </div>
    <script>
      (function(){var c=document.getElementById('appCta');if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){c.href=${JSON.stringify(SITE.appStore)};}})();
    </script>`;
}

function footerBlock() {
  return `<footer>© 2026 Onirist · <a href="mailto:${SITE.contactEmail}">${SITE.contactEmail}</a> · <a href="/privacy.html">Privacy</a> · <a href="/support.html">Support</a></footer>`;
}

export function renderSymbolPage({ lang, symbol, related, alternates }) {
  const L = LANGS[lang];
  const name = symbol[L.symbolField] || symbol.symbol;
  const desc = symbol[L.descField] || symbol.desc_tr;
  const title = L.title(name);
  const metaDesc = L.metaDesc(name, desc);
  const canonical = symbolUrl(lang, symbol.slug, { absolute: true });
  const langUrls = {};
  for (const l of LANG_ORDER) langUrls[l] = symbolUrl(l, symbol.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: L.faqQ(name),
        acceptedAnswer: { '@type': 'Answer', text: desc },
      },
    ],
  };

  const relatedLinks = related
    .map((r) => `<a href="${symbolUrl(lang, r.slug)}">${esc(r[L.symbolField] || r.symbol)}</a>`)
    .join('');

  return `${headBlock({
    lang,
    dir: L.dir,
    title,
    desc: metaDesc,
    canonical,
    alternates,
    jsonLd,
  })}
<body>
  <div class="wrap">
    <header>
      <a class="logo" href="${homeUrl(lang)}">${SITE.emoji}</a>
      <h1>${esc(L.h1(name))}</h1>
      <div class="tagline">${esc(L.siteTagline)}</div>
      ${langSwitch(lang, langUrls)}
    </header>

    <a class="back" href="${homeUrl(lang)}">← ${esc(L.backHome)}</a>

    <div class="card">
      <p>${esc(desc)}</p>
      ${symbol.scholar ? `<p class="scholar">${esc(L.scholarLabel)}: ${esc(symbol.scholar)}</p>` : ''}
    </div>

    <div class="card">
      ${ctaBlock(L)}
    </div>

    <div class="card">
      <h2>${esc(L.relatedTitle)}</h2>
      <div class="related">${relatedLinks}</div>
    </div>

    ${footerBlock()}
  </div>
</body>
</html>`;
}

export function renderIndexPage({ lang, symbols, alternates }) {
  const L = LANGS[lang];
  const canonical = homeUrl(lang, { absolute: true });
  const langUrls = {};
  for (const l of LANG_ORDER) langUrls[l] = homeUrl(l);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Onirist',
    url: canonical,
    description: L.indexIntro,
  };

  const items = symbols
    .map((s) => `<a href="${symbolUrl(lang, s.slug)}">${esc(s[L.symbolField] || s.symbol)}</a>`)
    .join('');

  return `${headBlock({
    lang,
    dir: L.dir,
    title: L.indexTitle,
    desc: L.indexIntro,
    canonical,
    alternates,
    jsonLd,
    ogTitle: L.indexTitle,
  })}
<body>
  <div class="wrap">
    <header>
      <a class="logo" href="${homeUrl(lang)}">${SITE.emoji}</a>
      <h1>Onirist</h1>
      <div class="tagline">${esc(L.siteTagline)}</div>
      ${langSwitch(lang, langUrls)}
    </header>

    <div class="card">
      <p>${esc(L.indexIntro)}</p>
      ${ctaBlock(L)}
    </div>

    <div class="card">
      <h2>${esc(L.dirLabel)}</h2>
      <div class="grid">${items}</div>
    </div>

    ${footerBlock()}
  </div>
</body>
</html>`;
}
