import fs from 'fs';

const chapters = [
  'src/data/levelsChapter1.ts',
  'src/data/levelsChapter2.ts',
  'src/data/levelsChapter3.ts',
  'src/data/levelsChapter4.ts',
  'src/data/levelsChapter5.ts',
];

const results = [];

for (const chPath of chapters) {
  const content = fs.readFileSync(chPath, 'utf8');
  const levelBlocks = content.split(/id:\s*["']lvl-/);
  for (let i = 1; i < levelBlocks.length; i++) {
    const block = levelBlocks[i];
    const lvlMatch = block.match(/levelNumber:\s*(\d+)/);
    const cityMatch = block.match(/city:\s*["']([^"']+)["']/);
    const countryMatch = block.match(/country:\s*\{[^}]*id:\s*["']([^"']+)["']/);
    const yearMatch = block.match(/targetYear:\s*(\d+)/);
    const titleMatch = block.match(/title:\s*\{[^}]*id:\s*["']([^"']+)["']/);
    const dateMatch = block.match(/targetDateStr:\s*\{[^}]*id:\s*["']([^"']+)["']/);
    const locMatch = block.match(/realLocation:\s*\{\s*lat:\s*([-\d.]+),\s*lng:\s*([-\d.]+)\s*\}/);

    if (lvlMatch && cityMatch) {
      results.push({
        level: parseInt(lvlMatch[1], 10),
        title: titleMatch ? titleMatch[1] : '',
        city: cityMatch[1],
        country: countryMatch ? countryMatch[1] : '',
        targetYear: yearMatch ? parseInt(yearMatch[1], 10) : 0,
        targetDate: dateMatch ? dateMatch[1] : '',
        lat: locMatch ? parseFloat(locMatch[1]) : 0,
        lng: locMatch ? parseFloat(locMatch[2]) : 0,
      });
    }
  }
}

results.sort((a, b) => a.level - b.level);
console.log(`Extracted ${results.length} levels.`);
fs.writeFileSync('scratch/cheatsheet100.json', JSON.stringify(results, null, 2), 'utf8');
