import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    'storybook-addon-pseudo-states',
    '@storybook/experimental-addon-test',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  staticDirs: [
    '../macros/nunjucks/dev/govie',
    { from: '../macros/nunjucks/dev/govie', to: '/macros' },
  ],

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
          '@govie-ds/html': path.resolve(
            // eslint-disable-next-line unicorn/prefer-module
            __dirname,
            '../src/index.ts',
          ),
        },
      },
    });
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
