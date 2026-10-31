import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/regional_data.json', 'utf8'));

let md = '# Cheatsheet Lengkap Mode Ekspedisi Regional (Street View Time Traveler)\n\n';
md += 'Panduan investigasi cepat untuk mode **Ekspedisi Acak Regional** (5 Ronde per sesi). Cheatsheet ini mencakup seluruh lokasi dari 4 wilayah utama: **Indonesia (Nusantara)**, **Asia**, **Eropa**, dan **Amerika**.\n\n';

const regionTitles = {
  indonesia: '🇮🇩 1. Ekspedisi Khusus: Jelajah Indonesia (50 Lokasi)',
  asia: '🌏 2. Ekspedisi Regional: Asia & Timur Tengah (20 Lokasi)',
  europe: '🏛️ 3. Ekspedisi Regional: Eropa Klasik (36 Lokasi)',
  americas: '🌎 4. Ekspedisi Regional: Benua Amerika (28 Lokasi)',
};

for (const [key, title] of Object.entries(regionTitles)) {
  const items = data[key];
  md += `## ${title}\n\n`;
  md += `Total arsip: **${items.length} lokasi**\n\n`;
  md += '| No | Kota & Negara | Judul Kasus / Landmark | Target Tahun | Petunjuk Utama (Mobil / Arsitektur / Suasana) | Koordinat (Lat, Lng) |\n';
  md += '|:---:|:---|:---|:---:|:---|:---:|\n';

  items.forEach((item, idx) => {
    const hintSummary = [
      item.hints.cars ? `🚗 ${item.hints.cars}` : '',
      item.hints.arch ? `🏛️ ${item.hints.arch}` : '',
      item.hints.cult ? `👥 ${item.hints.cult}` : '',
    ]
      .filter(Boolean)
      .join('; ')
      .replace(/\|/g, '/');

    const cleanTitle = (item.title || '').replace(/\|/g, '-');
    const cleanCity = `${item.city}, ${item.country}`;
    const cleanCoords = `${item.lat.toFixed(4)}, ${item.lng.toFixed(4)}`;

    md += `| ${idx + 1} | **${cleanCity}** | ${cleanTitle} | **${item.year}** (${item.date || ''}) | ${hintSummary || '-'} | \`${cleanCoords}\` |\n`;
  });

  md += '\n---\n\n';
}

fs.writeFileSync('scratch/cheatsheet_ekspedisi_regional.md', md, 'utf8');
console.log('Markdown cheatsheet generated successfully!');
