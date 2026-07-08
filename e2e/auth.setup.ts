import { expect, test as setup } from '@playwright/test';

setup('authenticate', async ({ request, page }) => {

  await request
    .post('/api/auth/sign-up/email', {
      data: {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      },
    })
    .catch(() => {});
  await page.goto('/login');

  await page.getByTestId('email-input').fill('test@example.com');
  await page.getByTestId('password-input').fill('password123');

  await page.getByTestId('login-button').click();

  await page.waitForURL('/checkout');

  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});