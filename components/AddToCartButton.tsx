"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";
import { syncCartItemToDB } from "@/app/actions/cart";

interface AddToCartProps {
  product: {
    id: string; // This is the Product ID
    name: string;
    priceKobo: number;
    image?: string;
  };
  variantId: string; 
  userId?: string | null; 
}

export default function AddToCartButton({ 
  product, 
  variantId,
  userId = null 
}: AddToCartProps) {
  
  const addItem = useCartStore((state) => state.addItem);
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    startTransition(async () => {

      if (userId) {
        const result = await syncCartItemToDB(userId, variantId, 1);
        if (!result.success) {
          toast.error("Network error. Could not sync to your account.");
          return;
        }
      }


      addItem({
        variantId: variantId,
        productId: product.id,
        name: product.name,
        priceKobo: product.priceKobo,
        image: product.image,
      });

      toast.success(`${product.name} added to cart!`);
    });
  };

  return (
    <Button 
      onClick={handleAdd} 
      size="lg" 
      className="w-full"
      disabled={isPending} 
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="mr-2 h-4 w-4" />
      )}
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}