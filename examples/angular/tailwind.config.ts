import { createTheme } from '@ogcio/design-system-tailwind';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{html,ts}'],
  theme: createTheme(),
  plugins: [typography],
  safelist: [
    'gi-prose',
    'gi-not-prose',
    'gi-max-w-none',
    'gi-grid',
    'gi-stroke-gray-950',
    'gi-h-screen',
    'gi-w-full',
    { pattern: /gi-align-.*/ },
    { pattern: /gi-block/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /gi-hidden/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /gi-grid-.*/ },
    { pattern: /gi-col-.*/ },
    { pattern: /gi-row-.*/ },
    { pattern: /gi-gap-.*/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
  ],
};

export default config;
