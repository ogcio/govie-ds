import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { createTheme } from './tailwind/create-theme';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: createTheme(),
  plugins: [typography],
};

export default config;
