# Icon Generation Scripts

Generates React icon components from SVG source files during build.

## Overview

These scripts read SVG files from `@ogcio/design-system-svgs` (devDependency) and generate React components that are used by the `Icon` component.

## Usage

```bash
# Generate icons (runs automatically during build)
pnpm generate:icons

# Full build (includes generation)
pnpm build
```

## How It Works

```
packages/design/svgs/assets/icons/*.svg
         ↓
    [generate-icons]
         ↓
packages/react/ds/src/icon/generated/
├── AccessibilityNew.tsx
├── Check.tsx
├── ...
├── index.ts       # Re-exports all components
└── registry.ts    # GENERATED_ICONS mapping
```

## Scripts

- `index.ts` - Main entry point, orchestrates generation
- `utilities.ts` - Shared utilities (toPascalCase, getSvgFiles)
- `parse-svg.ts` - SVG parsing, attribute extraction, color normalization
- `generate-component.ts` - React component template generation
- `generate-index.ts` - Index and registry file generation

## Generated Output

### Components (`*.tsx`)

Each SVG becomes a React component with:

- `forwardRef` support
- `size` prop (default: 24)
- All standard SVG props
- `currentColor` for fill/stroke (inherits text color)

```tsx
// Generated component example
export const Check = forwardRef<SVGSVGElement, CheckProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <path d="M382-240 154-468l57-57..." />
    </svg>
  ),
);
```

### Registry (`registry.ts`)

Maps icon IDs to components for the `Icon` component:

```tsx
export const GENERATED_ICONS = {
  check: Check,
  home: Home,
  social_bluesky: SocialBluesky,
  // ... all 79 icons
} as const;

export type GeneratedIconId = keyof typeof GENERATED_ICONS;
```

## Adding New Icons

1. Add SVG file to `packages/design/svgs/assets/icons/`
2. Run `pnpm build` in the React package
3. Use the new icon: `<Icon icon="new_icon_name" />`

## Color Handling

The scripts normalize all hardcoded colors to `currentColor`:

```
fill="#0B0C0C"  →  fill="currentColor"
stroke="#000"   →  stroke="currentColor"
```

This allows icons to inherit text color from their parent element.
