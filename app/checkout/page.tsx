'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/use-cart-store';
import dynamic from 'next/dynamic';

// 🚨 This is the magic fix! It forces the component to only load in the browser.
const PaystackButton = dynamic(() => import('./PaystackButton'), { 
  ssr: false,
  loading: () => <Button className="w-full" size="lg" disabled>Loading payment gateway...</Button>
});

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const items = useCartStore((state) => state.items);

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
    0,
  );

  const shippingKobo = 250000;
  const vatKobo = Math.round(subtotalKobo * 0.075);
  const totalKobo = subtotalKobo + shippingKobo + vatKobo;

  const formatNaira = (kobo: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
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
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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
                    {item.name}{' '}
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

          {/* Render our new dynamic button! */}
          <PaystackButton 
            email={email} 
            totalKobo={totalKobo} 
            formatNaira={formatNaira} 
          />
        </div>
      </div>
    </div>
  );
}