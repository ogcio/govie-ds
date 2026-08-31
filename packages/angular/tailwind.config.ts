import { createTheme } from '@ogcio/design-system-tailwind';
import type { Config } from 'tailwindcss';

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,html}'],
  theme: createTheme(),
  safelist: [
    // Stack: `directionToClass`
    { pattern: /^gi-flex-(row|col)$/, variants: breakpoints },
    // Stack: `gapToClass`
    { pattern: /^gi-gap-(\d|1[0-2])$/, variants: breakpoints },
    // HeaderNavItem: `getVisibility`
    { pattern: /^gi-(flex|hidden)$/, variants: breakpoints },
    // Grid: `getGridClasses`
    { pattern: /^gi-grid-(columns|gap|span)-(\d|1[0-2])$/, variants: breakpoints },
  ],
};

export default config;
