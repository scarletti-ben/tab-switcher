// < ========================================================
// < Exported TabSwitcher Class
// < ========================================================

export class TabSwitcher {

    /** @param {string} id */
    constructor(id) {
        this.element = document.getElementById(id);
        this.top = this.element.querySelector('.top-section');
        this.ribbon = this.element.querySelector('.ribbon');
        this.bottom = this.element.querySelector('.bottom-section');
        this.frame = this.element.querySelector('.frame');
        this.header = this.element.querySelector('.header');
        this.window = this.element.querySelector('.window');
        this.footer = this.element.querySelector('.footer');
    }

    /** @returns {HTMLDivElement[]} */
    get notches() {
        return Array.from(this.ribbon.children);
    }

    /** @returns {HTMLDivElement[]} */
    get panes() {
        return Array.from(this.window.children);
    }

    /** @returns {string[]} */
    get uuids() {
        return this.notches.map(notch => notch.dataset.uuid);
    }

    /** @param {string} uuid @returns {HTMLDivElement} */
    notch(uuid) {
        return this.notches.find(notch => notch.dataset.uuid === uuid);
    }

    /** @param {string} uuid @returns {HTMLDivElement} */
    pane(uuid) {
        return this.panes.find(pane => pane.dataset.uuid === uuid);
    }

    /** @param {string} uuid */
    show(uuid) {
        for (let pane of this.panes) {
            toggleHidden(pane, pane.dataset.uuid !== uuid);
        }
        for (let notch of this.notches) {
            toggleHighlighted(notch, notch.dataset.uuid === uuid);
        }
    }

    /** @param {string} uuid @param {string} name @param {HTMLElement} element */
    add(uuid, name, element) {

        // > Create and append notch to ribbon
        let notch = document.createElement('div');
        notch.classList.add('notch');
        notch.innerText = name;
        notch.dataset.uuid = uuid;
        this.ribbon.appendChild(notch);

        // > Create and append pane to window, hidden
        let pane = document.createElement('div');
        pane.classList.add('pane', 'hidden');
        pane.dataset.uuid = uuid;
        this.window.appendChild(pane);

        // > Add event listeners to notch
        notch.addEventListener('click', (event) => {
            this.show(uuid);
        });

        // > Append passed element to pane
        pane.appendChild(element);

    }

    // < ========================================================
    // < Static Methods
    // < ========================================================

    /**
     * Inject tab-switcher HTML structure into a given container element by ID
     * @param {string} containerID - The ID of the container element to inject the HTML
     * @param {string} switcherID - The ID of the new tab-switcher element
     * @returns {string} - The id of the new tab-switcher element
     */
    static inject(containerID, switcherID) {
        let container = document.getElementById(containerID);
        const tabSwitcherHTML = `
            <div id="${switcherID}" class="tab-switcher">
                <div class="top-section">
                    <div class="ribbon"></div>
                </div>
    
                <div class="bottom-section">
                    <div class="display">
                        <div class="header"></div>
                        <div class="window"></div>
                        <div class="footer"></div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = tabSwitcherHTML;
        return switcherID;
    }

}

// < ========================================================
// < Internal Utility Functions
// < ========================================================

/** @param {HTMLElement} element @param {boolean} [force] */
function toggleHidden(element, force) {
    element.classList.toggle('hidden', force);
}

/** @param {HTMLElement} element @param {boolean} [force] */
function toggleHighlighted(element, force) {
    element.classList.toggle('highlighted', force);
}