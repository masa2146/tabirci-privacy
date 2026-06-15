// Sembol verisini oku, kanonik ASCII slug üret, benzersizliği garanti et.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '..', 'data', 'dream_symbols.json');

const TR_MAP = { ı: 'i', İ: 'i', ş: 's', Ş: 's', ç: 'c', Ç: 'c', ö: 'o', Ö: 'o', ü: 'u', Ü: 'u', ğ: 'g', Ğ: 'g' };

export function slugify(input) {
  const replaced = String(input)
    .split('')
    .map((ch) => TR_MAP[ch] ?? ch)
    .join('');
  return replaced
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diakritikleri at
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function loadSymbols() {
  const raw = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
  const seen = new Map();
  const symbols = raw.map((item, idx) => {
    let slug = slugify(item.symbol);
    if (!slug) slug = `sembol-${idx}`;
    // Çakışma olursa sayı ekle (53 sembolde beklenmez ama güvenli tarafta kal).
    if (seen.has(slug)) {
      const n = seen.get(slug) + 1;
      seen.set(slug, n);
      slug = `${slug}-${n}`;
    } else {
      seen.set(slug, 1);
    }
    return { ...item, slug };
  });
  return symbols;
}

// Bir sembol için "ilgili semboller" — basit deterministik komşuluk (dizi sırasına göre).
export function relatedFor(symbols, index, count = 6) {
  const out = [];
  const n = symbols.length;
  for (let step = 1; out.length < count && step < n; step++) {
    out.push(symbols[(index + step) % n]);
  }
  return out;
}
