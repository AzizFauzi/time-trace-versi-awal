import fs from 'fs';

const levels = JSON.parse(fs.readFileSync('./scratch/all100Levels.json', 'utf8'));
const files = fs.readdirSync('./public/city-images');

const map = {};

for (const lvl of levels) {
  const chapter = Math.ceil(lvl.lvl / 20);
  const num = lvl.lvl;
  const city = lvl.city;

  // Potential names
  const candidates = [
    `L${chapter}_${city}.png`,
    `L${chapter}_${city}..png`,
    `L${chapter}_${city}.png.png`,
    `L_${chapter}_${city}.png`
  ];

  if (city === 'New York City') {
    candidates.push(`L${chapter}_NYC.png`, `L${chapter}_New York City.png`, `L${chapter}_New York.png`);
  }
  if (city === 'Singapore') {
    candidates.push(`L${chapter}_Singapura.png`, `L${chapter}_Singapore.png`);
  }
  if (city === 'Rome') {
    candidates.push(`L${chapter}_Roma.png`, `L${chapter}_Rome.png`);
  }
  if (city === 'San Francisco') {
    candidates.push(`L${chapter}_San Francisco.png`, `L${chapter}_San Fransisco.png`);
  }
  if (city === 'Hong Kong') {
    candidates.push(`L${chapter}_Hong Kong.png`, `L${chapter}_Hongkong.png`);
  }
  if (city === 'Miami Beach') {
    candidates.push(`L${chapter}_Miami.png`, `L${chapter}_Miami Beach.png`);
  }
  if (city === 'Mexico City') {
    candidates.push(`L${chapter}_Mexico.png`, `L${chapter}_Mexico City.png`);
  }
  if (city === 'Vienna') {
    candidates.push(`L${chapter}_Vienna.png`, `L${chapter}_Viena.png`);
  }
  if (city === 'Rio de Janeiro') {
    candidates.push(`L${chapter}_Rio.png`, `L${chapter}_Rio de Janeiro.png`, `L${chapter}_Rio de Janeiro,.png`);
  }
  if (city === 'Giza / Cairo') {
    candidates.push(`L${chapter}_Cairo.png`, `L${chapter}_Kairo.png`, `L${chapter}_Giza.png`);
  }
  if (city === 'Mountain View, California') {
    candidates.push(`L${chapter}_Mountain View.png`, `L${chapter}_Mountain View (California).png`);
  }
  if (city === 'Washington D.C.') {
    candidates.push(`L${chapter}_Washington D.C.png`, `L${chapter}_Washington D.C..png`, `L${chapter}_Washington.png`);
  }

  // Find matching file in public/city-images
  let matchedFile = null;
  for (const c of candidates) {
    const f = files.find(file => file.toLowerCase() === c.toLowerCase());
    if (f) {
      matchedFile = f;
      break;
    }
  }

  // Partial match fallback if not found directly
  if (!matchedFile) {
    const cleanCity = city.toLowerCase().replace(/[^a-z0-9]/g, '');
    matchedFile = files.find(f => {
      const cf = f.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cf.startsWith(`l${chapter}`) && cf.includes(cleanCity);
    });
  }

  if (matchedFile) {
    map[num] = `/city-images/${matchedFile}`;
  } else {
    // Only Level 24 (Oslo) and Level 25 (Helsinki) should not be found
    console.log(`Fallback needed for Level ${num}: ${city}`);
    if (num === 24) {
      map[num] = `/city-images/L2_Reykjavik.png`; // Graceful Nordic fallback for Oslo
    } else if (num === 25) {
      map[num] = `/city-images/L2_Kopenhagen.png`; // Graceful Nordic fallback for Helsinki
    } else {
      map[num] = `/city-images/L1_Tokyo.png`;
    }
  }
}

console.log('Total mapped levels:', Object.keys(map).length);

// Generate typescript code
let tsCode = `export const LEVEL_IMAGE_MAP: Record<number, string> = {\n`;
for (let i = 1; i <= 100; i++) {
  tsCode += `  ${i}: '${map[i]}',\n`;
}
tsCode += `};\n`;

fs.writeFileSync('./scratch/levelImageMap.ts', tsCode);
console.log('Generated scratch/levelImageMap.ts successfully!');
