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

		await productCard.locator('button, a, [role="button"]').first().click();

		const checkoutTarget = page
			.getByRole('link', { name: /Checkout/i })
			.or(page.getByRole('button', { name: /Checkout/i }));

		await expect(checkoutTarget)
			.toBeVisible({ timeout: 5000 })
			.catch(async () => {
				await page
					.locator('header')
					.locator('button, a, [role="button"]')
					.last()
					.click();
			});

		await checkoutTarget.click();

		await expect(page).toHaveURL(/.*checkout/);
		await expect(
			page.getByRole('heading', { name: 'Secure Checkout' }),
		).toBeVisible();
		await expect(page.getByText('Order Summary')).toBeVisible();
	});
});
