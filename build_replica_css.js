const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const printStart = css.indexOf('@media print {');
if (printStart !== -1) {
  const newPrintCss = `@media print {
  body {
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 7.5pt !important;
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
    margin: 0.6cm;
  }

  /* UTILS */
  .rep-label { font-size: 6pt; font-weight: bold; text-transform: uppercase; color: #333; }
  .rep-val { font-size: 9pt; font-weight: bold; font-family: 'Cinzel', serif; }
  .rep-box { border: 2px solid #000; box-shadow: 0 0 0 1px #fff inset, 0 0 0 2px #000 inset; background: #fff; padding: 6px; position: relative; }
  .rep-box-title { font-family: 'Cinzel', serif; font-size: 8pt; font-weight: bold; text-transform: uppercase; margin-bottom: 4px; }
  .rep-line { border-bottom: 1px solid #aaa; margin-bottom: 4px; padding-bottom: 2px; min-height: 12px; font-size: 7pt; }
  .rep-line-empty { border-bottom: 1px solid #ccc; height: 16px; margin-bottom: 4px; }
  
  .replica-sheet { width: 100%; box-sizing: border-box; display: flex; flex-direction: column; gap: 10px; }

  /* HEADER */
  .rep-header { display: flex; justify-content: space-between; align-items: stretch; height: 80px; margin-bottom: 10px; }
  .rep-logo-area { width: 25%; display: flex; align-items: center; justify-content: flex-start; }
  .rep-logo-img { max-height: 70px; max-width: 100%; object-fit: contain; }
  
  .rep-info-block { flex: 1; border: 2px solid #000; padding: 6px 12px; margin: 0 10px; background: #fdfdfd; display: flex; flex-direction: column; justify-content: center; gap: 6px; position: relative; }
  .rep-info-block::before { content: ""; position: absolute; top: 2px; left: 2px; right: 2px; bottom: 2px; border: 1px solid #000; pointer-events: none; }
  
  .rep-info-row { display: flex; justify-content: space-between; align-items: flex-end; }
  .rep-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 4px; }
  .rep-info-cell { display: flex; flex-direction: column; border-bottom: 1px solid #aaa; padding-bottom: 2px; position: relative; }
  .rep-info-cell .rep-label { font-size: 5pt; position: absolute; bottom: -8px; left: 0; }
  .rep-info-cell .rep-val { min-height: 12px; }

  .rep-insp-prof-block { width: 15%; border: 2px solid #000; padding: 4px; display: flex; flex-direction: column; gap: 4px; align-items: center; justify-content: space-between; position: relative; }
  .rep-insp-prof-block::before { content: ""; position: absolute; top: 2px; left: 2px; right: 2px; bottom: 2px; border: 1px solid #000; pointer-events: none; }
  
  .rep-insp-box { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .rep-insp-circle { width: 25px; height: 25px; border: 1.5px solid #000; border-radius: 50%; }
  
  .rep-prof-box { display: flex; flex-direction: column; align-items: center; margin-top: auto; }
  .rep-prof-shield { width: 35px; height: 35px; background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 L90 20 L90 60 Q90 90 50 100 Q10 90 10 60 L10 20 Z" fill="white" stroke="black" stroke-width="3"/></svg>') no-repeat center; background-size: contain; display: flex; align-items: center; justify-content: center; font-size: 10pt; font-weight: bold; padding-top: 5px; }

  /* MAIN BODY */
  .rep-main-grid { display: flex; gap: 15px; }
  
  /* COL 1: ATTRIBUTES */
  .rep-col1 { width: 28%; display: flex; flex-direction: column; gap: 10px; }
  .rep-attr-title { background: #000; color: #fff; text-align: center; font-family: 'Cinzel', serif; font-weight: bold; font-size: 9pt; padding: 4px; letter-spacing: 1px; }
  .rep-attr-list { border: 2px solid #000; padding: 6px; box-shadow: 0 0 0 1px #fff inset, 0 0 0 2px #000 inset; display: flex; flex-direction: column; gap: 6px; }
  .rep-attr-box { display: flex; align-items: center; gap: 10px; padding-bottom: 6px; border-bottom: 1px dashed #ccc; }
  .rep-attr-box:last-child { border-bottom: none; padding-bottom: 0; }
  .rep-attr-circle { width: 35px; height: 35px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14pt; font-weight: bold; flex-shrink: 0; }
  .rep-attr-info { flex: 1; display: flex; flex-direction: column; }
  .rep-attr-name { font-size: 6.5pt; font-weight: bold; text-transform: uppercase; }
  .rep-attr-sub { font-size: 5pt; font-weight: bold; color: #555; }
  .rep-attr-mod-label { font-size: 5pt; text-align: center; margin-top: 4px; }
  .rep-attr-mod-line { border-bottom: 1px solid #000; text-align: center; font-weight: bold; font-size: 8pt; min-height: 12px; }

  .rep-prof-section { margin-top: 6px; }
  .rep-prof-title { font-size: 6.5pt; font-weight: bold; text-transform: uppercase; }
  .rep-prof-line { border-bottom: 1px solid #ccc; min-height: 14px; font-size: 7pt; margin-top: 2px; }

  /* COL 2 & 3 COMBINED */
  .rep-col23 { width: 72%; display: flex; flex-direction: column; gap: 10px; }

  /* SHAPES ROW */
  .rep-shapes-row { display: flex; justify-content: space-between; align-items: center; height: 75px; }
  .rep-shape-box { display: flex; flex-direction: column; align-items: center; gap: 4px; width: 65px; }
  .rep-shape-shield { width: 60px; height: 60px; background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L95 20 L95 65 Q95 100 50 110 Q5 100 5 65 L5 20 Z" fill="white" stroke="black" stroke-width="3"/></svg>') no-repeat center; background-size: contain; display: flex; align-items: center; justify-content: center; font-size: 16pt; font-weight: bold; padding-top: 8px; }
  .rep-shape-circle { width: 55px; height: 55px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16pt; font-weight: bold; }
  .rep-shape-hex { width: 60px; height: 60px; background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 95,27 95,73 50,95 5,73 5,27" fill="white" stroke="black" stroke-width="3"/></svg>') no-repeat center; background-size: contain; display: flex; align-items: center; justify-content: center; font-size: 16pt; font-weight: bold; }
  .rep-shape-heart { width: 65px; height: 60px; background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 85 C50 85 5 55 5 30 A20 20 0 0 1 50 20 A20 20 0 0 1 95 30 C95 55 50 85 50 85 Z" fill="white" stroke="black" stroke-width="3"/></svg>') no-repeat center; background-size: contain; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 14pt; font-weight: bold; padding-bottom: 8px; position: relative; }
  .rep-heart-lbl { font-size: 4.5pt; margin-bottom: -2px; margin-top: 8px; }
  .rep-hd-box { flex: 1; margin-left: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; }
  .rep-hd-content { font-size: 10pt; font-weight: bold; margin-top: 10px; }

  /* SPLIT ROW (Saves, HP, Skills, Traits) */
  .rep-split-row { display: flex; gap: 15px; }
  .rep-split-col { width: 50%; display: flex; flex-direction: column; gap: 10px; }

  .rep-hp-current, .rep-hp-temp { height: 65px; }

  .rep-list-header { display: flex; align-items: center; gap: 4px; border-bottom: 1px solid #ccc; padding-bottom: 2px; margin-bottom: 4px; }
  .rep-list-header span { flex: 1; }
  .rep-list-row { display: flex; align-items: center; gap: 4px; font-size: 7pt; margin-bottom: 3px; }
  .rep-dot { width: 8px; height: 8px; border: 1px solid #000; border-radius: 50%; display: inline-block; flex-shrink: 0; }
  .rep-filled { background-color: #000; }
  .rep-expert { background-color: #000; box-shadow: 0 0 0 1px #fff, 0 0 0 2px #000; }
  .rep-list-attr { font-weight: bold; width: 22px; }
  .rep-list-name { flex: 1; }
  .rep-list-mod { border-bottom: 1px solid #000; width: 20px; text-align: center; font-weight: bold; }

  .rep-saves-box { height: 140px; }
  .rep-skills-box { flex: 1; }
  .rep-traits-box { height: 150px; }
  .rep-actions-box { flex: 1; }

  .rep-lined-area { display: flex; flex-direction: column; }

  /* BOTTOM ROW */
  .rep-bottom-row { display: flex; gap: 15px; height: 210px; margin-top: 5px; }
  .rep-equipment { width: 33%; }
  
  .rep-coins { width: 16%; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .rep-coin-row { display: flex; align-items: center; width: 100%; gap: 6px; }
  .rep-coin-line { border-bottom: 1px solid #000; flex: 1; height: 12px; }

  .rep-personality-col { width: 51%; display: flex; flex-direction: column; gap: 10px; }
  .rep-pers-box { flex: 1; display: flex; flex-direction: column; justify-content: center; }

  .rep-notes { height: 70px; margin-top: 10px; }

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
  console.log('Replaced @media print in styles.css for replica layout');
}
