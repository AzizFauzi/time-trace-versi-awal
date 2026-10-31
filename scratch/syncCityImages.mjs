import fs from 'fs';
import path from 'path';

const srcDir = './City Image 2';
const destDir = './public/city-images';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);

for (const f of files) {
  const srcPath = path.join(srcDir, f);
  
  // Clean filename:
  // e.g., 'L3_Barcelona.png.png' -> 'L3_Barcelona.png'
  // 'L1_Honolulu..png' -> 'L1_Honolulu.png'
  let cleanName = f;
  if (cleanName.endsWith('.png.png')) {
    cleanName = cleanName.replace('.png.png', '.png');
  }
  if (cleanName.endsWith('..png')) {
    cleanName = cleanName.replace('..png', '.png');
  }

  const destPath = path.join(destDir, cleanName);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${f} -> ${cleanName}`);
  
  // Also preserve original name in destDir in case code references it directly
  if (cleanName !== f) {
    const rawDestPath = path.join(destDir, f);
    fs.copyFileSync(srcPath, rawDestPath);
  }
}

console.log('All 35 files from City Image 2 successfully synced to public/city-images!');
