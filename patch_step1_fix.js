const fs = require('fs');
const path = 'C:\\Users\\foxky\\.gemini\\antigravity\\scratch\\dnd-pwa\\app.js';
let c = fs.readFileSync(path, 'utf8');

// 1. Add window.getTotalLevel and window.getAllClasses at the very top of the file
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

// 2. Replace char.profBonus calculation
c = c.replace(/char\.profBonus \|\| Math\.ceil\(\(char\.level \|\| 1\) \/ 4\) \+ 1/g, 'char.profBonus || Math.ceil((window.getTotalLevel(char) || 1) / 4) + 1');

// 3. Replace setupDefaultSpellSlots
const startStr = 'function setupDefaultSpellSlots(char) {';
const endStr = 'function setupClassResources(char) {';

const startIndex = c.indexOf(startStr);
const endIndex = c.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
  const newSetupSlots = `function setupDefaultSpellSlots(char) {
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

`;
  c = c.slice(0, startIndex) + newSetupSlots + c.slice(endIndex);
  console.log("Replaced setupDefaultSpellSlots successfully.");
} else {
  console.log("Could not find start/end indices for setupDefaultSpellSlots.");
}

fs.writeFileSync(path, c, 'utf8');
console.log('Fixed step 1 applied.');
