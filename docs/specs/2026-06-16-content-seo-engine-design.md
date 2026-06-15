# Onirist İçerik SEO Motoru — Design Spec

> Tarih: 2026-06-16 · Durum: Onay bekliyor · Sahip: Fatih
> Repo: `onirist-site` (GitHub Pages, custom domain **onirist.app**)
> İlgili: tabirci-mobile büyüme roadmap'i Faz 3

## 1. Problem & Bağlam

Google Play Console (son 28 gün): mağaza ziyaretçisi **26**, dönüşüm **%15,38** (sağlıklı), trafik **%100 "Play keşfetme"** — aramadan/dış bağlantıdan **sıfır**. Darboğaz dönüşüm değil, **huninin tepesi**: uygulama hiçbir kelimede sıralanmıyor (cold-start).

İçerik SEO motoru, "rüyada yılan görmek ne demek" arayan kullanıcıyı statik bir içerik sayfasına, oradan da uygulamaya yönlendirir. Sıfır/çok düşük maliyetli, zamanla katlanan tek ölçeklenebilir bedava keşif kanalı.

## 2. Mevcut Durum (onirist-site)

- GitHub Pages aktif: `main` / root, **legacy Jekyll** build, public.
- Custom domain **onirist.app** ayarlandı (CNAME dosyası repoda, `cname: onirist.app`). HTTPS, DNS doğrulanınca aktif olacak.
- Dosyalar: `privacy.html`, `support.html` (koyu tema, çift dilli TR/EN, tek tasarım dili).
- DNS (Hostinger) kullanıcı tarafından girilecek — apex A kayıtları + www CNAME.

## 3. Hedef & Başarı Ölçütü

**Hedef:** Rüya sembolü aramaları için Google'da sıralanan, uygulamaya güçlü CTA veren çok dilli statik içerik sitesi.

**Başarı (3 ay):** Search Console'da ≥150 indekslenmiş sayfa · organik web oturumu büyüyen trend · Play trafik kaynağında "harici" trafiğin görünmesi · web→uygulama CTA tıklama oranı ölçülebilir.

**Hedef DEĞİL (YAGNI):** kullanıcı hesabı, dinamik backend, CMS, blog, yorum gönderme. Saf statik içerik + CTA.

## 4. Mimari Kararı — Framework'süz Node üretici

GitHub Pages legacy Jekyll **özel plugin çalıştırmaz**, dolayısıyla saf Jekyll bir data dosyasından N sayfa üretemez. Next.js export mümkün ama framework yükü getirir. **Karar:** küçük bağımsız bir Node script (`build/generate.mjs`) `dream_symbols.json`'u okuyup statik `.html` sayfaları üretir; çıktı repoya commit'lenir ve Pages doğrudan servis eder.

- **Avantaj:** sıfır runtime, mevcut düz-HTML yaklaşımıyla tutarlı, hata payı düşük, hızlı LCP.
- Şablonlar `privacy.html`/`support.html` ile aynı tasarım dilini (CSS değişkenleri, koyu tema) paylaşır.

### 4.1 İçerik kaynağı & senkron
- Kaynak: `dream_symbols.json` (53 sembol × 3 dil). Şu an `tabirci-mobile/assets/data/` altında.
- **Karar:** `onirist-site/data/dream_symbols.json` olarak bir kopya tutulur (tek bakımcı, basitlik). Mobil tarafta değişince elle senkron — `build/generate.mjs` çalıştırılır. (İleride backend content endpoint'inden build-time fetch ile drift sıfırlanabilir; v1 dışı.)

### 4.2 Sayfa yapısı & rotalar
- Ana sayfa: `/index.html` (landing — hero + sembol dizini + uygulama CTA + mağaza rozetleri).
- Sembol sayfaları (üretilen):
  - TR: `/ruya/<slug>.html` (örn. `/ruya/yilan.html`)
  - EN: `/en/dream/<slug>.html`
  - AR: `/ar/<slug>.html`
  - 53 × 3 ≈ **159 sayfa.**
- Her sembol sayfası: başlık "Rüyada {Sembol} Görmek — İslami Yorumu", yorum metni + alim atfı, ilgili semboller (iç linkleme), **birincil CTA** ("Bu rüyayı uygulamada yorumlat" → deep link), ikincil mağaza rozetleri.

### 4.3 SEO katmanı
- `sitemap.xml` (üretilir, tüm diller) + `robots.txt`.
- `hreflang` (tr/en/ar karşılıklı), benzersiz `<title>`/`meta description` (anahtar kelime önde).
- `schema.org`: `Article` + `FAQPage` ("Rüyada X görmek ne anlama gelir?").
- Open Graph + Twitter Card.

### 4.4 Web → Uygulama köprüsü (deferred deep link)
- CTA: uygulama kuruluysa aç (universal/app link), değilse mağazaya yönlendir.
- `/.well-known/apple-app-site-association` (iOS) + `/.well-known/assetlinks.json` (Android) onirist.app'te host edilir.
- Mobil tarafta `app_links` mevcut → gelen `https://onirist.app/ruya/yilan` linkini ilgili sembolün interpret akışına bağla (küçük mobil değişiklik, ayrı PR).
- Ölçüm: web CTA tıklama event'i; mobil deep-link açılış event'i.

### 4.5 Deployment
- `dream_symbols.json` veya şablon değişince GitHub Actions: `node build/generate.mjs` → üretilen HTML commit/deploy.
- Pages zaten main/root servis ediyor; üretilen dosyalar root'a (ve `en/`, `ar/`, `ruya/` altına) yazılır.
- `privacy.html`/`support.html` ve `.well-known` korunur.

## 5. Bileşenler (izole birimler)

| Birim | Sorumluluk | Girdi | Çıktı |
|-------|-----------|-------|-------|
| `data/dream_symbols.json` | İçerik kaynağı (kopya) | — | sembol verisi |
| `build/symbols.mjs` | Oku, normalize, slug üret | JSON | tip güvenli liste |
| `build/templates.mjs` | Sayfa/landing HTML render | sembol verisi | HTML string |
| `build/seo.mjs` | sitemap, hreflang, schema, OG | liste | meta + sitemap.xml |
| `build/generate.mjs` | Hepsini birleştir, dosyaları yaz | liste | statik site |
| `.well-known/*` | iOS/Android link doğrulama | domain, app id | AASA + assetlinks |

## 6. Riskler & Açık Noktalar
- **HTTPS:** DNS doğrulanana kadar (Hostinger A kayıtları) aktif olmaz; `.well-known` HTTPS gerektirir, deep link DNS sonrası test edilir.
- **Veri drift:** mobil `dream_symbols.json` değişirse site kopyası elle güncellenir (v1 kabul edilen kısıt).
- **İçerik derinliği:** 53 sembol başlangıç; ilk sonuçlardan sonra backend yorumlarından genişleme (ayrı spec).
- **Türkçe** birincil pazar → TR sayfa kalitesi öncelik.

## 7. Test & Doğrulama
- Build sonrası: ~159 sayfa üretiliyor, kırık link yok, sitemap tüm URL'leri içeriyor, hreflang çift yönlü.
- Lighthouse SEO ≥ 95.
- `.well-known` doğru MIME ile erişilebilir.
- Telefonda bir sembol linkini aç → uygulama kuruluysa açılır, değilse mağaza.
- Search Console'a domain + sitemap gönder (yayın sonrası).

## 8. Kapsam Dışı (sonraki fazlar)
- Faz 1 (rating) ve Faz 2 (referral) — kullanıcı tabanı oluşunca.
- Backend yorumlarından dinamik içerik genişlemesi.
- Sezonsal içerik (Ramazan vb.).
