const fs = require('fs');
const path = 'C:\\Users\\foxky\\.gemini\\antigravity\\scratch\\dnd-pwa\\app.js';
let c = fs.readFileSync(path, 'utf8');

// 1. Fix: cycleDistanceUnit closing the spell details.
// Don't call renderSpellsTab(), just update DOM.
const oldCycle = `  window.cycleDistanceUnit = function(event) {
    if (event) event.stopPropagation();
    let current = localStorage.getItem("dnd55-distance-unit") || "pies";
    if (current === "pies") current = "metros";
    else if (current === "metros") current = "casillas";
    else current = "pies";
    
    localStorage.setItem("dnd55-distance-unit", current);
    
    const expandedIds = Array.from(document.querySelectorAll('.spell-row.expanded')).map(el => el.id);
    
    if (typeof renderActiveCharacter === 'function') renderActiveCharacter();
    if (typeof renderSpellsTab === 'function') renderSpellsTab();
    if (typeof renderCombatSection === 'function' && typeof getActiveCharacter === 'function') {
      const char = getActiveCharacter();
      if (char) renderCombatSection(char);
    }
    
    expandedIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('expanded');
    });
  };`;
const newCycle = `  window.cycleDistanceUnit = function(event) {
    if (event) event.stopPropagation();
    let current = localStorage.getItem("dnd55-distance-unit") || "pies";
    if (current === "pies") current = "metros";
    else if (current === "metros") current = "casillas";
    else current = "pies";
    
    localStorage.setItem("dnd55-distance-unit", current);
    
    // Solo actualizar los span con clase distance-val
    document.querySelectorAll('.distance-val').forEach(el => {
      const orig = el.getAttribute('data-orig');
      if (orig) el.innerHTML = window.formatDistance(orig);
    });
  };`;
c = c.replace(oldCycle, newCycle);

// 2. Fix buildSpellRow bugs
// Use regex to locate buildSpellRow function up to its return.
// We'll replace the problematic lines.
// First: the component duplication.
c = c.replace(/<div><span>Componentes:<\/span> \$\{spell\.components\} \$\{compsHTML\}<\/div>/g, '<div><span>Componentes:</span> ${spell.components}</div>');

// Replace cycleDistanceUnit call in buildSpellRow to include data-orig
c = c.replace(/<span onclick="window\.cycleDistanceUnit\(event\)" style="cursor:pointer; border-bottom: 1px dashed currentColor;" title="Cambiar unidad">\$\{window\.formatDistance\(translateVal\(spell\.range\)\)\}<\/span>/g, '<span class="distance-val" data-orig="${translateVal(spell.range)}" onclick="window.cycleDistanceUnit(event)" style="cursor:pointer; border-bottom: 1px dashed currentColor;" title="Cambiar unidad">${window.formatDistance(translateVal(spell.range))}</span>');

// Fix Atq/CD showing on all spells.
// We need to inject the logic to hide them if mech is not attack/save.
// Find where atkBonusHTML and saveCdHTML are set.
const oldAtkSave = `    atkBonusHTML = \`<span class="spell-mechanic">Atq: +\${atkBonusVal}</span>\`;
    saveCdHTML = \`<span class="spell-mechanic">CD: \${saveCd}</span>\`;`;
const newAtkSave = `    const mech = getSpellMechanics(spell, char);
    if (mech.type === "attack" || (spell.description || "").toLowerCase().includes("tirada de ataque") || (spell.description || "").toLowerCase().includes("ataque de conjuro")) {
      atkBonusHTML = \`<span class="spell-mechanic">Atq: +\${atkBonusVal}</span>\`;
    }
    if (mech.type === "save" || (spell.description || "").toLowerCase().includes("tirada de salvación")) {
      saveCdHTML = \`<span class="spell-mechanic">CD: \${saveCd}</span>\`;
    }`;
c = c.replace(oldAtkSave, newAtkSave);

// 3. Fix createCharacterSubmit crashing
// Let's wrap its contents in try/catch and alert the error so we can see what's wrong.
const createCharStart = `function createCharacterSubmit(e) {
  e.preventDefault();`;
const newCreateCharStart = `function createCharacterSubmit(e) {
  e.preventDefault();
  try {`;
const createCharEnd = `  switchTab('ficha');
}`;
const newCreateCharEnd = `  switchTab('ficha');
  } catch (err) {
    alert("Error al crear personaje: " + err.message + "\\n" + err.stack);
    console.error(err);
  }
}`;
c = c.replace(createCharStart, newCreateCharStart);
c = c.replace(createCharEnd, newCreateCharEnd);

fs.writeFileSync(path, c, 'utf8');
console.log('Bugs patched.');
