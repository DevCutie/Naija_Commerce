import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const resolvedParams = await searchParams;
  const reference = resolvedParams.ref;

  return (
    <div className="max-w-md mx-auto mt-24 p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-border space-y-6">
      <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto" />
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. We are processing your order.
        </p>
      </div>

      {reference && (
        <div className="bg-background p-4 rounded-lg border border-border text-sm font-mono break-all">
          <span className="text-muted-foreground block mb-1 font-sans">Transaction Reference:</span>
          {reference}
        </div>
      )}

      <div className="pt-4">
        <Button asChild className="w-full" size="lg">
          <Link href="/">Return to Shop</Link>
        </Button>
      </div>
    </div>
  );
}