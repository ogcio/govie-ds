# Font Setup for Next.js 16+

## Overview

Starting with Next.js 16, external font imports via `@import url()` from Google Fonts are no longer supported in CSS files. This design system now includes self-hosted Lato and Material Symbols Outlined fonts that work seamlessly with Next.js 16+.

## Setup

No setup is required. Fonts are automatically included when you install `@ogcio/design-system-react`. Just import the styles:

```tsx
import '@ogcio/design-system-react/styles.css';
```

That's it! Fonts are bundled with the React package and resolved automatically by Next.js/webpack.

## What's Included

### Lato Font Family

- Weights: 100 (Thin), 300 (Light), 400 (Regular), 700 (Bold), 900 (Black)
- Styles: Normal and Italic for each weight

### Material Symbols Outlined

- Variable font with icon support
- Includes all icons used in the design system components
- Proper alignment fixes for Next.js 16

## How It Works

1. **Fonts in Tailwind**: Font files are stored in `@ogcio/design-system-tailwind/css/fonts/`
2. **Copied to React**: During build, fonts are copied to `@ogcio/design-system-react/dist/fonts/`
3. **Package exports**: The React package exports fonts via `@ogcio/design-system-react/fonts/*`
4. **Webpack resolution**: Next.js/webpack resolves font URLs from node_modules automatically
5. **No configuration needed**: Users don't need to configure anything

## Troubleshooting

### Fonts not loading

1. Verify you're using the latest version:

   ```bash
   pnpm list @ogcio/design-system-react
   ```

2. Check fonts are in node_modules:

   ```bash
   ls node_modules/@ogcio/design-system-react/dist/fonts/
   ```

3. Clear Next.js cache and rebuild:
   ```bash
   rm -rf .next
   pnpm build
   ```

## Migration from Google Fonts

If you previously used Google Fonts imports, you can now remove them:

### Before (deprecated):

```css
@import url('https://fonts.googleapis.com/css2?family=Lato:...');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:...');
```

### After (current):

Just import the design system styles - fonts are included:

```tsx
import '@ogcio/design-system-react/styles.css';
```

## For Design System Contributors

### Font Source

Font files are located in `packages/design/tailwind/css/fonts/`:

- `fonts/lato/` - Lato font family (10 TTF files)
- `fonts/MaterialSymbolsOutlined.woff2` - Material icons

### Build Process

The React package build script (`copy:fonts`) copies fonts from the Tailwind package to `packages/react/ds/dist/fonts/` during build.

### Font Paths

The `fonts.css` file uses package paths like `@ogcio/design-system-react/fonts/lato/Lato-Regular.ttf` which webpack/Next.js resolves from node_modules via the package exports defined in `packages/react/ds/package.json`.

### Adding New Icons

When adding new icons to Material Symbols:

1. Download the updated font file
2. Replace `packages/design/tailwind/css/fonts/MaterialSymbolsOutlined.woff2`
3. Update the icon list comment in `packages/design/tailwind/css/fonts.css`
4. Rebuild the React package to copy the new font file
