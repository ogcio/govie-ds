# Tailwind Package

A Tailwind CSS theme package that implements the Government of Ireland Design System tokens, providing a consistent design language across your application.

## Overview

This package provides Tailwind CSS utilities and configurations built directly from the Government of Ireland Design System tokens. The Tailwind theme colours, typography, spacing, and other utilities are generated from the same token set used in Figma, ensuring perfect alignment between design and development.

## Installation / Setup

Install the package in your project using npm (see [package details](https://www.npmjs.com/package/@ogcio/design-system-tailwind)), pnpm, or your preferred package manager:

```bash
npm install @ogcio/design-system-tailwind
```

or

```bash
pnpm install @ogcio/design-system-tailwind
```

or

```bash
yarn add @ogcio/design-system-tailwind
```

Then configure your `tailwind.config.js` to use the design system theme:

```javascript
import { createTheme } from '@ogcio/design-system-tailwind';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: createTheme(),
};
```

### Custom Configuration

You can pass custom overrides to extend or modify the theme:

```javascript
import { createTheme } from '@ogcio/design-system-tailwind';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: createTheme({
    overrides: {
      extend: {
        colors: {
          custom: '#your-color',
        },
      },
    },
  }),
};
```

## Usage

Once configured, you can use the design system tokens through Tailwind utility classes:

### Brand Colors

```jsx
<div className="gi-bg-color-surface-system-primary-default text-red-950">
  Government of Ireland Brand Colors
</div>
```

- 👉 More info on [Colors](https://ds.services.gov.ie/foundations/design-tokens/color/).

### Typography

```jsx
<h1 className="text-sm font-bold font-primary">
  Heading using Design System Typography
</h1>

<p className="text-lg">
  Body text with consistent spacing and line height
</p>
```

- 👉 More info on [Typography](https://ds.services.gov.ie/foundations/guidelines/typography/).

### Spacing

```jsx
<div className="mt-2 mb-2">
  <p>Content with design system spacing tokens</p>
  <button className="gi-btn gi-btn-primary gi-btn-regular px-2 py-2">
    Button with spacing
  </button>
</div>
```

- 👉 More info on [Spacing](https://ds.services.gov.ie/foundations/design-tokens/space/).

### Responsive Design

```jsx
<div className="text-sm md:text-md lg:text-lg">
  Responsive typography across breakpoints
</div>
```

- 👉 More info on [Responsive Design/Grid](https://ds.services.gov.ie/foundations/design-tokens/grid/).

### Border and Radius

```jsx
<div className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
  Card with design system borders
</div>
```

- 👉 More info on [Border and Radius](https://ds.services.gov.ie/foundations/design-tokens/border/).

## Design Tokens

The Tailwind theme is generated directly from the Government of Ireland Design System tokens, which are defined and documented in Figma. This ensures consistency between design and implementation.

- [`@ogcio/design-system-tokens`](../tokens/README.md) - Core design tokens where values of CSS styles are generated.

### Figma Documentation

View the publicly available Figma file below:

- **[Government of Ireland Design System Figma](../figma/govie_design_system.fig)**

### Token Categories

The design system includes several token categories:

**Primitive Tokens**: Core design values (colors, fonts, spacing units)

- `primitive.color` - Base color palette
- `primitive.font` - Typography foundation (family, size, weight, line-height)
- `primitive.space` - Spacing scale
- `primitive.border` - Border widths and radii
- `primitive.screen` - Responsive breakpoints

**Semantic Tokens**: Contextual tokens for specific use cases

- `semantic.color` - Contextual colors (success, error, warning, etc.)
- `semantic.surface` - Surface and background colors
- `semantic.typography` - Responsive typography configurations

**Brand Tokens**: Organization-specific brand colors

- `brand.color` - Government of Ireland brand palette

### How Tokens Become Tailwind Utilities

The `createTheme()` function transforms design tokens into Tailwind's configuration format:

```javascript
// Design Token
variables.primitive.color.blue['500']

// Becomes Tailwind Utilities
<div className="bg-blue-500 text-blue-500 border-blue-500" />
```

This automatic transformation ensures that any updates to the design tokens are immediately reflected in your Tailwind utilities.

## Component Styles

This package includes pre-built component styles that follow the Government of Ireland Design System specifications. These styles provide consistent, accessible UI components out of the box.

### Importing Component Styles

Import the complete component stylesheet in your application:

```javascript
import '@ogcio/design-system-tailwind/components.css';
```

Or import individual component styles for better performance:

```javascript
import '@ogcio/design-system-tailwind/components/button.css';
import '@ogcio/design-system-tailwind/components/tag.css';
```

### Available Components

The component stylesheet includes 40+ pre-styled components:

**Form Components**

- `input-text` - Text input fields
- `input-checkbox` - Checkbox inputs
- `input-radio` - Radio button inputs
- `input-file` - File upload inputs
- `text-area` - Textarea fields
- `select` - Select dropdowns
- `score-select` - Score/rating selectors
- `autocomplete` - Autocomplete inputs
- `combo-box` - Combo box selectors
- `label` - Form labels
- `hint-text` - Helper text
- `error-text` - Error messages
- `input-group` - Input grouping

**Navigation Components**

- `header` - Page header
- `footer` - Page footer
- `breadcrumbs` - Breadcrumb navigation
- `side-nav` - Side navigation
- `tabs` - Tab navigation
- `pagination` - Pagination controls

**Content Components**

- `card` - Content cards
- `accordion` - Collapsible content
- `details` - Expandable details
- `blockquote` - Quote blocks
- `table` - Data tables
- `data-table` - Enhanced data tables
- `summary-list` - Key-value lists
- `list` - Styled lists
- `list-item` - List items

**Feedback Components**

- `alert` - Alert messages
- `toast` - Toast notifications
- `modal` - Modal dialogs
- `drawer` - Slide-out drawers
- `tooltip` - Tooltips
- `popover` - Popovers
- `progress-bar` - Progress indicators
- `progress-stepper` - Step indicators

**UI Elements**

- `button` - Buttons
- `icon-button` - Icon-only buttons
- `link` - Styled links
- `tag` - Tags/badges
- `chip` - Chip components
- `cookie-banner` - Cookie consent banner
- `phase-banner` - Phase indicators
- `section-break` - Visual breaks

### Using Component Classes

Component classes follow the `gi-` prefix convention (Government of Ireland). Here's an example using the Tag component:

```jsx
// Basic tag
<span className="gi-tag gi-tag-size-default gi-tag-default">
  Default Tag
</span>

// Success tag
<span className="gi-tag gi-tag-size-default gi-tag-success">
  Success
</span>

// Small info tag
<span className="gi-tag gi-tag-size-small gi-tag-info">
  Info
</span>

// Counter tag
<span className="gi-tag gi-tag-counter">
  5
</span>

// Warning counter
<span className="gi-tag gi-tag-counter-warning">
  !
</span>
```

### Tag Component Classes

The tag component demonstrates the pattern used across all components:

**Base Class**: `gi-tag`

- Applies core styling (rounded corners, border, padding, flex layout)

**Variant Modifiers**:

- `gi-tag-default` - Neutral/system styling
- `gi-tag-info` - Information intent
- `gi-tag-success` - Success intent
- `gi-tag-warning` - Warning intent
- `gi-tag-error` - Error intent
- `gi-tag-counter` - Counter badge
- `gi-tag-counter-warning` - Warning counter badge

### Semantic Color Integration

Component styles use the design system's semantic color tokens, ensuring:

- Consistent intent colors (info, success, warning, error)
- Proper contrast ratios for accessibility
- Automatic dark mode support (if configured)
- Brand alignment

Example from tag component:

```css
.gi-tag-success {
  /* Uses semantic tokens */
  background: color-surface-intent-success-default
  border: color-border-intent-success-subtle
  text: color-text-intent-success-default
}
```

### Customizing Components

You can extend or override component styles using Tailwind's @layer directive:

```css
@layer components {
  .gi-tag-custom {
    @apply gi-tag gi-bg-purple-500 gi-text-white gi-border-purple-700;
  }
}
```

Or use Tailwind utilities alongside component classes:

```jsx
<span className="gi-tag gi-tag-success font-semibold shadow-lg">
  Enhanced Tag
</span>
```

## Requirements

- **Tailwind CSS**: >=3.4.0
