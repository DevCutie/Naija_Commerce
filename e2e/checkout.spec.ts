import { expect, test } from '@playwright/test';

test.describe('Checkout Flow', () => {

  test('user can add item to cart and reach checkout summary', async ({ page }) => {
    await page.goto('/');

    await page.locator('body[data-hydrated="true"]').waitFor();
    
    await page.getByTestId('product-card').first().click();
    await page.waitForURL('**/products/**');

    const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
    // Increased timeout slightly to account for CI server rendering speeds
    await expect(addToCartBtn).toBeVisible({ timeout: 15000 }); 
    await expect(addToCartBtn).toBeEnabled();
    await addToCartBtn.click();

    await expect(page.getByTestId('cart-count')).toHaveText('1', { timeout: 5000 });
    

    await page.getByTestId('cart-count').click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await expect(page.locator('[data-testid="cart-item"]').first()).toBeVisible({ timeout: 10000 });

    await page.getByRole('link', { name: /checkout/i }).click();
    await expect(page).toHaveURL(/.*checkout/);
  });
});