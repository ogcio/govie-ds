import { createTheme } from '@govie-ds/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./src/**/*.html', './src/**/*.ts'],
  theme: createTheme(),
  plugins: [],
  safelist: [
    { pattern: /grid-./ },
    { pattern: /col-./ },
    { pattern: /row-./ },
    { pattern: /gap-./ },
  ],
};

export default config;
