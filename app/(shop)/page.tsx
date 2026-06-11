import ProductGrid from '@/components/shop/ProductGrid';
import { db } from '@/lib/db';
import { getCategories } from '@/lib/db/queries';
import type { products } from '@/lib/db/schema';

type ProductWithCategory = typeof products.$inferSelect & {
	category: {
		id: string;
		name: string;
		slug: string;
	} | null;
};

export default async function ShopPage({
	searchParams,
}: {
	searchParams: Promise<{ q?: string }>;
}) {
	const start = performance.now();
	const _categories = await getCategories();
	const end = performance.now();

	console.log(`⏱️ Category fetch took: ${(end - start).toFixed(2)}ms`);

	const params = await searchParams;
	const searchQuery = params.q;

	const inventoryData = await db.query.products.findMany({
		limit: 20,
		with: {
			category: true,
		},
	});

	return (
		<div className="container mx-auto py-10 px-4">
			<h1 className="text-4xl font-bold tracking-tight mb-8">
				{searchQuery ? `Results for "${searchQuery}"` : 'Latest Arrivals'}
			</h1>

			<ProductGrid initialProducts={inventoryData} />
		</div>
	);
}
