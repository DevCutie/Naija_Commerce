import { z } from "zod";


export const cartItemSchema = z.object({
  id: z.string(),
  price: z.number().positive(), 
  quantity: z.number().int().positive(), 
});


export type CartItem = z.infer<typeof cartItemSchema>;