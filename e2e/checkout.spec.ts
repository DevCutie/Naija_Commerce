import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		await page.goto('/');

		const productTitle = page.getByText('Playwright Product');
		await expect(productTitle).toBeVisible({ timeout: 10000 });

		await productTitle
			.locator(
				'xpath=following::button | following::a | following::*[@role="button"]',
			)
			.first()
			.click();

		await page
			.locator('header')
			.locator('button, a, [role="button"]')
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
