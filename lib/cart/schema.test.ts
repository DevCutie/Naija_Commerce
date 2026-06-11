import { describe, expect, it } from 'vitest';
import { cartItemSchema } from './schema';

describe('cartItemSchema', () => {
	it('should validate a correct cart item', () => {
		const validItem = { id: 'prod_1', price: 1000, quantity: 1 };
		const result = cartItemSchema.safeParse(validItem);
		expect(result.success).toBe(true);
	});

	it('should fail for an invalid cart item (e.g., negative price)', () => {
		const invalidItem = { id: 'prod_1', price: -100, quantity: 1 };
		const result = cartItemSchema.safeParse(invalidItem);
		expect(result.success).toBe(false);
	});
});
