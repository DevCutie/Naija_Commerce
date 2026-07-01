import fs from 'node:fs';
import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
		context,
	}) => {
		// 1. Load Authentication
		const authFile = JSON.parse(
			fs.readFileSync('playwright/.auth/user.json', 'utf-8'),
		);
		await context.addCookies(authFile.cookies);

		// 2. Load the page and wait for hydration
		await page.goto('/');
		await page.locator('body[data-hydrated="true"]').waitFor();

		// 3. Navigate to product page
		await page.getByTestId('product-card').first().click();
		await page.waitForURL('**/products/**');

		// 4. Buffer for React state hydration
		await page.waitForTimeout(1000);

		// 5. Add to cart
		await page.getByRole('button', { name: /add to cart/i }).click();

		// 6. Wait for the cart state to update
		await expect
			.poll(
				async () => {
					return await page.getByTestId('cart-count').textContent();
				},
				{
					message: 'Cart count did not update to 1',
					timeout: 5000,
				},
			)
			.toBe('1');

		// 7. Open the cart dialog
		const cartTrigger = page.locator('button[aria-haspopup="dialog"]');
		await cartTrigger.click();
		await expect(page.getByRole('dialog')).toBeVisible();

		// 8. Verify item is in the cart
		await expect(page.locator('[data-testid="cart-item"]').first()).toBeVisible(
			{
				timeout: 10000,
			},
		);

		// 9. Proceed to Checkout
		await page.getByRole('link', { name: /checkout/i }).click();

		// 10. Verify navigation was successful (and stop here!)
		// We rely solely on the web-first assertion to bypass Next.js dev-mode network hangs
		await expect(page).toHaveURL(/.*checkout/);
	});
});
