# @ogcio/design-system-svgs

SVG icons, logos, and favicons for the Government of Ireland Design System.

## Installation

```bash
pnpm add @ogcio/design-system-svgs
```

## Overview

This package provides SVG assets in two formats:

1. **React Components** - For React, Next.js, and similar frameworks
2. **HTML String Exports** - For Mitosis, Stencil, vanilla JS, and framework-agnostic usage

## Assets Included

- **Icons** (78) - Material Design icons + social media icons
- **Logos** (10) - Government of Ireland logos, harp variants
- **Favicons** (2) - Light and dark theme favicons

## Usage

### React Components

Import and use SVG components directly in React/Next.js:

```tsx
import { Check, ArrowBack, Search } from '@ogcio/design-system-svgs/react/icons';
import { GeneralHarp, GovernmentOfIrelandGovStd } from '@ogcio/design-system-svgs/react/logos';
import { FaviconDark, FaviconLight } from '@ogcio/design-system-svgs/react/favicons';

function MyComponent() {
  return (
    <div>
      {/* Icons with size and color */}
      <Check size={24} />
      <Search size={32} fill="#0070f3" />
      <ArrowBack size={16} className="my-custom-class" />

      {/* Logos */}
      <GeneralHarp size={64} />
      <GovernmentOfIrelandGovStd size={120} />

      {/* Favicons */}
      <FaviconDark size={32} />
    </div>
  );
}
```

#### React Component Props

All React components accept:

- **size** (`string | number`, default: `24`) - Width and height of the SVG
- **title** (`string`) - Accessible title (adds `<title>` element)
- **fill** (`string`, default: `currentColor`) - SVG fill color
- **className** (`string`) - CSS class name
- **...props** (`SVGProps`) - Any valid SVG attribute

### HTML String Exports (Framework-Agnostic)

For Mitosis, Stencil, vanilla JS, or any framework:

```typescript
import { getIconSvg, ICONS_MAP, ICONS_NAMES, type IconName } from '@ogcio/design-system-svgs/icons';
import { getLogoSvg, LOGOS_MAP, LOGOS_NAMES, type LogoName } from '@ogcio/design-system-svgs/logos';
import { getFaviconSvg, FAVICONS_MAP, type FaviconName } from '@ogcio/design-system-svgs/favicons';

// Using helper functions
const checkIcon = getIconSvg('check', { size: 24 });
const searchIcon = getIconSvg('search', { size: 32, fill: '#0070f3', className: 'my-icon' });
const warningIcon = getIconSvg('warning', { size: 24, ariaLabel: 'Warning' });

// Direct map access for raw SVG strings
const rawCheckSvg = ICONS_MAP['check'];
const rawLogoSvg = LOGOS_MAP['general-harp'];

// Type-safe icon names
const iconName: IconName = 'check'; // TypeScript autocomplete
```

#### Helper Function Options

```typescript
interface GetSvgOptions {
  size?: string | number;    // Width and height
  className?: string;        // CSS class
  fill?: string;             // Fill color
  ariaLabel?: string;        // Accessible label
  ariaHidden?: boolean;      // Hide from screen readers
}
```

### Mitosis Example

```tsx
// my-icon.lite.tsx
import { getIconSvg, type IconName } from '@ogcio/design-system-svgs/icons';

interface Props {
  icon: IconName;
  size?: number;
  fill?: string;
}

export default function Icon(props: Props) {
  const svgHtml = getIconSvg(props.icon, {
    size: props.size || 24,
    fill: props.fill
  });

  return <span innerHTML={svgHtml} />;
}
```

### Stencil Example

```tsx
// icon.tsx
import { Component, Prop, h } from '@stencil/core';
import { getIconSvg, type IconName } from '@ogcio/design-system-svgs/icons';

@Component({ tag: 'ds-icon' })
export class Icon {
  @Prop() icon: IconName;
  @Prop() size: number = 24;

  render() {
    return <span innerHTML={getIconSvg(this.icon, { size: this.size })} />;
  }
}
```

### HTML Package Example

```typescript
// helpers/icons.ts
import { getIconSvg, type IconName } from '@ogcio/design-system-svgs/icons';

export function createIcon(icon: IconName, size = 24): HTMLElement {
  const container = document.createElement('span');
  container.innerHTML = getIconSvg(icon, { size });
  return container;
}
```

## Available Exports

### Entry Points

- `@ogcio/design-system-svgs` - Main entry (types + all HTML exports)
- `@ogcio/design-system-svgs/react` - All React components
- `@ogcio/design-system-svgs/react/icons` - React icon components
- `@ogcio/design-system-svgs/react/logos` - React logo components
- `@ogcio/design-system-svgs/react/favicons` - React favicon components
- `@ogcio/design-system-svgs/icons` - Icon HTML exports + types
- `@ogcio/design-system-svgs/logos` - Logo HTML exports + types
- `@ogcio/design-system-svgs/favicons` - Favicon HTML exports + types

### Exported Items

Each category exports:

- **React Components** - Named exports (e.g., `Check`, `ArrowBack`)
- **HTML Helper** - `getIconSvg()`, `getLogoSvg()`, `getFaviconSvg()`
- **Raw SVG Map** - `ICONS_MAP`, `LOGOS_MAP`, `FAVICONS_MAP`
- **Names Array** - `ICONS_NAMES`, `LOGOS_NAMES`, `FAVICONS_NAMES`
- **TypeScript Types** - `IconName`, `LogoName`, `FaviconName`

## Icon Names

### Material Design Icons (69)

```
accessibility_new, add_circle, apps, arrow_back, arrow_downward,
arrow_drop_down, arrow_drop_up, arrow_forward, arrow_left_alt,
arrow_outward, arrow_right_alt, arrow_upward, attach_file, block,
call, cancel, candlestick_chart, chat_bubble, check, check_circle,
chevron_left, chevron_right, child_care, close, content_copy,
credit_card, delete, directions_car, do_not_disturb_on, download,
edit, error, event, filter_list, first_page, health_and_safety,
home, info, keyboard_arrow_down, keyboard_arrow_up, last_page,
location_on, login, logout, mail, menu, mic, more_horiz, more_vert,
open_in_new, person, person_cancel, person_check, placeholder,
refresh, search, send, settings, sort, space_dashboard, swap_vert,
sync, thumb_down, thumb_up, unfold_more, upload, visibility,
visibility_off, warning, work
```

### Social Icons (9)

```
social_bluesky, social_facebook, social_instagram, social_linkedin,
social_threads, social_tiktok, social_x, social_youtube
```

### Logos (10)

```
figma, storybook, general-harp, general-harp-black, general-harp-white,
government-of-ireland-gov-black, government-of-ireland-gov-green,
government-of-ireland-gov-std, government-of-ireland-gov-std-reverse,
government-of-ireland-gov-white
```

### Favicons (2)

```
favicon-dark, favicon-light
```

## Development

### Building

```bash
cd packages/design/svgs
pnpm build
```

### Regenerating Components

If you add new SVG files to `svgs/` directory:

```bash
pnpm generate
pnpm build
```

### Adding New SVGs

1. Add SVG files to the appropriate directory:
   - `svgs/icons/` for icons
   - `svgs/logos/` for logos
   - `svgs/favicons/` for favicons

2. Run the generator:
   ```bash
   pnpm generate
   ```

3. Build the package:
   ```bash
   pnpm build
   ```

## License

MIT
