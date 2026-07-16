'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/use-cart-store';
import { usePaystackPayment } from 'react-paystack';
import { initializePaystackPayment } from './actions';

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set up the basic Paystack Cashier rules
  const config = {
    email: email,
    amount: 0, // We will calculate this securely when they click pay
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

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

  const handlePayClick = async () => {
    if (!email) {
      alert('Please enter your email address first.');
      return;
    }
    
    setIsProcessing(true);

    try {
      // 1. The Cashier asks the Manager (Backend) for the secure lockbox ticket
      const { accessCode, reference } = await initializePaystackPayment(email, totalKobo);

      // 2. The Cashier uses the ticket to pop open the lockbox!
      initializePayment({
        config: {
          ...config,
          amount: totalKobo,
          reference: reference, 
        },
        onSuccess: (response) => {
          // STEP 5: We are handling the callbacks right here!
          alert(`Payment successful! Transaction Ref: ${response.reference}`);
          clearCart(); // Empty the cart because they bought it!
          setIsProcessing(false);
        },
        onClose: () => {
          alert('You closed the payment window without paying.');
          setIsProcessing(false);
        }
      });
    } catch (error) {
      console.error(error);
      alert('Something went wrong initializing the payment.');
      setIsProcessing(false);
    }
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
            
            {/* We added this email input so Paystack knows who is paying! */}
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

          <Button 
            className="w-full" 
            size="lg" 
            onClick={handlePayClick}
            disabled={!email || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ${formatNaira(totalKobo)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}