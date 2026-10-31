import fs from 'fs';
import path from 'path';

const files = ['levelsChapter1.ts', 'levelsChapter2.ts', 'levelsChapter3.ts', 'levelsChapter4.ts', 'levelsChapter5.ts'];
const dataDir = './src/data';

let allIndoLevels = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  // Match each level block
  const matchArr = content.match(/\{\s*id:\s*"lvl-[^"]+"[\s\S]*?\n  \}/g);
  if (matchArr) {
    for (const block of matchArr) {
      if (block.includes('"Indonesia"') || block.includes("'Indonesia'")) {
        allIndoLevels.push({ file: f, block });
      }
    }
  }
}

console.log('Found Indonesian blocks:', allIndoLevels.length);

// Monas is in lvl-21-jakarta-monas
const monasBlock = allIndoLevels.find(b => b.block.includes('lvl-21-jakarta-monas'));
const withoutMonas = allIndoLevels.filter(b => !b.block.includes('lvl-21-jakarta-monas'));

console.log('Monas found:', !!monasBlock);
console.log('Other Indonesian levels for Jelajah Indonesia:', withoutMonas.length);

// Re-index withoutMonas from levelNumber: 1 to 36
const indo36 = withoutMonas.map((item, idx) => {
  const newLvl = idx + 1;
  let b = item.block;
  b = b.replace(/levelNumber:\s*\d+/, `levelNumber: ${newLvl}`);
  b = b.replace(/id:\s*"lvl-\d+-/, `id: "indo-${newLvl}-`);
  return b;
});

const fileContent = `import { HistoricalPano } from './challenges';

/**
 * 36 Kasus Arsip Sejarah Nusantara - Mode Khusus 'Jelajah Indonesia'
 * Menjelajahi jejak sejarah ikonik dari Sabang sampai Merauke
 */
export const LEVELS_JELAJAH_INDONESIA: HistoricalPano[] = [
${indo36.join(',\n')}
];
`;

fs.writeFileSync('./src/data/levelsIndonesia.ts', fileContent);
console.log('Successfully created src/data/levelsIndonesia.ts with 36 levels!');
