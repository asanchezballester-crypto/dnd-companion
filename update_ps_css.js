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

  /* UTILS */
  .ps-sec-label { font-size: 6pt; font-weight: bold; text-transform: uppercase; text-align: center; margin-top: 4px; color: #333; }
  .ps-box-label { font-size: 5pt; font-weight: bold; text-transform: uppercase; text-align: center; margin-top: 2px; }

  /* PAGE CONTAINER */
  .ps { width: 100%; box-sizing: border-box; page-break-after: always; }
  .ps:last-child { page-break-after: auto; }

  /* HEADER */
  .ps-header { display: flex; justify-content: space-between; align-items: stretch; height: 65px; margin-bottom: 15px; }
  
  .ps-name-block { width: 32%; border-bottom: 2px solid #000; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 4px; }
  .ps-name { font-family: 'Cinzel', serif; font-size: 18pt; font-weight: bold; }
  .ps-name-label { font-size: 6pt; font-weight: bold; text-transform: uppercase; margin-top: 4px; }
  
  .ps-info-block { width: 55%; border: 1px solid #000; border-radius: 6px; padding: 4px 8px; display: flex; flex-direction: column; justify-content: space-between; background: #fdfdfd; }
  .ps-info-row { display: flex; justify-content: space-between; gap: 15px; }
  .ps-info-cell { flex: 1; border-bottom: 1px solid #aaa; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 1px; position: relative; }
  .ps-info-val { font-size: 8pt; font-family: 'Cinzel', serif; font-weight: bold; min-height: 12px; }
  .ps-info-lbl { font-size: 5pt; font-weight: bold; text-transform: uppercase; position: absolute; bottom: -8px; left: 0; color: #555; }
  
  .ps-logo-block { width: 10%; display: flex; justify-content: flex-end; align-items: center; }
  .ps-logo { max-height: 60px; object-fit: contain; }

  /* BODY - 3 COLS */
  .ps-body { display: flex; justify-content: space-between; gap: 15px; }
  .ps-col { width: 32%; display: flex; flex-direction: column; gap: 12px; }

  /* COL LEFT */
  .ps-top-row { display: flex; gap: 10px; }
  .ps-insp-box, .ps-prof-box { flex: 1; border: 2px solid #000; border-radius: 8px; padding: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .ps-insp-circle { width: 24px; height: 24px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14pt; margin-bottom: 2px; }
  .ps-insp-circle::after { content: "☆"; color: #aaa; font-weight: normal; }
  .ps-prof-val { font-size: 14pt; font-weight: bold; }

  .ps-attr-skills-wrap { display: flex; gap: 8px; }
  
  .ps-attrs { width: 45px; display: flex; flex-direction: column; gap: 10px; }
  .ps-attr { border: 2px solid #000; border-radius: 8px; padding-top: 4px; text-align: center; position: relative; height: 50px; }
  .ps-attr-label { font-size: 5pt; font-weight: bold; }
  .ps-attr-mod { font-size: 12pt; font-weight: bold; margin-top: 2px; }
  .ps-attr-score { position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); background: #fff; border: 1px solid #000; border-radius: 50%; width: 20px; height: 20px; font-size: 8pt; font-weight: bold; display: flex; align-items: center; justify-content: center; }

  .ps-saves-skills { flex: 1; display: flex; flex-direction: column; gap: 10px; }
  .ps-section-box { border: 2px solid #000; border-radius: 8px; padding: 6px; }
  .ps-list { display: flex; flex-direction: column; gap: 3px; }
  .ps-row { display: flex; align-items: center; font-size: 7pt; }
  .ps-dot { width: 6px; height: 6px; border: 1px solid #000; border-radius: 50%; display: inline-block; margin-right: 4px; }
  .ps-filled { background-color: #000; }
  .ps-expert { background-color: #000; box-shadow: 0 0 0 1px #fff, 0 0 0 2px #000; }
  .ps-mod { font-weight: bold; text-decoration: underline; width: 18px; text-align: right; margin-right: 4px; }
  .ps-rname { flex: 1; }

  .ps-passive { border: 2px solid #000; border-radius: 8px; padding: 6px; display: flex; align-items: center; }
  .ps-passive-num { width: 30px; height: 25px; border: 1px solid #000; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12pt; font-weight: bold; margin-right: 10px; }

  /* COL CENTER */
  .ps-combat-top { display: flex; gap: 8px; height: 80px; }
  .ps-ac-shield { width: 60px; background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L100 20 L100 60 Q100 100 50 120 Q0 100 0 60 L0 20 Z" fill="white" stroke="black" stroke-width="4"/></svg>') no-repeat center; background-size: contain; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 10px; }
  .ps-ac-val { font-size: 18pt; font-weight: bold; margin-bottom: 2px; }
  .ps-combat-stat { flex: 1; border: 2px solid #000; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .ps-cstat-val { font-size: 16pt; font-weight: bold; margin-bottom: 4px; }

  .ps-hp-block, .ps-thp-block { border: 2px solid #000; border-radius: 8px; padding: 6px; }
  .ps-hp-header { font-size: 7pt; color: #555; display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding-bottom: 2px; }
  .ps-hp-space { height: 40px; }
  .ps-thp-space { height: 35px; }

  .ps-hd-ds { display: flex; gap: 8px; }
  .ps-hd-block, .ps-ds-block { flex: 1; border: 2px solid #000; border-radius: 8px; padding: 6px; }
  .ps-hd-space { height: 30px; }
  .ps-ds-row { display: flex; align-items: center; gap: 4px; margin-bottom: 4px; justify-content: center; }
  .ps-ds-lbl { font-size: 6pt; width: 45px; text-align: right; }

  .ps-attacks-block { border: 2px solid #000; border-radius: 8px; padding: 6px; display: flex; flex-direction: column; flex: 1; }
  .ps-atk-table { width: 100%; border-collapse: collapse; font-size: 7pt; margin-bottom: 8px; }
  .ps-atk-table th { background: #eee; border: 1px solid #000; padding: 2px; text-align: left; }
  .ps-atk-table td { border-bottom: 1px solid #ccc; padding: 4px 2px; }
  .ps-atk-center { text-align: center; font-weight: bold; border-left: 1px solid #ccc; border-right: 1px solid #ccc; }
  .ps-blank-row { height: 20px; }
  .ps-wild-shape { font-size: 7.5pt; margin-top: auto; padding-top: 8px; border-top: 1px dashed #ccc; }

  /* COL RIGHT */
  .ps-pers-box { border: 2px solid #000; border-radius: 8px; padding: 6px; }
  .ps-pers-space { height: 30px; border-bottom: 1px solid #ccc; margin-bottom: 4px; }

  .ps-traits-box { border: 2px solid #000; border-radius: 8px; padding: 6px; flex: 1; display: flex; flex-direction: column; }
  .ps-traits-content { flex: 1; font-size: 7pt; }
  .ps-trait { margin-bottom: 4px; }

  /* PAGE 2 */
  .ps-p2-body { display: flex; justify-content: space-between; gap: 15px; }
  .ps-p2-col { width: 48%; display: flex; flex-direction: column; gap: 15px; }
  
  .ps-p2-section { border: 2px solid #000; border-radius: 8px; padding: 10px; }
  .ps-sec-title { font-family: 'Cinzel', serif; font-size: 11pt; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #000; margin-bottom: 8px; }
  
  .ps-res-block { margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px dashed #ccc; }
  .ps-res-name { font-weight: bold; font-size: 8pt; }
  .ps-res-desc { font-size: 7pt; margin-top: 2px; }
  .ps-bubble-row { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
  
  .ps-prof-content { font-size: 8pt; line-height: 1.4; }
  .ps-prof-content div { margin-bottom: 4px; }

  .ps-equip-section { flex: 1; display: flex; flex-direction: column; }
  .ps-equip-top { display: flex; gap: 10px; }
  .ps-money-grid { width: 35px; display: flex; flex-direction: column; gap: 4px; }
  .ps-money-cell { border: 1px solid #000; border-radius: 4px; height: 30px; display: flex; align-items: center; justify-content: center; position: relative; }
  .ps-money-label { font-size: 5pt; position: absolute; left: -16px; font-weight: bold; }
  
  .ps-items-list { flex: 1; font-size: 8pt; line-height: 1.4; }
  .ps-item-row { border-bottom: 1px solid #eee; padding-bottom: 2px; margin-bottom: 2px; }
  
  .ps-equip-blank { flex: 1; border-top: 2px solid #000; margin-top: 15px; padding-top: 10px; min-height: 200px; background: repeating-linear-gradient(to bottom, transparent, transparent 19px, #ccc 20px); }
  .ps-equip-blank-hint { font-size: 8pt; color: #666; font-style: italic; background: #fff; display: inline-block; padding-right: 8px; }

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
  console.log('Replaced @media print in styles.css for paginated classic layout');
}
