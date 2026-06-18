const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const endIdx = code.indexOf('function printCharacterSheet() {');

if (endIdx !== -1) {
  const newFunction = `function buildSpellPrintHTML(char) {
  const lang = localStorage.getItem("dnd55_language") || "es";
  const isEn = lang === "en";

  const mySpellIds = char.spells || [];
  const mySpells = SPELLS_DB.filter(s => mySpellIds.includes(s.id));

  const spellcasting = getClassSpellcastingAbility(char.class);
  let spellcastingHeaderHTML = "";

  if (spellcasting) {
    const eff = getEffectiveAttributes(char);
    const mod = calcModifier(eff[spellcasting.attr] || 10);
    const prof = char.profBonus || 2;
    const saveDC = 8 + prof + mod;
    const attackBonus = mod + prof;
    const attackBonusSign = attackBonus >= 0 ? \`+\${attackBonus}\` : attackBonus;
    const abilityName = isEn ? spellcasting.nameEn : spellcasting.name;

    spellcastingHeaderHTML = \`
      <div class="print-spellcasting-stats">
        <div class="print-stat-box"><div class="print-stat-label">\${isEn ? 'Spellcasting Ability' : 'Aptitud Mágica'}</div><div class="print-stat-val" style="font-size:10pt;">\${abilityName}</div></div>
        <div class="print-stat-box"><div class="print-stat-label">\${isEn ? 'Spell Save DC' : 'CD Salvación'}</div><div class="print-stat-val">\${saveDC}</div></div>
        <div class="print-stat-box"><div class="print-stat-label">\${isEn ? 'Spell Attack' : 'Ataque Conjuro'}</div><div class="print-stat-val">\${attackBonusSign}</div></div>
      </div>
    \`;
  }

  let html = \`
    <div class="print-sheet">
      <div class="print-header" style="margin-bottom: 5px; padding-bottom: 5px;">
        <div class="print-header-details">
          <h1 class="print-char-name">\${isEn ? 'Spellbook' : 'Libro de Conjuros'}</h1>
          <div class="print-char-meta">\${char.name} | \${char.class} \${char.level}</div>
        </div>
        \${spellcastingHeaderHTML}
        <img src="sqlito_logo.jpg" alt="SQLito Logo" class="print-logo" style="max-height:40px;">
      </div>
      
      <div class="print-spellbook-columns">
  \`;

  if (mySpells.length === 0) {
    html += \`<p style="text-align:center; color:#666; font-style:italic;">\${isEn ? 'No spells prepared.' : 'No tienes conjuros preparados en tu ficha.'}</p>\`;
  } else {
    const spellsByLevel = {};
    for (let i = 0; i <= 9; i++) spellsByLevel[i] = [];

    mySpells.forEach(s => {
      spellsByLevel[s.level].push(s);
    });

    for (let i = 0; i <= 9; i++) {
      if (spellsByLevel[i].length > 0) {
        spellsByLevel[i].sort((a, b) => a.name.localeCompare(b.name));
        
        let levelName = "";
        if (i === 0) {
          levelName = isEn ? "Cantrips" : "Trucos (Nivel 0)";
        } else {
          levelName = isEn ? \`Level \${i}\` : \`Nivel \${i}\`;
        }

        html += \`
          <div class="print-spell-group">
            <h2 class="print-spell-group-title">\${levelName}</h2>
        \`;

        spellsByLevel[i].forEach(spell => {
          let componentsText = "";
          if (spell.components) {
            const hasV = spell.components.v ? "V" : "";
            const hasS = spell.components.s ? "S" : "";
            const hasM = spell.components.m ? "M" : "";
            componentsText = [hasV, hasS, hasM].filter(Boolean).join(", ");
            if (spell.components.m_desc) componentsText += \` (\${spell.components.m_desc})\`;
          }

          const rangeText = spell.range || "Personal";
          const timeText = spell.time || "1 acción";
          const schoolText = spell.school || "Evocación";

          html += \`
            <div class="print-spell-card-compact">
              <h3 class="print-spell-name-compact">\${spell.name} <span class="print-spell-school-compact">[\${schoolText}]</span></h3>
              <div class="print-spell-meta-compact">
                <strong>\${isEn ? 'Time' : 'Tpo'}:</strong> \${timeText} | 
                <strong>\${isEn ? 'Rng' : 'Alc'}:</strong> \${rangeText} | 
                <strong>\${isEn ? 'Cmp' : 'Cmp'}:</strong> \${componentsText} | 
                <strong>\${isEn ? 'Dur' : 'Dur'}:</strong> \${spell.duration || 'Instantánea'}
              </div>
              <div class="print-spell-desc-compact">\${spell.description}</div>
            </div>
          \`;
        });

        html += \`
          </div>
        \`;
      }
    }
  }

  html += \`
      </div>
    </div>
  \`;

  return html;
}

`;
  code = code.substring(0, endIdx) + newFunction + code.substring(endIdx);
  fs.writeFileSync('app.js', code);
  console.log('Restored buildSpellPrintHTML');
}
