import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {

  test('user can add item to cart and reach checkout summary', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('product-card').first().click();
    await page.waitForURL('**/products/**');

    // Wait for network, THEN give Next.js 2 seconds to completely finish React hydration
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartBtn).toBeVisible();
    
    // Removed { force: true } so Playwright ensures the button is truly actionable
    await addToCartBtn.click();

    // Verify count updates to 1
    const cartCount = page.getByTestId('cart-count');
    await expect(cartCount).toHaveText('1', { timeout: 10000 });
    
    // Open the Cart Drawer
    await cartCount.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Verify the cart item renders inside the drawer
    await expect(page.locator('[data-testid="cart-item"]').first()).toBeVisible({ timeout: 10000 });

    // Proceed to checkout
    await page.getByRole('link', { name: /checkout/i }).click();
    await expect(page).toHaveURL(/.*checkout/);
  });
});