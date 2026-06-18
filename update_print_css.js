const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const printStart = css.indexOf('@media print {');
if (printStart !== -1) {
  const newPrintCss = `@media print {
  body {
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 8pt !important;
    line-height: 1.2 !important;
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
    margin: 1cm;
  }

  .print-sheet {
    background: #ffffff !important;
    color: #000000 !important;
    width: 100%;
    box-sizing: border-box;
  }

  .print-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #000;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }

  .print-header-details {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .print-char-name {
    font-size: 18pt;
    font-weight: bold;
    font-family: 'Cinzel', serif;
    margin: 0;
    line-height: 1;
  }

  .print-char-meta {
    font-size: 8.5pt;
    color: #333;
    font-weight: bold;
    margin-top: 2px;
  }

  .print-logo {
    max-height: 35px;
    object-fit: contain;
    margin-left: 10px;
  }

  /* 3-Column Layout for Character Sheet */
  .print-3-col-layout {
    display: grid;
    grid-template-columns: 20% 45% 35%;
    gap: 12px;
  }

  .print-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Column 1: Attributes */
  .print-attributes-vertical {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  .print-attr-vertical {
    border: 1.5px solid #000;
    border-radius: 8px;
    padding: 4px;
    text-align: center;
    width: 45px;
    background: #fff;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
  }

  .print-attr-name {
    font-size: 6.5pt;
    font-weight: bold;
    text-transform: uppercase;
  }

  .print-attr-score {
    font-size: 11pt;
    font-weight: bold;
    margin: 2px 0;
  }

  .print-attr-mod {
    font-size: 7.5pt;
    font-weight: bold;
    border-top: 1px solid #000;
    padding-top: 1px;
  }

  /* Compact Lists (Saves & Skills) */
  .print-compact-list .print-list-item {
    display: flex;
    align-items: center;
    padding: 2px 0;
    border-bottom: 1px solid #eaeaea;
  }

  .print-indicator {
    width: 6px;
    height: 6px;
    border: 1px solid #000;
    border-radius: 50%;
    margin-right: 4px;
    display: inline-block;
  }

  .print-indicator.proficient { background-color: #000; }
  .print-indicator.expertise { background-color: #000; box-shadow: 0 0 0 1px #fff, 0 0 0 2px #000; }

  .print-list-name { font-size: 7pt; flex: 1; }
  .print-list-attr { font-size: 6pt; color: #666; width: 18px; text-align: center; }
  .print-list-val { font-size: 8pt; font-weight: bold; width: 20px; text-align: right; }

  /* Section Titles */
  .print-section {
    background: rgba(0,0,0,0.02);
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px;
  }
  
  .print-section-title {
    font-family: 'Cinzel', serif;
    font-size: 9pt;
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 1px solid #000;
    margin: 0 0 6px 0;
    padding-bottom: 2px;
    color: #000;
  }

  /* Column 2: Stats Grid */
  .print-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    margin-bottom: 5px;
  }

  .print-stat-box {
    border: 1px solid #000;
    border-radius: 4px;
    text-align: center;
    padding: 4px 2px;
    min-height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;
  }

  .print-stat-label {
    font-size: 6.5pt;
    font-weight: bold;
    text-transform: uppercase;
    color: #444;
  }

  .print-stat-val {
    font-size: 12pt;
    font-weight: bold;
    font-family: 'Cinzel', serif;
  }

  .print-blank-box {
    border: 1px dashed #666;
    height: 18px;
    margin-top: 2px;
    border-radius: 2px;
  }

  /* Compact Tables */
  .print-compact-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.5pt;
  }
  .print-compact-table th {
    background: #f0f0f0;
    border: 1px solid #000;
    padding: 2px 4px;
    text-align: left;
    font-weight: bold;
  }
  .print-compact-table td {
    border: 1px solid #ccc;
    padding: 2px 4px;
  }

  /* Resources */
  .print-resource-block {
    margin-bottom: 6px;
    padding-bottom: 4px;
    border-bottom: 1px dotted #ccc;
  }
  .print-resource-block:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .print-resource-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .print-resource-name {
    font-size: 7.5pt;
    font-weight: bold;
  }
  .print-bubble-row {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin-top: 3px;
  }
  .print-bubble-empty {
    width: 8px;
    height: 8px;
    border: 1px solid #000;
    border-radius: 50%;
  }

  /* Notes */
  .print-notes-compact {
    font-size: 7pt;
    color: #444;
    font-family: monospace;
    white-space: pre-wrap;
    min-height: 50px;
  }

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
  console.log('Replaced @media print in styles.css');
}
