const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const startIdx = code.indexOf('function buildCharacterPrintHTML(char) {');
const endIdx = code.indexOf('function buildSpellPrintHTML(char) {');

if (startIdx !== -1 && endIdx !== -1) {
  const newFunction = `function buildCharacterPrintHTML(char) {
  const lang = localStorage.getItem("dnd55_language") || "es";
  const isEn = lang === "en";
  const eff = getEffectiveAttributes(char);
  const profSaves = getClassSavingThrowProficiencies(char.class);
  const prof = char.profBonus || 2;

  const bgText = char.background || (isEn ? "No Background" : "Sin Trasfondo");

  let html = \`
    <div class="print-sheet print-sheet-classic">
      
      <!-- HEADER OFICIAL -->
      <div class="print-classic-header">
        <div class="print-ch-namebox">
          <div class="print-ch-name">\${char.name}</div>
          <div class="print-ch-label">\${isEn ? 'CHARACTER NAME' : 'NOMBRE DEL PERSONAJE'}</div>
        </div>
        
        <div class="print-ch-infobox">
          <div class="print-ch-inforow">
            <div class="print-ch-field">
              <div class="print-ch-val">\${char.class} \${char.level}</div>
              <div class="print-ch-label">\${isEn ? 'CLASS & LEVEL' : 'CLASE Y NIVEL'}</div>
            </div>
            <div class="print-ch-field">
              <div class="print-ch-val">\${bgText}</div>
              <div class="print-ch-label">\${isEn ? 'BACKGROUND' : 'TRASFONDO'}</div>
            </div>
            <div class="print-ch-field">
              <div class="print-ch-val"></div>
              <div class="print-ch-label">\${isEn ? 'PLAYER NAME' : 'NOMBRE DEL JUGADOR'}</div>
            </div>
          </div>
          <div class="print-ch-inforow">
            <div class="print-ch-field">
              <div class="print-ch-val">\${char.race}\${char.subrace ? ' ('+char.subrace+')' : ''}</div>
              <div class="print-ch-label">\${isEn ? 'SPECIES' : 'ESPECIE'}</div>
            </div>
            <div class="print-ch-field">
              <div class="print-ch-val"></div>
              <div class="print-ch-label">\${isEn ? 'ALIGNMENT' : 'ALINEAMIENTO'}</div>
            </div>
            <div class="print-ch-field">
              <div class="print-ch-val"></div>
              <div class="print-ch-label">\${isEn ? 'EXPERIENCE POINTS' : 'PUNTOS DE EXPERIENCIA'}</div>
            </div>
          </div>
        </div>

        <div class="print-ch-logo">
          <img src="sqlito_logo.jpg" alt="Logo" id="print-logo-img">
        </div>
      </div>

      <!-- MAIN LAYOUT 3 COLUMNS -->
      <div class="print-classic-body">
        
        <!-- COLUMN 1: Attributes & Skills -->
        <div class="print-col-left">
          
          <div class="print-top-left-group">
            <div class="print-inspiration-box">
              <div class="print-insp-icon">⭐</div>
              <div class="print-ch-label" style="text-align:center; font-size:6pt; margin-top:2px;">\${isEn ? 'HEROIC INSPIRATION' : 'INSPIRACIÓN HEROICA'}</div>
            </div>
            <div class="print-prof-box">
              <div class="print-prof-val">+\${prof}</div>
              <div class="print-ch-label" style="text-align:center; font-size:6pt;">\${isEn ? 'PROFICIENCY BONUS' : 'BONO COMPETENCIA'}</div>
            </div>
          </div>

          <div class="print-attributes-skills-wrapper">
            <!-- Atributos -->
            <div class="print-attributes-col">
  \`;

  const attrKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const attrLabels = isEn 
    ? { str: 'Strength', dex: 'Dexterity', con: 'Constitution', int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma' }
    : { str: 'Fuerza', dex: 'Destreza', con: 'Constitución', int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma' };
  
  const shortLabels = { str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };

  attrKeys.forEach(attr => {
    const score = eff[attr] || 10;
    const mod = calcModifier(score);
    const modSign = mod >= 0 ? \`+\${mod}\` : mod;
    html += \`
      <div class="print-classic-attr">
        <div class="print-attr-label">\${isEn ? attr.toUpperCase() : shortLabels[attr]}</div>
        <div class="print-attr-modval">\${modSign}</div>
        <div class="print-attr-scoreval">\${score}</div>
      </div>
    \`;
  });

  html += \`
            </div>

            <!-- Saves & Skills -->
            <div class="print-skills-col">
              <!-- SAVES -->
              <div class="print-skills-box">
  \`;

  attrKeys.forEach(attr => {
    const isProf = profSaves.includes(attr);
    const mod = calcModifier(eff[attr] || 10);
    const finalMod = mod + (isProf ? prof : 0);
    const finalModSign = finalMod >= 0 ? \`+\${finalMod}\` : finalMod;
    html += \`
      <div class="print-skill-row">
        <span class="print-bubble \${isProf ? 'filled' : ''}"></span>
        <span class="print-skill-mod" style="text-decoration:underline;">\${finalModSign}</span>
        <span class="print-skill-name">\${attrLabels[attr]}</span>
      </div>
    \`;
  });

  html += \`
                <div class="print-ch-label" style="text-align:center; margin-top:4px;">\${isEn ? 'SAVING THROWS' : 'TIRADAS DE SALVACIÓN'}</div>
              </div>

              <!-- SKILLS -->
              <div class="print-skills-box">
  \`;

  Object.keys(DND_SKILLS).forEach(skillKey => {
    const skillDef = DND_SKILLS[skillKey];
    const skillName = isEn ? skillDef.en : skillDef.es;
    const isProf = char.skills && char.skills[skillKey]?.proficient ? true : false;
    const isExp = char.skills && char.skills[skillKey]?.expertise ? true : false;
    const mod = calculateSkillModifier(skillKey, char);
    const modSign = mod >= 0 ? \`+\${mod}\` : mod;
    html += \`
      <div class="print-skill-row">
        <span class="print-bubble \${isExp ? 'expert' : (isProf ? 'filled' : '')}"></span>
        <span class="print-skill-mod" style="text-decoration:underline;">\${modSign}</span>
        <span class="print-skill-name">\${skillName} <span style="font-size:5pt;color:#666;">(\${isEn ? skillDef.attr.substring(0,3).toUpperCase() : shortLabels[skillDef.attr]})</span></span>
      </div>
    \`;
  });

  html += \`
                <div class="print-ch-label" style="text-align:center; margin-top:4px;">\${isEn ? 'SKILLS' : 'HABILIDADES'}</div>
              </div>
            </div>
          </div>
          
          <div class="print-passive-wis-box">
            <div class="print-passive-val">\${10 + calculateSkillModifier("percepcion", char)}</div>
            <div class="print-ch-label" style="display:flex;align-items:center;">\${isEn ? 'PASSIVE WISDOM (PERCEPTION)' : 'SABIDURÍA PASIVA (PERCEPCIÓN)'}</div>
          </div>
          
          <div class="print-proficiencies-box">
            <div class="print-prof-content">
              <strong>\${isEn ? 'Armor' : 'Armaduras'}:</strong> \${(char.armorProficiencies || []).join(', ') || (isEn ? 'None' : 'Ninguna')}<br>
              <strong>\${isEn ? 'Weapons' : 'Armas'}:</strong> \${(char.weaponProficiencies || []).join(', ') || (isEn ? 'None' : 'Ninguna')}<br>
              <strong>\${isEn ? 'Tools' : 'Herramientas'}:</strong> \${(char.toolProficiencies || []).join(', ') || (isEn ? 'None' : 'Ninguna')}<br>
              <strong>\${isEn ? 'Languages' : 'Idiomas'}:</strong> \${(char.languages || []).join(', ') || (isEn ? 'Common' : 'Común')}
            </div>
            <div class="print-ch-label" style="text-align:center; margin-top:auto;">\${isEn ? 'OTHER PROFICIENCIES & LANGUAGES' : 'OTRAS COMPETENCIAS E IDIOMAS'}</div>
          </div>

        </div>

        <!-- COLUMN 2: Combat -->
        <div class="print-col-center">
          
          <div class="print-combat-top">
            <div class="print-shield-box">
              <div class="print-shield-val">\${char.ac}</div>
              <div class="print-ch-label">\${isEn ? 'ARMOR CLASS' : 'CLASE DE ARMADURA'}</div>
            </div>
            <div class="print-combat-box init-box">
              <div class="print-combat-val">+\${calcModifier(eff.dex)}</div>
              <div class="print-ch-label">\${isEn ? 'INITIATIVE' : 'INICIATIVA'}</div>
            </div>
            <div class="print-combat-box speed-box">
              <div class="print-combat-val">\${char.speed} \${isEn ? 'ft' : 'pies'}</div>
              <div class="print-ch-label">\${isEn ? 'SPEED' : 'VELOCIDAD'}</div>
            </div>
          </div>

          <div class="print-hp-container">
            <div class="print-hp-box">
              <div class="print-hp-header">
                <span class="print-ch-label">\${isEn ? 'Hit Point Maximum' : 'Puntos de Golpe Máximos'}</span> <span style="font-family: monospace; border-bottom: 1px solid #000; display:inline-block; width: 60px; text-align:center;">\${char.hpMax}</span>
              </div>
              <div class="print-hp-current-area"></div>
              <div class="print-ch-label" style="text-align:center; padding-bottom:4px;">\${isEn ? 'CURRENT HIT POINTS' : 'PUNTOS DE GOLPE ACTUALES'}</div>
            </div>

            <div class="print-thp-box">
              <div class="print-hp-current-area" style="height:35px;"></div>
              <div class="print-ch-label" style="text-align:center; padding-bottom:4px;">\${isEn ? 'TEMPORARY HIT POINTS' : 'PUNTOS DE GOLPE TEMPORALES'}</div>
            </div>
          </div>

          <div class="print-hd-ds-container">
            <div class="print-hd-box">
              <div class="print-hp-header">
                <span class="print-ch-label">\${isEn ? 'Total' : 'Total'}</span> <span style="font-family: monospace; border-bottom: 1px solid #000; display:inline-block; width: 40px; text-align:center;">\${char.level}\${char.hitDiceType || 'd8'}</span>
              </div>
              <div class="print-hp-current-area" style="height: 30px;"></div>
              <div class="print-ch-label" style="text-align:center; padding-bottom:4px;">\${isEn ? 'HIT DICE' : 'DADOS DE GOLPE'}</div>
            </div>
            <div class="print-ds-box">
              <div class="print-ds-row">
                <div class="print-ch-label" style="width:40px; text-align:right; margin-right:4px;">\${isEn ? 'SUCCESSES' : 'ÉXITOS'}</div>
                <span class="print-bubble"></span><span class="print-bubble"></span><span class="print-bubble"></span>
              </div>
              <div class="print-ds-row" style="margin-top:4px;">
                <div class="print-ch-label" style="width:40px; text-align:right; margin-right:4px;">\${isEn ? 'FAILURES' : 'FALLOS'}</div>
                <span class="print-bubble"></span><span class="print-bubble"></span><span class="print-bubble"></span>
              </div>
              <div class="print-ch-label" style="text-align:center; margin-top:8px;">\${isEn ? 'DEATH SAVES' : 'SALVACIONES DE MUERTE'}</div>
            </div>
          </div>

          <div class="print-attacks-box">
            <table class="print-classic-weapons-table">
              <thead>
                <tr>
                  <th style="text-align:left;">\${isEn ? 'NAME' : 'NOMBRE'}</th>
                  <th style="width:40px;">\${isEn ? 'ATK BONUS' : 'BONO ATAQUE'}</th>
                  <th style="width:90px;">\${isEn ? 'DAMAGE/TYPE' : 'DAÑO/TIPO'}</th>
                </tr>
              </thead>
              <tbody>
  \`;

  const equippedWeapons = (char.inventory || []).filter(i => i.itemType === "Arma" && i.equipped);
  
  if (equippedWeapons.length === 0) {
    html += \`<tr><td colspan="3" style="text-align:center; color:#666; font-style:italic; height:25px;"></td></tr>\`;
  } else {
    equippedWeapons.forEach(wp => {
      let attrMod = 0;
      if (wp.weaponAttr === "Destreza") { attrMod = calcModifier(eff.dex); }
      else if (wp.weaponAttr === "Sutil") {
        const strMod = calcModifier(eff.str);
        const dexMod = calcModifier(eff.dex);
        attrMod = dexMod > strMod ? dexMod : strMod;
      }
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
      const totalToHitSign = totalToHit >= 0 ? \`+\${totalToHit}\` : totalToHit;

      const totalDmgBonus = attrMod + magic + duelingBonus;
      const dmgBonusStr = totalDmgBonus > 0 ? \`+\${totalDmgBonus}\` : (totalDmgBonus < 0 ? \`\${totalDmgBonus}\` : "");
      
      const isVersatile = (wp.weaponProps || "").toLowerCase().includes("versátil");
      let dmgText = \`\${wp.weaponDamage}\${dmgBonusStr ? ' ' + dmgBonusStr : ''} \${wp.weaponDamageType || ''}\`;

      html += \`
        <tr>
          <td>
            <div style="font-weight:bold; font-size:7.5pt; text-transform:uppercase;">\${wp.name}</div>
          </td>
          <td style="text-align:center; font-weight:bold; border-left:1px solid #ccc; border-right:1px solid #ccc;">\${totalToHitSign}</td>
          <td style="text-align:center; font-size:7pt;">\${dmgText}</td>
        </tr>
      \`;
    });
  }

  // Add some blank lines for handwritten attacks
  for (let i = 0; i < 4; i++) {
    html += \`<tr><td style="height:22px;"></td><td style="border-left:1px solid #ccc; border-right:1px solid #ccc;"></td><td></td></tr>\`;
  }

  html += \`
              </tbody>
            </table>
            
            <div class="print-attacks-blank-area">
              <!-- Zona para munición, notas de armas, cantrips, etc. -->
  \`;
  
  if (char.class === "Druida") {
    html += \`
      <div style="margin-top:10px; font-size: 7.5pt;">
        <strong>\${isEn ? 'WILD SHAPE EXAMPLES' : 'EJEMPLOS DE FORMA SALVAJE'}:</strong><br>
        \${char.level < 4 ? (isEn ? 'Max CR 1/4, No flying/swimming. Ex: Wolf, Panther, Draft Horse, Giant Badger.' : 'CR Máx 1/4, Sin volar/nadar. Ej: Lobo, Pantera, Caballo de Tiro, Tejón Gigante.') : ''}
        \${char.level >= 4 && char.level < 8 ? (isEn ? 'Max CR 1/2, No flying. Ex: Ape, Black Bear, Crocodile, Warhorse.' : 'CR Máx 1/2, Sin volar. Ej: Simio, Oso Negro, Cocodrilo, Caballo de Guerra.') : ''}
        \${char.level >= 8 ? (isEn ? 'Max CR 1. Ex: Brown Bear, Dire Wolf, Giant Eagle, Giant Spider.' : 'CR Máx 1. Ej: Oso Pardo, Lobo Huargo, Águila Gigante, Araña Gigante.') : ''}
      </div>
    \`;
  }

  html += \`
            </div>
            <div class="print-ch-label" style="text-align:center; margin-top:auto;">\${isEn ? 'ATTACKS & SPELLCASTING' : 'ATAQUES Y LANZAMIENTO DE CONJUROS'}</div>
          </div>

        </div>

        <!-- COLUMN 3: Traits & Equipment -->
        <div class="print-col-right">

          <div class="print-personality-box">
            <div class="print-blank-lines"></div>
            <div class="print-ch-label" style="text-align:center;">\${isEn ? 'PERSONALITY TRAITS' : 'RASGOS DE PERSONALIDAD'}</div>
          </div>
          <div class="print-personality-box">
            <div class="print-blank-lines"></div>
            <div class="print-ch-label" style="text-align:center;">\${isEn ? 'IDEALS' : 'IDEALES'}</div>
          </div>
          <div class="print-personality-box">
            <div class="print-blank-lines"></div>
            <div class="print-ch-label" style="text-align:center;">\${isEn ? 'BONDS' : 'VÍNCULOS'}</div>
          </div>
          <div class="print-personality-box">
            <div class="print-blank-lines"></div>
            <div class="print-ch-label" style="text-align:center;">\${isEn ? 'FLAWS' : 'DEFECTOS'}</div>
          </div>

          <div class="print-features-box">
            <div class="print-features-content">
  \`;

  let featuresHtml = "";
  // Rasgos de especie
  const speciesData = SPECIES_DB[char.race];
  if (speciesData) {
    (speciesData.traits || []).forEach(t => { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
    if (char.subrace && speciesData.lineages && speciesData.lineages[char.subrace]) {
      speciesData.lineages[char.subrace].forEach(t => { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
    }
  }
  const bgData = BACKGROUNDS_DB[char.background];
  if (bgData) { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${bgData.feat}:</strong> \${bgData.featDesc}</div>\`; }
  
  // Rasgos de Subclase
  const subclassTraits = (window.SUBCLASS_TRAITS_DB && char.subclass) ? window.SUBCLASS_TRAITS_DB[char.subclass] : null;
  if (subclassTraits) {
    subclassTraits.filter(t => t.level <= char.level).forEach(t => {
      featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`;
    });
  }
  (char.customOriginTraits || []).forEach(t => { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
  (char.feats || []).forEach(t => { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
  (char.fightingStyles || []).forEach(fs => { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${fs.name}:</strong> \${fs.desc}</div>\`; });
  (char.invocations || []).forEach(inv => { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${inv.name}:</strong> \${inv.desc}</div>\`; });
  (char.metamagic || []).forEach(mm => { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${mm.name}:</strong> \${mm.desc}</div>\`; });
  (char.weaponMasteries || []).forEach(wm => { featuresHtml += \`<div style="margin-bottom:3px;"><strong>\${wm.name}:</strong> \${wm.desc}</div>\`; });

  html += featuresHtml || \`<div style="color:#666; font-style:italic;"></div>\`;

  html += \`
            </div>
            <div class="print-ch-label" style="text-align:center; margin-top:auto; padding-top:5px;">\${isEn ? 'FEATURES & TRAITS' : 'RASGOS Y ATRIBUTOS'}</div>
          </div>

          <div class="print-equipment-box">
            <div class="print-equipment-content" style="display:flex;">
              <!-- Money -->
              <div class="print-money-col">
                <div class="print-money-box"><div class="print-ch-label">CP</div></div>
                <div class="print-money-box"><div class="print-ch-label">SP</div></div>
                <div class="print-money-box"><div class="print-ch-label">EP</div></div>
                <div class="print-money-box"><div class="print-ch-label">GP</div></div>
                <div class="print-money-box"><div class="print-ch-label">PP</div></div>
              </div>
              
              <!-- Items list -->
              <div class="print-items-col">
  \`;

  const otherItems = (char.inventory || []).filter(i => i.itemType !== "Arma" || !i.equipped);
  if (otherItems.length > 0) {
    let itemStrs = [];
    otherItems.forEach(i => {
      itemStrs.push(\`\${i.name}\${i.qty > 1 ? ' ('+i.qty+')' : ''}\`);
    });
    html += \`<div style="font-size:7pt;">\${itemStrs.join(', ')}</div>\`;
  }

  html += \`
                <!-- BLANK SPACE FOR FOUND ITEMS -->
                <div style="flex:1; border-top:1px dashed #ccc; margin-top:8px; padding-top:4px;">
                  <span style="font-size:6.5pt; color:#666; font-style:italic;">\${isEn ? 'Found items & extra notes...' : 'Objetos encontrados y notas adicionales...'}</span>
                </div>
              </div>
            </div>
            <div class="print-ch-label" style="text-align:center; margin-top:auto; padding-top:5px;">\${isEn ? 'EQUIPMENT' : 'EQUIPO'}</div>
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
  console.log('Replaced buildCharacterPrintHTML with classic layout');
} else {
  console.log('Could not find boundaries for buildCharacterPrintHTML');
}
