import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {
      compodoc: false,
    },
  },
};

export default config;
