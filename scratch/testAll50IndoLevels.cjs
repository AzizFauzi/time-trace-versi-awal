const https = require('https');
const key = 'AIzaSyAyHABnIHtU02YfBdzsXoK8wDg2_N324Uc';
const fs = require('fs');

// Read levelsIndonesia.ts
const content = fs.readFileSync('src/data/levelsIndonesia.ts', 'utf-8');
const idRegex = /id:\s*"([^"]+)",[\s\S]*?levelNumber:\s*(\d+),[\s\S]*?lat:\s*([-\d.]+),\s*lng:\s*([-\d.]+)[\s\S]*?heading:\s*([-\d.]+)/g;

let match;
const levels = [];
while ((match = idRegex.exec(content)) !== null) {
  levels.push({
    id: match[1],
    level: parseInt(match[2]),
    lat: parseFloat(match[3]),
    lng: parseFloat(match[4]),
    heading: parseFloat(match[5])
  });
}

console.log(`Found ${levels.length} levels in levelsIndonesia.ts`);

async function testLevel(lvl) {
  return new Promise((resolve) => {
    // Test radius 500m official Google first
    const urlGoogle = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lvl.lat},${lvl.lng}&radius=1000&source=default&key=${key}`;
    https.get(urlGoogle, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ level: lvl.level, id: lvl.id, status: json.status, copyright: json.copyright, pano_id: json.pano_id, date: json.date, loc: json.location });
        } catch (e) {
          resolve({ level: lvl.level, id: lvl.id, status: 'PARSE_ERROR' });
        }
      });
    });
  });
}

async function run() {
  for (const lvl of levels) {
    const res = await testLevel(lvl);
    if (res.status !== 'OK' || !res.copyright || !res.copyright.includes('Google')) {
      console.log(`[Level ${res.level} - ${res.id}] Status: ${res.status}, Copyright: ${res.copyright}, Date: ${res.date}`);
    }
  }
  console.log('Finished testing all 50 levels!');
}

run();
