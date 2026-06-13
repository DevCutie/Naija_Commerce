import { expect, test } from '@playwright/test';

test('products page loads successfully', async ({ page }) => {
	// Go to the products page
	await page.goto('/products');

	// Verify the page loaded without crashing
	await expect(page).toHaveURL(/.*products.*/);
});
