// < ========================================================
// < Immediately Invoked Function Expression (IIFE)
// < ========================================================

(function () {

    // < ========================================================
    // < Injected CSS
    // < ========================================================

    const styles = `
    .tab-switcher {
      --curviness: 16px;
      --text-color: white;
      --notch-height: 32px;
      --notch-width: 64px;
      --notch-gap: 8px;
      --notch-color: rgb(60, 60, 60);
      --alternate-color: black;
      --scrollbar-color: var(--alternate-color) transparent;
      
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--text-color);
    }

    .tab-switcher .hidden {
      display: none !important;
    }

    .tab-switcher .highlighted {
      background-color: var(--alternate-color) !important;
    }

    .tab-switcher .top-section {
      width: 100%;
      height: var(--notch-height);
      box-sizing: border-box;
      padding: 0px var(--curviness);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .tab-switcher .ribbon {
      width: 100%;
      height: var(--notch-height);
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      gap: var(--notch-gap);
    }

    .tab-switcher .notch {
      width: var(--notch-width);
      height: var(--notch-height);
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      border-radius: var(--curviness) var(--curviness) 0px 0px;
      background-color: var(--notch-color);
      user-select: none;
      cursor: pointer;
    }

    .tab-switcher .notch:hover {
      opacity: 0.5;
    }

    .tab-switcher .bottom-section {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .tab-switcher .display {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: var(--curviness);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 3px solid var(--alternate-color);
    }

    .tab-switcher .window {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .tab-switcher .pane {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .tab-switcher .header {
      width: 100%;
      height: var(--notch-height);
      box-sizing: border-box;
      padding: 0px var(--curviness);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background-color: var(--alternate-color);
    }

    .tab-switcher .footer {
      width: 100%;
      height: var(--notch-height);
      box-sizing: border-box;
      padding: 0px var(--curviness);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background-color: var(--alternate-color);
    }`;

    // ! Create <style> and add to document head
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

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

    // < ========================================================
    // < TabSwitcher Class
    // < ========================================================

    class TabSwitcher {

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
         * Generate tab-switcher HTML structure inside a given container element
         * @param {string} containerID - The ID of the container element
         * @param {string} switcherID - The ID of the new tab-switcher element
         * @returns {string} - The id of the new tab-switcher element
         */
        static create(containerID, switcherID) {
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
            </div>`;
            container.insertAdjacentHTML('beforeend', tabSwitcherHTML);
            return switcherID;
        }

    }

    // < ========================================================
    // < Add TabSwitcher Class to Globals via window
    // < ========================================================

    window.TabSwitcher = TabSwitcher;
    console.log('tab-switcher-combined.js has run its immediately invoked function expression (IIFE)');

})();