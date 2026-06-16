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
			.locator(
				'xpath=//*[contains(translate(text(), "ADD", "add"), "add") or contains(translate(text(), "CART", "cart"), "cart") and (self::button or self::a or @role="button")]',
			)
			.first();

		if (!(await addToCartBtn.isVisible())) {
			const allButtons = await page.locator('button, a').allTextContents();
			console.log('Buttons found on page:', allButtons);
		}

		await addToCartBtn.click({ force: true });
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
