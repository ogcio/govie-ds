import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import vue from '@vitejs/plugin-vue';
import { playwright } from '@vitest/browser-playwright';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default', ['junit', { outputFile: 'coverage/results.xml' }]],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'cobertura'],
      clean: true,
      include: ['src/**/*.{ts,vue}'],
      exclude: [...coverageConfigDefaults.exclude, 'src/**/*.stories.ts', 'src/**/storybook/**'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'storybook',
          testTimeout: 30_000,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
        plugins: [vue(), storybookTest({ configDir: '.storybook' })],
      },
    ],
  },
});
