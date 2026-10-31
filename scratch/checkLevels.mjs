import fs from 'fs';
import path from 'path';

// Read all level files and extract levelNumber, id, lat, lng
const dataDir = './src/data';
const files = ['levelsChapter1.ts', 'levelsChapter2.ts', 'levelsChapter3.ts', 'levelsChapter4.ts', 'levelsChapter5.ts'];

const levels = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  // Match each level block
  const regex = /id:\s*"([^"]+)",\s*levelNumber:\s*(\d+),[\s\S]*?streetViewOptions:\s*\{\s*position:\s*\{\s*lat:\s*([-\d.]+),\s*lng:\s*([-\d.]+)\s*\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    levels.push({
      id: match[1],
      levelNumber: parseInt(match[2]),
      lat: parseFloat(match[3]),
      lng: parseFloat(match[4]),
      file: f
    });
  }
}

console.log(`Found ${levels.length} levels to verify.`);

const API_KEY = 'AIzaSyAyHABnIHtU02YfBdzsXoK8wDg2_N324Uc';

async function checkLevel(l) {
  // test radius 100 and radius 500
  const url100 = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${l.lat},${l.lng}&radius=100&source=default&key=${API_KEY}`;
  try {
    const res100 = await fetch(url100).then(r => r.json());
    if (res100.status === 'OK') {
      return { ...l, status: 'OK', date: res100.date, pano_id: res100.pano_id, realLat: res100.location.lat, realLng: res100.location.lng, copyright: res100.copyright };
    }
    
    // Try radius 500 without source restriction
    const url500 = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${l.lat},${l.lng}&radius=500&key=${API_KEY}`;
    const res500 = await fetch(url500).then(r => r.json());
    if (res500.status === 'OK') {
      return { ...l, status: 'OK_WITH_RADIUS_OR_ANY_SOURCE', date: res500.date, pano_id: res500.pano_id, realLat: res500.location.lat, realLng: res500.location.lng, copyright: res500.copyright };
    }

    return { ...l, status: 'FAILED', reason: res100.status };
  } catch (err) {
    return { ...l, status: 'ERROR', error: err.message };
  }
}

async function run() {
  const results = [];
  // Run in chunks of 5
  for (let i = 0; i < levels.length; i += 5) {
    const chunk = levels.slice(i, i + 5);
    const res = await Promise.all(chunk.map(checkLevel));
    results.push(...res);
  }

  const failed = results.filter(r => r.status === 'FAILED' || r.status === 'ERROR');
  const neededRadius = results.filter(r => r.status === 'OK_WITH_RADIUS_OR_ANY_SOURCE');
  
  console.log(`\n--- SUMMARY ---`);
  console.log(`Total: ${results.length}`);
  console.log(`Direct OK (radius 100 default): ${results.filter(r => r.status === 'OK').length}`);
  console.log(`Needed Radius 500 or any source: ${neededRadius.length}`);
  console.log(`Failed: ${failed.length}`);

  if (neededRadius.length > 0) {
    console.log(`\nNeeded radius/any source:`);
    neededRadius.forEach(r => console.log(`Lvl ${r.levelNumber} (${r.id}): ${r.status} -> real pos: ${r.realLat}, ${r.realLng}, date: ${r.date}, copyright: ${r.copyright}`));
  }

  if (failed.length > 0) {
    console.log(`\nFailed completely:`);
    failed.forEach(r => console.log(`Lvl ${r.levelNumber} (${r.id}): ${r.lat}, ${r.lng}`));
  }

  fs.writeFileSync('./scratch/levelResults.json', JSON.stringify(results, null, 2));
}

run();
