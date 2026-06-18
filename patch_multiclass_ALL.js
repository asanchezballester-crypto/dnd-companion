const fs = require('fs');
const path = 'C:\\Users\\foxky\\.gemini\\antigravity\\scratch\\dnd-pwa\\app.js';
let c = fs.readFileSync(path, 'utf8');

// --- 1. UTILS ---
const utils = `
window.getTotalLevel = function(char) {
  let lvl = parseInt(char.level) || 1;
  if (char.multiclasses && char.multiclasses.length > 0) {
    char.multiclasses.forEach(mc => { lvl += (parseInt(mc.level) || 1); });
  }
  return lvl;
};

window.getAllClasses = function(char) {
  const classes = [{ class: char.class, subclass: char.subclass, level: char.level }];
  if (char.multiclasses && char.multiclasses.length > 0) {
    classes.push(...char.multiclasses);
  }
  return classes;
};
`;

if (!c.includes('window.getTotalLevel')) {
  c = utils + '\n' + c;
}

// --- 2. PROFICIENCY ---
c = c.replace(/char\.profBonus \|\| Math\.ceil\(\(char\.level \|\| 1\) \/ 4\) \+ 1/g, 'char.profBonus || Math.ceil((window.getTotalLevel(char) || 1) / 4) + 1');

// --- 3. UI FUNCTIONS ---
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

if (!c.includes('if(typeof populateMulticlassUI === "function") populateMulticlassUI(char);')) {
  c = c.replace("switchEditTab('editTabBasic');", 'if(typeof populateMulticlassUI === "function") populateMulticlassUI(char);\n  switchEditTab(\'editTabBasic\');');
}

if (!c.includes('char.multiclasses = getMulticlassesFromUI();')) {
  c = c.replace('char.class = document.getElementById("editCharClass").value;', 'char.class = document.getElementById("editCharClass").value;\n  char.multiclasses = getMulticlassesFromUI();');
}

if (!c.includes('newChar.multiclasses = getMulticlassesFromUI();')) {
  c = c.replace('class: document.getElementById("newCharClass").value,', 'class: document.getElementById("newCharClass").value,\n    multiclasses: getMulticlassesFromUI(),');
}

// --- 4. HEADER RENDER ---
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
c = c.replace(headerSearch, headerReplace);

// --- 5. SETUP SPELL SLOTS ---
c = c.replace(/function setupDefaultSpellSlots\(char\) \{[\s\S]*?\}\n\nfunction openEditCharacterModal\(\) \{/, 
`function setupDefaultSpellSlots(char) {
  const fullcasters = ["Mago", "Hechicero", "Clérigo", "Bardo", "Druida"];
  const halfcasters = ["Paladín", "Explorador"];
  const thirdcasters = [
    { class: "Guerrero", subclass: "Caballero Arcano" },
    { class: "Pícaro", subclass: "Embaucador Arcano" }
  ];

  if (!char.spellSlots) char.spellSlots = {};
  for (let i = 1; i <= 5; i++) {
    char.spellSlots[i] = { current: 0, max: 0 };
  }
  char.pactSlots = { level: 0, current: 0, max: 0 };

  let effectiveLevel = 0;
  let warlockLvl = 0;
  
  const classes = window.getAllClasses ? window.getAllClasses(char) : [{class: char.class, subclass: char.subclass, level: char.level}];
  
  classes.forEach(c => {
    const lvl = parseInt(c.level) || 1;
    if (fullcasters.includes(c.class)) {
      effectiveLevel += lvl;
    } else if (halfcasters.includes(c.class)) {
      effectiveLevel += Math.ceil(lvl / 2);
    } else {
      const isThird = thirdcasters.some(tc => tc.class === c.class && tc.subclass === c.subclass);
      if (isThird) {
        effectiveLevel += Math.ceil(lvl / 3);
      }
    }
    if (c.class === "Brujo") {
      warlockLvl += lvl;
    }
  });

  if (effectiveLevel > 0) {
    const fullCasterSlots = {
      1: [2, 0, 0, 0, 0], 2: [3, 0, 0, 0, 0], 3: [4, 2, 0, 0, 0], 4: [4, 3, 0, 0, 0], 5: [4, 3, 2, 0, 0],
      6: [4, 3, 3, 0, 0], 7: [4, 3, 3, 1, 0], 8: [4, 3, 3, 2, 0], 9: [4, 3, 3, 3, 1], 10: [4, 3, 3, 3, 2],
      11: [4, 3, 3, 3, 2], 12: [4, 3, 3, 3, 2], 13: [4, 3, 3, 3, 2], 14: [4, 3, 3, 3, 2], 15: [4, 3, 3, 3, 2],
      16: [4, 3, 3, 3, 2], 17: [4, 3, 3, 3, 2], 18: [4, 3, 3, 3, 3], 19: [4, 3, 3, 3, 3], 20: [4, 3, 3, 3, 3]
    };
    
    const lvlKey = Math.min(20, effectiveLevel);
    const slots = fullCasterSlots[lvlKey] || [0, 0, 0, 0, 0];
    
    for (let i = 1; i <= 5; i++) {
      char.spellSlots[i].max = slots[i-1];
      char.spellSlots[i].current = slots[i-1];
    }
  }

  if (warlockLvl > 0) {
    const warlockSlotsByLvl = {
      1: { count: 1, level: 1 }, 2: { count: 2, level: 1 }, 3: { count: 2, level: 2 }, 4: { count: 2, level: 2 },
      5: { count: 2, level: 3 }, 6: { count: 2, level: 3 }, 7: { count: 2, level: 4 }, 8: { count: 2, level: 4 },
      9: { count: 2, level: 5 }, 10: { count: 2, level: 5 }, 11: { count: 3, level: 5 }, 12: { count: 3, level: 5 },
      13: { count: 3, level: 5 }, 14: { count: 3, level: 5 }, 15: { count: 3, level: 5 }, 16: { count: 3, level: 5 },
      17: { count: 4, level: 5 }, 18: { count: 4, level: 5 }, 19: { count: 4, level: 5 }, 20: { count: 4, level: 5 }
    };
    const pactInfo = warlockSlotsByLvl[Math.min(20, warlockLvl)] || { count: 1, level: 1 };
    char.pactSlots.max = pactInfo.count;
    char.pactSlots.current = pactInfo.count;
    char.pactSlots.level = pactInfo.level;
  }
}

function openEditCharacterModal() {`);

// --- 6. SPELL SLOTS UI ---
c = c.replace(/function renderSpellSlots\(\) \{[\s\S]*?slotsGrid\.appendChild\(card\);\s*\}\s*\}/, 
`function renderSpellSlots() {
  const char = getActiveCharacter();
  if (!char) return;

  const slotsGrid = document.getElementById("spellSlotsGrid");
  if (!slotsGrid) return;

  slotsGrid.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const slot = char.spellSlots[i] || { current: 0, max: 0 };
    
    // Crear contenedor de burbujas
    let bubblesHTML = "";
    for (let b = 0; b < slot.max; b++) {
      const activeClass = b < slot.current ? "active" : "";
      bubblesHTML += \`<div class="slot-bubble \${activeClass}" onclick="updateSlotBubble(\${i}, \${b})" title="Slot de Nivel \${i} (\${b < slot.current ? 'Disponible' : 'Gastado'})"></div>\`;
    }

    if (slot.max === 0) {
      bubblesHTML = \`<span style="font-size:10px;color:var(--text-dim);font-style:italic;">Sin slots</span>\`;
    }

    const card = document.createElement("div");
    card.className = "spell-slot-card";
    card.innerHTML = \`
      <div class="spell-slot-lvl">Nivel \${i}</div>
      <div class="spell-slot-bubbles">\${bubblesHTML}</div>
      <div class="slot-edit-vals">
        <input type="number" class="slot-input" value="\${slot.current}" min="0" max="\${slot.max}" onchange="handleSlotInputChange(\${i}, 'curr', this.value)" title="Disponibles">
        <span>/</span>
        <input type="number" class="slot-input" value="\${slot.max}" min="0" max="9" onchange="handleSlotInputChange(\${i}, 'max', this.value)" title="Máximos">
      </div>
    \`;
    slotsGrid.appendChild(card);
  }

  // PACT SLOTS (BRUJO)
  if (char.pactSlots && char.pactSlots.max > 0) {
    const pslot = char.pactSlots;
    let pbubblesHTML = "";
    for (let b = 0; b < pslot.max; b++) {
      const activeClass = b < pslot.current ? "active" : "";
      pbubblesHTML += \`<div class="slot-bubble pact-bubble \${activeClass}" onclick="updatePactBubble(\${b})" title="Pact Slot de Nivel \${pslot.level} (\${b < pslot.current ? 'Disponible' : 'Gastado'})"></div>\`;
    }

    const card = document.createElement("div");
    card.className = "spell-slot-card pact-slot-card";
    card.innerHTML = \`
      <div class="spell-slot-lvl pact-slot-lvl">Pacto L\${pslot.level}</div>
      <div class="spell-slot-bubbles">\${pbubblesHTML}</div>
      <div class="slot-edit-vals">
        <input type="number" class="slot-input" value="\${pslot.current}" min="0" max="\${pslot.max}" onchange="handlePactInputChange('curr', this.value)" title="Disponibles">
        <span>/</span>
        <input type="number" class="slot-input" value="\${pslot.max}" min="0" max="9" onchange="handlePactInputChange('max', this.value)" title="Máximos">
      </div>
    \`;
    slotsGrid.appendChild(card);
  }
}

// Handler functions for Pact Slots
window.updatePactBubble = function(bubbleIndex) {
  const char = getActiveCharacter();
  if (!char || !char.pactSlots) return;
  
  if (bubbleIndex === 0 && char.pactSlots.current === 1) {
    char.pactSlots.current = 0;
  } else {
    char.pactSlots.current = bubbleIndex + 1;
  }
  saveData();
  renderSpellSlots();
};

window.handlePactInputChange = function(type, val) {
  const char = getActiveCharacter();
  if (!char || !char.pactSlots) return;
  const num = parseInt(val) || 0;
  if (type === 'curr') char.pactSlots.current = num;
  else if (type === 'max') char.pactSlots.max = num;
  saveData();
  renderSpellSlots();
};
`);

// --- 7. ORIGIN TRAITS COMBINED ---
const searchOriginTraits = `const subclassTraits = (window.SUBCLASS_TRAITS_DB && char.subclass) ? window.SUBCLASS_TRAITS_DB[char.subclass] : null;`;
const replaceOriginTraits = `
  const classes = window.getAllClasses ? window.getAllClasses(char) : [{class: char.class, subclass: char.subclass, level: char.level}];
  let subclassTraits = [];
  if (window.SUBCLASS_TRAITS_DB) {
    classes.forEach(cls => {
      if (cls.subclass && window.SUBCLASS_TRAITS_DB[cls.subclass]) {
        const traitsForLvl = window.SUBCLASS_TRAITS_DB[cls.subclass].filter(t => t.level <= (parseInt(cls.level)||1));
        traitsForLvl.forEach(t => {
          t.className = cls.class;
        });
        subclassTraits = subclassTraits.concat(traitsForLvl);
      }
    });
  }
`;

if (c.includes(searchOriginTraits)) {
  c = c.replace(searchOriginTraits, replaceOriginTraits);
  c = c.replace('!subclassTraits', '(subclassTraits.length === 0)');
  
  const replaceSubclassBlock = `
    // 3. RASGOS DE SUBCLASE (Multiclase)
    if (subclassTraits && subclassTraits.length > 0) {
      html += \`<h3 style="font-size:12px;color:var(--gold-bright);margin-top:14px;margin-bottom:8px;text-transform:uppercase;border-bottom:1px dashed var(--gold-dark);padding-bottom:2px;letter-spacing:0.05em;">Rasgos de Clase/Subclase</h3>\`;
      subclassTraits.forEach(tr => {
        html += \`
          <div class="trait-item" style="margin-bottom:8px;">
            <div class="trait-name" style="font-weight:600;font-size:12px;color:var(--gold);">\${tr.name} <span style="font-size:10px;color:var(--text-dim);">(\${tr.className})</span></div>
            <div class="trait-desc" style="font-size:11px;color:var(--text-dim);margin-top:2px;line-height:1.3;">\${tr.desc}</div>
          </div>
        \`;
      });
    }`;
    c = c.replace(/\/\/\s*3\.\s*RASGOS DE SUBCLASE[\s\S]*?\}\s*\}/, replaceSubclassBlock);
}

// --- 8. PRINT HTML SUBCLASS ---
c = c.replace(/const subclassTraits = \(window\.SUBCLASS_TRAITS_DB && char\.subclass\) \? window\.SUBCLASS_TRAITS_DB\[char\.subclass\] : null;\s*if \(subclassTraits\) \{\s*subclassTraits\.filter\(t => t\.level <= char\.level\)\.forEach\(t => \{ featuresHtml \+= `<div class="epic-line"><strong>\$\{t\.name\}:<\/strong> \$\{t\.desc\}<\/div>`; \}\);\s*\}/g, `
    const classes = window.getAllClasses ? window.getAllClasses(char) : [{class: char.class, subclass: char.subclass, level: char.level}];
    if (window.SUBCLASS_TRAITS_DB) {
      classes.forEach(cls => {
        if (cls.subclass && window.SUBCLASS_TRAITS_DB[cls.subclass]) {
          const traitsForLvl = window.SUBCLASS_TRAITS_DB[cls.subclass].filter(t => t.level <= (parseInt(cls.level)||1));
          traitsForLvl.forEach(t => {
            featuresHtml += \`<div class="epic-line"><strong>\${t.name} (\${cls.subclass}):</strong> \${t.desc}</div>\`;
          });
        }
      });
    }
`);

fs.writeFileSync(path, c, 'utf8');
console.log('ALL PATCHES APPLIED SAFELY!');
