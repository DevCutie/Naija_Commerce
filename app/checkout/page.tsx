"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading secure checkout...
      </div>
    );
  }

  const subtotalKobo = items.reduce(
    (total, item) => total + item.priceKobo * item.quantity,
    0
  );

  const shippingKobo = 250000;

  const vatKobo = Math.round(subtotalKobo * 0.075);

  const totalKobo = subtotalKobo + shippingKobo + vatKobo;

  const formatNaira = (kobo: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(kobo / 100);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">
          Add some items before checking out.
        </p>
        <Button asChild>
          <Link href="/">Return to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <p className="text-muted-foreground text-sm">
              [Customer Form will go here when we wire up Drizzle]
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-border h-fit space-y-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="space-y-4 divide-y divide-border">
            <div className="space-y-2 pb-2">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name}{" "}
                    <span className="text-muted-foreground">
                      (x{item.quantity})
                    </span>
                  </span>
                  <span>{formatNaira(item.priceKobo * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="py-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatNaira(subtotalKobo)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (7.5%)</span>
                <span>{formatNaira(vatKobo)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>{formatNaira(shippingKobo)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatNaira(totalKobo)}</span>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Pay {formatNaira(totalKobo)}
          </Button>
        </div>
      </div>
    </div>
  );
}
