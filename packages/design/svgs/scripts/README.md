# SVG Generator Scripts

This directory contains scripts for generating SVG components and exports from source SVG files.

## generate.ts

The main generator script that processes SVG files from `assets/` and generates:

1. **SVG Sprites** (`src/icons/`, `src/logos/`, `src/favicons/`) - Inline sprite content for `<use>` references
2. **React Components** (`src/react/`) - TypeScript React components with props

### How It Works

```
assets/                          src/
├── icons/                       ├── react/
│   ├── check.svg         →      │   ├── icons/
│   ├── arrow-back.svg           │   │   ├── Check.tsx
│   └── ...                      │   │   ├── ArrowBack.tsx
├── logos/                       │   │   └── index.ts
│   ├── logo-black.svg    →      │   ├── logos/
│   └── ...                      │   │   ├── LogoBlack.tsx
└── favicons/                    │   │   └── index.ts
    ├── favicon-dark.svg  →      │   └── favicons/
    └── ...                      │       └── ...
                                 ├── icons/
                                 │   ├── names.ts
                                 │   ├── sprite-icons.svg
                                 │   └── index.ts (sprite exports)
                                 ├── logos/
                                 └── favicons/
```

### Generated Output

#### SVG Sprites (Recommended)

Each category generates:

- `ICONS_SPRITE` / `LOGOS_SPRITE` / `FAVICONS_SPRITE` - Inline SVG sprite content
- `ICONS_SPRITE_PATH` / etc. - Path to sprite file (for static hosting)
- `getIconUse()` / `getLogoUse()` / `getFaviconUse()` - Helper functions
- `ICONS_NAMES` / `LOGOS_NAMES` / `FAVICONS_NAMES` - Name arrays
- `IconName` / `LogoName` / `FaviconName` - TypeScript types

Usage:

```tsx
import { ICONS_SPRITE, getIconUse } from '@ogcio/design-system-svgs/icons';

// Inject sprite once at app root
<div dangerouslySetInnerHTML={{ __html: ICONS_SPRITE }} />

// Use icons anywhere via <use href>
<svg className="gi-icon" width="24" height="24" aria-hidden="true">
  <use href="#check" />
</svg>

// Or use the helper
<span dangerouslySetInnerHTML={{ __html: getIconUse('check', { size: 24 }) }} />
```

#### React Components

Each SVG generates a React component with:

- `size` prop (default: 24)
- `title` prop for accessibility
- `fill` prop (default: currentColor)
- All standard SVG props via `SVGProps<SVGSVGElement>`
- `forwardRef` support

Example generated component:

```tsx
import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface CheckProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const Check = forwardRef<SVGSVGElement, CheckProps>(
  ({ size = 24, title, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      {/* SVG content */}
    </svg>
  ),
);
```

### Naming Conventions

File names are converted from kebab-case to PascalCase for React components:

- `check.svg` → React: `Check`, sprite ID: `check`
- `arrow-back.svg` → React: `ArrowBack`, sprite ID: `arrow-back`
- `logo-black.svg` → React: `LogoBlack`, sprite ID: `logo-black`

### Running the Generator

```bash
# From packages/design/svgs/
pnpm generate        # Run generator only
pnpm build           # Generate + build (tsup)
```

### Adding New SVGs

1. Add SVG file to the appropriate directory:
   - `assets/icons/` - Icons (24x24 recommended)
   - `assets/logos/` - Logos (various sizes)
   - `assets/favicons/` - Favicons

2. Run the generator:
   ```bash
   pnpm generate
   ```

3. Build the package:
   ```bash
   pnpm build
   ```

### SVG Requirements

For best results, source SVGs should:

- Have a `viewBox` attribute (defaults to `0 0 24 24` if missing)
- Use `currentColor` for fill if the icon should inherit text color
- Not include `width`/`height` in the root `<svg>` (generator handles sizing)

### JSX Attribute Conversion

The generator automatically converts SVG attributes to JSX camelCase for React components:

- `clip-path` → `clipPath`
- `fill-rule` → `fillRule`
- `clip-rule` → `clipRule`
- `stroke-width` → `strokeWidth`
- `stroke-linecap` → `strokeLinecap`
- `stroke-linejoin` → `strokeLinejoin`
- `xlink:href` → `xlinkHref`

### Sprite Generation

The sprite generator creates `<symbol>` elements for each SVG with:

- `id` attribute matching the icon name
- `viewBox` preserved from source SVG
- `fill="currentColor"` for CSS color inheritance
- Inner content extracted from source SVG

Example sprite output:

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
  <symbol id="check" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
  </symbol>
  <symbol id="close" viewBox="0 -960 960 960" fill="currentColor">
    <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
  </symbol>
  <!-- ... more symbols -->
</svg>
```
