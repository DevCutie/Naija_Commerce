import { test as setup } from '@playwright/test';
import { db } from '../lib/db';
import { categories, products } from '../lib/db/schema';

const authFile = 'playwright/.auth/user.json';

setup('authenticate and seed', async ({ request }) => {
	try {
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
	} catch (e) {
		console.log('Seed skipped or handled:', e);
	}

	const credentials = { email: 'test@example.com', password: 'password123' };

	try {
		const response = await request.post('/api/auth/sign-in/email', {
			data: credentials,
		});
		if (!response.ok()) {
			await request.post('/api/auth/sign-up/email', {
				data: { ...credentials, name: 'Playwright Test User' },
			});
			await request.post('/api/auth/sign-in/email', { data: credentials });
		}
	} catch (e) {
		console.log('Auth step skipped or handled:', e);
	}

	await request.storageState({ path: authFile });
});
