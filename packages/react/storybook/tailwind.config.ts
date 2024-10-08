import { createTheme } from '@govie-ds/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['../ds/src/**/*.tsx'],
  theme: createTheme(),
  plugins: [],
};

export default config;
