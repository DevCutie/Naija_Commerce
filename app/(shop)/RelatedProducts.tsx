import { eq, ne } from 'drizzle-orm';
import Link from 'next/link';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: string | null | undefined;
  currentProductId: string;
}) {

  if (!categoryId) {
    return null;
  }

  const related = await db.query.products.findMany({
    where: (products, { and, eq, ne }) => 
      and(
        eq(products.categoryId, categoryId),
        ne(products.id, currentProductId)
      ),
    limit: 4,
  });

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="mt-20 border-t border-slate-800 pt-10">
      <h2 className="text-2xl font-bold mb-6 text-slate-100">You might also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group block"
          >
            <div className="border border-slate-800 rounded-lg p-4 transition-all hover:border-slate-500 bg-slate-900/50">
              <div className="aspect-square bg-slate-800 rounded-md mb-3 flex items-center justify-center text-slate-600 text-sm">
                Image
              </div>
              <h3 className="font-semibold text-md text-slate-200 line-clamp-1 group-hover:text-white">
                {product.name}
              </h3>
              <p className="text-sm font-medium text-slate-400 mt-1">
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