import ProductGrid from '@/components/shop/ProductGrid';
import { db } from '@/lib/db';
import { products, categories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.q;

  let rows: any[] = [];

  try {
    // Perform the query
    rows = await db
      .select()
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .limit(20);
  } catch (err) {
    // This will print the REAL error in your VS Code terminal
    console.error('\n🔥 POSTGRES ERROR DETAILS:');
    console.error(err);
    console.error('\n');
  }

  // Map the results to match what ProductGrid expects
  const inventoryData = rows.map((row) => ({
    ...row.products,
    category: row.categories,
  }));

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold tracking-tight mb-8">
        {searchQuery ? `Results for "${searchQuery}"` : 'Latest Arrivals'}
      </h1>

      <ProductGrid initialProducts={inventoryData} />
    </div>
  );
}