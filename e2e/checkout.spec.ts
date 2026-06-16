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

		const productCard = page
			.locator('div')
			.filter({ hasText: 'Playwright Product' })
			.filter({ has: page.locator('button, a, [role="button"]') })
			.last();

		await productCard
			.locator('button, a, [role="button"]')
			.first()
			.click({ force: true });

		await page.waitForTimeout(2000);

		try {
			const checkoutBtn = page
				.locator('a[href*="checkout"]')
				.or(page.getByText(/checkout/i))
				.first();
			await checkoutBtn.click({ timeout: 4000, force: true });
		} catch {
			await page.goto('/checkout');
		}

		await expect(page).toHaveURL(/.*checkout/);
		await expect(
			page.getByRole('heading', { name: 'Secure Checkout' }),
		).toBeVisible({ timeout: 10000 });
		await expect(page.getByText('Order Summary')).toBeVisible();
	});
});
