import { createTheme } from '@govie-ds/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['../ds/src/**/*.html', '../ds/src/**/*.ts', './.storybook/preview.tsx'],
  theme: createTheme(),
  plugins: [],
};

export default config;
