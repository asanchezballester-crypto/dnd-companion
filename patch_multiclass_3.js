const fs = require('fs');
const path = 'C:\\Users\\foxky\\.gemini\\antigravity\\scratch\\dnd-pwa\\app.js';
let c = fs.readFileSync(path, 'utf8');

// 1. PATCH renderOriginTraits
// We find where it says "const subclassTraits = (window.SUBCLASS_TRAITS_DB && char.subclass) ? window.SUBCLASS_TRAITS_DB[char.subclass] : null;"
// and replace it to gather all traits.
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
  // Need to also change "if (!speciesData && !bgData && !subclassTraits && !hasCustomTraits)"
  // Because now subclassTraits is an array, we should check subclassTraits.length
  
  c = c.replace(searchOriginTraits, replaceOriginTraits);
  c = c.replace('!subclassTraits', '(subclassTraits.length === 0)');
  
  // Then replace the rendering block for subclass traits
  const searchSubclassBlock = `
    // 3. RASGOS DE SUBCLASE
    if (subclassTraits) {
      const charLvl = parseInt(char.level) || 1;
      const validTraits = subclassTraits.filter(t => t.level <= charLvl);
      if (validTraits.length > 0) {
        html += \`<h3 style="font-size:12px;color:var(--gold-bright);margin-top:14px;margin-bottom:8px;text-transform:uppercase;border-bottom:1px dashed var(--gold-dark);padding-bottom:2px;letter-spacing:0.05em;">Subclase: \${char.subclass}</h3>\`;
        validTraits.forEach(tr => {
          html += \`
            <div class="trait-item" style="margin-bottom:8px;">
              <div class="trait-name" style="font-weight:600;font-size:12px;color:var(--gold);">\${tr.name}</div>
              <div class="trait-desc" style="font-size:11px;color:var(--text-dim);margin-top:2px;line-height:1.3;">\${tr.desc}</div>
            </div>
          \`;
        });
      }
    }`;
    
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
    
    if (c.includes('// 3. RASGOS DE SUBCLASE')) {
      c = c.replace(/\/\/\s*3\.\s*RASGOS DE SUBCLASE[\s\S]*?\}\s*\}/, replaceSubclassBlock);
    } else {
      console.log('Could not find rendering block for subclasses');
    }
}

// 2. PATCH generatePrintSheetHTML
// Wait, the search string might be slightly different. We can use a regex.
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
console.log('Patch step 3 applied.');
