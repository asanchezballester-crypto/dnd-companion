const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const lines = content.split('\n');

console.log('Searching for .name accesses in app.js...');

lines.forEach((line, index) => {
  const lineNum = index + 1;
  // Match things like obj.name, but not classResource?.name or subclassResource?.name or other optional chains
  // We want to find any raw obj.name
  if (line.includes('.name') && !line.includes('?.name')) {
    console.log(`${lineNum}: ${line.trim()}`);
  }
});
