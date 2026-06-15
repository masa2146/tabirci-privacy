// Onirist içerik SEO motoru — merkezi konfigürasyon.
// Tüm sabitler tek yerde; şablonlar ve SEO üretici bunu kullanır.

export const SITE = {
  domain: 'https://onirist.app',
  brand: 'Onirist',
  emoji: '🌙',
  contactEmail: 'bulutfatih551@gmail.com',
  // Mağaza linkleri (deep link / .well-known canlı olunca universal link'e yükseltilecek)
  play: 'https://play.google.com/store/apps/details?id=com.ruyatabiri.ruya_tabiri_app',
  appStore: 'https://apps.apple.com/app/id6738819119',
};

// Kanonik slug ASCII'dir ve TR sembol adından türetilir; üç dilde aynı slug kullanılır,
// böylece hreflang eşlemesi birebir olur. Sadece görünen içerik/başlık yerelleşir.
export const LANGS = {
  tr: {
    code: 'tr',
    dir: 'ltr',
    pathPrefix: '', // kök
    dreamSeg: 'ruya', // /ruya/<slug>.html
    symbolField: 'symbol',
    descField: 'desc_tr',
    title: (s) => `Rüyada ${cap(s)} Görmek — İslami Yorumu | Onirist`,
    h1: (s) => `Rüyada ${cap(s)} Görmek Ne Anlama Gelir?`,
    metaDesc: (s, d) => clip(`Rüyada ${s} görmek ne demek? ${d}`, 155),
    faqQ: (s) => `Rüyada ${s} görmek ne anlama gelir?`,
    ctaPrimary: 'Bu Rüyayı Uygulamada Yorumlat',
    ctaNote: 'Onirist ile saniyeler içinde kişisel, İslami kaynaklı yorum al.',
    relatedTitle: 'İlgili Rüya Sembolleri',
    scholarLabel: 'Kaynak',
    backHome: 'Tüm Semboller',
    siteTagline: 'Yapay zeka ile İslami rüya tabiri',
    indexTitle: 'Onirist — Rüya Tabiri & İslami Rüya Yorumu',
    indexIntro: 'Rüyanda ne gördüysen anlamını keşfet. İbn Sirin ve Nablusi gibi klasik İslami kaynaklara dayanan yorumlar.',
    dirLabel: 'Sembol Sözlüğü',
  },
  en: {
    code: 'en',
    dir: 'ltr',
    pathPrefix: 'en',
    dreamSeg: 'dream', // /en/dream/<slug>.html
    symbolField: 'symbol_en',
    descField: 'desc_en',
    title: (s) => `What Does Dreaming of ${cap(s)} Mean? — Islamic Interpretation | Onirist`,
    h1: (s) => `What Does Dreaming of ${cap(s)} Mean?`,
    metaDesc: (s, d) => clip(`Meaning of seeing ${s} in a dream. ${d}`, 155),
    faqQ: (s) => `What does it mean to see ${s} in a dream?`,
    ctaPrimary: 'Interpret This Dream in the App',
    ctaNote: 'Get a personal, Islamic-sourced interpretation in seconds with Onirist.',
    relatedTitle: 'Related Dream Symbols',
    scholarLabel: 'Source',
    backHome: 'All Symbols',
    siteTagline: 'AI-powered Islamic dream interpretation',
    indexTitle: 'Onirist — Islamic Dream Interpretation & Meanings',
    indexIntro: 'Discover the meaning of your dreams, grounded in classical Islamic sources like Ibn Sirin and Al-Nabulsi.',
    dirLabel: 'Symbol Dictionary',
  },
  ar: {
    code: 'ar',
    dir: 'rtl',
    pathPrefix: 'ar',
    dreamSeg: 'hulm', // /ar/<slug>.html (segment URL'de kullanılmaz; ar köke yakın)
    symbolField: 'symbol_ar',
    descField: 'desc_ar',
    title: (s) => `ماذا يعني رؤية ${s} في المنام؟ — التفسير الإسلامي | Onirist`,
    h1: (s) => `ماذا يعني رؤية ${s} في المنام؟`,
    metaDesc: (s, d) => clip(`معنى رؤية ${s} في المنام. ${d}`, 155),
    faqQ: (s) => `ماذا يعني رؤية ${s} في المنام؟`,
    ctaPrimary: 'فسّر هذا الحلم في التطبيق',
    ctaNote: 'احصل على تفسير شخصي مستند إلى مصادر إسلامية خلال ثوانٍ مع Onirist.',
    relatedTitle: 'رموز أحلام ذات صلة',
    scholarLabel: 'المصدر',
    backHome: 'كل الرموز',
    siteTagline: 'تفسير الأحلام الإسلامي بالذكاء الاصطناعي',
    indexTitle: 'Onirist — تفسير الأحلام الإسلامي ومعانيها',
    indexIntro: 'اكتشف معنى أحلامك استنادًا إلى المصادر الإسلامية الكلاسيكية مثل ابن سيرين والنابلسي.',
    dirLabel: 'قاموس الرموز',
  },
};

export const LANG_ORDER = ['tr', 'en', 'ar'];
export const DEFAULT_LANG = 'tr';

function cap(s) {
  if (!s) return s;
  return s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
}

function clip(s, n) {
  s = s.replace(/\s+/g, ' ').trim();
  return s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…';
}
