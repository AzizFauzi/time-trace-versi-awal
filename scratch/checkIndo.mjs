import fs from 'fs';
const files = ['levelsChapter1.ts', 'levelsChapter2.ts', 'levelsChapter3.ts', 'levelsChapter4.ts', 'levelsChapter5.ts'];
for (const f of files) {
  const c = fs.readFileSync('./src/data/' + f, 'utf8');
  const regex = /id:\s*"([^"]+)"[\s\S]*?levelNumber:\s*(\d+)[\s\S]*?city:\s*"([^"]+)"[\s\S]*?country:\s*\{[^}]*id:\s*"([^"]+)"/g;
  const matches = [...c.matchAll(regex)];
  console.log(`=== ${f} ===`);
  matches.forEach(m => {
    if (m[4] === 'Indonesia') {
      console.log(`  [INDO] Lvl ${m[2]}: ${m[3]} (${m[1]})`);
    } else {
      console.log(`  [WORLD] Lvl ${m[2]}: ${m[3]}, ${m[4]}`);
    }
  });
}
