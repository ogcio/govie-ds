import { createTheme } from '@govie-ds/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.ts', './src/**/*.tsx'],
  theme: createTheme(),
  plugins: [],
};

export default config;
