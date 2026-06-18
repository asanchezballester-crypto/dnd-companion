const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const printStart = css.indexOf('@media print {');
if (printStart !== -1) {
  const newPrintCss = `@media print {
  body {
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 8pt !important;
    font-family: Arial, sans-serif !important;
    line-height: 1.1 !important;
    padding: 0 !important;
    margin: 0 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  body > *:not(#printArea) { display: none !important; }
  
  #printArea {
    display: block !important;
    background: #ffffff !important;
    color: #000000 !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  @page {
    size: A4;
    margin: 0.8cm;
  }

  .print-sheet-classic {
    width: 100%;
    box-sizing: border-box;
  }

  .print-ch-label {
    font-size: 5.5pt;
    font-weight: bold;
    text-transform: uppercase;
    color: #000;
  }

  /* HEADER */
  .print-classic-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    height: 60px;
  }

  .print-ch-namebox {
    width: 30%;
    border-bottom: 2px solid #000;
    padding-bottom: 4px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  .print-ch-name {
    font-family: 'Cinzel', serif;
    font-size: 16pt;
    font-weight: bold;
  }

  .print-ch-infobox {
    width: 55%;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 4px 8px;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .print-ch-inforow {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }

  .print-ch-field {
    flex: 1;
    border-bottom: 1px solid #999;
    padding-bottom: 2px;
    position: relative;
  }
  .print-ch-val {
    font-size: 8pt;
    height: 12px;
    font-weight: bold;
    font-family: 'Cinzel', serif;
  }

  .print-ch-logo {
    width: 10%;
    display: flex;
    justify-content: flex-end;
  }
  .print-ch-logo img {
    max-height: 60px;
    object-fit: contain;
  }

  /* BODY */
  .print-classic-body {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }

  .print-col-left, .print-col-center, .print-col-right {
    width: 32%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* COMMON BOX STYLES */
  .print-prof-box, .print-inspiration-box, .print-skills-box, .print-passive-wis-box, .print-proficiencies-box,
  .print-combat-box, .print-hp-box, .print-thp-box, .print-hd-box, .print-ds-box, .print-attacks-box,
  .print-personality-box, .print-features-box, .print-equipment-box {
    border: 2px solid #000;
    border-radius: 8px;
    background: #fff;
    padding: 6px;
    display: flex;
    flex-direction: column;
  }

  /* LEFT COLUMN */
  .print-top-left-group {
    display: flex;
    gap: 10px;
  }
  
  .print-inspiration-box {
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 2px;
  }
  .print-insp-icon { font-size: 16pt; color: #ddd; text-shadow: 1px 1px 0 #000; }
  
  .print-prof-box {
    flex: 2;
    align-items: center;
    justify-content: center;
    padding: 2px;
  }
  .print-prof-val { font-size: 12pt; font-weight: bold; }

  .print-attributes-skills-wrapper {
    display: flex;
    gap: 8px;
  }

  .print-attributes-col {
    width: 45px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .print-classic-attr {
    border: 2px solid #000;
    border-radius: 8px;
    text-align: center;
    padding-top: 4px;
    position: relative;
    height: 55px;
  }
  .print-attr-label { font-size: 5pt; font-weight: bold; }
  .print-attr-modval { font-size: 12pt; font-weight: bold; margin-top: 2px; }
  .print-attr-scoreval {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border: 1px solid #000;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 8pt;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .print-skills-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .print-skill-row {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 6.5pt;
    margin-bottom: 2px;
  }
  .print-bubble {
    width: 6px;
    height: 6px;
    border: 1px solid #000;
    border-radius: 50%;
    display: inline-block;
  }
  .print-bubble.filled { background-color: #000; }
  .print-bubble.expert { background-color: #000; box-shadow: 0 0 0 1px #fff, 0 0 0 2px #000; }
  
  .print-passive-val {
    width: 25px;
    height: 20px;
    border: 1px solid #000;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 8px;
  }
  .print-passive-wis-box { flex-direction: row; align-items: center; padding: 4px; }

  .print-prof-content { font-size: 6.5pt; line-height: 1.3; min-height: 60px; }

  /* CENTER COLUMN */
  .print-combat-top {
    display: flex;
    gap: 8px;
    height: 70px;
  }
  
  .print-shield-box {
    width: 50px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L100 20 L100 60 Q100 100 50 120 Q0 100 0 60 L0 20 Z" fill="white" stroke="black" stroke-width="4"/></svg>') no-repeat center;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }
  .print-shield-val { font-size: 16pt; font-weight: bold; margin-bottom: 2px; }

  .print-combat-box {
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .print-combat-val { font-size: 14pt; font-weight: bold; margin-bottom: 4px; }

  .print-hp-container {
    border: 2px solid #000;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .print-hp-box {
    padding: 6px;
    border-bottom: 2px solid #000;
  }
  .print-hp-header { font-size: 7pt; display: flex; justify-content: space-between; color: #555; }
  .print-hp-current-area { height: 40px; }
  .print-thp-box { padding: 6px; }

  .print-hd-ds-container { display: flex; gap: 8px; }
  .print-hd-box { flex: 1; padding: 6px; }
  .print-ds-box { flex: 1; justify-content: center; }
  .print-ds-row { display: flex; align-items: center; justify-content: center; gap: 4px; }

  .print-attacks-box { min-height: 250px; }
  .print-classic-weapons-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  .print-classic-weapons-table th { background: #eee; font-size: 6pt; padding: 2px; border: 1px solid #000; }
  .print-classic-weapons-table td { background: #fdfdfd; padding: 2px; border-bottom: 1px solid #ccc; }

  /* RIGHT COLUMN */
  .print-personality-box {
    min-height: 40px;
    justify-content: flex-end;
  }
  .print-blank-lines {
    border-bottom: 1px solid #ccc;
    height: 10px;
    margin-bottom: 4px;
  }

  .print-features-box { min-height: 280px; }
  .print-features-content { font-size: 6.5pt; flex: 1; }

  .print-equipment-box { min-height: 200px; display: flex; flex-direction: column; }
  .print-money-col {
    width: 30px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-right: 8px;
  }
  .print-money-box {
    border: 1px solid #000;
    border-radius: 4px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .print-money-box .print-ch-label { position: absolute; left: -15px; font-size: 5pt; }
  .print-items-col { flex: 1; display: flex; flex-direction: column; }

  /* ================= Spellbook Layout ================= */
  .print-spellcasting-stats {
    display: flex;
    gap: 10px;
    margin-left: 15px;
  }
  .print-spellcasting-stats .print-stat-box {
    min-height: 30px;
    min-width: 60px;
    padding: 2px;
  }

  .print-spellbook-columns {
    column-count: 3;
    column-gap: 15px;
    column-rule: 1px solid #ddd;
    width: 100%;
  }

  .print-spell-group {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 10px;
  }

  .print-spell-group-title {
    font-family: 'Cinzel', serif;
    font-size: 11pt;
    font-weight: bold;
    border-bottom: 2px solid #000;
    margin: 0 0 6px 0;
    text-transform: uppercase;
    column-span: none;
  }

  .print-spell-card-compact {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 8px;
    font-size: 7pt;
  }

  .print-spell-name-compact {
    font-size: 8.5pt;
    font-weight: bold;
    margin: 0;
    color: #000;
  }

  .print-spell-school-compact {
    font-weight: normal;
    font-style: italic;
    color: #555;
    font-size: 6.5pt;
  }

  .print-spell-meta-compact {
    font-style: italic;
    color: #333;
    margin: 2px 0;
    border-bottom: 1px dotted #ccc;
    padding-bottom: 2px;
  }

  .print-spell-desc-compact {
    line-height: 1.1;
    color: #222;
  }
}
`;
  css = css.substring(0, printStart) + newPrintCss;
  fs.writeFileSync('styles.css', css);
  console.log('Replaced @media print in styles.css for classic layout');
}
