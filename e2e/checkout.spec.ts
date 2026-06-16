import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		await page.goto('/');

		const productTitle = page.getByText('Playwright Product').first();
		await expect(productTitle).toBeVisible({ timeout: 10000 });
		await productTitle.click();

		await page.waitForLoadState('networkidle');

		const addToCartBtn = page
			.locator('button')
			.filter({ hasText: /add to cart|add to bag/i })
			.first();

		await expect(addToCartBtn).toBeEnabled({ timeout: 10000 });
		await addToCartBtn.click();

		await page.waitForTimeout(2000);

		await page.goto('/checkout');
		await page.waitForLoadState('networkidle');

		await expect(page).toHaveURL(/.*checkout/);
		await expect(page.locator('body')).toContainText(
			/checkout|summary|order|total/i,
			{ timeout: 10000 },
		);
	});
});
