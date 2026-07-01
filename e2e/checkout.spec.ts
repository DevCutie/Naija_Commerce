import fs from 'node:fs';
import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
		context,
	}) => {

		const authFile = JSON.parse(
			fs.readFileSync('playwright/.auth/user.json', 'utf-8'),
		);
		await context.addCookies(authFile.cookies);

	
		await page.goto('/');
		await page.locator('body[data-hydrated="true"]').waitFor();

		await page.getByTestId('product-card').first().click();
		await page.waitForURL('**/products/**');


		await page.waitForTimeout(1000);


		await page.getByRole('button', { name: /add to cart/i }).click();


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


		const cartTrigger = page.locator('button[aria-haspopup="dialog"]');
		await cartTrigger.click();
		await expect(page.getByRole('dialog')).toBeVisible();


		await expect(page.locator('[data-testid="cart-item"]').first()).toBeVisible(
			{
				timeout: 10000,
			},
		);


		await page.getByRole('link', { name: /checkout/i }).click();

		await expect(page).toHaveURL(/.*checkout/);
	});
});
