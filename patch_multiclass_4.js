const fs = require('fs');
const path = 'C:\\Users\\foxky\\.gemini\\antigravity\\scratch\\dnd-pwa\\app.js';
let c = fs.readFileSync(path, 'utf8');

const targetFunction = `function renderSpellSlots() {
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
`;

const replaceRegex = /function renderSpellSlots\(\) \{[\s\S]*?slotsGrid\.appendChild\(card\);\s*\}\s*\}/;

if (replaceRegex.test(c)) {
  c = c.replace(replaceRegex, targetFunction);
  fs.writeFileSync(path, c, 'utf8');
  console.log("Patch step 4 applied.");
} else {
  console.log("Regex failed to find renderSpellSlots");
}
