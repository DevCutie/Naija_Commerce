import { unstable_cache } from 'next/cache';
import { db } from './index';

export const getCategories = unstable_cache(
	async () => {
		console.log('🔥 DATABASE HIT: Fetching categories from Supabase!');
		return db.query.categories.findMany();
	},
	['categories-cache-key'],
	{
		tags: ['categories'],
		revalidate: 3600,
	},
);
