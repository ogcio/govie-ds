import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    reporters: [
      'default',
      ['junit', { outputFile: 'coverage/test-report.xml' }],
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'cobertura'],
      clean: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/{postcss,tailwind}.config.*',
        '**/.storybook/**',
        // 👇 This pattern must align with the `stories` property of your `.storybook/main.ts` config
        '../src/**/*.stories.*',
        // 👇 This pattern must align with the output directory of `storybook build`
        '**/storybook-static/**',
      ],
    },
  },
});
