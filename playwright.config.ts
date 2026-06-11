import { defineConfig, devices } from "@playwright/test";

export default defineConfig({

  testDir: "./e2e",


  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    // 1. Setup project (runs first to log in and save cookies)
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],

        storageState: "playwright/.auth/user.json",
      },

      dependencies: ["setup"],
    },
  ],
});
