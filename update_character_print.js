const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const startIdx = code.indexOf('function buildCharacterPrintHTML(char) {');
const endIdx = code.indexOf('function printCharacterSheet() {');

if (startIdx !== -1 && endIdx !== -1) {
  const newFunction = `function buildCharacterPrintHTML(char) {
  const lang = localStorage.getItem("dnd55_language") || "es";
  const isEn = lang === "en";
  const eff = getEffectiveAttributes(char);
  const profSaves = getClassSavingThrowProficiencies(char.class);
  const prof = char.profBonus || 2;

  // Header Details
  const subraceText = char.subrace ? \` (\${char.subrace})\` : "";
  const bgText = char.background || (isEn ? "No Background" : "Sin Trasfondo");
  const subclassText = char.subclass ? \` / \${char.subclass}\` : "";

  let html = \`
    <div class="print-sheet print-sheet-1page">
      <div class="print-header">
        <div class="print-header-details">
          <h1 class="print-char-name">\${char.name}</h1>
          <div class="print-char-meta">
            \${char.race}\${subraceText} | \${char.class}\${subclassText} | \${isEn ? 'Level' : 'Nivel'} \${char.level} | \${isEn ? 'Background' : 'Trasfondo'}: \${bgText}
          </div>
        </div>
        <img src="sqlito_logo.jpg" alt="SQLito Logo" class="print-logo">
      </div>
      
      <div class="print-3-col-layout">
        
        <!-- Columna 1: Atributos, Salvaciones, Habilidades -->
        <div class="print-col print-col-1">
          <div class="print-attributes-vertical">
  \`;

  const attrKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const attrLabels = isEn 
    ? { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' }
    : { str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };

  attrKeys.forEach(attr => {
    const score = eff[attr] || 10;
    const mod = calcModifier(score);
    const modSign = mod >= 0 ? \`+\${mod}\` : mod;
    html += \`
      <div class="print-attr-card print-attr-vertical">
        <div class="print-attr-name">\${attrLabels[attr]}</div>
        <div class="print-attr-score">\${score}</div>
        <div class="print-attr-mod">\${modSign}</div>
      </div>
    \`;
  });

  html += \`
          </div>

          <div class="print-section print-compact-list">
            <h2 class="print-section-title">\${isEn ? 'Saving Throws' : 'Salvaciones'}</h2>
  \`;

  const saveNames = isEn
    ? { str: "Strength", dex: "Dexterity", con: "Constitution", int: "Intelligence", wis: "Wisdom", cha: "Charisma" }
    : { str: "Fuerza", dex: "Destreza", con: "Constitución", int: "Inteligencia", wis: "Sabiduría", cha: "Carisma" };

  attrKeys.forEach(attr => {
    const isProf = profSaves.includes(attr);
    const mod = calcModifier(eff[attr] || 10);
    const finalMod = mod + (isProf ? prof : 0);
    const finalModSign = finalMod >= 0 ? \`+\${finalMod}\` : finalMod;
    html += \`
      <div class="print-list-item">
        <span class="print-indicator \${isProf ? 'proficient' : ''}"></span>
        <span class="print-list-name">\${saveNames[attr]}</span>
        <span class="print-list-val">\${finalModSign}</span>
      </div>
    \`;
  });

  html += \`
          </div>

          <div class="print-section print-compact-list">
            <h2 class="print-section-title">\${isEn ? 'Skills' : 'Habilidades'}</h2>
  \`;

  Object.keys(DND_SKILLS).forEach(skillKey => {
    const skillDef = DND_SKILLS[skillKey];
    const skillName = isEn ? skillDef.en : skillDef.es;
    const isProf = char.skills && char.skills[skillKey]?.proficient ? true : false;
    const isExp = char.skills && char.skills[skillKey]?.expertise ? true : false;
    const mod = calculateSkillModifier(skillKey, char);
    const modSign = mod >= 0 ? \`+\${mod}\` : mod;
    html += \`
      <div class="print-list-item">
        <span class="print-indicator \${isExp ? 'expertise' : (isProf ? 'proficient' : '')}"></span>
        <span class="print-list-name">\${skillName}</span>
        <span class="print-list-attr">(\${skillDef.attr.toUpperCase()})</span>
        <span class="print-list-val">\${modSign}</span>
      </div>
    \`;
  });

  html += \`
          </div>
        </div>

        <!-- Columna 2: Combate, Ataques, Inventario -->
        <div class="print-col print-col-2">
          
          <div class="print-stats-grid">
            <div class="print-stat-box"><div class="print-stat-label">CA</div><div class="print-stat-val">\${char.ac}</div></div>
            <div class="print-stat-box"><div class="print-stat-label">\${isEn ? 'Inic' : 'Inic'}</div><div class="print-blank-box"></div></div>
            <div class="print-stat-box"><div class="print-stat-label">\${isEn ? 'Speed' : 'Vel'}</div><div class="print-stat-val">\${char.speed}</div></div>
            <div class="print-stat-box"><div class="print-stat-label">\${isEn ? 'Prof' : 'Prof'}</div><div class="print-stat-val">+\${prof}</div></div>
            <div class="print-stat-box"><div class="print-stat-label">PG Max</div><div class="print-stat-val">\${char.hpMax}</div></div>
            <div class="print-stat-box"><div class="print-stat-label">PG Act</div><div class="print-blank-box"></div></div>
            <div class="print-stat-box"><div class="print-stat-label">Dado G.</div><div class="print-stat-val">\${char.level}\${char.hitDiceType || 'd8'}</div></div>
            <div class="print-stat-box"><div class="print-stat-label">Oro</div><div class="print-blank-box"></div></div>
          </div>

          <div class="print-section">
            <h2 class="print-section-title">\${isEn ? 'Attacks & Actions' : 'Ataques y Acciones'}</h2>
            <table class="print-weapons-table print-compact-table">
              <thead>
                <tr>
                  <th>\${isEn ? 'Weapon' : 'Arma'}</th>
                  <th>\${isEn ? 'Atk' : 'Ataque'}</th>
                  <th>\${isEn ? 'Damage' : 'Daño'}</th>
                </tr>
              </thead>
              <tbody>
  \`;

  const equippedWeapons = (char.inventory || []).filter(i => i.itemType === "Arma" && i.equipped);
  
  if (equippedWeapons.length === 0) {
    html += \`<tr><td colspan="3" style="text-align:center; color:#666; font-style:italic; padding:5px;">\${isEn ? 'No weapons equipped.' : 'No hay armas equipadas.'}</td></tr>\`;
  } else {
    equippedWeapons.forEach(wp => {
      let attrMod = 0;
      if (wp.weaponAttr === "Destreza") {
        attrMod = calcModifier(eff.dex);
      } else if (wp.weaponAttr === "Sutil") {
        const strMod = calcModifier(eff.str);
        const dexMod = calcModifier(eff.dex);
        attrMod = dexMod > strMod ? dexMod : strMod;
      } else if (wp.weaponAttr === "Carisma") {
        attrMod = calcModifier(eff.cha);
      } else {
        attrMod = calcModifier(eff.str);
      }

      const hasArchery = (char.fightingStyles || []).some(fs => fs.name.toLowerCase().includes("arquería") || fs.name.toLowerCase().includes("archery"));
      const isRanged = wp.weaponProps && wp.weaponProps.toLowerCase().includes("distancia");
      const archeryBonus = (hasArchery && isRanged) ? 2 : 0;

      const hasDueling = (char.fightingStyles || []).some(fs => fs.name.toLowerCase().includes("duelo") || fs.name.toLowerCase().includes("dueling"));
      const isMelee = !wp.weaponProps || (!wp.weaponProps.toLowerCase().includes("distancia") && !wp.weaponProps.toLowerCase().includes("arrojadiza"));
      const isTwoHanded = wp.weaponProps && (wp.weaponProps.toLowerCase().includes("dos manos") || wp.weaponProps.toLowerCase().includes("dos-manos"));
      const duelingBonus = (hasDueling && isMelee && !isTwoHanded) ? 2 : 0;

      const magic = wp.magicBonus || 0;
      const totalToHit = attrMod + prof + magic + archeryBonus;
      const totalToHitSign = totalToHit >= 0 ? \`+\${totalToHit}\` : totalToHit;

      const totalDmgBonus = attrMod + magic + duelingBonus;
      const dmgBonusStr = totalDmgBonus > 0 ? \`+\${totalDmgBonus}\` : (totalDmgBonus < 0 ? \`\${totalDmgBonus}\` : "");
      
      const isVersatile = (wp.weaponProps || "").toLowerCase().includes("versátil");
      let dmgText = \`\${wp.weaponDamage}\${dmgBonusStr ? ' ' + dmgBonusStr : ''} (\${wp.weaponDamageType || (isEn ? "Physical" : "Físico")})\`;
      if (isVersatile) {
        const match = (wp.weaponProps || "").match(/versátil\\s*\\(([^)]+)\\)/i);
        const versatileDie = match ? match[1] : "1d10";
        dmgText += \` <br>[V: \${versatileDie}\${dmgBonusStr}]\`;
      }

      html += \`
        <tr>
          <td>
            <strong>\${wp.name}</strong><br>
            <span style="font-size:7pt; color:#666;">\${wp.weaponProps || ''}</span>
          </td>
          <td style="font-size:10pt;"><strong>\${totalToHitSign}</strong></td>
          <td style="font-size:8pt;">\${dmgText}</td>
        </tr>
      \`;
    });
  }

  html += \`
              </tbody>
            </table>
          </div>

          <div class="print-section">
            <h2 class="print-section-title">\${isEn ? 'Equipment & Gear' : 'Equipo e Inventario'}</h2>
            <div style="font-size: 7.5pt; line-height: 1.3;">
  \`;

  const otherItems = (char.inventory || []).filter(i => i.itemType !== "Arma" || !i.equipped);
  if (otherItems.length === 0) {
    html += \`<div style="color:#666; font-style:italic;">\${isEn ? 'Empty inventory.' : 'Inventario vacío.'}</div>\`;
  } else {
    otherItems.forEach(i => {
      html += \`<div style="border-bottom: 1px dashed #eee; padding: 1px 0;">• \${i.name} (x\${i.qty || 1})</div>\`;
    });
  }

  html += \`
            </div>
          </div>
        </div>

        <!-- Columna 3: Rasgos, Especiales, Notas -->
        <div class="print-col print-col-3">
          
          <div class="print-section">
            <h2 class="print-section-title">\${isEn ? 'Class Resources (Pencil)' : 'Recursos de Clase (Lápiz)'}</h2>
  \`;

  let hasRes = false;

  if (char.classResource && char.classResource.name && char.classResource.max > 0) {
    hasRes = true;
    html += \`
      <div class="print-resource-block">
        <div class="print-resource-title-row">
          <span class="print-resource-name">\${char.classResource.name}</span>
        </div>
        <div class="print-bubble-row">
          \${Array.from({ length: char.classResource.max }).map(() => \`<span class="print-bubble-empty"></span>\`).join('')}
        </div>
      </div>
    \`;
  }

  if (char.subclassResource && char.subclassResource.name && char.subclassResource.max > 0) {
    hasRes = true;
    html += \`
      <div class="print-resource-block">
        <div class="print-resource-title-row">
          <span class="print-resource-name">\${char.subclassResource.name}</span>
        </div>
        <div class="print-bubble-row">
          \${Array.from({ length: char.subclassResource.max }).map(() => \`<span class="print-bubble-empty"></span>\`).join('')}
        </div>
      </div>
    \`;
  }

  if (char.class === "Clérigo" && char.divineOrder) {
    hasRes = true;
    html += \`<div class="print-resource-block"><span class="print-resource-name">Orden Divina: \${char.divineOrder}</span></div>\`;
  }
  if (char.class === "Druida" && char.primalOrder) {
    hasRes = true;
    html += \`<div class="print-resource-block"><span class="print-resource-name">Orden Primigenia: \${char.primalOrder}</span></div>\`;
  }

  if (!hasRes) {
    html += \`<div style="font-size:7.5pt; color:#666; font-style:italic; text-align:center; padding:2px 0;">\${isEn ? 'No trackable resources.' : 'Sin recursos de clase.'}</div>\`;
  }

  html += \`
          </div>
          
          <div class="print-section">
            <h2 class="print-section-title">\${isEn ? 'Features & Traits' : 'Rasgos y Habilidades'}</h2>
            <div style="font-size: 7pt; line-height: 1.2;">
  \`;

  let featuresHtml = "";
  // Rasgos de especie
  const speciesData = SPECIES_DB[char.race];
  if (speciesData) {
    (speciesData.traits || []).forEach(t => { featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
    if (char.subrace && speciesData.lineages && speciesData.lineages[char.subrace]) {
      speciesData.lineages[char.subrace].forEach(t => { featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
    }
  }
  // Rasgos de Subclase
  const subclassTraits = (window.SUBCLASS_TRAITS_DB && char.subclass) ? window.SUBCLASS_TRAITS_DB[char.subclass] : null;
  if (subclassTraits) {
    subclassTraits.filter(t => t.level <= char.level).forEach(t => {
      featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`;
    });
  }
  (char.customOriginTraits || []).forEach(t => { featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
  (char.feats || []).forEach(t => { featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
  (char.fightingStyles || []).forEach(fs => { featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${fs.name}:</strong> \${fs.desc}</div>\`; });
  (char.invocations || []).forEach(inv => { featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${inv.name}:</strong> \${inv.desc}</div>\`; });
  (char.metamagic || []).forEach(mm => { featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${mm.name}:</strong> \${mm.desc}</div>\`; });
  (char.weaponMasteries || []).forEach(wm => { featuresHtml += \`<div style="margin-bottom:4px;"><strong>\${wm.name}:</strong> \${wm.desc}</div>\`; });

  html += featuresHtml || \`<div style="color:#666; font-style:italic;">No features.</div>\`;

  html += \`
            </div>
          </div>
          
          <div class="print-section">
            <h2 class="print-section-title">\${isEn ? 'Notes' : 'Notas'}</h2>
            <div class="print-notes-area print-notes-compact">
              \${char.notesCampaign ? char.notesCampaign.replace(/\\n/g, '<br>') : (isEn ? 'Write adventure logs...' : 'Escribe notas de campaña...')}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  \`;

  return html;
}
`;
  code = code.substring(0, startIdx) + newFunction + code.substring(endIdx);
  fs.writeFileSync('app.js', code);
  console.log('Replaced buildCharacterPrintHTML');
} else {
  console.log('Could not find boundaries for buildCharacterPrintHTML');
}
