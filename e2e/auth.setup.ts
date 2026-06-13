import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
	await page.goto('/login');

	await page.getByPlaceholder('Email').fill('test@example.com');
	await page.getByPlaceholder('Password').fill('password123');

	await page.getByRole('button', { name: /sign up|sign in|log in/i }).click();

	// Wait for all network requests to finish, regardless of what page it redirects to
	await page.waitForLoadState('networkidle');

	await page.context().storageState({ path: authFile });
});
