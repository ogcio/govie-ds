import { createTheme } from '@ogcio/design-system-tailwind';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,html}', './.storybook/**/*.{ts,html}'],
  theme: createTheme(),
  plugins: [typography],
  safelist: [
    { pattern: /gap-./, variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /flex-row/, variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /flex-col/, variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    {
      pattern: /gi-grid-columns-\d+/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /gi-grid-gap-\d+/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /gi-grid-span-\d+/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
};

export default config;
