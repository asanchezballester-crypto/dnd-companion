const fs = require('fs');
const path = 'C:\\Users\\foxky\\.gemini\\antigravity\\scratch\\dnd-pwa\\app.js';
let c = fs.readFileSync(path, 'utf8');

// 1. INJECT UI FUNCTIONS
const uiFns = `
function populateMulticlassUI(char) {
  const container = document.getElementById("multiclassContainer");
  if (!container) return;
  container.innerHTML = "";
  if (char && char.multiclasses) {
    char.multiclasses.forEach(mc => {
      addMulticlassRow(mc.class, mc.subclass, mc.level);
    });
  }
}

function addMulticlassRow(cls = "Guerrero", sub = "", lvl = 1) {
  const container = document.getElementById("multiclassContainer");
  if (!container) return;
  
  const div = document.createElement("div");
  div.style.cssText = "display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px; position: relative;";
  
  const idPrefix = 'mc_' + Date.now() + Math.random().toString(36).substr(2,5);
  
  // HTML Structure
  div.innerHTML = \`
    <div style="flex: 2; display: flex; flex-direction: column; gap: 4px;">
      <select class="form-select mc-class" id="\${idPrefix}_class" onchange="updateSubclassDropdown(this.value, '\${idPrefix}_subclass')">
        <option value="Guerrero">Guerrero</option>
        <option value="Mago">Mago</option>
        <option value="Clérigo">Clérigo</option>
        <option value="Pícaro">Pícaro</option>
        <option value="Bardo">Bardo</option>
        <option value="Druida">Druida</option>
        <option value="Bárbaro">Bárbaro</option>
        <option value="Hechicero">Hechicero</option>
        <option value="Brujo">Brujo</option>
        <option value="Paladín">Paladín</option>
        <option value="Explorador">Explorador</option>
        <option value="Monje">Monje</option>
      </select>
      <select class="form-select mc-subclass" id="\${idPrefix}_subclass"></select>
    </div>
    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <label style="font-size:10px;">Niv</label>
      <input type="number" class="form-input mc-level" value="\${lvl}" min="1" max="20" style="padding: 4px; text-align: center; width: 100%;">
    </div>
    <button type="button" onclick="this.parentElement.remove()" style="background: none; border: none; color: #ff5555; font-size: 18px; cursor: pointer; padding: 0 5px;" title="Eliminar">&times;</button>
  \`;
  
  container.appendChild(div);
  
  // Set class & trigger subclass update
  const classSelect = div.querySelector('.mc-class');
  classSelect.value = cls;
  updateSubclassDropdown(cls, \`\${idPrefix}_subclass\`, sub);
}

function getMulticlassesFromUI() {
  const container = document.getElementById("multiclassContainer");
  if (!container) return [];
  const rows = container.children;
  const arr = [];
  for(let i=0; i<rows.length; i++) {
    const cls = rows[i].querySelector('.mc-class').value;
    const sub = rows[i].querySelector('.mc-subclass').value;
    const lvl = parseInt(rows[i].querySelector('.mc-level').value) || 1;
    arr.push({class: cls, subclass: sub, level: lvl});
  }
  return arr;
}
`;

if (!c.includes('populateMulticlassUI')) {
  c = c.replace('function openEditCharacterModal() {', uiFns + '\nfunction openEditCharacterModal() {');
}

// 2. INJECT INTO openEditCharacterModal
if (!c.includes('if(typeof populateMulticlassUI === "function") populateMulticlassUI(char);')) {
  c = c.replace("switchEditTab('editTabBasic');", 'if(typeof populateMulticlassUI === "function") populateMulticlassUI(char);\n  switchEditTab(\'editTabBasic\');');
}

// 3. INJECT INTO editCharacterSubmit
if (!c.includes('char.multiclasses = getMulticlassesFromUI();')) {
  c = c.replace('char.class = document.getElementById("editCharClass").value;', 'char.class = document.getElementById("editCharClass").value;\n  char.multiclasses = getMulticlassesFromUI();');
}

// 4. INJECT INTO createCharacterSubmit
if (!c.includes('newChar.multiclasses = getMulticlassesFromUI();')) {
  c = c.replace('class: document.getElementById("newCharClass").value,', 'class: document.getElementById("newCharClass").value,\n    multiclasses: getMulticlassesFromUI(),');
}

// 5. UPDATE renderActiveCharacter header display
const headerSearch = 'document.getElementById("charRaceClassLvl").innerHTML = `<span>${raceDisplay}</span>, <span>${classDisplay} ${char.subclass ? \'(\'+translateVal(char.subclass)+\')\' : \'\'}</span> ${lvlLabel} <span>${char.level}</span>`;';
const headerReplace = `
    let classStr = \`<span>\${classDisplay} \${char.subclass ? '('+translateVal(char.subclass)+')' : ''} \${char.level}</span>\`;
    if (char.multiclasses && char.multiclasses.length > 0) {
      char.multiclasses.forEach(mc => {
        classStr += \` / <span>\${translateVal(mc.class)} \${mc.subclass ? '('+translateVal(mc.subclass)+')' : ''} \${mc.level}</span>\`;
      });
    }
    document.getElementById("charRaceClassLvl").innerHTML = \`<span>\${raceDisplay}</span>, \${classStr} - \${lvlLabel} <span>\${window.getTotalLevel(char)}</span>\`;
`;

if (c.includes(headerSearch)) {
  c = c.replace(headerSearch, headerReplace);
} else {
  console.log("Could not find charRaceClassLvl replacement string");
}

fs.writeFileSync(path, c, 'utf8');
console.log('Patch UI step applied.');
