import { createTheme } from '@ogcio/design-system-tailwind';
import typography from '@tailwindcss/typography';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.{ts,html}', './.storybook/**/*.{ts,html}'],
  theme: createTheme(),
  plugins: [typography],
};

export default config;
