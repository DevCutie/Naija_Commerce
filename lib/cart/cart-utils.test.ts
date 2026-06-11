import { describe, expect, it } from 'vitest';
import { calculateCartTotal } from './cart-utils';

describe('calculateCartTotal', () => {
	it('should calculate the total correctly for multiple items', () => {
		const items = [
			{ price: 1000, quantity: 2 },
			{ price: 500, quantity: 1 },
		];
		expect(calculateCartTotal(items)).toBe(2500);
	});

	it('should return zero for an empty cart', () => {
		expect(calculateCartTotal([])).toBe(0);
	});
});
