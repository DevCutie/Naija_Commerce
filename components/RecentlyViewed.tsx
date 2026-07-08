'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecentlyViewed } from '@/store/hooks/useRecentlyViewed';
import Link from 'next/link';

export default function RecentlyViewed({
  currentProductId,
}: {
  currentProductId?: string;
}) {
  const { viewedIds, addProduct } = useRecentlyViewed();

  useEffect(() => {
    if (currentProductId) {
      addProduct(currentProductId);
    }
  }, [currentProductId, addProduct]);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['recently-viewed', viewedIds],
    queryFn: async () => {
      const res = await fetch(`/api/products?ids=${viewedIds.join(',')}`);
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      return res.json();
    },
    enabled: viewedIds.length > 0,
  });

  if (viewedIds.length === 0) return null;
  if (isLoading) return <div className="mt-12 text-center py-10">Loading your history...</div>;
  if (error) return null;

  return (
    <section className="mt-20 border-t border-slate-800 pt-10">
      <h2 className="text-2xl font-bold mb-8 text-slate-100">Recently Viewed</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {products?.map((product: { id: string; name: string; slug: string; priceKobo: number }) => (
          <Link 
            key={product.id} 
            href={`/products/${product.slug}`}
            className="group flex flex-col p-4 border border-slate-800 rounded-xl bg-slate-900/50 hover:border-slate-500 transition-all duration-300"
          >
            <div className="aspect-square bg-slate-800 rounded-lg mb-4 flex items-center justify-center text-slate-600">
              Image
            </div>
            <p className="font-medium text-slate-200 group-hover:text-white">{product.name}</p>
            {/* Displaying the price formatted from Kobo to Naira */}
            <p className="text-sm text-slate-400 mt-1 font-bold">
                ₦{(product.priceKobo / 100).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}