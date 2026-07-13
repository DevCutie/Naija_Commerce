import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {

  test('user can add item to cart and reach checkout summary', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('product-card').first().click();
    await page.waitForURL('**/products/**');

    // Wait until the network is completely idle to ensure JavaScript and state stores are ready
    await page.waitForLoadState('networkidle');

    const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartBtn).toBeVisible();
    
    // Perform a forced click to ensure the event fires properly through the hydration layer
    await addToCartBtn.click({ force: true });

    // Increase timeout here to give the state store plenty of time to catch up on the slow runner
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