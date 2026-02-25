import { createTheme } from '@ogcio/design-system-tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,html}', './.storybook/**/*.{ts,html}'],
  theme: createTheme(),
  plugins: [require('@tailwindcss/typography')],
};

export default config;
