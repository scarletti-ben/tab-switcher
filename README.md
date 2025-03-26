# tab-switcher v1.0.3

## Overview
This project is my first attempt at a `JavaScript` module to be served via `CDN`, it is not intended to be incredibly "feature-rich", but the `TabSwitcher` class has been useful when making test sites during web development. The main aim was to create a "tab" system, where only a single tab is open at a time and you can switch between the different tabs, thereby changing the content shown on the site. It is usable "as is" but some projects would likely benefit from altering the source code for their specific use case

## Demo Site
A demo site can be found on `GitHub Pages` via the link [here](https://scarletti-ben.github.io/tab-switcher). The folder structure of the files used by the demo site can be found below
```
/tab-switcher
  ├── index.html
  ├── pages.js
  ├── pages.css
  ├── tab-switcher.js
  └── tab-switcher.css
```

The demo site uses `pages.css` and `pages.js` for its general styling and functionality respectively. The `tab-switcher.js` and `tab-switcher.css` files allow use of the `TabSwitcher` class which is imported into `pages.js` using the `import` keyword.

## Using the Files

### Using the Files Locally

If you set up a project similar to the demo site you can use `tab-switcher.css` and `tab-switcher.js` alongside your regular project structure, your project structure would probably then look something like
```
/project
  ├── index.html
  ├── main.js
  ├── styles.css
  ├── tab-switcher.js
  └── tab-switcher.css
```

You can import `tab-switcher.css` via the `<head>` of your `index.html` as shown in the snippet below
```html
<head>

  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="tab-switcher.css">

</head>
```

You can import the `TabSwitcher` class from `tab-switcher.js` into your `main.js` using the syntax in the snippet below. You do not need to add `tab-switcher.js` the `<head>` of `index.html`
```javascript
import { TabSwitcher } from "./tab-switcher.js";
```
In order for your `main.js` file to allow use of the `import` keyword it will need to be given the type `module` in `index.html` as shown below
```html
<script type="module" src="main.js" defer></script>
```

### Using the Files via CDN

You can access usable versions of the files either using [`jsDelivr`](https://www.jsdelivr.com/) or via `GitHub Pages`. You may run into issues if you attempt to use a link to the raw file on `GitHub` itself, so it is best avoided

As the files are hosted in a `GitHub` repository, you can expect those files to be changing quite often

- If you are accessing the files via a `GitHub Pages` link you can expect to be using the latest version of the files as they exist on the `main` branch of the repository
  - https://scarletti-ben.github.io/tab-switcher/tab-switcher.js
  - https://scarletti-ben.github.io/tab-switcher/tab-switcher.css

- If you are accessing the files via a `jsDelivr` link you can specify an exact release tag, here we use `v1.0.3`, and ensure that the files you are accessing do not change, ensuring consistent functionality
  - https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.3/tab-switcher.js
  - https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.3/tab-switcher.css

You can import `tab-switcher.css` via the `<head>` of your `index.html` as shown in the snippet below 
```html
<head>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.3/tab-switcher.css">
</head>
```

You would set up your `main.js` as a module to allow use of the `import` keyword as shown in the snippet below 
```html
<body>
  <script type="module" src="main.js" defer></script>
</body>
```

You can then access the `TabSwitcher` class using the syntax in the snippet below
```javascript
import { TabSwitcher } from 'https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.3/tab-switcher.js';
```

### Using the "Combined" File via CDN
`tab-switcher-combined.js`, works a bit differently, it combines `tab-switcher.js` and `tab-switcher.css` into a single file. But, more importantly, it does not use the `import` / `export` syntax, simply importing it in the `<head>` of `index.html` is enough to gain access to the `TabSwitcher` class as shown below
```html
<head>
  <link rel="stylesheet" href="styles.css">
  <script src="https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.3/tab-switcher-combined.js"></script>
</head>
<body>
  <script defer>
    let containerID = 'page';
    let id = TabSwitcher.create(containerID, 'tab-switcher');
    let switcher = new TabSwitcher(id);
  </script>
</body>
```

It is worth noting that this method does not pollute the global namespace, and only adds `TabSwitcher`. This is achieved using an `Immediately Invoked Function Expression (IIFE)`. An `IIFE` is a function that wraps the entire script, meaning that declared variables are not automatically added to the global namespace. The function is immediately called after it is defined and only attaches specific variables to the `window` / global namespace. A heavily abridged version of the `IIFE` used can be found below
```javascript
(function () {

    // Inject CSS Styles
    const styles = `...`;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Internal Functions
    function toggleHidden(element, force) {}
    function toggleHighlighted(element, force) {}

    // Add TabSwitcher class to the Global Namespace
    class TabSwitcher {}
    window.TabSwitcher = TabSwitcher;

})();
```

`tab-switcher-combined.js`  version `v1.0.3` can be found on `jsDelivr` via this [link](`tab-switcher-combined.js`)

### Some Notes on use via CDN
The `CDN` versions are mostly useful as "plug and play" as you will not get type-hints in your `IDE`, and if your project actually plans to make consistent use of `tab-switcher`, or alter its functionality substantially, it is probably best to use as a [local version](#using-the-files-locally)

## Using the `TabSwitcher` Class

```javascript

// Import the TabSwitcher class
import { TabSwitcher } from "./tab-switcher.js";

// Generate the structure of a TabSwitcher element inside a given container
let containerID = 'page'
let switcherID = TabSwitcher.create(containerID, 'tab-switcher');

// Create a TabSwitcher instance that points to the newly created element
let switcher = new TabSwitcher(switcherID);

// Get a 'universally unique identifier' for the tab
var tabUUID = crypto.randomUUID();

// Declare a name for the tab
var tabName = 'note';

// Create a test element to serve as the tab's content
var tabElement = document.createElement('div');
var textarea = document.createElement('textarea');
textarea.value = 'default text';
tabElement.appendChild(textarea);

// Add the test element as a new tab
switcher.add(tabUUID, tabUUID, tabElement);

// Open the new tab
switcher.show(tabUUID);

```

### A Note on UUIDs
The purpose of `uuids`, in conjunction with regular `HTML` element `ids`, is to "link" a tab's `notch` (in the top ribbon) to its `content` (in the main window of the `TabSwitcher` instance). Both will then share the same attribute which can be accessed via `element.dataset.uuid`. The simplest way to ensure `uuids` don't collide is to use `let uuid = crypto.randomUUID()`

## Miscellaneous
Little to no effort has yet been put into making the project "error-safe", and it is likely prone to user error