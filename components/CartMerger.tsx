'use client';
import { useEffect, useRef } from 'react';
import { mergeGuestCart } from '@/app/actions/cart-merge';
import { authClient } from '@/lib/auth-client';
import { useCartStore } from '@/store/use-cart-store';

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
