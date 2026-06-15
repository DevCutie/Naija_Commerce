import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		await page.goto('/');

		await page.waitForSelector('main');

		await page
			.locator('main')
			.locator('button, [role="button"]')
			.first()
			.click();
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
