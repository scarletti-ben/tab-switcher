Via [`jsDelivr`](https://www.jsdelivr.com/)
- https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.0/tab-switcher.js
- https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.0/tab-switcher.css

Via [`GitHub Pages`](https://scarletti-ben.github.io/tab-switcher)
- https://scarletti-ben.github.io/tab-switcher/tab-switcher.js
- https://scarletti-ben.github.io/tab-switcher/tab-switcher.css

Importing `tab-switcher`
```html
<head>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.0/tab-switcher.css">

</head>

<body>

  <script type="module" defer>
    import { TabSwitcher } from 'https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.0/tab-switcher.js';
  </script>

</body>
```

# CDN Version
As this script uses the `export` keyword it is intended to be used as a module, and so you don't gain much from adding the script import to `<head>`, instead you would use `import { TabSwitcher } from 'https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.0/tab-switcher.js'` within your `main.js` file 
- The `CDN` version is mostly useful as a "plug and play" as you will not get type-hints in your `IDE`, and if your project actually plans to make use of it, or alter functionality, it is probably best to use as a [local version](#local-version)

# Local Version
You can use `tab-switcher` locally by downloading the files from the links
- [`tab-switcher.js`](https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.0/tab-switcher.js)
- [`tab-switcher.css`](https://cdn.jsdelivr.net/gh/scarletti-ben/tab-switcher@v1.0.0/tab-switcher.css)

Your project structure would probably then look something like
```
/project
  ├── index.html
  ├── tab-switcher.js
  ├── tab-switcher.js
  ├── main.js
  └── styles.css
```
With your `main.js` being added to `index.html` as `<script type="module" src="main.js" defer></script>`
- Inside `main.js` you would use `import { TabSwitcher } from "./tab-switcher.js"`
- This method allows for type-hints in your `IDE` and allows you to easily modify the code