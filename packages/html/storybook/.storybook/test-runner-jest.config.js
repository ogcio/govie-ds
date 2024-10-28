import { getJestConfig } from '@storybook/test-runner';

const defaultConfig = getJestConfig();

const config = {
  // The default Jest configuration comes from @storybook/test-runner
  ...defaultConfig,
  // snapshotResolver: './packages/html/storybook/.storybook/snapshot-resolver.js',
};

export default config;
