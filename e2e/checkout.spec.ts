import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		await page.goto('/');

		const productButton = page
			.locator('div[class*="rounded-lg"] button')
			.first();

		await expect(productButton)
			.toBeVisible({ timeout: 10000 })
			.catch(async () => {
				throw new Error(
					'❌ CRITICAL FAILURE: No products rendered on the screen! The database seed in auth.setup.ts is failing silently.',
				);
			});

		await productButton.click();

		await page.locator('header button').last().click();

		await page.getByRole('link', { name: /Checkout/i }).click();

		await expect(page).toHaveURL(/.*checkout/);
		await expect(
			page.getByRole('heading', { name: 'Secure Checkout' }),
		).toBeVisible();
		await expect(page.getByText('Order Summary')).toBeVisible();
	});
});
