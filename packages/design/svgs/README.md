# @ogcio/design-system-svgs

Internal SVG source assets for the Government of Ireland Design System.

## Overview

This package contains the source SVG files used by other packages in the design system. It is **NOT published to npm** - it serves as a source of truth for:

- `@ogcio/design-system-react` - Generates React icon components during build
- `@ogcio/design-system-html` - Generates SVG sprites (future)

## Structure

```
assets/
├── icons/     # Icon SVG files (79 icons)
├── logos/     # Logo SVG files (9 logos)
```

## Available Assets

### Icons (79)

Material Design icons + social media icons:

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
visibility, visibility_off, warning, work,
social_bluesky, social_facebook, social_instagram, social_linkedin,
social_threads, social_tiktok, social_x, social_youtube
```

### Logos (9)

```
logo-harp, logo-harp-black, logo-harp-white,
logo-black, logo-gold-green, logo-gold-white, logo-std-reverse, logo-white
```

### Favicons (2)

```
favicon-dark, favicon-light
```

## Adding New SVGs

1. Add SVG file to the appropriate `assets/` subdirectory:
   - `assets/icons/` for icons
   - `assets/logos/` for logos
   - `assets/favicons/` for favicons

2. Rebuild consumer packages:
   ```bash
   pnpm build
   ```

## SVG Guidelines

- Use `fill="currentColor"` or hardcoded colors (they will be normalized to `currentColor` during generation)
- Keep SVGs clean and optimized
- Use kebab-case for file names (e.g., `arrow-back.svg`)
- Ensure proper viewBox attribute
