'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePaystackPayment } from 'react-paystack';
import { initializePaystackPayment } from './actions';
import { useCartStore } from '@/store/use-cart-store';

interface PaystackButtonProps {
  email: string;
  totalKobo: number;
  formatNaira: (kobo: number) => string;
}

export default function PaystackButton({ email, totalKobo, formatNaira }: PaystackButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  const config = {
    email: email,
    amount: 0, 
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayClick = async () => {
    if (!email) {
      alert('Please enter your email address first.');
      return;
    }
    
    setIsProcessing(true);

    try {
      const { accessCode, reference } = await initializePaystackPayment(email, totalKobo);

      initializePayment({
        config: {
          ...config,
          amount: totalKobo,
          reference: reference, 
        },
        onSuccess: (response) => {
          alert(`Payment successful! Transaction Ref: ${response.reference}`);
          clearCart();
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

  return (
    <Button 
      className="w-full" 
      size="lg" 
      onClick={handlePayClick}
      disabled={!email || isProcessing}
    >
      {isProcessing ? 'Processing...' : `Pay ${formatNaira(totalKobo)}`}
    </Button>
  );
}