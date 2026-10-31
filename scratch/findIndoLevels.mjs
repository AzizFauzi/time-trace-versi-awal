import fs from 'fs';
import path from 'path';

const dataDir = './src/data';
const files = ['levelsChapter1.ts', 'levelsChapter2.ts', 'levelsChapter3.ts', 'levelsChapter4.ts', 'levelsChapter5.ts'];

const indoLevels = [];
for (const f of files) {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const regex = /id:\s*"([^"]+)",\s*levelNumber:\s*(\d+),[\s\S]*?city:\s*"([^"]+)",\s*country:\s*\{[^}]*id:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match[4].toLowerCase().includes('indonesia')) {
      indoLevels.push({ file: f, id: match[1], levelNumber: parseInt(match[2]), city: match[3], country: match[4] });
    }
  }
}
console.log('Total Indonesian levels in 100 levels:', indoLevels.length);
indoLevels.forEach(l => console.log(`Lvl ${l.levelNumber} (${l.city}) in ${l.file}`));
