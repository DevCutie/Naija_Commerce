import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',

	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',

	use: {
		baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/,
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
		command: 'pnpm run start -p 3001',
		url: 'http://localhost:3001',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
