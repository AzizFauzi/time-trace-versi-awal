import fs from 'fs';

const chFiles = [
  'src/data/levelsChapter1.ts',
  'src/data/levelsChapter2.ts',
  'src/data/levelsChapter3.ts',
  'src/data/levelsChapter4.ts',
  'src/data/levelsChapter5.ts'
];

function extractIdField(str, fieldName) {
  if (!str) return '';
  // match field: { "id": "value" } or field: { id: "value" } or field: "value"
  const regexObj = new RegExp(`${fieldName}:\\s*\\{[^}]*["']?id["']?\\s*:\\s*["']([^"']+)["']`);
  const m1 = str.match(regexObj);
  if (m1) return m1[1];
  const regexSimple = new RegExp(`${fieldName}:\\s*["']([^"']+)["']`);
  const m2 = str.match(regexSimple);
  if (m2) return m2[1];
  return '';
}

let allCh = [];
for (const f of chFiles) {
  const txt = fs.readFileSync(f, 'utf8');
  const blocks = txt.split(/id:\s*["']lvl-/);
  for (let i = 1; i < blocks.length; i++) {
    const b = blocks[i];
    const idMatch = b.match(/^([a-zA-Z0-9_-]+)["']/);
    const lvlMatch = b.match(/levelNumber:\s*(\d+)/);
    const title = extractIdField(b, 'title');
    const cityMatch = b.match(/city:\s*["']([^"']+)["']/);
    const country = extractIdField(b, 'country');
    const yrMatch = b.match(/targetYear:\s*(\d+)/);
    const date = extractIdField(b, 'targetDateStr');
    const regionsMatch = b.match(/regions:\s*\[([^\]]+)\]/);
    const regions = regionsMatch ? regionsMatch[1].split(',').map(s => s.trim().replace(/["']/g, '')) : [];
    const latMatch = b.match(/lat:\s*([-\d.]+)/);
    const lngMatch = b.match(/lng:\s*([-\d.]+)/);
    
    // Forensic clues
    const carHint = extractIdField(b, 'cars');
    const archHint = extractIdField(b, 'architecture');
    const cultHint = extractIdField(b, 'cultureOrFashion');

    allCh.push({
      id: idMatch ? `lvl-${idMatch[1]}` : `lvl-${i}`,
      level: lvlMatch ? parseInt(lvlMatch[1], 10) : null,
      title: title || '',
      city: cityMatch ? cityMatch[1] : '',
      country: country || '',
      year: yrMatch ? parseInt(yrMatch[1], 10) : 0,
      date: date || '',
      regions,
      lat: latMatch ? parseFloat(latMatch[1]) : 0,
      lng: lngMatch ? parseFloat(lngMatch[1]) : 0,
      hints: {
        cars: carHint || '',
        arch: archHint || '',
        cult: cultHint || ''
      }
    });
  }
}

// Indonesia levels
const indContent = fs.readFileSync('src/data/levelsIndonesia.ts', 'utf8');
const indoBlocks = indContent.split(/id:\s*["']indo-/);
let indoCh = [];
for (let i = 1; i < indoBlocks.length; i++) {
  const b = indoBlocks[i];
  const idMatch = b.match(/^([a-zA-Z0-9_-]+)["']/);
  const lvlMatch = b.match(/levelNumber:\s*(\d+)/);
  const title = extractIdField(b, 'title');
  const cityMatch = b.match(/city:\s*["']([^"']+)["']/);
  const country = extractIdField(b, 'country') || 'Indonesia';
  const yrMatch = b.match(/targetYear:\s*(\d+)/);
  const date = extractIdField(b, 'targetDateStr');
  const latMatch = b.match(/lat:\s*([-\d.]+)/);
  const lngMatch = b.match(/lng:\s*([-\d.]+)/);
  const carHint = extractIdField(b, 'cars');
  const archHint = extractIdField(b, 'architecture');
  const cultHint = extractIdField(b, 'cultureOrFashion');

  indoCh.push({
    id: idMatch ? `indo-${idMatch[1]}` : `indo-${i}`,
    level: lvlMatch ? parseInt(lvlMatch[1], 10) : i,
    title: title || '',
    city: cityMatch ? cityMatch[1] : '',
    country: country || 'Indonesia',
    year: yrMatch ? parseInt(yrMatch[1], 10) : 0,
    date: date || '',
    lat: latMatch ? parseFloat(latMatch[1]) : 0,
    lng: lngMatch ? parseFloat(lngMatch[1]) : 0,
    hints: {
      cars: carHint || '',
      arch: archHint || '',
      cult: cultHint || ''
    }
  });
}

const res = {
  indonesia: indoCh,
  asia: allCh.filter(c => c.regions.includes('asia')),
  europe: allCh.filter(c => c.regions.includes('europe')),
  americas: allCh.filter(c => c.regions.includes('americas'))
};

console.log('Results summary:');
console.log('Indonesia (Jelajah Indonesia pool):', res.indonesia.length);
console.log('Asia:', res.asia.length);
console.log('Europe:', res.europe.length);
console.log('Americas:', res.americas.length);

fs.writeFileSync('scratch/regional_data.json', JSON.stringify(res, null, 2), 'utf8');

// Generate markdown
function generateMdTable(items) {
  let out = '| No | Kota & Negara | Judul Kasus / Landmark | Target Tahun | Petunjuk Utama (Mobil / Arsitektur / Suasana) | Koordinat (Lat, Lng) |\n';
  out += '|:---:|:---|:---|:---:|:---|:---:|\n';
  items.forEach((c, idx) => {
    const loc = `**${c.city}, ${c.country}**`;
    const title = c.title || '-';
    const yr = `**${c.year}**${c.date ? ` (${c.date})` : ''}`;
    let clues = [];
    if (c.hints.cars) clues.push(`🚗 ${c.hints.cars.replace(/\|/g, '/')}`);
    if (c.hints.arch) clues.push(`🏛️ ${c.hints.arch.replace(/\|/g, '/')}`);
    if (c.hints.cult) clues.push(`👥 ${c.hints.cult.replace(/\|/g, '/')}`);
    const clueStr = clues.length > 0 ? clues.join('; ') : '-';
    const coords = `\`${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}\``;
    out += `| ${idx + 1} | ${loc} | ${title} | ${yr} | ${clueStr} | ${coords} |\n`;
  });
  return out;
}

let md = '# Cheatsheet Lengkap Mode Ekspedisi Regional (Street View Time Traveler)\n\n';
md += 'Panduan investigasi cepat untuk mode **Ekspedisi Acak Regional** (5 Ronde per sesi). Cheatsheet ini mencakup seluruh lokasi dari 4 wilayah utama: **Indonesia (Nusantara)**, **Asia**, **Eropa**, dan **Amerika**.\n\n';

md += '## 🇮🇩 1. Ekspedisi Khusus: Jelajah Indonesia (50 Lokasi)\n\n';
md += `Total arsip: **${res.indonesia.length} lokasi**\n\n`;
md += generateMdTable(res.indonesia);

md += '\n---\n\n## 🌏 2. Ekspedisi Regional: Asia & Timur Tengah (20 Lokasi)\n\n';
md += `Total arsip: **${res.asia.length} lokasi**\n\n`;
md += generateMdTable(res.asia);

md += '\n---\n\n## 🏛️ 3. Ekspedisi Regional: Eropa Klasik (36 Lokasi)\n\n';
md += `Total arsip: **${res.europe.length} lokasi**\n\n`;
md += generateMdTable(res.europe);

md += '\n---\n\n## 🗽 4. Ekspedisi Regional: Benua Amerika (28 Lokasi)\n\n';
md += `Total arsip: **${res.americas.length} lokasi**\n\n`;
md += generateMdTable(res.americas);

fs.writeFileSync('scratch/cheatsheet_ekspedisi_regional.md', md, 'utf8');
console.log('Saved scratch/cheatsheet_ekspedisi_regional.md successfully');
