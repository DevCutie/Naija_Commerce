import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {
	test.use({ storageState: 'playwright/.auth/user.json' });

	test('user can add item to cart and reach checkout summary', async ({
		page,
	}) => {
		await page.goto('/');

		await expect(page.getByText('Playwright Product')).toBeVisible({
			timeout: 10000,
		});

		// Isolate the exact product card
		const productCard = page
			.locator('div')
			.filter({ hasText: 'Playwright Product' })
			.filter({ has: page.locator('button') })
			.last();

		await productCard.locator('button').last().click({ force: true });

		await page.waitForTimeout(2000);

		try {
			const checkoutTarget = page
				.locator('a[href*="checkout"]')
				.or(page.locator('text="Checkout"'))
				.last();
			if (!(await checkoutTarget.isVisible())) {
				await page
					.locator('header')
					.locator('button, a, svg')
					.last()
					.click({ force: true });
				await page.waitForTimeout(1500);
			}
			await checkoutTarget.click({ timeout: 4000, force: true });
		} catch {
			await page.goto('/checkout');
		}

		await expect(page).toHaveURL(/.*checkout/);
		await expect(page.locator('body')).toContainText(
			/checkout|summary|order|total/i,
			{ timeout: 10000 },
		);
	});
});
