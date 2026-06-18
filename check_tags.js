const fs = require('fs');

const htmlPath = 'C:/Users/foxky/.gemini/antigravity/scratch/dnd-pwa/index.html';
const content = fs.readFileSync(htmlPath, 'utf8');

// Extract the editCharModal text
const startIdx = content.indexOf('<div id="editCharModal"');
const endIdx = content.indexOf('<!-- MODAL: AÑADIR/EDITAR OBJETO -->');

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find editCharModal boundaries');
  process.exit(1);
}

const modalHtml = content.substring(startIdx, endIdx);

// Parse tags manually to check for mismatches
const stack = [];
const tagRegex = /<\/?([a-zA-Z0-9:-]+)(\s+[^>]*)?>/g;
let match;
let lineNum = 1;
const lines = modalHtml.split('\n');

lines.forEach((line, index) => {
  let innerMatch;
  while ((innerMatch = tagRegex.exec(line)) !== null) {
    const tagName = innerMatch[1].toLowerCase();
    const isClose = innerMatch[0].startsWith('</');
    const isSelfClosing = innerMatch[0].endsWith('/>') || ['input', 'br', 'hr', 'img', 'meta', 'link'].includes(tagName);
    
    if (isSelfClosing) continue;
    
    if (!isClose) {
      stack.push({ tag: tagName, line: index + 1, text: innerMatch[0] });
    } else {
      if (stack.length === 0) {
        console.error(`Error: Closed tag </${tagName}> on line ${index + 1} with no opening tag!`);
      } else {
        const last = stack.pop();
        if (last.tag !== tagName) {
          console.error(`Error: Mismatched tag! Opened <${last.tag}> on line ${last.line} but closed </${tagName}> on line ${index + 1}`);
        }
      }
    }
  }
});

console.log(`Remaining open tags on stack: ${stack.length}`);
stack.forEach(t => console.log(`- Open <${t.tag}> on line ${t.line}`));
