"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";


export default function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();


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

    setOptimisticProducts(term);


    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }

      router.replace(`/?${params.toString()}`); 
    });
  };

  return (
    <div>
   
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={searchParams.get("q")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className="border rounded-md px-3 py-2"
        />
        {isPending && <span className="ml-4 text-sm text-gray-500">Updating...</span>}
      </div>


      {optimisticProducts.length === 0 ? (
        <p className="text-muted-foreground">No products found. Try a different search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          

          {optimisticProducts.map((product) => (
            

            <Link key={product.id} href={`/products/${product.id}`} className="group block">
              <div className="border rounded-lg p-4 h-full transition-shadow hover:shadow-md">
                <div className="aspect-square bg-slate-100 rounded-md mb-4 flex items-center justify-center text-slate-400">
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