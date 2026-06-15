import { test, expect } from "@playwright/test";

test.describe("Checkout Flow", () => {
  test.use({ storageState: "playwright/.auth/user.json" });

  test("user can add item to cart and reach checkout summary", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByRole("button", { name: /Add to Cart/i })
      .first()
      .click();

    await page
      .locator("header")
      .getByRole("button")
      .filter({ hasText: /cart/i })
      .click();

    await page.getByRole("link", { name: /Proceed to Checkout/i }).click();

    await expect(page).toHaveURL(/.*checkout/);
    await expect(
      page.getByRole("heading", { name: "Secure Checkout" })
    ).toBeVisible();
    await expect(page.getByText("Order Summary")).toBeVisible();
  });
});
