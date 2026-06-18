import { expect, test } from "@playwright/test";

test.describe("Checkout Flow", () => {
  // Use the setup project as a dependency to ensure fresh auth
  test.use({ storageState: "playwright/.auth/user.json" });

  test("user can add item to cart and reach checkout summary", async ({ page, context }) => {
    // FORCE: Clear and re-set cookies just in case the file load is flaky
   const authFile = require('../playwright/.auth/user.json');
    await context.addCookies(authFile.cookies);


    await page.goto("/");
    await page.locator('body[data-hydrated="true"]').waitFor();

    const currentUrl = page.url();
if (currentUrl.includes('/login')) {
  await page.fill('input[name="email"]', 'test@example.com'); 
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/');
}

    await page.getByTestId("product-card").first().click();
    await page.getByRole("button", { name: /add to cart/i }).click();

    await expect(page.getByTestId("cart-count")).toHaveText("1");


    const cartTrigger = page.locator('button[aria-haspopup="dialog"]');
    await cartTrigger.click({ force: true });

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();

await page.getByRole("link", { name: /checkout/i }).click();

await page.waitForURL('**/checkout');

await expect(page.getByRole("heading", { name: /order summary/i })).toBeVisible();  });
});