# @govie-ds/fonts

Framework-agnostic font loading for the Government of Ireland Design System.

This package provides a standalone `fonts.css` file with `@font-face` declarations for the Lato font family, enabling font loading across any web framework or plain HTML.

## Installation

```bash
npm install @govie-ds/fonts
```

## Usage

### When to Use This Package

Use `@govie-ds/fonts` when you need font loading for:

- **React (non-Next.js)** - Vite, Create React App, or other React setups
- **Angular** - All Angular applications
- **Plain HTML** - Static sites or server-rendered applications
- **Web Components** - Custom elements and Mitosis-based components
- **Any other framework** - Vue, Svelte, etc.

### When NOT to Use This Package

**Do not use** this package with Next.js applications. Instead, use the built-in `next/font/google` for optimal font loading with automatic optimisation:

```tsx
// app/layout.tsx (Next.js)
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Import in JavaScript/TypeScript

```js
// Import at your application entry point
import '@govie-ds/fonts/fonts.css';
import '@ogcio/design-system-react/styles.css';
import '@ogcio/theme-govie/theme.css';
```

### Import in HTML

```html
<link rel="stylesheet" href="path/to/node_modules/@govie-ds/fonts/dist/fonts.css">
<link rel="stylesheet" href="path/to/styles.css">
<link rel="stylesheet" href="path/to/theme.css">
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
              "node_modules/@govie-ds/fonts/dist/fonts.css",
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

1. Text is displayed immediately using a fallback font
2. Once the custom font loads, it swaps in
3. This prevents invisible text (FOIT) and improves perceived performance

## Backward Compatibility

The existing `@import` approach in `@ogcio/design-system-react/styles.css` remains supported and will be migrated in the next **major** version. No breaking changes are introduced.

## License

The Lato font is licensed under the [SIL Open Font License, Version 1.1](https://scripts.sil.org/OFL).
