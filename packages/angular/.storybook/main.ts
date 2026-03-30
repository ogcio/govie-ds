import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-links',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      compodoc: false,
      tsConfig: '.storybook/tsconfig.json',
    },
  },
};

export default config;
