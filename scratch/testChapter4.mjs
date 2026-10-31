import fs from 'fs';
const key = 'AIzaSyAyHABnIHtU02YfBdzsXoK8wDg2_N324Uc';
const content = fs.readFileSync('./src/data/levelsChapter4.ts', 'utf-8');
const regex = /id:\s*"([^"]+)",\s*levelNumber:\s*(\d+),[\s\S]*?city:\s*"([^"]+)"[\s\S]*?position:\s*\{\s*lat:\s*([-\d.]+),\s*lng:\s*([-\d.]+)\s*\}/g;
let m;
const levels = [];
while ((m = regex.exec(content)) !== null) {
  levels.push({ id: m[1], num: m[2], city: m[3], lat: parseFloat(m[4]), lng: parseFloat(m[5]) });
}

async function run() {
  for (const l of levels) {
    const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${l.lat},${l.lng}&radius=500&key=${key}`;
    const r = await fetch(url).then(res => res.json());
    const isGoogle = r.copyright && r.copyright.includes('Google');
    console.log(`Lvl ${l.num.padEnd(2)} ${l.city.padEnd(16)} | Google: ${isGoogle ? 'YES' : 'NO '} | Copyright: ${r.copyright} | Pano: ${r.pano_id}`);
  }
}
run();
