const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const assetsDir = path.join(__dirname, 'assets');

// List of exactly 41 required image files
const requiredFiles = ['cover.png'];
for (let i = 1; i <= 40; i++) {
  requiredFiles.push(`recipe_${String(i).padStart(2, '0')}.png`);
}

console.log('='.repeat(70));
console.log('--- PHASE 3: ANTI-DUPLICATION AUDIT & INTEGRITY CHECK (SHA-256) ---');
console.log('='.repeat(70));
console.log(`Checking ${requiredFiles.length} files in: ${assetsDir}\n`);

let missingFiles = [];
let undersizedFiles = [];
const hashMap = new Map(); // hash -> [filename1, filename2, ...]
const fileRecords = [];

requiredFiles.forEach((file) => {
  const filePath = path.join(assetsDir, file);

  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
    return;
  }

  const stats = fs.statSync(filePath);
  const sizeKB = stats.size / 1024;

  if (stats.size < 50 * 1024) {
    undersizedFiles.push({ file, sizeKB: sizeKB.toFixed(1) });
  }

  // Calculate SHA-256 hash
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

  fileRecords.push({
    file,
    sizeKB: sizeKB.toFixed(1) + ' KB',
    hash: hash.substring(0, 16) + '...' // short display
  });

  if (!hashMap.has(hash)) {
    hashMap.set(hash, []);
  }
  hashMap.get(hash).push(file);
});

// Identify any duplicate hashes
const duplicates = [];
for (const [hash, files] of hashMap.entries()) {
  if (files.length > 1) {
    duplicates.push({ hash, files });
  }
}

// REPORT RESULTS
if (missingFiles.length > 0) {
  console.error(`[ERROR] Missing ${missingFiles.length} files:`);
  missingFiles.forEach(f => console.error(`  - MISSING: ${f}`));
}

if (undersizedFiles.length > 0) {
  console.error(`[ERROR] Found ${undersizedFiles.length} files under 50KB:`);
  undersizedFiles.forEach(u => console.error(`  - UNDERSIZED: ${u.file} (${u.sizeKB} KB)`));
}

if (duplicates.length > 0) {
  console.error(`\n[CRITICAL ERROR] DUPLICATE IMAGES DETECTED! (${duplicates.length} duplicate sets found):`);
  duplicates.forEach((d, idx) => {
    console.error(`  Set #${idx + 1} (Hash: ${d.hash}):`);
    d.files.forEach(f => console.error(`    -> ${f}`));
  });
  console.error('\nTrava de seguranca ativada: Todos os 41 arquivos DEVEM possuir fotografias 100% unicas.');
}

if (missingFiles.length === 0 && undersizedFiles.length === 0 && duplicates.length === 0 && fileRecords.length === 41) {
  console.log('[SUCCESS] AUDIT PASSED! All 41/41 unique images verified.');
  console.log(`- Total Files Verified: ${fileRecords.length}`);
  console.log(`- Unique SHA-256 Hashes: ${hashMap.size}`);
  console.log(`- Duplicate Files: ZERO\n`);
  console.log('Sample verified files:');
  fileRecords.slice(0, 8).forEach(r => {
    console.log(`  ${r.file.padEnd(16)} | Size: ${r.sizeKB.padEnd(10)} | SHA-256: ${r.hash}`);
  });
  console.log('  ...');
  process.exit(0);
} else {
  console.error(`\n[AUDIT FAILED] Status: ${fileRecords.length}/41 files present. Unique hashes: ${hashMap.size}/41.`);
  process.exit(1);
}
