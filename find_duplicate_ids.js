const fs = require('fs');

const htmlPath = 'C:/Users/foxky/.gemini/antigravity/scratch/dnd-pwa/index.html';
const content = fs.readFileSync(htmlPath, 'utf8');

const idRegex = /id=["']([^"']+)["']/g;
const ids = {};
let match;
let duplicatesCount = 0;

while ((match = idRegex.exec(content)) !== null) {
  const id = match[1];
  if (ids[id]) {
    ids[id]++;
    duplicatesCount++;
    console.log(`Duplicate ID found: "${id}" (Count: ${ids[id]})`);
  } else {
    ids[id] = 1;
  }
}

if (duplicatesCount === 0) {
  console.log('SUCCESS: No duplicate IDs found in index.html!');
} else {
  console.log(`Total duplicate IDs found: ${duplicatesCount}`);
}
