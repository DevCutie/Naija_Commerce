"use server";

import { db } from "@/lib/db";
import { carts, cartItems } from "@/lib/db/schema";
import { CartItem } from "@/store/use-cart-store";
import { eq, and } from "drizzle-orm";

export async function mergeGuestCart(userId: string, guestItems: CartItem[]){
  try {

    let [userCart] = await db.select().from(carts).where(eq(carts.userId, userId));
    if (!userCart) {
      [userCart] = await db.insert(carts).values({ id: crypto.randomUUID(), userId }).returning();
    }

    for (const item of guestItems) {
      const [existingItem] = await db.select().from(cartItems).where(
        and(eq(cartItems.cartId, userCart.id), eq(cartItems.variantId, item.variantId))
      );

      if (existingItem) {
        await db.update(cartItems)
          .set({ quantity: existingItem.quantity + item.quantity })
          .where(eq(cartItems.id, existingItem.id));
      } else {
        await db.insert(cartItems).values({
          id: crypto.randomUUID(),
          cartId: userCart.id,
          variantId: item.variantId,
          quantity: item.quantity,
        });
      }
    }
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}