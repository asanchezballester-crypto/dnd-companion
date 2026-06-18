const fs = require('fs');

// Read logo base64 (utf8)
const logoB64 = fs.readFileSync('logo_b64.txt', 'utf8').trim();

let appCode = fs.readFileSync('app.js', 'utf8');

// Locate function boundaries
const startIdx = appCode.indexOf('function buildCharacterPrintHTML(char) {');
const endIdx = appCode.indexOf('function buildSpellPrintHTML(char) {');
if (startIdx === -1 || endIdx === -1) {
  console.error('Cannot find function boundaries');
  process.exit(1);
}

// New implementation of buildCharacterPrintHTML with logo integration
const newFunc = `function buildCharacterPrintHTML(char) {
  const lang = localStorage.getItem("dnd55_language") || "es";
  const isEn = lang === "en";
  const eff = getEffectiveAttributes(char);
  const prof = char.profBonus || 2;
  const profSaves = getClassSavingThrowProficiencies(char.class);
  const bgText = char.background || (isEn ? "No Background" : "Sin Trasfondo");
  const inspCircle = '<div class="epic-insp-circle"></div>';
  let html = `
<div class="epic-sheet" id="printArea">
  <!-- HEADER -->
  <div class="epic-header">
    <div class="epic-logo"><img src="${logoB64}" class="epic-logo-img"/></div>
    <div class="epic-main-info">
      <div class="epic-char-name">${char.name}</div>
      <div class="epic-char-meta"><span>${char.class} ${char.level}</span> | <span>${bgText}</span> | <span>${char.race}${char.subrace ? ' (${char.subrace})' : ''}</span></div>
    </div>
    <div class="epic-right-info">
      <div class="epic-insp"><div class="epic-label">${isEn ? 'Inspiration' : 'Inspiración'}</div>${inspCircle}</div>
      <div class="epic-prof"><div class="epic-label">${isEn ? 'Prof. Bonus' : 'Bonif. Comp.'}</div><div class="epic-prof-val">+${prof}</div></div>
    </div>
  </div>
`;
  // Append the rest of the original function body after the header (attributes, skills, etc.)
  const originalBodyStart = appCode.indexOf('\n', startIdx + 'function buildCharacterPrintHTML(char) {'.length) + 1;
  const originalBody = appCode.slice(originalBodyStart, endIdx);
  html += originalBody;
  return html;
}`;

// Replace the old function with the new one
appCode = appCode.substring(0, startIdx) + newFunc + appCode.substring(endIdx);

// Also replace any logo references in the spell print function (if present)
appCode = appCode.replace(/src=\"sqlito_logo\.jpg\"/g, `src="${logoB64}"`);

fs.writeFileSync('app.js', appCode);
console.log('Epic layout HTML rebuilt');
