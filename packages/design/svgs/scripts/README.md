# SVG Generator Scripts

This directory contains scripts for generating SVG components and exports from source SVG files.

## generate.ts

The main generator script that processes SVG files from `assets/` and generates:

1. **React Components** (`src/react/`) - TypeScript React components with props
2. **HTML String Exports** (`src/icons/`, `src/logos/`, `src/favicons/`) - Framework-agnostic exports

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
                                 │   └── index.ts (HTML exports)
                                 ├── logos/
                                 └── favicons/
```

### Generated Output

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

#### HTML String Exports

For framework-agnostic usage (Mitosis, vanilla JS, etc.):

- `ICONS_MAP` / `LOGOS_MAP` / `FAVICONS_MAP` - Raw SVG strings
- `getIconSvg()` / `getLogoSvg()` / `getFaviconSvg()` - Helper functions with options
- `ICONS_NAMES` / `LOGOS_NAMES` / `FAVICONS_NAMES` - Name arrays
- `IconName` / `LogoName` / `FaviconName` - TypeScript types

### Naming Conventions

File names are converted from kebab-case to PascalCase for React components:

- `check.svg` → React: `Check`, HTML key: `'check'`
- `arrow-back.svg` → React: `ArrowBack`, HTML key: `'arrow-back'`
- `logo-black.svg` → React: `LogoBlack`, HTML key: `'logo-black'`

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
- Not include `width`/`height` in the root `<svg>` (generator adds these)

### JSX Attribute Conversion

The generator automatically converts SVG attributes to JSX camelCase:

- `clip-path` → `clipPath`
- `fill-rule` → `fillRule`
- `clip-rule` → `clipRule`
- `stroke-width` → `strokeWidth`
- `stroke-linecap` → `strokeLinecap`
- `stroke-linejoin` → `strokeLinejoin`
- `xlink:href` → `xlinkHref`
