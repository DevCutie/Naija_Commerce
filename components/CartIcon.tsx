"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const [isMounted, setIsMounted] = useState(false);

  const items = useCartStore((state) => state.items);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative p-2">
        <ShoppingCart className="h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative p-2 cursor-pointer group">
      <ShoppingCart className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />

     {itemCount > 0 && (
        <span 
          data-testid="cart-count"
          className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm"
        >
          {itemCount}
        </span>
      )}
    </div>
  );
}
