import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request, context }) => {
	const response = await request.post('/api/auth/sign-in/email', {
		data: {
			email: 'test@example.com',
			password: 'password123',
		},
	});

	if (!response.ok()) {
		throw new Error(`Authentication failed: ${response.status()}`);
	}

	await context.storageState({ path: authFile });
});
