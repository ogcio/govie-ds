import { createTheme } from '@ogcio/design-system-tailwind';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,tsx}'],
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
    { pattern: /align-./ },
    { pattern: /block/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /hidden/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /grid-./ },
    { pattern: /col-./ },
    { pattern: /row-./ },
    { pattern: /gap-./, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /flex-row/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /flex-col/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /h-./, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /w-./, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
  ],
};

export default config;
