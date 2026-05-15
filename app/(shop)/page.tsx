import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { ilike } from "drizzle-orm";
import { getCategories } from "@/lib/db/queries";
import ProductGrid from "@/components/shop/ProductGrid";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {

  const start = performance.now();
  const categories = await getCategories();
  const end = performance.now();
  

  console.log(`⏱️ Category fetch took: ${(end - start).toFixed(2)}ms`);

  const params = await searchParams;
  const searchQuery = params.q;

  const inventoryData = await db.query.products.findMany({
    where: searchQuery ? ilike(products.name, `%${searchQuery}%`) : undefined,
    with: { category: true },
    limit: 20,
  });
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold tracking-tight mb-8">
        {searchQuery ? `Results for "${searchQuery}"` : "Latest Arrivals"}
      </h1>
      
      <ProductGrid initialProducts={inventoryData}/>
    </div>
  );
}