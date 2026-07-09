import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import RelatedProducts from '@/app/(shop)/RelatedProducts';
import RelatedProductsSkeleton from '@/app/(shop)/RelatedProductsSkeleton';
import AddToCartButton from '@/components/AddToCartButton';
import RecentlyViewed from '@/components/RecentlyViewed';
import { db } from '@/lib/db';
import { products, variants } from '@/lib/db/schema';

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const productSlug = resolvedParams.slug;

  // Use Drizzle's inferred type instead of a manual interface
  const product = await db.query.products.findFirst({
    where: eq(products.slug, productSlug),
  });

  if (!product) notFound();

  const fetchedVariant = await db.query.variants.findFirst({
    where: eq(variants.productId, product.id),
  });

  if (!fetchedVariant) {
    return <div>Product is currently out of stock (no variant found).</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4" data-testid="product-card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-2xl font-bold">
          [Image Placeholder]
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">
            {new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(product.priceKobo / 100)}
          </p>
          <p className="text-muted-foreground mb-8">
            {product.description ||
              'No description available for this product.'}
          </p>

          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              priceKobo: product.priceKobo,
            }}
            variantId={fetchedVariant.id}
          />
        </div>
      </div>

      <Suspense fallback={<RelatedProductsSkeleton />}>

       <RelatedProducts 
    categoryId={product.categoryId} 
    currentProductId={product.id} 
  />
      </Suspense>

      <RecentlyViewed currentProductId={product.id} />
    </div>
  );
}