import { HISTORICAL_CHALLENGES, LEVELS_JELAJAH_INDONESIA } from '../src/data/challenges';

const all = [...HISTORICAL_CHALLENGES, ...LEVELS_JELAJAH_INDONESIA];
const leaks: any[] = [];

for (const p of all) {
  const city = p.city.toLowerCase().trim();
  // Clean city words
  const cityWords = city.split(/[\s,\/\(\)]+/).map(w => w.replace(/[^\w]/g, '').toLowerCase()).filter(w => w.length > 2);
  
  const checkText = (text: string) => {
    if (!text) return null;
    const lower = text.toLowerCase();
    if (lower.includes(city)) return city;
    for (const w of cityWords) {
      // Don't false-positive on very common short words
      if (['san', 'los', 'new', 'the', 'kota', 'city', 'kabupaten'].includes(w)) continue;
      // Word boundary regex
      const reg = new RegExp(`\\b${w}\\b`, 'i');
      if (reg.test(lower)) return w;
    }
    return null;
  };

  const idMatch = checkText(p.hints.cars.id);
  const enMatch = checkText(p.hints.cars.en);
  if (idMatch || enMatch) {
    leaks.push({
      id: p.id,
      city: p.city,
      matched: idMatch || enMatch,
      carsId: p.hints.cars.id,
      carsEn: p.hints.cars.en,
    });
  }
}

console.log(`Total levels checked: ${all.length}`);
console.log(`Leaks found in cars hint: ${leaks.length}`);
for (const leak of leaks) {
  console.log(`[${leak.id}] (${leak.city}) -> matched "${leak.matched}"`);
  console.log(`  ID: ${leak.carsId}`);
  console.log(`  EN: ${leak.carsEn}`);
}
