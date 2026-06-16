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
    // ── Zenginleştirilmiş içerik ──
    leadLabel: 'Tabir',
    contextTitle: 'Yorumu Etkileyen Unsurlar',
    contextIntro:
      'İslami rüya tabirinde bir sembolün anlamı sabit değildir; rüyanın ayrıntılarına, hissedilen duyguya ve kişinin haline göre değişir. Aynı sembol farklı bağlamlarda farklı yorumlanabilir.',
    contextPoints: [
      'Sembolün rüyadaki hâli — berrak ya da bulanık, büyük ya da küçük, sakin ya da taşkın.',
      'Rüya sırasında hissedilen duygu — huzur, korku, sevinç ya da hüzün yorumu yönlendirir.',
      'Kişinin içinde bulunduğu durum, niyeti ve hayatındaki güncel meseleler.',
    ],
    faqTitle: 'Sıkça Sorulan Soru',
    ctaTitle: 'Kendi Rüyanı Yorumlat',
    heroKicker: 'İslami Rüya Tabiri',
    sourcesTitle: 'Klasik Kaynaklara Dayanır',
    sources: [
      { initial: 'İ', name: 'İbn Sirin', text: 'Rüya tabirinin en bilinen klasik âlimi; sembol yorumlarının temel başvuru kaynağı.' },
      { initial: 'N', name: 'Abdulgani en-Nablusi', text: '“Taʿtîru’l-Enâm” adlı eseriyle binlerce rüya sembolünü derleyen büyük âlim.' },
    ],
    howTitle: 'Nasıl Çalışır?',
    steps: [
      { t: 'Rüyanı Anlat', d: 'Gördüğün rüyayı kendi cümlelerinle, dilediğin kadar ayrıntıyla yaz.' },
      { t: 'Yapay Zekâ Yorumlar', d: 'Klasik İslami kaynaklara dayanan, sana özel bir tabir oluşturulur.' },
      { t: 'Anlamını Keşfet', d: 'Saniyeler içinde detaylı ve anlaşılır yorumunu oku.' },
    ],
    footerLinks: { privacy: 'Gizlilik', support: 'Destek' },
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
    // ── Enriched content ──
    leadLabel: 'Interpretation',
    contextTitle: 'What Shapes the Meaning',
    contextIntro:
      'In Islamic dream interpretation a symbol has no fixed meaning; it shifts with the details of the dream, the emotion felt, and the dreamer’s own circumstances. The same symbol can be read differently in different contexts.',
    contextPoints: [
      'The state of the symbol — clear or murky, large or small, calm or overwhelming.',
      'The emotion felt during the dream — peace, fear, joy, or sorrow guides the reading.',
      'The dreamer’s situation, intention, and the matters present in their life.',
    ],
    faqTitle: 'Frequently Asked',
    ctaTitle: 'Interpret Your Own Dream',
    heroKicker: 'Islamic Dream Interpretation',
    sourcesTitle: 'Grounded in Classical Sources',
    sources: [
      { initial: 'I', name: 'Ibn Sirin', text: 'The most renowned classical scholar of dream interpretation; the primary reference for symbol meanings.' },
      { initial: 'N', name: 'Abd al-Ghani al-Nabulsi', text: 'The great scholar who compiled thousands of dream symbols in his work “Taʿtir al-Anam”.' },
    ],
    howTitle: 'How It Works',
    steps: [
      { t: 'Describe Your Dream', d: 'Write down what you saw in your own words, in as much detail as you like.' },
      { t: 'AI Interprets', d: 'A personal interpretation rooted in classical Islamic sources is generated.' },
      { t: 'Discover the Meaning', d: 'Read your detailed, easy-to-understand interpretation in seconds.' },
    ],
    footerLinks: { privacy: 'Privacy', support: 'Support' },
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
    // ── محتوى موسّع ──
    leadLabel: 'التفسير',
    contextTitle: 'ما الذي يحدد المعنى',
    contextIntro:
      'في تفسير الأحلام الإسلامي ليس للرمز معنى ثابت؛ بل يتغير بحسب تفاصيل الرؤيا والشعور المصاحب لها وحال الرائي. وقد يُفسَّر الرمز نفسه تفسيرًا مختلفًا في سياقات مختلفة.',
    contextPoints: [
      'حال الرمز في الرؤيا — صافٍ أو معكّر، كبير أو صغير، هادئ أو جارف.',
      'الشعور أثناء الرؤيا — السكينة أو الخوف أو الفرح أو الحزن يوجّه التفسير.',
      'حال الرائي ونيته والأمور الحاضرة في حياته.',
    ],
    faqTitle: 'سؤال شائع',
    ctaTitle: 'فسّر حلمك الخاص',
    heroKicker: 'تفسير الأحلام الإسلامي',
    sourcesTitle: 'مستند إلى المصادر الكلاسيكية',
    sources: [
      { initial: 'س', name: 'ابن سيرين', text: 'أشهر علماء تفسير الأحلام الكلاسيكيين؛ المرجع الأساسي لمعاني الرموز.' },
      { initial: 'ن', name: 'عبد الغني النابلسي', text: 'العالم الكبير الذي جمع آلاف رموز الأحلام في كتابه «تعطير الأنام».' },
    ],
    howTitle: 'كيف يعمل',
    steps: [
      { t: 'احكِ حلمك', d: 'اكتب ما رأيته بكلماتك الخاصة وبالتفصيل الذي تريده.' },
      { t: 'يفسّر الذكاء الاصطناعي', d: 'يُنشأ تفسير شخصي مستند إلى المصادر الإسلامية الكلاسيكية.' },
      { t: 'اكتشف المعنى', d: 'اقرأ تفسيرك المفصّل والواضح خلال ثوانٍ.' },
    ],
    footerLinks: { privacy: 'الخصوصية', support: 'الدعم' },
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
