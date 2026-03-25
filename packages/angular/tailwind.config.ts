import { createTheme } from '@ogcio/design-system-tailwind';
import typography from '@tailwindcss/typography';
import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,html}', './.storybook/**/*.{ts,html}'],
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
};

export default config;
