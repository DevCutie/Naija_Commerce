import { expect, test } from '@playwright/test';

test('browse → add to cart → checkout summary', async ({ page }) => {
	// 1. Start at the products page (or homepage)
	await page.goto('/products');

	// 2. Click the product
	const productCard = page.getByTestId('product-card').first();
	await productCard.waitFor({ state: 'visible' });
	await productCard.click();

	// 3. Add to cart
	const addToCartButton = page.getByRole('button', { name: /add to cart/i });
	await addToCartButton.waitFor({ state: 'visible' });
	await addToCartButton.click();

	// 4. Go to checkout (NO bypass parameter!)
	await page.goto('/checkout');

	// 5. Assertions
	await expect(page).toHaveURL(/.*checkout.*/);
	await expect(
		page.getByRole('heading', { name: /order summary/i }),
	).toBeVisible();
	await expect(
		page.getByRole('button', { name: /Pay ₦19,700.00/i }),
	).toBeVisible();
});
