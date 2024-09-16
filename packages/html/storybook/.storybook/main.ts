import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../docs/*.mdx', '../../ds/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../static'],
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    if (configType === 'PRODUCTION') {
      return config;
    }

    return mergeConfig(config, {
      server: {
        watch: {
          usePolling: true,
          interval: 1000,
        },
      },
      resolve: {
        alias: {
          '@govie-frontend/ds': path.resolve(
            // eslint-disable-next-line unicorn/prefer-module
            __dirname,
            '../../ds/src/index.ts',
          ),
        },
      },
    });
  },
};

export default config;
