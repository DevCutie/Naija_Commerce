import { test as setup } from '@playwright/test';

setup('authenticate and seed', async ({ page }) => {
	// 1. Visit the site so we have a domain context
	await page.goto('/');

	// 2. Direct session injection: Create the session cookie manually
	// Replace 'better_auth_session' with your exact session cookie name
	await page.context().addCookies([
		{
			name: 'better_auth_session',
			value: 'test-session-token', // Your mock session token
			domain: 'localhost',
			path: '/',
		},
	]);

	await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
