import { createTheme } from '@govie-ds/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.ts', './src/**/*.tsx'],
  theme: createTheme(),
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'gi-prose',
    'gi-not-prose',
    'gi-max-w-none',
    'gi-grid',
    { pattern: /grid-./ },
    { pattern: /col-./ },
    { pattern: /row-./ },
    { pattern: /gap-./, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
  ],
};

export default config;
