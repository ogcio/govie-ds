import { createTheme } from '@govie-ds/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.html', './src/**/*.ts'],
  theme: createTheme(),
  plugins: [],
};

export default config;
