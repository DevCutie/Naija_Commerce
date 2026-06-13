import { describe, expect, it } from 'vitest';
import { formatNGN } from './format';

describe('formatNGN', () => {
	it('should format a whole number correctly', () => {
		expect(formatNGN(1000)).toBe('₦1,000.00');
	});

	it('should handle decimal values', () => {
		expect(formatNGN(500.5)).toBe('₦500.50');
	});

	it('should handle zero', () => {
		expect(formatNGN(0)).toBe('₦0.00');
	});
});
