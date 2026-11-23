import { createTheme } from '@ogcio/design-system-tailwind';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,vue}'],
  theme: createTheme(),
  corePlugins: { preflight: false },
};

export default config;
