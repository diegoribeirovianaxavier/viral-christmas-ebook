const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const brainDir = 'C:\\Users\\novap\\.gemini\\antigravity\\brain\\1fa8265b-561c-4d7f-957f-a23e297afd2a';
const assetsDir = path.join(__dirname, 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Valid session timestamps: yesterday's approved batch (179519) and today's session (179526)
const VALID_TIMESTAMPS = ['179519', '179526'];

const files = fs.readdirSync(brainDir);

function getValidBrainFile(id) {
  const matching = files
    .filter(f => f.startsWith(id + '_') && VALID_TIMESTAMPS.some(ts => f.includes(ts)) && (f.endsWith('.jpg') || f.endsWith('.png')))
    .map(f => {
      const fullPath = path.join(brainDir, f);
      const stats = fs.statSync(fullPath);
      return { file: f, path: fullPath, mtime: stats.mtimeMs, size: stats.size };
    })
    .sort((a, b) => b.mtime - a.mtime);
  return matching[0];
}

const targets = ['cover'];
for (let i = 1; i <= 40; i++) {
  targets.push(`recipe_${String(i).padStart(2, '0')}`);
}

let verifiedCount = 0;
targets.forEach(target => {
  const destName = `${target}.png`;
  const destPath = path.join(assetsDir, destName);
  const newestBrain = getValidBrainFile(target);

  if (newestBrain) {
    let shouldCopy = false;
    if (!fs.existsSync(destPath)) {
      shouldCopy = true;
    } else {
      const destStats = fs.statSync(destPath);
      if (newestBrain.mtime > destStats.mtimeMs) {
        shouldCopy = true;
      }
    }

    if (shouldCopy) {
      fs.copyFileSync(newestBrain.path, destPath);
    }
  }

  if (fs.existsSync(destPath)) {
    const stats = fs.statSync(destPath);
    if (stats.size > 50 * 1024) {
      const sizeKB = (stats.size / 1024).toFixed(1);
      const buffer = fs.readFileSync(destPath);
      const hash = crypto.createHash('sha256').update(buffer).digest('hex').substring(0, 16);
      console.log(`[VERIFIED] ${destName.padEnd(16)} | Size: ${sizeKB.padEnd(8)} KB | SHA-256: ${hash}...`);
      verifiedCount++;
    } else {
      console.warn(`[UNDERSIZED] ${destName} is only ${(stats.size/1024).toFixed(1)} KB`);
    }
  } else {
    console.log(`[MISSING]  ${destName}`);
  }
});

console.log(`\nVerified images in /assets: ${verifiedCount}/41`);
