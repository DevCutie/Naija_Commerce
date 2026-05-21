"use client";

import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartIcon from "@/components/CartIcon";
import { useCartStore } from "@/store/use-cart-store";
import Link from "next/link"; 

export default function CartDrawer() {
  const { items, updateQuantity, removeItem } = useCartStore();

  const subtotalKobo = items.reduce(
    (total, item) => total + item.priceKobo * item.quantity,
    0
  );

  const formatNaira = (kobo: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(kobo / 100);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <CartIcon />
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>


        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground opacity-50" />
            <p className="text-lg font-medium text-muted-foreground">
              Your cart is empty
            </p>
          </div>
        ) : (

          <div className="flex-1 overflow-y-auto py-6 pl-4 pr-2 space-y-6">
            {items.map((item) => (
              <div key={item.variantId} className="flex items-center space-x-6 border-b border-slate-100 dark:border-slate-800/60 pb-6 last:border-0">
                

                <div className="h-20 w-20 bg-slate-50 dark:bg-slate-900/50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100 dark:border-slate-800">
                  <ShoppingCart className="h-7 w-7 text-slate-300 dark:text-slate-600" />
                </div>


                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="font-semibold text-base truncate tracking-tight">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 font-medium">
                    {formatNaira(item.priceKobo)}
                  </p>
                </div>


                <div className="flex flex-col items-end space-y-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50/50 rounded-full"
                    onClick={() => removeItem(item.variantId)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>

                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-transparent shadow-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-none"
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-none"
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Subtotal</span>
              <span>{formatNaira(subtotalKobo)}</span>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}