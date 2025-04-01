import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      enabled: true,
      reportOnFailure: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
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
