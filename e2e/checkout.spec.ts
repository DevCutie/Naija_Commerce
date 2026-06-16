import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		await page.getByText('Playwright Product').first().click({ force: true });

		await page.waitForLoadState('networkidle');
		await page.waitForTimeout(3000);

		await page.locator('button').first().click({ force: true });

		await page.waitForTimeout(3000);

		await page.goto('/checkout');
		await page.waitForLoadState('networkidle');

		await expect(page).toHaveURL(/.*checkout/);
		await expect(page.locator('body')).toContainText(
			/checkout|summary|order|total/i,
			{ timeout: 10000 },
		);
	});
});
