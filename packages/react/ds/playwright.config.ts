import { defineConfig, devices } from '@playwright/test';

const BASE_URL =
  process.env.TEST_BASE_URL || 'http://host.docker.internal:6006';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 3,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['junit', { outputFile: 'test-results/results.xml' }]]
    : 'html',
  use: {
    baseURL: BASE_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'android',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'iphone',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
