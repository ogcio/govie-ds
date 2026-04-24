import { createTheme } from '@ogcio/design-system-tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,html}', './.storybook/**/*.{ts,html}'],
  theme: createTheme(),
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    { pattern: /gap-./, variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /flex-row/, variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /flex-col/, variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
  ],
};

export default config;
