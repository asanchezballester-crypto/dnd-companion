const fs = require('fs');

const logoB64 = fs.readFileSync('logo_b64.txt', 'utf16le').trim();

let code = fs.readFileSync('app.js', 'utf8');

const startIdx = code.indexOf('function buildCharacterPrintHTML(char) {');
const endIdx = code.indexOf('function buildSpellPrintHTML(char) {');

if (startIdx === -1 || endIdx === -1) {
  console.log('ERROR: Could not find function boundaries');
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

  let html = \`
<div class="replica-sheet">
  
  <!-- === HEADER === -->
  <div class="rep-header">
    <div class="rep-logo-area">
      <img src="\${LOGO_DATA}" class="rep-logo-img">
    </div>
    
    <div class="rep-info-block">
      <div class="rep-info-row" style="border-bottom: 1px solid #aaa; padding-bottom: 2px;">
        <span class="rep-label">\${isEn ? 'CHARACTER NAME' : 'NOMBRE DEL PERSONAJE'}:</span>
        <span class="rep-val" style="font-size: 14pt;">\${char.name}</span>
      </div>
      <div class="rep-info-grid">
        <div class="rep-info-cell">
          <span class="rep-label">\${isEn ? 'CLASS & LEVEL' : 'CLASE Y NIVEL'}:</span> <span class="rep-val">\${char.class} \${char.level}</span>
        </div>
        <div class="rep-info-cell">
          <span class="rep-label">\${isEn ? 'BACKGROUND' : 'ANTECEDENTE'}:</span> <span class="rep-val">\${bgText}</span>
        </div>
        <div class="rep-info-cell">
          <span class="rep-label">\${isEn ? 'RACE' : 'RAZA'}:</span> <span class="rep-val">\${char.race}\${char.subrace ? ' ('+char.subrace+')' : ''}</span>
        </div>
        <div class="rep-info-cell">
          <span class="rep-label">\${isEn ? 'ALIGNMENT' : 'ALINEAMIENTO'}:</span> <span class="rep-val"></span>
        </div>
        <div class="rep-info-cell">
          <span class="rep-label">\${isEn ? 'EXPERIENCE POINTS' : 'PUNTOS DE EXPERIENCIA'}:</span> <span class="rep-val"></span>
        </div>
      </div>
    </div>

    <div class="rep-insp-prof-block">
      <div class="rep-insp-box">
        <div class="rep-label" style="text-align:center;">\${isEn ? 'INSPIRATION' : 'INSPIRACIÓN'}</div>
        <div class="rep-insp-circle"></div>
      </div>
      <div class="rep-prof-box">
        <div class="rep-label" style="text-align:center;">\${isEn ? 'PROFICIENCY BONUS' : 'BONIFICADOR POR COMPETENCIA'}</div>
        <div class="rep-prof-shield">+\${prof}</div>
      </div>
    </div>
  </div>

  <!-- === MAIN BODY === -->
  <div class="rep-main-grid">
    
    <!-- COL 1: Attributes & Proficiencies -->
    <div class="rep-col1">
      <div class="rep-attr-title">\${isEn ? 'CHARACTERISTICS' : 'CARACTERÍSTICAS'}</div>
      <div class="rep-attr-list">
\`;

  const attrKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const attrShort = isEn
    ? { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' }
    : { str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };
  const attrLong = isEn
    ? { str: 'STRENGTH', dex: 'DEXTERITY', con: 'CONSTITUTION', int: 'INTELLIGENCE', wis: 'WISDOM', cha: 'CHARISMA' }
    : { str: 'FUERZA', dex: 'DESTREZA', con: 'CONSTITUCIÓN', int: 'INTELIGENCIA', wis: 'SABIDURÍA', cha: 'CARISMA' };

  attrKeys.forEach(attr => {
    const score = eff[attr] || 10;
    const mod = calcModifier(score);
    const modSign = mod >= 0 ? '+' + mod : '' + mod;
    html += \`
        <div class="rep-attr-box">
          <div class="rep-attr-circle">\${score}</div>
          <div class="rep-attr-info">
            <div class="rep-attr-name">\${attrLong[attr]}</div>
            <div class="rep-attr-sub">\${attrShort[attr]}</div>
            <div class="rep-attr-mod-label">\${isEn ? 'MODIFIER' : 'MODIFICADOR'}</div>
            <div class="rep-attr-mod-line">\${modSign}</div>
          </div>
        </div>
    \`;
  });

  html += \`
      </div>

      <div class="rep-box rep-weapon-prof">
        <div class="rep-box-title" style="text-align:center;">\${isEn ? 'WEAPON & ARMOR PROFICIENCIES' : 'COMPETENCIAS EN ARMAS Y ARMADURAS'}</div>
        <div class="rep-prof-section">
          <div class="rep-prof-title">\${isEn ? 'ARMOR' : 'ARMADURAS'}</div>
          <div class="rep-prof-line">\${(char.armorProficiencies || []).join(', ')}</div>
          <div class="rep-prof-line"></div>
        </div>
        <div class="rep-prof-section">
          <div class="rep-prof-title">\${isEn ? 'WEAPONS' : 'ARMAS'}</div>
          <div class="rep-prof-line">\${(char.weaponProficiencies || []).join(', ')}</div>
          <div class="rep-prof-line"></div>
        </div>
        <div class="rep-prof-section">
          <div class="rep-prof-title">\${isEn ? 'TOOLS' : 'HERRAMIENTAS'}</div>
          <div class="rep-prof-line">\${(char.toolProficiencies || []).join(', ')}</div>
          <div class="rep-prof-line"></div>
        </div>
      </div>

      <div class="rep-box rep-languages">
        <div class="rep-box-title" style="text-align:center;">\${isEn ? 'LANGUAGES' : 'IDIOMAS'}</div>
        <div class="rep-prof-line">\${(char.languages || []).join(', ')}</div>
        <div class="rep-prof-line"></div>
      </div>
    </div>

    <!-- COL 2 & 3: Combat, Saves, Skills, Traits -->
    <div class="rep-col23">
      
      <!-- Top Combat Shapes Row -->
      <div class="rep-shapes-row">
        <div class="rep-shape-box">
          <div class="rep-label" style="text-align:center;">\${isEn ? 'ARMOR CLASS' : 'CLASE DE ARMADURA'}</div>
          <div class="rep-shape-shield">\${char.ac}</div>
        </div>
        <div class="rep-shape-box">
          <div class="rep-label" style="text-align:center;">\${isEn ? 'INITIATIVE' : 'INICIATIVA'}</div>
          <div class="rep-shape-circle">+\${calcModifier(eff.dex)}</div>
        </div>
        <div class="rep-shape-box">
          <div class="rep-label" style="text-align:center;">\${isEn ? 'SPEED' : 'VELOCIDAD'}</div>
          <div class="rep-shape-hex">\${char.speed}</div>
        </div>
        <div class="rep-shape-box">
          <div class="rep-label" style="text-align:center;">\${isEn ? 'HIT POINTS' : 'PUNTOS DE GOLPE'}</div>
          <div class="rep-shape-heart"><span class="rep-heart-lbl">MÁX.</span>\${char.hpMax}</div>
        </div>
        <div class="rep-box rep-hd-box">
          <div class="rep-label" style="text-align:right;">\${isEn ? 'HIT DICE' : 'DADOS DE GOLPE'}</div>
          <div class="rep-hd-content">
            <span class="rep-label">Total</span> <span style="border-bottom: 1px solid #aaa; width: 40px; display:inline-block; text-align:center;">\${char.level}\${char.hitDiceType || 'd8'}</span>
          </div>
        </div>
      </div>

      <div class="rep-split-row">
        <!-- Center Left (HP & Skills) -->
        <div class="rep-split-col">
          <div class="rep-box rep-hp-current">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'CURRENT HIT POINTS' : 'PUNTOS DE GOLPE ACTUALES'}</div>
          </div>
          <div class="rep-box rep-hp-temp">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'TEMPORARY HIT POINTS' : 'PUNTOS DE GOLPE TEMPORALES'}</div>
          </div>

          <div class="rep-box rep-skills-box">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'SKILLS' : 'HABILIDADES'}</div>
            <div class="rep-list-header"><span></span><span></span><span class="rep-label" style="text-align:right;">BONIF.</span></div>
\`;

  Object.keys(DND_SKILLS).forEach(skillKey => {
    const skillDef = DND_SKILLS[skillKey];
    const skillName = isEn ? skillDef.en : skillDef.es;
    const isProf = char.skills && char.skills[skillKey]?.proficient ? true : false;
    const isExp = char.skills && char.skills[skillKey]?.expertise ? true : false;
    const mod = calculateSkillModifier(skillKey, char);
    const sign = mod >= 0 ? '+' + mod : '' + mod;
    const dotClass = isExp ? ' rep-expert' : (isProf ? ' rep-filled' : '');
    html += \`
            <div class="rep-list-row">
              <span class="rep-dot\${dotClass}"></span>
              <span class="rep-list-attr">\${attrShort[skillDef.attr]}</span>
              <span class="rep-list-name">\${skillName} <small>(\${attrShort[skillDef.attr]})</small></span>
              <span class="rep-list-mod">\${sign}</span>
            </div>
    \`;
  });

  html += \`
            <div class="rep-box-title" style="text-align:center; margin-top:10px;">\${isEn ? 'PROFICIENCIES' : 'COMPETENCIAS'}</div>
            <div class="rep-prof-line" style="margin-top:5px;"></div>
            <div class="rep-prof-line"></div>
          </div>
        </div>

        <!-- Center Right (Saves & Traits) -->
        <div class="rep-split-col">
          <div class="rep-box rep-saves-box">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'SAVING THROWS' : 'TIRADAS DE SALVACIÓN'}</div>
            <div class="rep-list-header"><span></span><span></span><span class="rep-label" style="text-align:right;">BONIF.</span></div>
\`;

  attrKeys.forEach(attr => {
    const isProf = profSaves.includes(attr);
    const mod = calcModifier(eff[attr] || 10);
    const finalMod = mod + (isProf ? prof : 0);
    const sign = finalMod >= 0 ? '+' + finalMod : '' + finalMod;
    html += \`
            <div class="rep-list-row">
              <span class="rep-dot\${isProf ? ' rep-filled' : ''}"></span>
              <span class="rep-list-attr">\${attrShort[attr]}</span>
              <span class="rep-list-name">\${attrLong[attr]}</span>
              <span class="rep-list-mod">\${sign}</span>
            </div>
    \`;
  });

  html += \`
          </div>

          <div class="rep-box rep-traits-box">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'FEATURES & TRAITS' : 'RASGOS Y ATRIBUTOS'}</div>
            <div class="rep-lined-area">
\`;

  let featuresHtml = "";
  const speciesData = SPECIES_DB[char.race];
  if (speciesData) {
    (speciesData.traits || []).forEach(t => { featuresHtml += \`<div class="rep-line"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
    if (char.subrace && speciesData.lineages && speciesData.lineages[char.subrace]) {
      speciesData.lineages[char.subrace].forEach(t => { featuresHtml += \`<div class="rep-line"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
    }
  }
  const bgData = BACKGROUNDS_DB[char.background];
  if (bgData) { featuresHtml += \`<div class="rep-line"><strong>\${bgData.feat}:</strong> \${bgData.featDesc}</div>\`; }
  const subclassTraits = (window.SUBCLASS_TRAITS_DB && char.subclass) ? window.SUBCLASS_TRAITS_DB[char.subclass] : null;
  if (subclassTraits) {
    subclassTraits.filter(t => t.level <= char.level).forEach(t => { featuresHtml += \`<div class="rep-line"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
  }

  html += featuresHtml;
  
  for(let i=0; i<3; i++) html += \`<div class="rep-line-empty"></div>\`;

  html += \`
            </div>
          </div>

          <div class="rep-box rep-actions-box">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'SPECIAL ACTIONS, SPELLS & FEATURES' : 'ACCIONES ESPECIALES, CONJUROS Y RASGOS'}</div>
            <div class="rep-lined-area">
\`;

  let extraHtml = "";
  (char.customOriginTraits || []).forEach(t => { extraHtml += \`<div class="rep-line"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
  (char.feats || []).forEach(t => { extraHtml += \`<div class="rep-line"><strong>\${t.name}:</strong> \${t.desc}</div>\`; });
  (char.fightingStyles || []).forEach(fs => { extraHtml += \`<div class="rep-line"><strong>\${fs.name}:</strong> \${fs.desc}</div>\`; });
  (char.invocations || []).forEach(inv => { extraHtml += \`<div class="rep-line"><strong>\${inv.name}:</strong> \${inv.desc}</div>\`; });
  (char.metamagic || []).forEach(mm => { extraHtml += \`<div class="rep-line"><strong>\${mm.name}:</strong> \${mm.desc}</div>\`; });
  (char.weaponMasteries || []).forEach(wm => { extraHtml += \`<div class="rep-line"><strong>\${wm.name}:</strong> \${wm.desc}</div>\`; });
  
  // Weapons mapped as actions
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
    extraHtml += \`<div class="rep-line"><strong>Atacar con \${wp.name}:</strong> \${hitSign} a impactar. Daño: \${dmgText}</div>\`;
  });

  html += extraHtml;
  for(let i=0; i<6; i++) html += \`<div class="rep-line-empty"></div>\`;

  html += \`
            </div>
          </div>

        </div>
      </div>
      
      <!-- Bottom Row -->
      <div class="rep-bottom-row">
        <!-- Equipment -->
        <div class="rep-box rep-equipment">
          <div class="rep-box-title" style="text-align:center;">\${isEn ? 'EQUIPMENT' : 'EQUIPO'}</div>
          <div class="rep-lined-area">
\`;

  const otherItems = (char.inventory || []).filter(i => i.itemType !== "Arma" || !i.equipped);
  otherItems.forEach(item => {
    html += \`<div class="rep-line">• \${item.name}\${item.qty > 1 ? ' (x'+item.qty+')' : ''}</div>\`;
  });
  for(let i=0; i<4; i++) html += \`<div class="rep-line-empty"></div>\`;

  html += \`
          </div>
        </div>

        <!-- Coins -->
        <div class="rep-box rep-coins">
          <div class="rep-box-title" style="text-align:center;">\${isEn ? 'COINS' : 'MONEDAS'}</div>
          <div class="rep-coin-row"><span class="rep-label">PP</span> <span class="rep-coin-line"></span></div>
          <div class="rep-coin-row"><span class="rep-label">PM</span> <span class="rep-coin-line"></span></div>
          <div class="rep-coin-row"><span class="rep-label">PO</span> <span class="rep-coin-line"></span></div>
          <div class="rep-coin-row"><span class="rep-label">PL</span> <span class="rep-coin-line"></span></div>
          <div class="rep-coin-row"><span class="rep-label">PC</span> <span class="rep-coin-line"></span></div>
        </div>

        <!-- Personality -->
        <div class="rep-personality-col">
          <div class="rep-box rep-pers-box">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'PERSONALITY TRAITS' : 'RASGOS DE PERSONALIDAD'}</div>
            <div class="rep-line-empty" style="margin-top:10px;"></div>
            <div class="rep-line-empty"></div>
          </div>
          <div class="rep-box rep-pers-box">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'IDEALS' : 'IDEALES'}</div>
            <div class="rep-line-empty" style="margin-top:10px;"></div>
          </div>
          <div class="rep-box rep-pers-box">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'BONDS' : 'LAZOS'}</div>
            <div class="rep-line-empty" style="margin-top:10px;"></div>
          </div>
          <div class="rep-box rep-pers-box">
            <div class="rep-box-title" style="text-align:center;">\${isEn ? 'FLAWS' : 'DEFECTOS'}</div>
            <div class="rep-line-empty" style="margin-top:10px;"></div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- NOTES FOOTER -->
  <div class="rep-box rep-notes">
    <div class="rep-box-title" style="text-align:center;">\${isEn ? 'NOTES' : 'NOTAS'}</div>
    <div class="rep-line-empty" style="margin-top:5px;"></div>
    <div class="rep-line-empty"></div>
  </div>

</div>
\`;

  return html;
}
`;

code = code.substring(0, startIdx) + newFunc + code.substring(endIdx);
fs.writeFileSync('app.js', code);
console.log('SUCCESS: Rebuilt character sheet html to match replica');
