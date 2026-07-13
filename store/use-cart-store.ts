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
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      _hasHydrated: false,
      setHasHydrated: (isHydrated) => set({ _hasHydrated: isHydrated }),
      userId: null,
      setUserId: (id) => set({ userId: id }),
      
      // FIXED: Using atomic state updates inside set() instead of get()
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.variantId === newItem.variantId
        );
        
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.variantId === newItem.variantId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        }
        
        return { 
          items: [...state.items, { ...newItem, quantity: 1 }] 
        };
      }),
      
      // FIXED: Using atomic state updates
      updateQuantity: (variantId, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.variantId === variantId ? { ...i, quantity } : i
        ),
      })),
      
      // FIXED: Using atomic state updates
      removeItem: (variantId) => set((state) => ({ 
        items: state.items.filter((i) => i.variantId !== variantId) 
      })),
      
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);