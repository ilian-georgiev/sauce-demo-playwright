import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Tests in the same file can run at the same time (parallelism)
  fullyParallel: true,

  // Fail the build if someone leaves test.only in the code (CI only)
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI, to spot flaky tests
  retries: process.env.CI ? 2 : 0,

  // Number of parallel workers: limited in CI, automatic on your computer
  workers: process.env.CI ? 2 : undefined,

  // CI writes a "blob" report so reports from different shards can be merged
  reporter: process.env.CI ? 'blob' : 'html',

  use: {
    baseURL: 'https://www.saucedemo.com',

    // SauceDemo marks its elements with data-test, not the default data-testid
    testIdAttribute: 'data-test',

    // Save a trace (step-by-step recording) when a test fails and is retried
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
