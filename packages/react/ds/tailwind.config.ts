import { createTheme } from '@ogcio/design-system-tailwind';
import typography from '@tailwindcss/typography';
import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,tsx}'],
  theme: createTheme(),
  plugins: [
    typography,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.underline': {
          // whenever text is underlined without offset specified, use 0.2em
          textUnderlineOffset: '0.2em',
        },
        '@supports (-moz-appearance: none)': {
          '.underline': {
            // Firefox skips the underline for descending characters at 0.2em for the given font Lato, so we increase it to 0.23em
            textUnderlineOffset: '0.23em',
          },
        },
      });
    }),
  ],
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
  ],
};

export default config;
