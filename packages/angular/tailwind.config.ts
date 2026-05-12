import { createTheme } from '@ogcio/design-system-tailwind';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,html}'],
  theme: createTheme(),
  plugins: [typography],
  safelist: [
    'gi-prose',
    'gi-not-prose',
    { pattern: /gap-./, variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /flex-(row|col)$/, variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
  ],
};

export default config;
