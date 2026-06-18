const fs = require('fs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="spellsListPrepared"></div><div id="spellsListSearch"></div><div id="spellSlotsGrid"></div><input id="spellSearch" value=""/></body></html>');
global.document = dom.window.document;
global.window = dom.window;
const store = {
  'dnd55_characters': '[{"id":"1","level":1,"spells":[],"spellFavorites":[]}]',
  'dnd55_active_char_id': '1'
};
global.localStorage = {
  getItem: (k) => store[k] || null,
  setItem: (k, v) => { store[k] = v; }
};
eval(fs.readFileSync('spells_db.js','utf8'));
const appCode = fs.readFileSync('app.js','utf8').replace(/document\.addEventListener\('DOMContentLoaded'/g, 'function disabled(');
eval(appCode);

loadData();
renderSpellsTab();

console.log('Spells before:', getActiveCharacter().spells);
toggleSpellAdd({stopPropagation:()=>{}}, 'agarre_electrizante', false);
console.log('Spells after:', getActiveCharacter().spells);
