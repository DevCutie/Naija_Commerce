import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';

export default async function RelatedProducts({
	categoryId,
}: {
	categoryId: string | null | undefined;
}) {
	if (!categoryId) {
		return <p>No related products found.</p>;
	}

	const related = await db.query.products.findMany({
		where: eq(products.category_id, categoryId),
		limit: 4,
	});

	if (related.length === 0) {
		return <p>No related products in this category.</p>;
	}
	return (
		<div className="mt-20 border-t pt-10">
			<h2 className="text-2xl font-bold mb-6">You might also like</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{related.map((product) => (
					<Link
						key={product.id}
						href={`/products/${product.slug}`}
						className="group block"
					>
						<div className="border rounded-lg p-4 transition-shadow hover:shadow-md">
							<div className="aspect-square bg-slate-100 rounded-md mb-3 flex items-center justify-center text-slate-400 text-sm">
								[Image]
							</div>
							<h3 className="font-semibold text-md line-clamp-1">
								{product.name}
							</h3>
							<p className="text-sm font-medium mt-1">
								{new Intl.NumberFormat('en-NG', {
									style: 'currency',
									currency: 'NGN',
								}).format(product.priceKobo / 100)}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
