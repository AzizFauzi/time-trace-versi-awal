import fs from 'fs';

const files = ['levelsChapter1.ts', 'levelsChapter2.ts', 'levelsChapter3.ts', 'levelsChapter4.ts', 'levelsChapter5.ts'];

let totalLevels = 0;
let allLevels = [];

for (const f of files) {
  const content = fs.readFileSync(`./src/data/${f}`, 'utf-8');
  const blocks = content.match(/\{\s*id:\s*"[^"]+"[\s\S]*?\n  \}/g);
  if (!blocks) {
    console.error('Failed to parse', f);
    continue;
  }
  
  for (const b of blocks) {
    totalLevels++;
    const id = b.match(/id:\s*"([^"]+)"/)?.[1];
    const lvl = parseInt(b.match(/levelNumber:\s*(\d+)/)?.[1], 10);
    const city = b.match(/city:\s*"([^"]+)"/)?.[1];
    const country = b.match(/country:\s*\{[^}]*"?id"?:\s*"([^"]+)"/)?.[1];
    const countryEn = b.match(/country:\s*\{[^}]*"?en"?:\s*"([^"]+)"/)?.[1];
    const year = parseInt(b.match(/targetYear:\s*(\d+)/)?.[1], 10);
    const dateStr = b.match(/targetDateStr:\s*\{[^}]*"?id"?:\s*"([^"]+)"/)?.[1];
    const lat = parseFloat(b.match(/lat:\s*([-\d.]+)/)?.[1]);
    const lng = parseFloat(b.match(/lng:\s*([-\d.]+)/)?.[1]);
    const title = b.match(/title:\s*\{[^}]*"?id"?:\s*"([^"]+)"/)?.[1];
    
    allLevels.push({ lvl, id, city, country, countryEn, year, dateStr, lat, lng, title, file: f });
  }
}

// Sort by levelNumber
allLevels.sort((a, b) => a.lvl - b.lvl);

console.log(`Total parsed levels: ${allLevels.length}`);
const indoLevels = allLevels.filter(l => l.country === 'Indonesia' || (l.city && l.city.toLowerCase().includes('jakarta')));
console.log(`Total Indonesian levels: ${indoLevels.length}`);
indoLevels.forEach(l => console.log(`  Level ${l.lvl}: ${l.city}, ${l.country} (${l.title})`));

fs.writeFileSync('./scratch/all100Levels.json', JSON.stringify(allLevels, null, 2));
console.log('Saved scratch/all100Levels.json');
