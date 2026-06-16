import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		// 1. Maintain mentor's exact route requirement
		await page.goto('/products');

		await expect(page.getByText('Playwright Product')).toBeVisible({
			timeout: 10000,
		});

		const productCard = page
			.locator('div')
			.filter({ hasText: 'Playwright Product' })
			.filter({ has: page.locator('button, a, [role="button"]') })
			.last();

		await productCard.locator('button, a, [role="button"]').first().click();

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
