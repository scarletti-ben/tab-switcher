// < ========================================================
// < Imports
// < ========================================================

import { TabSwitcher } from "./tab-switcher.js";

// < ========================================================
// < Entry Point
// < ========================================================

function main() {

    let id = TabSwitcher.create('page', 'tab-switcher');
    let switcher = new TabSwitcher(id);

    // > Create a tab with a note (uses pages.css)
    var noteUUID = crypto.randomUUID();
    var name = 'note';
    var note = document.createElement('div');
    note.classList.add('note');
    var textarea = document.createElement('textarea');
    textarea.value = name;
    note.appendChild(textarea);
    switcher.add(noteUUID, name, note);

    // > Create another tab with a 3x3 grid (uses inline styling)
    var gridUUID = crypto.randomUUID();
    var name = 'grid';
    var grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gap = '10px';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.textContent = `Cell ${i + 1}`;
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '10px';
        grid.appendChild(cell);
    }
    switcher.add(gridUUID, name, grid);

    // > Show the note (first) tab
    switcher.show(noteUUID);

}

// < ========================================================
// < Execution
// < ========================================================

main();