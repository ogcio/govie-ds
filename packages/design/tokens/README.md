# Design Tokens

This package exports design tokens as TypeScript constants and metadata objects, enabling type-safe styling and theming in your applications.

## Installation / Setup

[![npm version](https://img.shields.io/npm/v/%40ogcio%2Fdesign-system-tokens.svg)](https://www.npmjs.com/package/@ogcio/design-system-tokens)[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ogcio/govie-ds/blob/main/LICENSE)

Install the package in your project using npm (see [package details](https://www.npmjs.com/package/@ogcio/design-system-tokens)), pnpm, or your preferred package manager:

```bash
npm install @ogcio/design-system-tokens
```

or

```bash
pnpm install @ogcio/design-system-tokens
```

or

```bash
yarn add @ogcio/design-system-tokens
```

## Token Categories

### Colors

The color system includes primitive color scales (gray, blue, red, yellow, green, emerald, purple, and gold) with 50–950 shades for granular control. Brand colors define primary (emerald), secondary (gold), and neutral (gray) palettes. Semantic color tokens provide contextual meaning through:

- **System colors**: Neutral defaults and interactive states for general UI elements
- **Tone colors**: Variations for fills, outlines, and flat styles (primary, dark, light, convention)
- **Intent colors**: Feedback colors for info, success, error, warning, and focus states
- **Surface colors**: Background layers and interactive surface states

### Typography

Typography tokens define text styles through a type scale system with heading and body text variants. Headings range from `2xs` to `xl` with bold weights, supporting responsive scaling across breakpoints (default, xs, md, xl). Each scale references primitive font families, sizes, weights, and line heights for consistent vertical rhythm.

### Spacing

Spacing tokens provide a comprehensive scale from `0px` to `960px` using a 4px base unit. The scale includes fractional values (e.g., `0-5`, `1-5`) for fine-grained control and larger increments for layout composition. Use these tokens for margins, padding, gaps, and positioning.

### Borders

Border tokens include width scales (`100`–`800`, from 1px to 16px) and radius scales (`100`–`600` plus `full` for pill shapes). These values maintain visual consistency across buttons, cards, inputs, and other bordered elements.

### Shadows

Shadow tokens define elevation layers for depth and hierarchy in the interface. Values include box-shadow configurations for different z-index levels and semantic focus shadows.

### Sizing

Sizing tokens standardize component dimensions including heights, widths, icon sizes, and container constraints. The scale ensures proportional relationships between UI elements.

### Opacity

Opacity tokens provide transparency levels for overlays, disabled states, and visual hierarchy. Values range from fully transparent to fully opaque in semantic increments.

### Z-Index

Z-index tokens establish consistent stacking contexts for modals, dropdowns, tooltips, and other layered UI components, preventing z-index conflicts.

### Screens (Breakpoints)

Screen tokens define responsive breakpoints (`xs`, `sm`, `md`, `lg`, `xl`) for consistent media queries and adaptive layouts across device sizes.

## Theme Support

The token system supports both light and dark themes. Each theme exports:

- **Resolved tokens**: Fully computed values ready for direct use
- **Unresolved tokens**: Reference chains for debugging and tooling
- **CSS variables**: Browser-compatible variable object with the `gieds` prefix

## Consuming Tokens

Tokens are exported from this package as TypeScript objects and can be imported directly into your application code. Use `tokens.light` or `tokens.dark` for camelCase constant access, or `meta.light.resolved` / `meta.dark.resolved` for the complete token metadata. CSS variables are available via the `variables` export for stylesheet integration.

```typescript
import { tokens, meta, variables } from "@ogcio/design-system-tokens";

// Using TypeScript constants
const primaryColor = tokens.light.giedsColorBaseGray;

// Using metadata objects
const headingStyle = meta.light.resolved.semantic.typography.default.heading.xl;

// Using CSS variables for direct styling
const cssVars = variables; // Apply to :root or theme containers
const buttonBackground = variables.semantic.surface.primary.default;

// Integration with Tailwind CSS
// The variables object is consumed by @ogcio/design-system-tailwind
// to create a complete Tailwind theme configuration
import { createTheme } from "@ogcio/design-system-tailwind";
const tailwindTheme = createTheme({ meta }); // Pass meta for resolved values
```

The `variables` export provides nested objects matching the token hierarchy, making it simple to access any token value. This structure is particularly useful for Tailwind CSS integration, where the entire token system is mapped to Tailwind's configuration format in the [`@ogcio/design-system-tailwind`](../tailwind/README.md) package.

## Build Process

The build script (`scripts/build.ts`) transforms JSON token definitions into multiple output formats using [`@ogcio/design-system-tokens-builder`](../theme-builder/README.md). It generates TypeScript files for both resolved and unresolved token trees, camelCase constant exports, and CSS variable objects. The package uses a two-stage build: first tokens are generated, then source files are compiled with tsup. Run the build with:

```bash
pnpm build
```

## File Structure

```
├── dist/                  # Generated output file of variables (consumed by tailwind later)
├── scripts/
│   └── build.ts           # Token builder configuration
├── src/
│   ├── dist/              # Generated output files for tokens (tokens light/dark, meta light/dark resolved/unresolved and variables)
│   └── index.ts           # Main export file
└── tokens/
    └── light/             # Light theme source tokens
        ├── brand/         # Brand identity tokens
        ├── primitive/     # Base value tokens
        └── semantic/      # Contextual usage tokens
```

## Token Naming Convention

Tokens follow a hierarchical dot-notation structure:

```
{tier}.{category}.{subcategory}.{variant}.{state}
```

For example: `semantic.color.surface.tone.primary-fill.hover`

This naming provides clear semantic meaning and enables predictable token discovery across the system.
