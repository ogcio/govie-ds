import { createTheme } from '@ogcio/design-system-tailwind';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: createTheme(),
  plugins: [typography],
};

export default config;
