const fs = require('fs');
const http = require('http');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const PORT = 8082;

// Define a simple file server
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((request, response) => {
  let filePath = '.' + request.url;
  if (filePath === './') filePath = './index.html';

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Test server running at http://127.0.0.1:${PORT}/`);
  runJSDOMTest();
});

function runJSDOMTest() {
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on("jsdomError", (err) => {
    console.error('JSDOM Error:', err.message, err.stack);
  });
  virtualConsole.on("error", (...args) => console.error('Browser Error:', ...args));
  virtualConsole.on("log", (...args) => console.log('Browser Log:', ...args));
  virtualConsole.on("warn", (...args) => console.warn('Browser Warn:', ...args));

  JSDOM.fromURL(`http://127.0.0.1:${PORT}/`, {
    runScripts: 'dangerously',
    resources: 'usable',
    virtualConsole,
    beforeParse(window) {
      // Mock localStorage with a character
      const defaultChar = {
        id: "char_test",
        name: "Test Character",
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
      };

      const store = {
        "dnd55_language": "es",
        "dnd55_characters": JSON.stringify([defaultChar]),
        "dnd55_active_char_id": "char_test"
      };
      
      window.localStorage = {
        getItem: (key) => store[key] || null,
        setItem: (key, val) => { store[key] = val; },
        removeItem: (key) => { delete store[key]; },
        clear: () => { for (let k in store) delete store[k]; }
      };
      window.alert = (msg) => console.log('ALERT:', msg);
      window.caches = {
        delete: () => Promise.resolve(true),
        keys: () => Promise.resolve([])
      };
    }
  }).then(dom => {
    setTimeout(() => {
      console.log('--- Testing Modal Actions ---');
      try {
        const window = dom.window;
        const document = window.document;
        
        console.log('Opening New Character Modal...');
        window.openNewCharacterModal();
        console.log('New Character Modal Opened successfully.');

        // Fill in new character details
        document.getElementById("newCharName").value = "Thorin";
        document.getElementById("newCharClass").value = "Guerrero";
        document.getElementById("newCharSubclass").value = "Campeón";
        document.getElementById("newCharLevel").value = "2";
        document.getElementById("newCharRace").value = "Enano";
        document.getElementById("newCharBg").value = "Soldado";
        document.getElementById("newCharAsiPlus2").value = "str";
        document.getElementById("newCharAsiPlus1").value = "con";

        // Submit form
        console.log('Submitting New Character Form...');
        const newForm = document.querySelector("#newCharModal form");
        const submitEvent = new window.Event('submit', { bubbles: true, cancelable: true });
        newForm.dispatchEvent(submitEvent);
        console.log('New Character Form Submitted successfully.');

        // Verify active character
        const activeChar = window.getActiveCharacter();
        console.log('Active Character:', activeChar.name, 'Class:', activeChar.class, 'Level:', activeChar.level);
        if (activeChar.name !== "Thorin" || activeChar.class !== "Guerrero" || activeChar.level !== 2) {
          throw new Error("Character creation failed or incorrect properties.");
        }

        console.log('Opening Edit Character Modal...');
        window.openEditCharacterModal();
        console.log('Edit Character Modal Opened successfully.');

        // Let's add some multiclass rows to test multiclass editing
        console.log('Adding Multiclass Row...');
        window.addMulticlassRow("Mago", "Evocación", 1);

        // Submit edit form
        console.log('Submitting Edit Character Form...');
        const editForm = document.querySelector("#editCharModal form");
        const editSubmitEvent = new window.Event('submit', { bubbles: true, cancelable: true });
        editForm.dispatchEvent(editSubmitEvent);
        console.log('Edit Character Form Submitted successfully.');

        // Verify edited character
        const editedChar = window.getActiveCharacter();
        console.log('Edited Character:', editedChar.name, 'Class:', editedChar.class, 'Multiclasses:', JSON.stringify(editedChar.multiclasses));
        if (editedChar.multiclasses.length !== 1 || editedChar.multiclasses[0].class !== "Mago") {
          throw new Error("Multiclass edit failed or incorrect properties.");
        }

      } catch (err) {
        console.error('Test script caught error:', err.message, err.stack);
        process.exit(1);
      } finally {
        dom.window.close();
        server.close();
        console.log('Test completed.');
      }
    }, 4000);
  }).catch(err => {
    console.error('Failed to load page in JSDOM:', err);
    server.close();
  });
}
