"use client";
import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/use-cart-store";
import { mergeGuestCart } from "@/app/actions/cart-merge";

export function CartMerger() {
  const { data: session } = authClient.useSession();
  const { items, clearCart } = useCartStore();
  const mergedRef = useRef(false);

  useEffect(() => {

    if (session?.user?.id && items.length > 0 && !mergedRef.current) {
      mergedRef.current = true;
      mergeGuestCart(session.user.id, items).then((res) => {
        if (res.success) {
          clearCart();
        }
      });
    }
  }, [session?.user?.id, items, clearCart]);

  return null;
}