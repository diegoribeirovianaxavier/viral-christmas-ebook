const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
let allRecipes = [];

for (let i = 1; i <= 5; i++) {
  const filePath = path.join(baseDir, `chapter${i}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Chapter ${i}: loaded ${data.length} recipes.`);
  allRecipes = allRecipes.concat(data);
}

console.log(`Total recipes loaded: ${allRecipes.length}`);

// Verify IDs and required fields
const valid = allRecipes.every((r, idx) => {
  const expectedId = String(idx + 1).padStart(2, '0');
  const hasFields = r.id === expectedId && r.title && r.hook && r.meta && r.ingredients && r.instructions && r.chefs_tip;
  if (!hasFields) {
    console.error(`Invalid recipe at index ${idx}:`, r);
  }
  return hasFields;
});

if (valid && allRecipes.length === 40) {
  fs.writeFileSync(path.join(baseDir, 'recipes_data.json'), JSON.stringify(allRecipes, null, 2), 'utf8');
  console.log('SUCCESS: recipes_data.json successfully generated with all 40 Christmas Dinner recipes!');
} else {
  console.error('FAILED validation.');
  process.exit(1);
}
