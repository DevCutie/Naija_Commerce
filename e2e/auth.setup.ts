import { test as setup } from '@playwright/test';
import { db } from '../lib/db';
import { categories, products } from '../lib/db/schema';

const authFile = 'playwright/.auth/user.json';

setup('authenticate and seed', async ({ request }) => {
	await db
		.insert(categories)
		.values({
			id: 'test-cat',
			name: 'Playwright Category',
			slug: 'playwright-category',
		})
		.onConflictDoNothing();

	await db
		.insert(products)
		.values({
			id: 'test-prod',
			name: 'Playwright Product',
			slug: 'playwright-product',
			description: 'Test product',
			priceKobo: 50000,
			category_id: 'test-cat',
		})
		.onConflictDoNothing();

	const credentials = {
		email: 'test@example.com',
		password: 'password123',
	};

	let response = await request.post('/api/auth/sign-in/email', {
		data: credentials,
	});

	if (!response.ok()) {
		const signUpResponse = await request.post('/api/auth/sign-up/email', {
			data: {
				...credentials,
				name: 'Playwright Test User',
			},
		});

		if (!signUpResponse.ok()) {
			const errorText = await signUpResponse.text();
			throw new Error(
				`Sign-up failed: ${signUpResponse.status()} - ${errorText}`,
			);
		}

		response = await request.post('/api/auth/sign-in/email', {
			data: credentials,
		});

		if (!response.ok()) {
			const errorText = await response.text();
			throw new Error(
				`Sign-in after sign-up failed: ${response.status()} - ${errorText}`,
			);
		}
	}

	await request.storageState({ path: authFile });
});
