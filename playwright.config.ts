import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	// ... your existing config above ...

	projects: [
		// 1. Add the setup project
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/,
		},

		// 2. Update your main testing environments
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				// Tell Chromium to use the saved cookies
				storageState: 'playwright/.auth/user.json',
			},
			// Tell Playwright to run the 'setup' project before this one
			dependencies: ['setup'],
		},

		// (Repeat the use/dependencies blocks if you test Firefox/WebKit)
	],
});
