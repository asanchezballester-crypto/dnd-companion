const fs = require('fs');

// Read the base64 logo
const logoB64 = fs.readFileSync('logo_b64.txt', 'utf16le').trim();
console.log('Logo b64 prefix:', logoB64.substring(0, 40));

let code = fs.readFileSync('app.js', 'utf8');

// Fix all broken logo references first
code = code.replace(/src="' \+ \$b64\.Trim\(\) \+ '"/g, 'src="sqlito_logo.jpg"');

// Now replace buildCharacterPrintHTML
const startIdx = code.indexOf('function buildCharacterPrintHTML(char) {');
const endIdx = code.indexOf('function buildSpellPrintHTML(char) {');

if (startIdx === -1 || endIdx === -1) {
  console.log('ERROR: Could not find function boundaries');
  console.log('startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const LOGO_SRC = logoB64;

const newFunc = `function buildCharacterPrintHTML(char) {
  const lang = localStorage.getItem("dnd55_language") || "es";
  const isEn = lang === "en";
  const eff = getEffectiveAttributes(char);
  const profSaves = getClassSavingThrowProficiencies(char.class);
  const prof = char.profBonus || 2;
  const bgText = char.background || (isEn ? "No Background" : "Sin Trasfondo");
  const LOGO_DATA = "${LOGO_SRC}";

  // ---- PAGE 1 ----
  let html = \`
<div class="ps">
  <!-- HEADER -->
  <div class="ps-header">
    <div class="ps-name-block">
      <div class="ps-name">\${char.name}</div>
      <div class="ps-name-label">\${isEn ? 'Character Name' : 'Nombre del Personaje'}</div>
    </div>
    <div class="ps-info-block">
      <div class="ps-info-row">
        <div class="ps-info-cell"><span class="ps-info-val">\${char.class}\${char.subclass ? ' / '+char.subclass : ''}</span><span class="ps-info-lbl">\${isEn ? 'Class & Level' : 'Clase y Nivel'}</span></div>
        <div class="ps-info-cell"><span class="ps-info-val">\${bgText}</span><span class="ps-info-lbl">\${isEn ? 'Background' : 'Trasfondo'}</span></div>
      </div>
      <div class="ps-info-row">
        <div class="ps-info-cell"><span class="ps-info-val">\${char.race}\${char.subrace ? ' ('+char.subrace+')' : ''}</span><span class="ps-info-lbl">\${isEn ? 'Species' : 'Especie'}</span></div>
        <div class="ps-info-cell"><span class="ps-info-val">Nivel \${char.level}</span><span class="ps-info-lbl">\${isEn ? 'Level' : 'Nivel'}</span></div>
      </div>
    </div>
    <div class="ps-logo-block">
      <img src="\${LOGO_DATA}" class="ps-logo">
    </div>
  </div>

  <!-- BODY: 3 COLUMNS -->
  <div class="ps-body">

    <!-- === COL LEFT: Attributes + Saves + Skills === -->
    <div class="ps-col ps-col-left">

      <!-- Inspiration & Prof Bonus -->
      <div class="ps-top-row">
        <div class="ps-insp-box">
          <div class="ps-insp-circle"></div>
          <div class="ps-box-label">\${isEn ? 'Inspiration' : 'Inspiración'}</div>
        </div>
        <div class="ps-prof-box">
          <div class="ps-prof-val">+\${prof}</div>
          <div class="ps-box-label">\${isEn ? 'Proficiency Bonus' : 'Bono Competencia'}</div>
        </div>
      </div>

      <!-- Attributes + Saves/Skills side by side -->
      <div class="ps-attr-skills-wrap">
        <div class="ps-attrs">
\`;

  const attrKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const attrShort = isEn
    ? { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' }
    : { str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };
  const attrLong = isEn
    ? { str: 'Strength', dex: 'Dexterity', con: 'Constitution', int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma' }
    : { str: 'Fuerza', dex: 'Destreza', con: 'Constitución', int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma' };

  attrKeys.forEach(attr => {
    const score = eff[attr] || 10;
    const mod = calcModifier(score);
    const modSign = mod >= 0 ? '+' + mod : '' + mod;
    html += \`
          <div class="ps-attr">
            <div class="ps-attr-label">\${attrShort[attr]}</div>
            <div class="ps-attr-mod">\${modSign}</div>
            <div class="ps-attr-score">\${score}</div>
          </div>
    \`;
  });

  html += \`
        </div>
        <div class="ps-saves-skills">
          <div class="ps-section-box">
            <div class="ps-list">
\`;

  // Saving throws
  attrKeys.forEach(attr => {
    const isProf = profSaves.includes(attr);
    const mod = calcModifier(eff[attr] || 10);
    const finalMod = mod + (isProf ? prof : 0);
    const sign = finalMod >= 0 ? '+' + finalMod : '' + finalMod;
    html += \`              <div class="ps-row"><span class="ps-dot\${isProf ? ' ps-filled' : ''}"></span><span class="ps-mod">\${sign}</span> <span class="ps-rname">\${attrLong[attr]}</span></div>
\`;
  });

  html += \`
            </div>
            <div class="ps-sec-label">\${isEn ? 'Saving Throws' : 'Tiradas de Salvación'}</div>
          </div>
          <div class="ps-section-box ps-skills-box">
            <div class="ps-list">
\`;

  // Skills
  Object.keys(DND_SKILLS).forEach(skillKey => {
    const skillDef = DND_SKILLS[skillKey];
    const skillName = isEn ? skillDef.en : skillDef.es;
    const isProf = char.skills && char.skills[skillKey]?.proficient ? true : false;
    const isExp = char.skills && char.skills[skillKey]?.expertise ? true : false;
    const mod = calculateSkillModifier(skillKey, char);
    const sign = mod >= 0 ? '+' + mod : '' + mod;
    const dotClass = isExp ? ' ps-expert' : (isProf ? ' ps-filled' : '');
    html += \`              <div class="ps-row"><span class="ps-dot\${dotClass}"></span><span class="ps-mod">\${sign}</span> <span class="ps-rname">\${skillName} <small>(\${attrShort[skillDef.attr]})</small></span></div>
\`;
  });

  html += \`
            </div>
            <div class="ps-sec-label">\${isEn ? 'Skills' : 'Habilidades'}</div>
          </div>
        </div>
      </div>

      <!-- Passive Perception -->
      <div class="ps-passive">
        <div class="ps-passive-num">\${10 + calculateSkillModifier("percepcion", char)}</div>
        <div class="ps-box-label">\${isEn ? 'Passive Wisdom (Perception)' : 'Sabiduría Pasiva (Percepción)'}</div>
      </div>
    </div>

    <!-- === COL CENTER: Combat === -->
    <div class="ps-col ps-col-center">

      <!-- AC / Init / Speed -->
      <div class="ps-combat-top">
        <div class="ps-ac-shield">
          <div class="ps-ac-val">\${char.ac}</div>
          <div class="ps-box-label">\${isEn ? 'Armor Class' : 'Clase de Armadura'}</div>
        </div>
        <div class="ps-combat-stat">
          <div class="ps-cstat-val">\</div>
          <div class="ps-box-label">\${isEn ? 'Initiative' : 'Iniciativa'}</div>
        </div>
        <div class="ps-combat-stat">
          <div class="ps-cstat-val">\${char.speed}</div>
          <div class="ps-box-label">\${isEn ? 'Speed' : 'Velocidad'}</div>
        </div>
      </div>

      <!-- HP -->
      <div class="ps-hp-block">
        <div class="ps-hp-header">\${isEn ? 'Hit Point Maximum' : 'Máximo de Puntos de Golpe'}: <strong>\${char.hpMax}</strong></div>
        <div class="ps-hp-space"></div>
        <div class="ps-sec-label">\${isEn ? 'Current Hit Points' : 'Puntos de Golpe Actuales'}</div>
      </div>
      <div class="ps-thp-block">
        <div class="ps-thp-space"></div>
        <div class="ps-sec-label">\${isEn ? 'Temporary Hit Points' : 'Puntos de Golpe Temporales'}</div>
      </div>

      <!-- Hit Dice + Death Saves -->
      <div class="ps-hd-ds">
        <div class="ps-hd-block">
          <div class="ps-hp-header">\${isEn ? 'Total' : 'Total'}: <strong>\${char.level}\${char.hitDiceType || 'd8'}</strong></div>
          <div class="ps-hd-space"></div>
          <div class="ps-sec-label">\${isEn ? 'Hit Dice' : 'Dados de Golpe'}</div>
        </div>
        <div class="ps-ds-block">
          <div class="ps-ds-row"><span class="ps-ds-lbl">\${isEn ? 'Successes' : 'Éxitos'}</span> <span class="ps-dot"></span><span class="ps-dot"></span><span class="ps-dot"></span></div>
          <div class="ps-ds-row"><span class="ps-ds-lbl">\${isEn ? 'Failures' : 'Fallos'}</span> <span class="ps-dot"></span><span class="ps-dot"></span><span class="ps-dot"></span></div>
          <div class="ps-sec-label">\${isEn ? 'Death Saves' : 'Salvaciones de Muerte'}</div>
        </div>
      </div>

      <!-- Attacks -->
      <div class="ps-attacks-block">
        <table class="ps-atk-table">
          <thead><tr><th>\${isEn ? 'Name' : 'Nombre'}</th><th>\${isEn ? 'Atk' : 'Atq'}</th><th>\${isEn ? 'Damage/Type' : 'Daño/Tipo'}</th></tr></thead>
          <tbody>
\`;

  const equippedWeapons = (char.inventory || []).filter(i => i.itemType === "Arma" && i.equipped);
  equippedWeapons.forEach(wp => {
    let attrMod = 0;
    if (wp.weaponAttr === "Destreza") { attrMod = calcModifier(eff.dex); }
    else if (wp.weaponAttr === "Sutil") { attrMod = Math.max(calcModifier(eff.str), calcModifier(eff.dex)); }
    else if (wp.weaponAttr === "Carisma") { attrMod = calcModifier(eff.cha); }
    else { attrMod = calcModifier(eff.str); }
    const hasArchery = (char.fightingStyles || []).some(fs => fs.name.toLowerCase().includes("arquería") || fs.name.toLowerCase().includes("archery"));
    const isRanged = wp.weaponProps && wp.weaponProps.toLowerCase().includes("distancia");
    const archeryBonus = (hasArchery && isRanged) ? 2 : 0;
    const hasDueling = (char.fightingStyles || []).some(fs => fs.name.toLowerCase().includes("duelo") || fs.name.toLowerCase().includes("dueling"));
    const isMelee = !wp.weaponProps || (!wp.weaponProps.toLowerCase().includes("distancia") && !wp.weaponProps.toLowerCase().includes("arrojadiza"));
    const isTwoHanded = wp.weaponProps && (wp.weaponProps.toLowerCase().includes("dos manos") || wp.weaponProps.toLowerCase().includes("dos-manos"));
    const duelingBonus = (hasDueling && isMelee && !isTwoHanded) ? 2 : 0;
    const magic = wp.magicBonus || 0;
    const totalToHit = attrMod + prof + magic + archeryBonus;
    const hitSign = totalToHit >= 0 ? '+' + totalToHit : '' + totalToHit;
    const totalDmgBonus = attrMod + magic + duelingBonus;
    const dmgBonusStr = totalDmgBonus > 0 ? '+' + totalDmgBonus : (totalDmgBonus < 0 ? '' + totalDmgBonus : '');
    const dmgText = wp.weaponDamage + (dmgBonusStr ? ' ' + dmgBonusStr : '') + ' ' + (wp.weaponDamageType || '');
    html += \`            <tr><td>\${wp.name}</td><td class="ps-atk-center">\${hitSign}</td><td>\${dmgText}</td></tr>
\`;
  });
  // Blank rows
  for (let i = 0; i < Math.max(0, 3 - equippedWeapons.length); i++) {
    html += '            <tr><td class="ps-blank-row"></td><td class="ps-blank-row"></td><td class="ps-blank-row"></td></tr>\\n';
  }

  html += \`
          </tbody>
        </table>
\`;

  // Druid wild shape
  if (char.class === "Druida") {
    let wildInfo = "";
    if (char.level < 4) wildInfo = isEn ? "Max CR 1/4, no flying/swimming. Ex: Wolf, Cat, Draft Horse, Giant Badger." : "CR Máx 1/4, sin volar/nadar. Ej: Lobo, Gato, Caballo de Tiro, Tejón Gigante.";
    else if (char.level < 8) wildInfo = isEn ? "Max CR 1/2, no flying. Ex: Ape, Black Bear, Crocodile, Warhorse." : "CR Máx 1/2, sin volar. Ej: Simio, Oso Negro, Cocodrilo, Caballo de Guerra.";
    else wildInfo = isEn ? "Max CR 1. Ex: Brown Bear, Dire Wolf, Giant Eagle, Giant Spider." : "CR Máx 1. Ej: Oso Pardo, Lobo Huargo, Águila Gigante, Araña Gigante.";
    html += \`        <div class="ps-wild-shape"><strong>\${isEn ? 'Wild Shape' : 'Forma Salvaje'}:</strong> \${wildInfo}</div>
\`;
  }

  html += \`
        <div class="ps-sec-label">\${isEn ? 'Attacks & Spellcasting' : 'Ataques y Lanzamiento de Conjuros'}</div>
      </div>
    </div>

    <!-- === COL RIGHT: Personality + Traits + Equipment === -->
    <div class="ps-col ps-col-right">
      <div class="ps-pers-box"><div class="ps-pers-space"></div><div class="ps-sec-label">\${isEn ? 'Personality Traits' : 'Rasgos de Personalidad'}</div></div>
      <div class="ps-pers-box"><div class="ps-pers-space"></div><div class="ps-sec-label">\${isEn ? 'Ideals' : 'Ideales'}</div></div>
      <div class="ps-pers-box"><div class="ps-pers-space"></div><div class="ps-sec-label">\${isEn ? 'Bonds' : 'Vínculos'}</div></div>
      <div class="ps-pers-box"><div class="ps-pers-space"></div><div class="ps-sec-label">\${isEn ? 'Flaws' : 'Defectos'}</div></div>

      <div class="ps-traits-box">
        <div class="ps-traits-content">
\`;

  // Features
  const speciesData = SPECIES_DB[char.race];
  if (speciesData) {
    (speciesData.traits || []).forEach(t => { html += \`          <div class="ps-trait"><strong>\${t.name}:</strong> \${t.desc}</div>\\n\`; });
    if (char.subrace && speciesData.lineages && speciesData.lineages[char.subrace]) {
      speciesData.lineages[char.subrace].forEach(t => { html += \`          <div class="ps-trait"><strong>\${t.name}:</strong> \${t.desc}</div>\\n\`; });
    }
  }
  const bgData = BACKGROUNDS_DB[char.background];
  if (bgData) { html += \`          <div class="ps-trait"><strong>\${bgData.feat}:</strong> \${bgData.featDesc}</div>\\n\`; }
  const subclassTraits = (window.SUBCLASS_TRAITS_DB && char.subclass) ? window.SUBCLASS_TRAITS_DB[char.subclass] : null;
  if (subclassTraits) {
    subclassTraits.filter(t => t.level <= char.level).forEach(t => {
      html += \`          <div class="ps-trait"><strong>\${t.name}:</strong> \${t.desc}</div>\\n\`;
    });
  }
  (char.customOriginTraits || []).forEach(t => { html += \`          <div class="ps-trait"><strong>\${t.name}:</strong> \${t.desc}</div>\\n\`; });
  (char.feats || []).forEach(t => { html += \`          <div class="ps-trait"><strong>\${t.name}:</strong> \${t.desc}</div>\\n\`; });
  (char.fightingStyles || []).forEach(fs => { html += \`          <div class="ps-trait"><strong>\${fs.name}:</strong> \${fs.desc}</div>\\n\`; });
  (char.invocations || []).forEach(inv => { html += \`          <div class="ps-trait"><strong>\${inv.name}:</strong> \${inv.desc}</div>\\n\`; });
  (char.metamagic || []).forEach(mm => { html += \`          <div class="ps-trait"><strong>\${mm.name}:</strong> \${mm.desc}</div>\\n\`; });
  (char.weaponMasteries || []).forEach(wm => { html += \`          <div class="ps-trait"><strong>\${wm.name}:</strong> \${wm.desc}</div>\\n\`; });

  html += \`
        </div>
        <div class="ps-sec-label">\${isEn ? 'Features & Traits' : 'Rasgos y Características'}</div>
      </div>
    </div>
  </div>
</div>

<!-- PAGE 2: Equipment & Resources -->
<div class="ps ps-page2">
  <div class="ps-header">
    <div class="ps-name-block">
      <div class="ps-name">\${char.name}</div>
      <div class="ps-name-label">\${isEn ? 'Character Name' : 'Nombre del Personaje'}</div>
    </div>
    <div class="ps-info-block">
      <div class="ps-info-row">
        <div class="ps-info-cell"><span class="ps-info-val">\${char.class} \${char.level}</span><span class="ps-info-lbl">\${isEn ? 'Class & Level' : 'Clase y Nivel'}</span></div>
      </div>
    </div>
    <div class="ps-logo-block"><img src="\${LOGO_DATA}" class="ps-logo"></div>
  </div>

  <div class="ps-p2-body">
    <!-- Resources -->
    <div class="ps-p2-col">
      <div class="ps-p2-section">
        <div class="ps-sec-title">\${isEn ? 'Class Resources' : 'Recursos de Clase'}</div>
\`;

  // Class resources
  if (char.classResource && char.classResource.name && char.classResource.max > 0) {
    html += \`
        <div class="ps-res-block">
          <div class="ps-res-name">\${char.classResource.name} (\${isEn ? 'Max' : 'Máx'}: \${char.classResource.max})</div>
          <div class="ps-res-desc">\${char.classResource.desc || ''}</div>
          <div class="ps-bubble-row">\${Array.from({length: char.classResource.max}).map(() => '<span class="ps-dot"></span>').join('')}</div>
        </div>
\`;
  }
  if (char.subclassResource && char.subclassResource.name && char.subclassResource.max > 0) {
    html += \`
        <div class="ps-res-block">
          <div class="ps-res-name">\${char.subclassResource.name} (\${isEn ? 'Max' : 'Máx'}: \${char.subclassResource.max})</div>
          <div class="ps-res-desc">\${char.subclassResource.desc || ''}</div>
          <div class="ps-bubble-row">\${Array.from({length: char.subclassResource.max}).map(() => '<span class="ps-dot"></span>').join('')}</div>
        </div>
\`;
  }
  if (char.class === "Clérigo" && char.divineOrder) {
    const orderDesc = window.DIVINE_ORDERS_DB ? (window.DIVINE_ORDERS_DB.find(o => o.name === char.divineOrder)?.desc || "") : "";
    html += \`<div class="ps-res-block"><div class="ps-res-name">Orden Divina: \${char.divineOrder}</div><div class="ps-res-desc">\${orderDesc}</div></div>\`;
  }
  if (char.class === "Druida" && char.primalOrder) {
    const orderDesc = window.PRIMAL_ORDERS_DB ? (window.PRIMAL_ORDERS_DB.find(o => o.name === char.primalOrder)?.desc || "") : "";
    html += \`<div class="ps-res-block"><div class="ps-res-name">Orden Primigenia: \${char.primalOrder}</div><div class="ps-res-desc">\${orderDesc}</div></div>\`;
  }

  html += \`
      </div>

      <!-- Proficiencies & Languages -->
      <div class="ps-p2-section">
        <div class="ps-sec-title">\${isEn ? 'Other Proficiencies & Languages' : 'Otras Competencias e Idiomas'}</div>
        <div class="ps-prof-content">
          <div><strong>\${isEn ? 'Armor' : 'Armaduras'}:</strong> \${(char.armorProficiencies || []).join(', ') || (isEn ? 'None' : 'Ninguna')}</div>
          <div><strong>\${isEn ? 'Weapons' : 'Armas'}:</strong> \${(char.weaponProficiencies || []).join(', ') || (isEn ? 'None' : 'Ninguna')}</div>
          <div><strong>\${isEn ? 'Tools' : 'Herramientas'}:</strong> \${(char.toolProficiencies || []).join(', ') || (isEn ? 'None' : 'Ninguna')}</div>
          <div><strong>\${isEn ? 'Languages' : 'Idiomas'}:</strong> \${(char.languages || []).join(', ') || (isEn ? 'Common' : 'Común')}</div>
        </div>
      </div>
    </div>

    <!-- Equipment -->
    <div class="ps-p2-col">
      <div class="ps-p2-section ps-equip-section">
        <div class="ps-sec-title">\${isEn ? 'Equipment & Inventory' : 'Equipo e Inventario'}</div>
        <div class="ps-equip-top">
          <div class="ps-money-grid">
            <div class="ps-money-cell"><span class="ps-money-label">CP</span></div>
            <div class="ps-money-cell"><span class="ps-money-label">SP</span></div>
            <div class="ps-money-cell"><span class="ps-money-label">EP</span></div>
            <div class="ps-money-cell"><span class="ps-money-label">GP</span></div>
            <div class="ps-money-cell"><span class="ps-money-label">PP</span></div>
          </div>
          <div class="ps-items-list">
\`;

  const allItems = (char.inventory || []).filter(i => i.itemType !== "Arma" || !i.equipped);
  allItems.forEach(item => {
    html += \`            <div class="ps-item-row">• \${item.name}\${item.qty > 1 ? ' (x'+item.qty+')' : ''}\${item.equipped ? ' ✓' : ''}</div>
\`;
  });

  html += \`
          </div>
        </div>
        <div class="ps-equip-blank">
          <div class="ps-equip-blank-hint">\${isEn ? 'Found items, treasure, notes...' : 'Objetos encontrados, tesoros, notas...'}</div>
        </div>
      </div>
    </div>
  </div>
</div>
\`;

  return html;
}

`;

code = code.substring(0, startIdx) + newFunc + code.substring(endIdx);

// Also fix the logo in buildSpellPrintHTML
code = code.replace(/src="sqlito_logo\.jpg"/g, `src="${LOGO_SRC}"`);

fs.writeFileSync('app.js', code);
console.log('SUCCESS: Rebuilt character sheet + fixed all logo references with base64');
