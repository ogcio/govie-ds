import { createTheme } from '@ogcio/design-system-tailwind';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  theme: createTheme(),
  corePlugins: { preflight: false },
};

export default config;
