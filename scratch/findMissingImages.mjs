import fs from 'fs';

const levels = JSON.parse(fs.readFileSync('./scratch/all100Levels.json', 'utf8'));
const files = fs.readdirSync('./public/city-images');

const altMap = {
  'Singapore': ['Singapura'],
  'Rome': ['Roma'],
  'New York City': ['NYC', 'New York', 'Newyork City'],
  'Giza / Cairo': ['Cairo', 'Kairo', 'Giza'],
  'Mountain View, California': ['Mountain View', 'Mountain View (California)'],
  'Vienna': ['Viena'],
  'Rio de Janeiro': ['Rio', 'Rio de Janeiro,'],
  'San Francisco': ['San Fransisco'],
  'Hong Kong': ['Hongkong'],
  'Miami Beach': ['Miami'],
  'Mexico City': ['Mexico'],
  'Washington D.C.': ['Washington D.C', 'Washington DC', 'Washington']
};

const missing = [];
const matched = [];

levels.forEach(lvl => {
  const chapter = Math.ceil(lvl.lvl / 20);
  const city = lvl.city;
  const prefixes = [`L${chapter}_`, `L_${chapter}_`, `l${chapter}_`];

  const candidates = [city];
  if (altMap[city]) candidates.push(...altMap[city]);

  let foundFile = null;
  for (const c of candidates) {
    for (const p of prefixes) {
      const target = `${p}${c}.png`.toLowerCase();
      const match = files.find(f => f.toLowerCase() === target);
      if (match) {
        foundFile = match;
        break;
      }
    }
    if (foundFile) break;
  }

  if (!foundFile) {
    for (const c of candidates) {
      for (const p of prefixes) {
        const match = files.find(f => f.toLowerCase().startsWith(p.toLowerCase()) && f.toLowerCase().includes(c.toLowerCase()));
        if (match) {
          foundFile = match;
          break;
        }
      }
      if (foundFile) break;
    }
  }

  if (foundFile) {
    matched.push({ lvl: lvl.lvl, chapter, city, file: foundFile });
  } else {
    // clean city for safe filename recommendation
    const cleanCity = city.replace(/[\\/:*?"<>|]/g, '');
    missing.push({
      lvl: lvl.lvl,
      chapter,
      city,
      country: lvl.country,
      targetYear: lvl.year,
      expectedFilename: `L${chapter}_${cleanCity}.png`
    });
  }
});

console.log('Total matched:', matched.length);
console.log('Total missing:', missing.length);

console.log('\n=== DETAIL MISSING PER BAB ===');
for (let c = 1; c <= 5; c++) {
  const chapMiss = missing.filter(m => m.chapter === c);
  console.log(`\n--- BAB ${c} (${chapMiss.length} gambar belum ada) ---`);
  chapMiss.forEach(m => {
    console.log(`Level ${m.lvl}: ${m.city} (${m.country}) -> Nama file: ${m.expectedFilename}`);
  });
}

fs.writeFileSync('./scratch/missingImages.json', JSON.stringify(missing, null, 2));
fs.writeFileSync('./scratch/matchedImages.json', JSON.stringify(matched, null, 2));
