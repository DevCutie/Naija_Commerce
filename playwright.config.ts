import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // Increase global timeout for CI to account for database latency
  timeout: 60000,
  expect: {
    timeout: 15000,
  },

  use: {
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
  },

  projects: [
    { 
      name: 'setup', 
      testMatch: /auth.setup.ts/,
      timeout: 60000, 
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],

  webServer: {
    command: process.env.CI ? 'pnpm start' : 'pnpm dev', 
    port: 3001,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});