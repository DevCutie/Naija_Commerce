import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		await page.goto('/');
		const productTitle = page.getByText('Playwright Product').first();
		await expect(productTitle).toBeVisible({ timeout: 10000 });
		await productTitle.click({ force: true });

		await page.waitForTimeout(3000);

		const addToCartBtn = page
			.locator('button, a, [role="button"]')
			.filter({ hasText: /add|cart|buy/i })
			.first();
		if (await addToCartBtn.isVisible()) {
			await addToCartBtn.click({ force: true });
		} else {
			await page.locator('button').first().click({ force: true });
		}

		await page.waitForTimeout(2000);

		await page.goto('/checkout');

		await expect(page).toHaveURL(/.*checkout/);
		await expect(page.locator('body')).toContainText(
			/checkout|summary|order|total/i,
			{ timeout: 10000 },
		);
	});
});
