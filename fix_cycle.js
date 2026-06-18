const fs = require('fs');

const path = 'C:\\Users\\foxky\\.gemini\\antigravity\\scratch\\dnd-pwa\\app.js';
let c = fs.readFileSync(path, 'utf8');

const searchFn = `  window.cycleDistanceUnit = function(event) {
    if (event) event.stopPropagation();
    let current = localStorage.getItem("dnd55-distance-unit") || "pies";
    if (current === "pies") current = "metros";
    else if (current === "metros") current = "casillas";
    else current = "pies";
    
    localStorage.setItem("dnd55-distance-unit", current);
    
    if (typeof renderActiveCharacter === 'function') renderActiveCharacter();
    if (typeof renderSpellsTab === 'function') renderSpellsTab();
    if (typeof renderCombatSection === 'function' && typeof getActiveCharacter === 'function') {
      const char = getActiveCharacter();
      if (char) renderCombatSection(char);
    }
  };`;

const replaceFn = `  window.cycleDistanceUnit = function(event) {
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

// Use a more relaxed regex to catch the whole function block just in case indentation differs
const regex = /  window\.cycleDistanceUnit = function\(event\) \{[\s\S]*?renderCombatSection\(char\);\s*\}\s*\};/m;

if (regex.test(c)) {
  c = c.replace(regex, replaceFn);
  fs.writeFileSync(path, c, 'utf8');
  console.log("SUCCESS");
} else {
  console.log("NOT FOUND. Let's try exact string.");
  if (c.includes(searchFn)) {
      c = c.replace(searchFn, replaceFn);
      fs.writeFileSync(path, c, 'utf8');
      console.log("SUCCESS EXACT");
  } else {
      console.log("STILL NOT FOUND");
  }
}
