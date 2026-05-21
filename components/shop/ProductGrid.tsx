"use client";



import { useOptimistic, useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { type InferSelectModel } from "drizzle-orm";
import { products, categories } from "@/lib/db/schema";


type ProductWithCategory = InferSelectModel<typeof products> & {
  category: InferSelectModel<typeof categories> | null;
};

export default function ProductGrid({ initialProducts }: { initialProducts: ProductWithCategory[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();


const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    initialProducts, 
    (currentProducts, searchTerm: string) => {
      if (!searchTerm) return initialProducts;
      return currentProducts.filter((p) => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  );

  const handleSearch = (term: string) => {




    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

startTransition(() => {
      setOptimisticProducts(term); 
    });

    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set("q", term);
        } else {
          params.delete("q");
        }

        router.replace(`/?${params.toString()}`); 
      });
    }, 300); 


    
  };

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={searchParams.get("q")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className="border rounded-md px-3 py-2 bg-transparent w-full text-white"
        />
        {isPending && <span className="ml-4 text-sm text-gray-500">Updating...</span>}
      </div>

      {optimisticProducts.length === 0 ? (
        <p className="text-muted-foreground">No products found. Try a different search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {optimisticProducts.map((product) => (
           <Link key={product.id} href={`/products/${product.slug}`} className="group block">
              <div className="border border-slate-800 rounded-lg p-4 h-full transition-shadow hover:shadow-md hover:border-slate-700">
                <div className="aspect-square bg-slate-900 rounded-md mb-4 flex items-center justify-center text-slate-500">
                  [Image]
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {product.category?.name}
                </div>
                <h2 className="font-semibold text-lg line-clamp-1">{product.name}</h2>
                <p className="text-sm font-medium mt-2">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(product.priceKobo / 100)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}