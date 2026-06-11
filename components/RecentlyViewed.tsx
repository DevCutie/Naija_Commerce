"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecentlyViewed } from "@/store/hooks/useRecentlyViewed";


export default function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
  const { viewedIds, addProduct } = useRecentlyViewed();


  useEffect(() => {
    if (currentProductId) {
      addProduct(currentProductId);
    }
  }, [currentProductId]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["recently-viewed", viewedIds],
    queryFn: async () => {
      if (viewedIds.length === 0) return [];


      const res = await fetch(`/api/products?ids=${viewedIds.join(",")}`);
      if (!res.ok) throw new Error("Failed to fetch recently viewed");
      return res.json();
    },

    enabled: viewedIds.length > 0, 
  });

  if (viewedIds.length === 0) return null;
  if (isLoading) return <div>Loading recently viewed...</div>;

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products?.map((product: any) => (
          <div key={product.id} className="p-4 border rounded-lg">
            <p className="font-semibold">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}