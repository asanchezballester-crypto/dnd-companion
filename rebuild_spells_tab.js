const fs = require('fs');
const path = './app.js';
let content = fs.readFileSync(path, 'utf8');
console.log('Read app.js length:', content.length);
