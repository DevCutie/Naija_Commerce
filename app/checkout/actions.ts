'use server';

export async function initializePaystackPayment(email: string, amountKobo: number) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error("Paystack secret key is missing from environment variables.");
  }


  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      amount: amountKobo, 
    }),
  });

  const data = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to initialize payment');
  }


  return {
    accessCode: data.data.access_code,
    reference: data.data.reference,
  };
}