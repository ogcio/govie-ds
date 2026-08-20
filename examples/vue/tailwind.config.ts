import { createTheme } from '@ogcio/design-system-tailwind';
import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'gi-',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: createTheme(),
  corePlugins: {
    preflight: false,
  },
};

export default config;
