import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {

  test('user can add item to cart and reach checkout summary', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('product-card').first().click();
    await page.waitForURL('**/products/**');

    // 🔴 HYDRATION BUFFER: Give the CI server 2 seconds to fully load React 
    // before Playwright tries to click the button.
    await page.waitForTimeout(2000);

    const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Verify count updates to 1
    const cartCount = page.getByTestId('cart-count');
    await expect(cartCount).toHaveText('1', { timeout: 10000 });
    
    // Open the Cart Drawer
    await cartCount.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await expect(page.locator('[data-testid="cart-item"]').first()).toBeVisible({ timeout: 10000 });

    await page.getByRole('link', { name: /checkout/i }).click();
    await expect(page).toHaveURL(/.*checkout/);
  });
});