const fs = require('fs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.localStorage = {getItem:()=>'es'};

eval(fs.readFileSync('spells_db.js','utf8'));
const code = fs.readFileSync('app.js','utf8');
const funcCode = code.match(/function createSpellRowHTML[\s\S]+?return row;\s*\n}/)[0] 
  + '\nfunction translateVal(v){return v;}\nfunction getActiveCharacter(){return {level:1, profBonus:2, class:"Mago", invocations:[]};}\nfunction getEffectiveAttributes(){return {int:10};}\nfunction calcModifier(){return 0;}\nfunction getSpellcastingAbility(){return "int";}\n'
  + code.match(/function getSpellMechanics[\s\S]+?return \{ type, toHitOrDC, formula: formula \|\| "" \};\s*\n}/)[0]
  + '\nfunction sanitizeSpellFormula(f){return f;}\nfunction scaleCantripFormula(f){return f;}\n';

eval(funcCode);

try {
  const row = createSpellRowHTML(SPELLS_DB_ES[0], false, false, false);
  console.log("SUCCESS:", row.outerHTML.substring(0, 100) + "...");
} catch (e) {
  console.error("ERROR rendering spell row:", e);
}
