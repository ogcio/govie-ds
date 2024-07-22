/* eslint-disable unicorn/prefer-module */
import { createTheme } from '@govie-ds/tailwind';
import { meta } from '@govie-ds/theme-govie';
import type { Config } from 'tailwindcss';

const useVariables = !(process.env.USE_RESOLVED_THEME === 'true');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: createTheme({
    meta,
    overrides: {
      animatedSettings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 500,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 500,
        classes: ['bounce', 'heartBeat'],
      },
    },
    useVariables,
  }),
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
  //       "gradient-conic":
  //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  //     },
  //   },
  // },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animatecss'),
  ],
};

export default config;
