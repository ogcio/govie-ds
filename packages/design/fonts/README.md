# @ogcio/design-system-fonts

Framework-agnostic font loading for the Government of Ireland Design System.

This package provides a standalone `fonts.css` file with `@font-face` declarations for the Lato font family, enabling font loading across any web framework or plain HTML.

## Installation

```bash
npm install @ogcio/design-system-fonts
```

### Import in JavaScript/TypeScript

```js
// Import at your application entry point
import "@ogcio/design-system-fonts/fonts.css";
```

### Import in HTML

```html
<link
  rel="stylesheet"
  href="path/to/node_modules/@ogcio/design-system-fonts/fonts/dist/fonts.css"
/>
```

### Import in Angular

```ts
// angular.json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@ogcio/design-system-fonts/fonts/dist/fonts.css",
              "node_modules/@ogcio/theme-govie/dist/theme.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

## What's Included

The package includes:

- **Lato font family** with weights: 100, 300, 400, 700, 900
- **Styles**: normal and italic
- **Subsets**: latin and latin-ext (covers most European languages)
- **Formats**: woff2 (modern browsers) and woff (legacy fallback)

## Font Loading Behaviour

The fonts use `font-display: swap` which means:

1. Text is displayed immediately using a fallback font (Arial).
2. Once the custom font loads, it swaps in.
3. This prevents invisible text (FOIT) and improves perceived performance.
