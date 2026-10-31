import { HISTORICAL_CHALLENGES, LEVELS_JELAJAH_INDONESIA } from '../src/data/challenges';

const all = [...HISTORICAL_CHALLENGES, ...LEVELS_JELAJAH_INDONESIA];

for (const p of all) {
  const city = p.city;
  const cId = p.hints.cars.id;
  const cEn = p.hints.cars.en;
  console.log(`[${p.id}] City: "${city}"`);
  console.log(`  ID: ${cId}`);
  console.log(`  EN: ${cEn}`);
}
