import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
	variantId: string;
	productId: string;
	name: string;
	priceKobo: number;
	quantity: number;
	image?: string;
}

interface CartStore {
	items: CartItem[];
	userId: string | null;
	setUserId: (id: string | null) => void;
	addItem: (item: Omit<CartItem, 'quantity'>) => void;
	updateQuantity: (variantId: string, quantity: number) => void;
	removeItem: (variantId: string) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			userId: null,
			setUserId: (id) => set({ userId: id }),
			addItem: (newItem) => {
				const { items } = get();
				const existingItem = items.find(
					(i) => i.variantId === newItem.variantId,
				);
				if (existingItem) {
					set({
						items: items.map((i) =>
							i.variantId === newItem.variantId
								? { ...i, quantity: i.quantity + 1 }
								: i,
						),
					});
				} else {
					set({ items: [...items, { ...newItem, quantity: 1 }] });
				}
			},
			updateQuantity: (variantId, quantity) =>
				set({
					items: get().items.map((i) =>
						i.variantId === variantId ? { ...i, quantity } : i,
					),
				}),
			removeItem: (variantId) =>
				set({
					items: get().items.filter((i) => i.variantId !== variantId),
				}),
			clearCart: () => set({ items: [] }),
		}),
		{ name: 'cart-storage' },
	),
);
