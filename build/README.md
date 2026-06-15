# İçerik SEO Üretici

Rüya sembollerinden statik, çok dilli (TR/EN/AR) SEO sayfaları üretir.
Tasarım: `docs/specs/2026-06-16-content-seo-engine-design.md`.

## Çalıştırma

```bash
npm run build      # = node build/generate.mjs
```

Üretilenler (repo köküne yazılır, GitHub Pages doğrudan servis eder):
- `ruya/<slug>.html` (TR), `en/dream/<slug>.html` (EN), `ar/hulm/<slug>.html` (AR)
- `index.html`, `en/index.html`, `ar/index.html`
- `sitemap.xml`, `robots.txt`

Üretim öncesi `ruya/`, `en/`, `ar/` silinip yeniden oluşturulur (clean build).
`privacy.html`, `support.html`, `CNAME`, `.nojekyll`, `.well-known/`, `data/`, `build/`, `docs/` korunur.

## Dosyalar
- `config.mjs` — site sabitleri (domain, mağaza linkleri) + dil/i18n tanımları
- `symbols.mjs` — JSON yükleme + TR-güvenli ASCII slug + ilgili semboller
- `templates.mjs` — HTML şablonları (support.html ile aynı tasarım dili) + URL yardımcıları
- `seo.mjs` — sitemap.xml + robots.txt
- `generate.mjs` — orkestratör

## Veri senkronu
`data/dream_symbols.json`, `tabirci-mobile/assets/data/dream_symbols.json`'un kopyasıdır.
Mobil tarafta semboller değişince bu dosyayı güncelle ve `npm run build` çalıştır.
(CI: `data/` veya `build/` değişip push edilince `.github/workflows/build-site.yml` otomatik yeniden üretir.)

## Yayın öncesi DOLDURULACAK placeholder'lar (deep link)
Universal/App Link çalışması için:
- `.well-known/apple-app-site-association` → `REPLACE_TEAM_ID` yerine Apple Developer Team ID.
- `.well-known/assetlinks.json` → `REPLACE_RELEASE_SHA256_FINGERPRINT` yerine Android release imza SHA-256
  (`keytool -list -v -keystore <release.jks>` veya Play Console → App integrity → SHA-256).

Bunlar dolana ve mobil tarafta `app_links` host'u `onirist.app`'e bağlanana kadar CTA'lar
doğrudan mağazaya gider (sorunsuz çalışır).
