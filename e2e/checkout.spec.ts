import { expect, test } from '@playwright/test';

test('browse → add to cart → checkout summary', async ({ page }) => {
	await page.goto('/products');

	const productCard = page.getByTestId('product-card').first();
	await productCard.waitFor({ state: 'visible' });
	await productCard.click();

	const addToCartButton = page.getByRole('button', { name: /add to cart/i });
	await addToCartButton.waitFor({ state: 'visible' });
	await addToCartButton.click();

	await page.goto('/checkout');

	await expect(page).toHaveURL(/.*checkout.*/);
	await expect(
		page.getByRole('heading', { name: /order summary/i }),
	).toBeVisible();
	await expect(
		page.getByRole('button', { name: /Pay ₦19,700.00/i }),
	).toBeVisible();
});
