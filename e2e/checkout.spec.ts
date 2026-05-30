import { test, expect } from '@playwright/test';

test('user can browse and add product to cart', async ({ page }) => {
  // 1. Visit the store (ensure your dev server is running!)
  await page.goto('/');

  // 2. Click on a product (adjust '.product-card' to your actual CSS selector)
  await page.locator('.product-card').first().click();

  // 3. Add to cart
  await page.getByRole('button', { name: /add to cart/i }).click();

  // 4. Navigate to cart
  await page.goto('/cart');

  // 5. Verify the cart summary is loaded
  await expect(page.getByText(/checkout summary/i)).toBeVisible();
});