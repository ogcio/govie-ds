const { createTheme } = require('@govie-ds/tailwind');

/** @type {import('tailwindcss').Config} */
const config = {
  prefix: 'gi',
  content: ['./src/**/*.ts', './src/**/*.tsx'],
  theme: createTheme(),
  plugins: [require('@tailwindcss/typography')],
  /*safelist: [
    'gi-prose',
    'gi-not-prose',
    'gi-max-w-none',
    'gi-grid',
    'gi-stroke-gray-950',
    'gi-h-screen',
    'gi-w-full',
    { pattern: /align-./ },
    { pattern: /grid-./ },
    { pattern: /col-./ },
    { pattern: /row-./ },
    { pattern: /gap-./, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
  ],*/
};

module.exports = config;
