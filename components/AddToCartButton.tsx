"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";
import { syncCartItemToDB } from "@/app/actions/cart";

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    priceKobo: number;
    image?: string;
  };
  userId?: string; 
}

export default function AddToCartButton({ 
  product, 
  userId = "test-user-123"
}: AddToCartProps) {
  
  const addItem = useCartStore((state) => state.addItem);
  

  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {

    startTransition(async () => {
      

      const result = await syncCartItemToDB(userId, product.id, 1);

      if (!result.success) {
        toast.error("Network error. Could not add to cart.");
        return; 
      }


      addItem({
        variantId: product.id, 
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
      
      {isPending ? "Adding to Cart..." : "Add to Cart"}
    </Button>
  );
}