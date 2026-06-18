const fs = require('fs');

// Mock JSDOM-like global environment
const mockElements = {};
const mockDocument = {
  addEventListener: () => {},
  getElementById: (id) => {
    if (!mockElements[id]) {
      mockElements[id] = {
        id: id,
        classList: {
          add: (cls) => {},
          remove: (cls) => {}
        },
        style: { display: 'none' },
        value: '',
        innerHTML: '',
        textContent: '',
        checked: false,
        readOnly: false,
        appendChild: (child) => {}
      };
    }
    return mockElements[id];
  },
  createElement: (tag) => {
    return {
      tagName: tag,
      value: '',
      textContent: '',
      selected: false
    };
  },
  querySelectorAll: (selector) => {
    return [];
  }
};

global.document = mockDocument;
global.window = {
  addEventListener: () => {},
  localStorage: {
    getItem: (key) => {
      if (key === 'dnd55_language') return 'es';
      return null;
    },
    setItem: () => {}
  }
};
global.alert = (msg) => {
  console.log('ALERT:', msg);
};
global.localStorage = global.window.localStorage;
global.navigator = {
  serviceWorker: {
    register: () => Promise.resolve()
  }
};
global.Node = { TEXT_NODE: 3 };

// Load all files
const class_features = fs.readFileSync('class_features_db.js', 'utf8');
const class_features_en = fs.readFileSync('class_features_db_en.js', 'utf8');
const spells = fs.readFileSync('spells_db.js', 'utf8');
const spells_en = fs.readFileSync('spells_db_en.js', 'utf8');
const subclass_traits = fs.readFileSync('subclass_traits.js', 'utf8');
const subclass_traits_en = fs.readFileSync('subclass_traits_en.js', 'utf8');
const feats = fs.readFileSync('feats_db.js', 'utf8');
const feats_en = fs.readFileSync('feats_db_en.js', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');

// We will append our test code to the app code, so they share the scope!
const testCode = `
console.log('--- Inside App scope ---');
const classesList = [
  "Guerrero", "Mago", "Clérigo", "Pícaro", "Bardo", "Druida",
  "Bárbaro", "Hechicero", "Brujo", "Paladín", "Explorador", "Monje"
];

classesList.forEach(cls => {
  const subclasses = SUBCLASSES_DB[cls] || [];
  subclasses.forEach(sub => {
    // console.log(\`Testing Class: \${cls}, Subclass: \${sub}\`);
    const char = {
      id: "test",
      name: "Test",
      class: cls,
      subclass: sub,
      level: 3,
      race: "Humano",
      background: "Sabio",
      hpMax: 20,
      hpCurrent: 20,
      ac: 15,
      speed: 30,
      profBonus: 2,
      attributes: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      multiclasses: [],
      feats: [],
      fightingStyles: [],
      invocations: [],
      metamagic: [],
      divineOrder: "",
      primalOrder: "",
      weaponMasteries: []
    };

    try {
      setupDefaultSpellSlots(char);
      setupClassResources(char);
      setupSubclassResources(char);
      
      // We mimic renderActiveCharacter function calls
      renderAttributes(char);
      renderClassResources(char);
      renderSubclassResources(char);
      renderConditions(char);
      renderOriginTraits(char);
      renderFeats(char);
      renderCombatSection(char);
      renderClassChoices(char);
      renderWildShapeSection(char);
      renderSkills(char);
      renderPortrait(char);
    } catch (err) {
      console.error(\`ERROR for \${cls} / \${sub}:\`, err.message, err.stack);
    }
  });
});

console.log('Testing openNewCharacterModal...');
try {
  openNewCharacterModal();
  console.log('openNewCharacterModal completed.');
} catch (e) {
  console.error('ERROR in openNewCharacterModal:', e.message, e.stack);
}

console.log('Testing openEditCharacterModal...');
try {
  characters = [{
    id: "test",
    name: "Test",
    class: "Guerrero",
    subclass: "Maestro de Batalla",
    level: 3,
    race: "Humano",
    background: "Sabio",
    hpMax: 20,
    hpCurrent: 20,
    ac: 15,
    speed: 30,
    profBonus: 2,
    attributes: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    multiclasses: [],
    feats: [],
    fightingStyles: [],
    invocations: [],
    metamagic: [],
    divineOrder: "",
    primalOrder: "",
    weaponMasteries: []
  }];
  activeCharId = "test";
  openEditCharacterModal();
  console.log('openEditCharacterModal completed.');
} catch (e) {
  console.error('ERROR in openEditCharacterModal:', e.message, e.stack);
}
`;

// Evaluate them in order
try {
  eval(class_features);
  eval(class_features_en);
  eval(spells);
  eval(spells_en);
  eval(subclass_traits);
  eval(subclass_traits_en);
  eval(feats);
  eval(feats_en);
  
  eval(app + '\n' + testCode);
  console.log('All tests completed successfully!');
} catch (err) {
  console.error('Fatal evaluation error:', err.message, err.stack);
}
