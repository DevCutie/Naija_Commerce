import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		await page.goto('/products');

		const productTitle = page.getByText('Playwright Product');

		await expect(productTitle)
			.toBeVisible({ timeout: 10000 })
			.catch(async () => {
				await page.screenshot({ path: 'playwright-debug.png', fullPage: true });
				throw new Error(
					"❌ CRITICAL FAILURE: Product missing! Playwright saved a screenshot to 'playwright-debug.png' so you can see the UI.",
				);
			});
		const productCard = page
			.locator('div')
			.filter({ hasText: 'Playwright Product' })
			.last();
		await productCard.locator('button, [role="button"]').first().click();

		await page
			.locator('header')
			.locator('button, [role="button"]')
			.last()
			.click();

		await page.getByRole('link', { name: /Checkout/i }).click();

		await expect(page).toHaveURL(/.*checkout/);
		await expect(
			page.getByRole('heading', { name: 'Secure Checkout' }),
		).toBeVisible();
		await expect(page.getByText('Order Summary')).toBeVisible();
	});
});
