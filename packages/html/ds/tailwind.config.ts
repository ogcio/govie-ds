import { createTheme } from '@govie-ds/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.html'],
  theme: createTheme(),
  plugins: [],
};

export default config;
