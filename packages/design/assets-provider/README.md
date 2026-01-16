# Font Loading Strategy: Investigation & Proposal

## Executive Summary

This document investigates font loading solutions for the Design System to work seamlessly across different frameworks (React, Angular, Vue, etc.) specifically with Next.js, while maintaining optimal performance and developer experience.

**Current Problem:** Next.js 16's Turbopack has issues with CSS `@import` statements, causing fonts not to load properly. A temporary `LoadFonts` component was added, but this creates inconsistency and framework-specific workarounds.

**Recommended Solution:** Create a separate `@ogcio/design-system-fonts` package that users can optionally install, providing both CSS and component-based loading methods.

## 1. Background

### Problem Statement

As part of the Next 16 upgrade (#33495), it was discovered that fonts are no longer loaded properly due to Turbopack's handling of CSS `@import`. The Design System aims to be framework-agnostic and work "out of the box" without framework-specific setup.

### Requirements

- Load fonts correctly across all frameworks (React, Next.js, Angular, Vue)
- Minimal user effort and configuration
- Optimal performance
- Framework-agnostic solution
- Compatible with future Web Components implementation (Mitosis, Stencil)

### Dmitry's Suggestion

Consider loading fonts via `<link>` tags where possible and provide a custom loader for Next 16, as it seems to be the only framework requiring special setup.

---

## 2. Current State

### Implementation

**Location:** `packages/react/ds/styles.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap");
```

**Workaround Added:** `LoadFonts` component (`packages/react/ds/src/load-fonts/load-fonts.tsx`) that injects `<link>` tags for Next.js 16+ applications.

### Current User Experience

**For most frameworks:**

```tsx
import "@ogcio/design-system-react/styles.css";
```

**For Next.js 16+:**

```tsx
import { LoadFonts } from "@ogcio/design-system-react";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <LoadFonts />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Issues

1. Inconsistent approach across frameworks
2. Not truly "out of the box" for Next.js 16+
3. Framework-specific asset loading logic mixed with UI component library
4. Potential for duplicate font loading if users do both

---

## 3. Research Findings

### Font Loading Performance Hierarchy

Based on industry research and performance audits:

1. **Inline `@font-face` declarations in HTML head** - Fastest (immediate discovery)
2. **`<link>` tags in HTML head** - Fast (parallel loading)
3. **`@import` in CSS** - Slowest (sequential loading, blocks rendering)

### Key Findings

#### Performance (Source: [Jono Alderson](https://www.jonoalderson.com/performance/youre-loading-fonts-wrong/))

> Most sites would strongly benefit from inlining font declarations in the `<head>` rather than including them in an external stylesheet, allowing the browser to discover font declarations sooner.

#### `@import` Issues (Source: [DEV.to](https://dev.to/alteca/vs-import-which-should-you-use-to-get-fonts-296l))

> Using `@import` is the worst way to import fonts because it delays font loading - the CSS file must be downloaded and parsed before fonts can start loading.

#### Framework-Agnostic Patterns (Source: [Next.js Docs](https://nextjs.org/docs/app/getting-started/fonts))

> Next.js automatically self-hosts Google Fonts, with fonts stored as static assets. However, the Design System React library should be agnostic to avoid specific binding to a framework.

#### Web Components & Shadow DOM (Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM))

> CSS variables cascade into Shadow DOM, making them ideal for design tokens. `@font-face` declarations are global and work across Shadow boundaries.

### Industry Standards: Manual Font Setup is Normal

Major design systems **require manual font configuration:**

- **Material UI**: Users must install Roboto font separately
- **Chakra UI**: Does not include fonts, users import via CSS
- **Carbon Design System**: Provides fonts in separate `@carbon/type` package
- **GOV.UK Design System**: Provides font files in separate package
- **Ant Design**: Uses system fonts, custom fonts configured manually

**Conclusion:** Manual font setup is industry standard. The key is making it as simple and consistent as possible.

---

## 4. Proposed Solutions

### Solution 1: Separate Font Package

**Implementation:** Create `@ogcio/design-system-fonts` (can be called any similar package name) package with font files, CSS, and optional React component.

**Package Structure:**

```
packages/design/fonts/
├── package.json              # @ogcio/design-system-fonts
├── fonts/
│   ├── lato/
│   │   ├── Lato-Regular.woff2
│   │   ├── Lato-Bold.woff2
│   │   └── Lato-Black.woff2
│   └── material-symbols/
│       └── MaterialSymbols.woff2
├── fonts.css                 # @font-face declarations
├── loader.tsx                # LoadFonts React component
└── README.md
```

**fonts.css:**

```css
@font-face {
  font-family: "Lato";
  src: url("./fonts/lato/Lato-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Lato";
  src: url("./fonts/lato/Lato-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Lato";
  src: url("./fonts/lato/Lato-Black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
```

**User Experience:**

**Option 1: CSS Import (Recommended for most frameworks)**

```tsx
// Install
npm install @ogcio/design-system-fonts

// Import in app entry point
import '@ogcio/design-system-fonts/fonts.css';
import '@ogcio/design-system-react/styles.css';
```

Works with: React, Next.js 15 and below, Vue, Angular, Vite, etc.

**Option 2: LoadFonts Component (hybrid approach to keep existing solution)**

```tsx
// Install
npm install @ogcio/design-system-fonts

// Use in layout.tsx - DO NOT also import fonts.css
import { LoadFonts } from '@ogcio/design-system-fonts';
import '@ogcio/design-system-react/styles.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <LoadFonts />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Use this fallback when: Next.js 16+ with Turbopack has issues with CSS imports

---

### Solution 2: Keep Current Dual Approach (@import + LoadFonts)

**Implementation:** Maintain CSS `@import` in styles.css and `LoadFonts` component for Next.js 16+.

**Pros:**

- ✅ Already implemented
- ✅ Works for current use cases

**Cons:**

- ❌ **Poor performance** - `@import` is slowest loading method
- ❌ **Confusing developer experience** - unclear which method to use
- ❌ **Potential duplicate font loading** - if users do both approaches
- ❌ **Framework-specific logic in component library** - violates separation of concerns
- ❌ **Maintenance burden** - update fonts in 2 places
- ❌ **Turbopack issues persist** - users importing styles.css in Next.js 16 get broken fonts
- ❌ **Not framework-agnostic** - LoadFonts is React-only, doesn't help Angular/Vue
- ❌ **Locks users into Google CDN** - can't self-host or optimize
- ❌ **Forced dependency** - everyone loads fonts even if they don't want them
- ❌ **Future Web Components complications** - would need third method

---

### Solution 3: Hybrid CSS + Runtime Loader

**Implementation:** Create fonts.css with `@font-face` declarations and runtime loader utility.

**Package Structure:**

```
packages/react/ds/
├── src/
│   ├── fonts/
│   │   ├── fonts.css          # @font-face declarations
│   │   └── load-fonts.ts      # Runtime loader utility
│   └── index.ts
└── styles.css                  # Imports fonts.css (no @import)
```

**fonts.css:**

```css
@font-face {
  font-family: "Lato";
  src: url("https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXg.woff2")
    format("woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Lato";
  src: url("https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPGQ.woff2")
    format("woff2");
  font-weight: 700;
  font-display: swap;
}
```

**load-fonts.ts (Runtime Loader):**

```typescript
/**
 * Dynamically injects font link tags into the document head
 * Use this as a fallback when CSS imports don't work
 */
export function loadFonts(): void {
  if (typeof window === "undefined") return; // SSR check

  // Check if already loaded
  if (document.querySelector("link[data-ogcio-fonts]")) {
    return;
  }

  // Create link element
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";
  link.setAttribute("data-ogcio-fonts", "true");

  // Insert at the beginning of head for priority
  document.head.insertBefore(link, document.head.firstChild);
}

// Auto-load on import (optional)
if (typeof window !== "undefined") {
  loadFonts();
}
```

**User Experience:**

**Option 1: Automatic (Import triggers loading)**

```tsx
import "@ogcio/design-system-react/styles.css"; // fonts.css is imported here
// Fonts load automatically via CSS
```

**Option 2: Manual runtime loading (fallback)**

```tsx
import { loadFonts } from "@ogcio/design-system-react/fonts";
import "@ogcio/design-system-react/styles.css";

// Explicitly call if CSS import fails
loadFonts();
```

**Option 3: React hook for conditional loading**

```tsx
import { useEffect } from "react";
import { loadFonts } from "@ogcio/design-system-react/fonts";

function App() {
  useEffect(() => {
    // Load fonts on mount if needed
    loadFonts();
  }, []);

  return <div>App</div>;
}
```

**Pros:**

- ✅ No `@import` delays
- ✅ Runtime fallback for edge cases
- ✅ Single source of truth for font declarations
- ✅ Can detect and recover from CSS import failures
- ✅ Works with all bundlers

**Cons:**

- ⚠️ Still bundled with component library (not optional)
- ⚠️ Runtime loader adds JavaScript overhead (~1KB)
- ⚠️ Complex to maintain (two loading mechanisms)
- ⚠️ Potential for duplicate loading if both methods trigger
- ⚠️ Auto-load behavior may be unexpected for users

---

### Solution 4: Framework Detection with Automatic Loader

**Implementation:** Smart loader that detects framework and applies optimal strategy.

**Pros:**

- ✅ Zero configuration

**Cons:**

- ❌ Complex implementation and maintenance
- ❌ Runtime detection overhead
- ❌ Difficult to test across environments
- ❌ Black box behavior
- ❌ May not handle future framework changes

---

## 5. Recommendation

### My Recommended Solution: Solution 1 (Separate Font Package)

Create `@ogcio/design-system-fonts` package with self-hosted fonts, CSS file with `@font-face` declarations, and optional React `LoadFonts` component for edge cases.

### Why This is the Best Choice

1. **Performance**: No `@import` delays, bundlers can optimize
2. **Flexibility**: Optional dependency, users control installation
3. **Framework-Agnostic**: Works identically across React, Next.js, Angular, Vue
4. **Clean Architecture**: Separation of concerns (fonts ≠ components)
5. **Industry Standard**: Follows pattern of Material UI, Carbon, GOV.UK
6. **Future-Proof**: Compatible with Web Components
7. **Privacy & Performance**: Self-hosted = no Google tracking, faster loading
8. **Developer Experience**: Clear, single import method with documented fallback

---

## 6. Migration Considerations

### ⚠️ Breaking Change Alert

**Current users are loading fonts via:**

```tsx
import "@ogcio/design-system-react/styles.css"; // Contains @import for Google Fonts CDN
```

### Impact Assessment

**Who is affected:**

- All current users of `@ogcio/design-system-react`
- Anyone importing `styles.css` that depends on fonts being loaded

**What breaks:**

- Fonts will not load after removing `@import` from `styles.css`
- Applications will fall back to system fonts (Arial, sans-serif)

### Migration Path

#### Option A: Major Version Bump (Recommended)

Release as **v2.0.0** with breaking changes:

**Steps:**

1. Create `@ogcio/design-system-fonts@1.0.0` package
2. Release `@ogcio/design-system-react@2.0.0` with:
   - `@import` removed from `styles.css`
   - `LoadFonts` component removed
   - `peerDependencies: { "@ogcio/design-system-fonts": "^1.0.0" }`
3. Update documentation with migration guide
4. Notify all users via:
   - GitHub release notes
   - Email/Slack announcements
   - Documentation banner
   - Migration guide in README

**Migration Guide for Users:**

```tsx
// Before (v1.x)
import '@ogcio/design-system-react/styles.css';

// After (v2.x)
npm install @ogcio/design-system-fonts

import '@ogcio/design-system-fonts/fonts.css';
import '@ogcio/design-system-react/styles.css';

// Or for Next.js 16+
import { LoadFonts } from '@ogcio/design-system-fonts';
<head><LoadFonts /></head>
```

## FAQ

**Q: Why not just fix Turbopack to support @import?**
A: We don't control Next.js/Turbopack. Even if fixed, `@import` is still the slowest loading method and not recommended.

**Q: Can users still use Google Fonts CDN if they want?**
A: Yes! Simply don't install `@ogcio/design-system-fonts` and add Google Fonts link in your HTML head.

**Q: Will this work with Web Components?**
A: Yes! `@font-face` is global and CSS variables cascade into Shadow DOM.

**Q: What about bundle size?**
A: Lato woff2 files are ~40KB per weight. Total fonts package ~150KB. Users can subset or choose not to install.

**Q: How do we handle font updates (new weights, variants)?**
A: Font package has independent versioning. Update fonts without bumping component library version.

**Next Steps:**

1. Review and discuss this proposal
2. Decide on migration approach (major version vs gradual)
3. Set release timeline
4. Begin implementation

---

**End of Document**
