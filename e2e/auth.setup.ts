import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request, context }) => {
	const credentials = {
		email: 'test@example.com',
		password: 'password123',
	};

	let response = await request.post('/api/auth/sign-in/email', {
		data: credentials,
	});

	if (!response.ok()) {
		response = await request.post('/api/auth/sign-up/email', {
			data: {
				...credentials,
				name: 'Playwright Test User',
			},
		});

		if (!response.ok()) {
			const errorText = await response.text();
			throw new Error(
				`Authentication failed: ${response.status()} - ${errorText}`,
			);
		}
	}

	await context.storageState({ path: authFile });
});
