import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ request }) => {

  await request.post('/api/auth/sign-up/email', {
    data: {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    },
  }).catch(() => {

  });

  const response = await request.post('/api/auth/sign-in/email', {
    data: {
      email: 'test@example.com',
      password: 'password123',
    },
  });

  expect(response.ok()).toBeTruthy();

  await request.storageState({ path: 'playwright/.auth/user.json' });
});