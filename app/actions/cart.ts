"use server";

import { db } from "@/lib/db"; 
import { carts, cartItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function syncCartItemToDB(userId: string, variantId: string, quantity: number) {
  try {
    // 1. Find or create the user's cart
    let [userCart] = await db.select().from(carts).where(eq(carts.userId, userId));
    
    if (!userCart) {
      [userCart] = await db.insert(carts)
        .values({ id: crypto.randomUUID(), userId })
        .returning();
    }


    const [existingItem] = await db.select().from(cartItems).where(
      and(
        eq(cartItems.cartId, userCart.id),
        eq(cartItems.variantId, variantId) 
      )
    );


    if (existingItem) {
      await db.update(cartItems)
        .set({ quantity: quantity })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      await db.insert(cartItems).values({
        id: crypto.randomUUID(), 
        cartId: userCart.id,
        variantId: variantId, 
        quantity: quantity,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Database sync failed:", error);
    return { success: false, error: "Failed to sync cart item" };
  }
}