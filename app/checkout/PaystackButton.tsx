'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { usePaystackPayment } from 'react-paystack';
import { initializePaystackPayment } from './actions';
import { useCartStore } from '@/store/use-cart-store';
import { toast } from 'sonner';

interface PaystackButtonProps {
  email: string;
  totalKobo: number;
  formatNaira: (kobo: number) => string;
}

export default function PaystackButton({ email, totalKobo, formatNaira }: PaystackButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const config = useMemo(() => ({
    email: email,
    amount: totalKobo, 
    publicKey: publicKey || '',
  }), [email, totalKobo, publicKey]);

  const initializePayment = usePaystackPayment(config);

  if (!publicKey) {
    return (
      <Button className="w-full" size="lg" disabled variant="destructive">
        Payment Gateway Not Configured
      </Button>
    );
  }

  const handlePayClick = async () => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email address to proceed.');
      return;
    }
    
    setIsProcessing(true);

    try {
      const { accessCode, reference } = await initializePaystackPayment(email, totalKobo);

      initializePayment({
        config: {
          ...config,
          reference: reference, 
        },
        onSuccess: (response) => {
          // 4. Eradicate Alerts & Handle Redirect
          toast.success('Payment successful!');
          clearCart();
          setIsProcessing(false);
          router.push(`/order-success?ref=${response.reference}`);
        },
        onClose: () => {
          toast.info('You closed the payment window without paying.');
          setIsProcessing(false);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong initializing the payment.');
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