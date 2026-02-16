# @ogcio/design-system-svgs

SVG icons, logos, and favicons for the Government of Ireland Design System.

## Installation

```bash
pnpm add @ogcio/design-system-svgs
```

## Overview

This package provides SVG assets in two formats:

1. **SVG Sprites** - Inline sprite with `<use>` references for best performance
2. **React Components** - For React, Next.js, and similar frameworks

## Assets Included

- **Icons** (79) - Material Design icons + social media icons
- **Logos** (10) - Government of Ireland logos, harp variants
- **Favicons** (2) - Light and dark theme favicons

## Usage

### SVG Sprites

The sprite-based approach provides no JS bundle bloat, native browser rendering, and excellent caching.

#### Step 1: Inject the sprite once

```tsx
// React/Next.js
import { ICONS_SPRITE } from '@ogcio/design-system-svgs/icons';
import { LOGOS_SPRITE } from '@ogcio/design-system-svgs/logos';

function Layout({ children }) {
  return (
    <html>
      <body>
        {/* Inject sprites once at the top of your app */}
        <div dangerouslySetInnerHTML={{ __html: ICONS_SPRITE }} />
        <div dangerouslySetInnerHTML={{ __html: LOGOS_SPRITE }} />
        {children}
      </body>
    </html>
  );
}
```

```html
<!-- Vanilla HTML - copy sprite content into your page -->
<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
  <!-- sprite symbols here -->
</svg>
```

#### Step 2: Use icons via `<use href>`

```tsx
// Direct SVG usage (cleanest approach)
<svg className="gi-icon" width="24" height="24" aria-hidden="true" focusable="false">
  <use href="#check" />
</svg>

// With color inheritance (set color on parent)
<span style={{ color: '#0070f3' }}>
  <svg className="gi-icon" width="24" height="24" aria-hidden="true" focusable="false">
    <use href="#info" />
  </svg>
</span>
```

#### Using the helper function

```tsx
import { getIconUse, type IconName } from '@ogcio/design-system-svgs/icons';

// Returns SVG markup string
const iconHtml = getIconUse('check', { size: 24 });
// <svg class="gi-icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#check"></use></svg>

// With accessibility label
const warningHtml = getIconUse('warning', { size: 32, ariaLabel: 'Warning' });

// In React
<span dangerouslySetInnerHTML={{ __html: getIconUse('search', { size: 24 }) }} />
```

### React Components

For React apps that prefer component-based usage:

```tsx
import { Check, ArrowBack, Search } from '@ogcio/design-system-svgs/react/icons';
import { LogoHarp, LogoGoldWhite } from '@ogcio/design-system-svgs/react/logos';
import { FaviconDark, FaviconLight } from '@ogcio/design-system-svgs/react/favicons';

function MyComponent() {
  return (
    <div>
      {/* Icons with size and color */}
      <Check size={24} />
      <Search size={32} fill="#0070f3" />
      <ArrowBack size={16} className="my-custom-class" />

      {/* Logos */}
      <LogoHarp size={64} />
      <LogoGoldWhite size={120} />

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

## Available Exports

### Entry Points

- `@ogcio/design-system-svgs` - Main entry (types + all sprite exports)
- `@ogcio/design-system-svgs/icons` - Icon sprite + helper + types
- `@ogcio/design-system-svgs/logos` - Logo sprite + helper + types
- `@ogcio/design-system-svgs/favicons` - Favicon sprite + helper + types
- `@ogcio/design-system-svgs/react` - All React components
- `@ogcio/design-system-svgs/react/icons` - React icon components
- `@ogcio/design-system-svgs/react/logos` - React logo components
- `@ogcio/design-system-svgs/react/favicons` - React favicon components

### Exported Items

Each category (icons/logos/favicons) exports:

- **ICONS_SPRITE** / **LOGOS_SPRITE** / **FAVICONS_SPRITE** - Inline SVG sprite content
- **ICONS_SPRITE_PATH** / etc. - Path to sprite file (for static hosting)
- **getIconUse()** / **getLogoUse()** / **getFaviconUse()** - Helper functions
- **ICONS_NAMES** / etc. - Array of available names
- **IconName** / etc. - TypeScript union type of valid names

## Icon Names

### Material Design Icons (70)

```
accessibility_new, add_circle, apps, arrow_back, arrow_downward,
arrow_drop_down, arrow_drop_up, arrow_forward, arrow_left_alt,
arrow_outward, arrow_right_alt, arrow_upward, attach_file, block,
call, cancel, candlestick_chart, chat_bubble, check, check_circle,
chevron_left, chevron_right, child_care, close, content_copy,
credit_card, delete, directions_car, do_not_disturb_on, download,
edit, error, event, filter_list, first_page, health_and_safety,
home, info, keyboard_arrow_down, keyboard_arrow_up, last_page,
link, location_on, login, logout, mail, menu, mic, more_horiz,
more_vert, open_in_new, person, person_cancel, person_check,
placeholder, refresh, search, send, settings, sort, space_dashboard,
swap_vert, sync, thumb_down, thumb_up, unfold_more, upload,
visibility, visibility_off, warning, work
```

### Social Icons (9)

```
social_bluesky, social_facebook, social_instagram, social_linkedin,
social_threads, social_tiktok, social_x, social_youtube
```

### Logos (10)

```
figma, storybook, logo-harp, logo-harp-black, logo-harp-white,
logo-black, logo-gold-green, logo-gold-white, logo-std-reverse, logo-white
```

### Favicons (2)

```
favicon-dark, favicon-light
```

## Styling

Icons use `fill="currentColor"` by default, so they inherit the text color of their parent:

```css
/* Icons inherit color from parent */
.my-icon-container {
  color: #0070f3;
}

/* Or target the icon class directly */
.gi-icon {
  fill: currentColor;
}
```

## Development

### Building

```bash
cd packages/design/svgs
pnpm build
```

### Regenerating Components

If you add new SVG files to `assets/` directory:

```bash
pnpm generate
pnpm build
```

### Adding New SVGs

1. Add SVG files to the appropriate directory:
   - `assets/icons/` for icons
   - `assets/logos/` for logos
   - `assets/favicons/` for favicons

2. Run the generator:
   ```bash
   pnpm generate
   ```

3. Build the package:
   ```bash
   pnpm build
   ```
