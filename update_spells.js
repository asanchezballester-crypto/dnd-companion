const fs = require('fs');
const path = './app.js';
let content = fs.readFileSync(path, 'utf8');

// The new renderSpellsTab
const newRenderSpellsTab = `function renderSpellsTab() {
  console.log('[Spells] renderSpellsTab called. SPELLS_DB type:', typeof SPELLS_DB, 'length:', (Array.isArray(SPELLS_DB) ? SPELLS_DB.length : 'NOT ARRAY'));
  const char = getActiveCharacter();
  if (!char) { 
    console.warn('[Spells] No active character');
    const listPrepared = document.getElementById("spellsListPrepared");
    const listKnown = document.getElementById("spellsListKnown");
    const listSearch = document.getElementById("spellsListSearch");
    if (listPrepared) listPrepared.innerHTML = \`<div class="text-center mt-2" style="color:#ffaa00;font-weight:bold;font-size:14px;padding:20px;">⚠️ Por favor, crea un personaje en la pestaña "Ficha" para poder ver y buscar conjuros.</div>\`;
    if (listKnown) listKnown.innerHTML = "";
    if (listSearch) listSearch.innerHTML = "";
    return; 
  }

  if (!char.spells) char.spells = [];
  if (!char.preparedSpells) char.preparedSpells = [];
  if (!char.spellFavorites) char.spellFavorites = [];

  // Primero renderizar ranuras
  renderSpellSlots();

  const searchInput = document.getElementById("spellSearch");
  const lvlFilter = document.getElementById("filterSpellLvl");
  const classFilter = document.getElementById("filterSpellClass");
  const ritualFilter = document.getElementById("filterSpellRitual");

  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const selectedLvl = lvlFilter ? lvlFilter.value : "all";
  const selectedClass = classFilter ? classFilter.value : "all";
  const onlyRituals = ritualFilter ? ritualFilter.checked : false;

  const listPrepared = document.getElementById("spellsListPrepared");
  const listKnown = document.getElementById("spellsListKnown");
  const listSearch = document.getElementById("spellsListSearch");

  if (!listPrepared || !listSearch || !listKnown) return;

  // Filtrar los conjuros que el personaje CONOCE (Libro)
  const mySpellIds = char.spells || [];
  const mySpells = SPELLS_DB.filter(s => mySpellIds.includes(s.id));

  // --- 1. RENDERIZAR CONJUROS PREPARADOS ---
  listPrepared.innerHTML = "";
  const prepSpellIds = char.preparedSpells || [];
  const prepSpells = mySpells.filter(s => prepSpellIds.includes(s.id));

  if (prepSpells.length === 0) {
    listPrepared.innerHTML = \`<div class="text-center mt-2" style="color:var(--text-dim);font-style:italic;font-size:13px;">No tienes conjuros preparados. Selecciona "Preparar" en tu Libro de Conjuros.</div>\`;
  } else {
    // Sort prepared
    const sortedPrepSpells = [...prepSpells].sort((a, b) => {
      const aFav = char.spellFavorites.includes(a.id);
      const bFav = char.spellFavorites.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      if (a.level !== b.level) return a.level - b.level;
      return a.name.localeCompare(b.name);
    });

    sortedPrepSpells.forEach(spell => {
      const isFav = char.spellFavorites.includes(spell.id);
      const row = createSpellRowHTML(spell, 'prepared', isFav);
      listPrepared.appendChild(row);
    });
  }

  // --- 2. RENDERIZAR LIBRO DE CONJUROS (CONOCIDOS) ---
  listKnown.innerHTML = "";
  if (mySpells.length === 0) {
    listKnown.innerHTML = \`<div class="text-center mt-2" style="color:var(--text-dim);font-style:italic;font-size:13px;">Tu libro de conjuros está vacío. Usa el buscador abajo para añadir nuevos hechizos.</div>\`;
  } else {
    const sortedKnownSpells = [...mySpells].sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      return a.name.localeCompare(b.name);
    });

    sortedKnownSpells.forEach(spell => {
      const isFav = char.spellFavorites.includes(spell.id);
      const row = createSpellRowHTML(spell, 'known', isFav);
      listKnown.appendChild(row);
    });
  }

  // --- 3. RENDERIZAR CONJUROS DE BÚSQUEDA ---
  listSearch.innerHTML = "";
  
  // Filtrar base de datos completa según términos de búsqueda
  const filteredDbSpells = SPELLS_DB.filter(spell => {
    // Filtro texto
    const matchesQuery = spell.name.toLowerCase().includes(query) || spell.description.toLowerCase().includes(query);
    // Filtro nivel
    const matchesLvl = selectedLvl === "all" || spell.level === parseInt(selectedLvl);
    // Filtro clase
    const matchesClass = selectedClass === "all" || spell.class.includes(selectedClass) || (typeof TRANSLATION_MAP !== "undefined" && TRANSLATION_MAP[selectedClass] && spell.class.includes(TRANSLATION_MAP[selectedClass]));
    // Filtro ritual
    const isRitual = spell.castTime && spell.castTime.toLowerCase().includes("ritual");
    const matchesRitual = !onlyRituals || isRitual;

    return matchesQuery && matchesLvl && matchesClass && matchesRitual;
  });

  if (filteredDbSpells.length === 0) {
    const dbLen = Array.isArray(SPELLS_DB) ? SPELLS_DB.length : 0;
    if (dbLen === 0) {
      listSearch.innerHTML = \`<div class="text-center mt-2" style="color:#ff4444;font-weight:bold;font-size:13px;">⚠️ Error: La base de datos de conjuros está vacía (SPELLS_DB=\${dbLen}). Recarga con Ctrl+Shift+R.</div>\`;
    } else {
      listSearch.innerHTML = \`<div class="text-center mt-2" style="color:var(--text-dim);font-style:italic;font-size:13px;">No se encontraron conjuros con estos filtros. (Total DB: \${dbLen})</div>\`;
    }
  } else {
    // Mostrar lista completa resultante
    filteredDbSpells.forEach(spell => {
      const isAdded = mySpellIds.includes(spell.id);
      const isFav = char.spellFavorites.includes(spell.id);
      const row = createSpellRowHTML(spell, 'search', isFav, isAdded);
      listSearch.appendChild(row);
    });
  }
}`;

// The new createSpellRowHTML
const newCreateSpellRowHTML = `function createSpellRowHTML(spell, listType, isFav, isAdded = false) {
  const row = document.createElement("div");
  
  const char = getActiveCharacter();
  const isPrep = char && char.preparedSpells && char.preparedSpells.includes(spell.id);
  const isRitual = spell.castTime && spell.castTime.toLowerCase().includes("ritual");
  
  let rowClasses = "spell-row";
  if (isRitual) rowClasses += " spell-ritual-glow";
  
  row.className = rowClasses;
  row.id = \`spell-row-\${spell.id}-\${listType}\`;

  // Determinar clase de escuela de magia
  const schoolNormal = (spell.school || "").toLowerCase().trim();
  let schoolClass = "school-universal";
  if (schoolNormal.includes("evoc")) schoolClass = "school-evocation";
  else if (schoolNormal.includes("abjur")) schoolClass = "school-abjuration";
  else if (schoolNormal.includes("conjur")) schoolClass = "school-conjuration";
  else if (schoolNormal.includes("adivin") || schoolNormal.includes("divin")) schoolClass = "school-divination";
  else if (schoolNormal.includes("encant") || schoolNormal.includes("enchant")) schoolClass = "school-enchantment";
  else if (schoolNormal.includes("ilus") || schoolNormal.includes("illus")) schoolClass = "school-illusion";
  else if (schoolNormal.includes("nigrom") || schoolNormal.includes("necro")) schoolClass = "school-necromancy";
  else if (schoolNormal.includes("transm")) schoolClass = "school-transmutation";

  // Clases que lo usan como string
  const lang = localStorage.getItem("dnd55_language") || "es";
  const translatedClasses = spell.class.map(cls => translateVal(cls));
  const classesList = translatedClasses.join(", ");

  let actionButtonHTML = "";
  if (listType === 'prepared') {
    // Si está preparado, puede desprepararse, desmarcar como fav, o ver
    actionButtonHTML = \`
      <button class="fav-btn \${isFav ? 'active' : ''}" onclick="toggleSpellFav(event, '\${spell.id}')" title="Marcar Favorito">
        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
      <button class="btn-unprepare" onclick="toggleSpellPrepare(event, '\${spell.id}', false)" title="Despreparar">
        Quitar
      </button>
    \`;
  } else if (listType === 'known') {
    // En el libro: puede prepararse/desprepararse o borrarse de la ficha
    if (isPrep) {
      actionButtonHTML = \`
        <span style="color:var(--gold-bright); font-size:16px; margin-right:5px;" title="Preparado">★</span>
        <button class="btn-unprepare" onclick="toggleSpellPrepare(event, '\${spell.id}', false)" title="Despreparar">
          Quitar
        </button>
        <button class="action-btn delete" onclick="removeSpell(event, '\${spell.id}')" title="Olvidar del Libro">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      \`;
    } else {
      actionButtonHTML = \`
        <button class="btn-prepare" onclick="toggleSpellPrepare(event, '\${spell.id}', true)" title="Preparar Hechizo">
          Preparar
        </button>
        <button class="action-btn delete" onclick="removeSpell(event, '\${spell.id}')" title="Olvidar del Libro">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      \`;
    }
  } else {
    // Si está en el buscador, botón para añadir o quitar
    const addedClass = isAdded ? "added" : "";
    const titleText = isAdded ? "Quitar de Ficha" : "Añadir a Ficha";
    actionButtonHTML = \`
      <button class="spell-add-btn \${addedClass}" onclick="toggleSpellAdd(event, '\${spell.id}', \${isAdded})" title="\${titleText}">
        <svg viewBox="0 0 24 24">
          \${isAdded 
            ? '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>' // Checkmark
            : '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>' // Plus
          }
        </svg>
      </button>
    \`;
  }

  // Obtener mecánicas del conjuro si se va a renderizar en 'prepared' o se quiere usar
  // Calculamos bonificador de ataque y CD basándonos en la clase si coincide, o usando la mejor stat
  let atkBonusHTML = "";
  let saveCdHTML = "";

  if (char && spell.class && spell.class.length > 0) {
    const prof = calculateProficiency(char.level);
    let bestStat = "int";
    let bestMod = calculateModifier(char.int || 10);
    
    // Simplificación heurística para determinar la estadística de casteo
    if (spell.class.includes("Clérigo") || spell.class.includes("Druida") || spell.class.includes("Explorador") || spell.class.includes("Monje")) {
      bestStat = "wis";
      bestMod = calculateModifier(char.wis || 10);
    } else if (spell.class.includes("Bardo") || spell.class.includes("Paladín") || spell.class.includes("Hechicero") || spell.class.includes("Brujo")) {
      bestStat = "cha";
      bestMod = calculateModifier(char.cha || 10);
    }

    const atkBonus = prof + bestMod;
    const saveCd = 8 + prof + bestMod;
    
    atkBonusHTML = \`<span class="spell-mechanic">Atq: +\${atkBonus}</span>\`;
    saveCdHTML = \`<span class="spell-mechanic">CD: \${saveCd}</span>\`;
  }

  // Comprobar si requiere concentración
  const isConcentration = (spell.duration || "").toLowerCase().includes("concentra");
  const concentrationHTML = isConcentration ? '<span class="spell-concentration">C</span>' : "";

  // Componentes
  const comps = [];
  if ((spell.components || "").toLowerCase().includes("v")) comps.push("V");
  if ((spell.components || "").toLowerCase().includes("s")) comps.push("S");
  if ((spell.components || "").toLowerCase().includes("m")) comps.push("M");
  const compsHTML = comps.length > 0 ? \`<span class="spell-components">\${comps.join(", ")}</span>\` : "";

  // Mostrar el icono si es ritual
  const ritualIcon = isRitual ? '<span class="spell-ritual-icon" title="Ritual">🕯️</span>' : "";

  // Botones de Tirada interactivos (Solo en prepared o libro, para evitar clutter en buscador)
  let rollButtonsHTML = "";
  if (listType === 'prepared' || listType === 'known') {
    rollButtonsHTML = \`<div class="spell-roll-actions" style="margin-top: 10px; display: flex; gap: 8px;">\`;
    
    if ((spell.description || "").toLowerCase().includes("tirada de ataque") || (spell.description || "").toLowerCase().includes("ataque de conjuro")) {
       rollButtonsHTML += \`<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="rollSpellAttack('\${spell.id}')">🎲 Atacar</button>\`;
    }
    
    const damageMatch = spell.description.match(/(\\d+)d(\\d+)/);
    if (damageMatch) {
       rollButtonsHTML += \`<button class="btn btn-primary" style="padding: 4px 8px; font-size: 11px;" onclick="rollSpellDamage('\${spell.id}', \${damageMatch[1]}, \${damageMatch[2]})">💥 Daño (\${damageMatch[0]})</button>\`;
    }

    rollButtonsHTML += \`</div>\`;
  }

  row.innerHTML = \`
    <div class="spell-header" onclick="toggleSpellDetails('\${spell.id}', '\${listType}')">
      <div class="spell-name-col">
        <span class="spell-name">\${spell.name} \${ritualIcon}</span>
        <span class="spell-school \${schoolClass}">\${translateVal(spell.school)} • Nvl \${spell.level === 0 ? 'Truco' : spell.level}</span>
      </div>
      <div class="spell-actions">
        \${actionButtonHTML}
      </div>
    </div>
    <div class="spell-details" id="spell-details-\${spell.id}-\${listType}" style="display: none;">
      <div class="spell-meta">
        <div><strong>Tiempo:</strong> \${translateVal(spell.castTime)}</div>
        <div><strong>Alcance:</strong> \${translateVal(spell.range)}</div>
        <div><strong>Componentes:</strong> \${spell.components} \${compsHTML}</div>
        <div><strong>Duración:</strong> \${translateVal(spell.duration)} \${concentrationHTML}</div>
        <div style="grid-column: 1 / -1;"><strong>Clases:</strong> \${classesList}</div>
        <div style="grid-column: 1 / -1; display: flex; gap: 15px; margin-top: 5px;">
          \${atkBonusHTML}
          \${saveCdHTML}
        </div>
      </div>
      <p style="margin-top: 4px;">\${spell.description}</p>
      \${rollButtonsHTML}
    </div>
  \`;

  return row;
}`;

// The new toggle functions
const toggleFunctions = `
// Añadir / Quitar desde buscador
function toggleSpellAdd(event, spellId, isAdded) {
  event.stopPropagation(); // Evitar colapso
  const char = getActiveCharacter();
  if (!char) return;

  if (!char.spells) char.spells = [];
  if (!char.spellFavorites) char.spellFavorites = [];
  if (!char.preparedSpells) char.preparedSpells = [];

  if (isAdded) {
    char.spells = char.spells.filter(id => id !== spellId);
    char.spellFavorites = char.spellFavorites.filter(id => id !== spellId);
    char.preparedSpells = char.preparedSpells.filter(id => id !== spellId);
  } else {
    if (!char.spells.includes(spellId)) {
      char.spells.push(spellId);
    }
  }

  saveData();
  renderSpellsTab();
}

// Preparar / Despreparar
function toggleSpellPrepare(event, spellId, prepare) {
  event.stopPropagation();
  const char = getActiveCharacter();
  if (!char) return;

  if (!char.preparedSpells) char.preparedSpells = [];

  if (prepare) {
    if (!char.preparedSpells.includes(spellId)) {
      char.preparedSpells.push(spellId);
    }
  } else {
    char.preparedSpells = char.preparedSpells.filter(id => id !== spellId);
  }

  saveData();
  renderSpellsTab();
}

// Eliminar del libro de conjuros
function removeSpell(event, spellId) {
  event.stopPropagation(); // Evitar colapso
  const char = getActiveCharacter();
  if (!char) return;

  if (!char.spells) char.spells = [];
  if (!char.spellFavorites) char.spellFavorites = [];
  if (!char.preparedSpells) char.preparedSpells = [];

  char.spells = char.spells.filter(id => id !== spellId);
  char.spellFavorites = char.spellFavorites.filter(id => id !== spellId);
  char.preparedSpells = char.preparedSpells.filter(id => id !== spellId);

  saveData();
  renderSpellsTab();
}
`;


// Let's do a substring replace
// Find start and end of renderSpellsTab
let renderStart = content.indexOf('function renderSpellsTab() {');
let renderEnd = content.indexOf('function getSpellcastingAbility(char) {');

// Find start and end of createSpellRowHTML
let rowStart = content.indexOf('function createSpellRowHTML(spell, isPreparedSection, isFav, isAdded = false) {');
let rowEnd = content.indexOf('function toggleSpellFav(event, spellId) {');

// Find start and end of toggleSpellAdd and removeSpell
let toggleStart = content.indexOf('// Añadir / Quitar desde buscador');
let toggleEnd = content.indexOf('// --- NUEVAS MECÁNICAS D&D 5.5e');
if (toggleEnd === -1) toggleEnd = content.indexOf('// --- NUEVAS MECNICAS D&D 5.5e');
if (toggleEnd === -1) toggleEnd = content.indexOf('function setupClassResources(char) {');

if (renderStart !== -1 && renderEnd !== -1) {
  content = content.substring(0, renderStart) + newRenderSpellsTab + '\\n\\n' + content.substring(renderEnd);
  console.log('Replaced renderSpellsTab');
} else {
  console.log('Failed to find renderSpellsTab limits');
}

// Re-evaluate positions because string length changed
rowStart = content.indexOf('function createSpellRowHTML(spell, isPreparedSection, isFav, isAdded = false) {');
rowEnd = content.indexOf('function toggleSpellFav(event, spellId) {');

if (rowStart !== -1 && rowEnd !== -1) {
  content = content.substring(0, rowStart) + newCreateSpellRowHTML + '\\n\\n' + content.substring(rowEnd);
  console.log('Replaced createSpellRowHTML');
} else {
  console.log('Failed to find createSpellRowHTML limits');
}

toggleStart = content.indexOf('// Añadir / Quitar desde buscador');
toggleEnd = content.indexOf('// --- NUEVAS MECÁNICAS D&D 5.5e');
if (toggleEnd === -1) toggleEnd = content.indexOf('// --- NUEVAS MECNICAS D&D 5.5e');
if (toggleEnd === -1) toggleEnd = content.substring(0, toggleStart).lastIndexOf('function setupClassResources(char) {');
// Wait, setupClassResources is AFTER toggleStart!
toggleEnd = content.indexOf('function setupClassResources(char) {');
// Actually, let's just find where removeSpell ends
let removeStart = content.indexOf('function removeSpell(event, spellId) {');
let removeEnd = content.indexOf('}', removeStart) + 1; // wait, removeSpell is multiple lines
// So it's easier to use toggleEnd = content.indexOf('// --- NUEVAS', toggleStart);
toggleEnd = content.indexOf('// --- NUEVAS', toggleStart);

if (toggleStart !== -1 && toggleEnd !== -1) {
  content = content.substring(0, toggleStart) + toggleFunctions + '\\n\\n' + content.substring(toggleEnd);
  console.log('Replaced toggleFunctions');
} else {
  console.log('Failed to find toggleFunctions limits', toggleStart, toggleEnd);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Update complete.');
