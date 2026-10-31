import fs from 'fs';
import path from 'path';

const imageFiles = fs.readdirSync('./public/city-images');
console.log('Total files in public/city-images:', imageFiles.length);

const dataDir = './src/data';
const files = ['levelsChapter1.ts', 'levelsChapter2.ts', 'levelsChapter3.ts', 'levelsChapter4.ts', 'levelsChapter5.ts'];

const levels = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const regex = /id:\s*"([^"]+)",\s*levelNumber:\s*(\d+),[\s\S]*?city:\s*"([^"]+)",\s*country:\s*\{[^}]*id:\s*"([^"]+)"[^}]*\},\s*realLocation:[\s\S]*?targetYear:\s*(\d+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    levels.push({
      id: match[1],
      levelNumber: parseInt(match[2]),
      city: match[3],
      country: match[4],
      year: parseInt(match[5]),
      chapter: Math.ceil(parseInt(match[2]) / 20),
    });
  }
}

console.log('Total levels loaded:', levels.length);

// Try to match each level with an image in public/city-images
const matched = [];
const unmatched = [];

for (const lvl of levels) {
  const chap = `L${lvl.chapter}`;
  // Look for files starting with chap
  const candidates = imageFiles.filter(img => img.toUpperCase().startsWith(chap.toUpperCase()));
  
  // Normalize names for comparison
  const normCity = lvl.city.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const found = candidates.find(img => {
    const normImg = img.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normImg.includes(normCity) || normCity.includes(normImg.replace(chap.toLowerCase(), '').replace('png', ''));
  });

  if (found) {
    matched.push({ level: lvl.levelNumber, city: lvl.city, file: found });
  } else {
    // try fallback search across all files
    const anyFound = imageFiles.find(img => {
      const normImg = img.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normImg.includes(normCity);
    });
    if (anyFound) {
      matched.push({ level: lvl.levelNumber, city: lvl.city, file: anyFound, crossChapter: true });
    } else {
      unmatched.push({ level: lvl.levelNumber, city: lvl.city, chapter: lvl.chapter });
    }
  }
}

console.log('Matched:', matched.length);
console.log('Unmatched:', unmatched.length);
if (unmatched.length > 0) {
  console.log('Unmatched levels:', unmatched);
}
