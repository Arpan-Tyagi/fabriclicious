import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  variantId: string;
  title: string;
  colorName: string;
  isSwatch: boolean;
  lengthMeters: number | null;
  price: number;
  image: string;
};

interface CartState {
  items: CartItem[];
  discountAmount: number;
  isSwatchDrawerFull: boolean;
  isCartOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  applyDiscount: (amount: number) => void;
  getSwatchCount: () => number;
  getSubtotal: () => number;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discountAmount: 0,
      isSwatchDrawerFull: false,
      isCartOpen: false,
      
      addItem: (item) => {
        set((state) => {
          const newItems = [...state.items, item];
          const swatchCount = newItems.filter(i => i.isSwatch).length;
          return {
            items: newItems,
            isSwatchDrawerFull: swatchCount >= 5,
            isCartOpen: true,
          };
        });
      },
      
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter(i => i.id !== id);
          const swatchCount = newItems.filter(i => i.isSwatch).length;
          return {
            items: newItems,
            isSwatchDrawerFull: swatchCount >= 5,
          };
        });
      },

      applyDiscount: (amount) => set({ discountAmount: amount }),
      
      getSwatchCount: () => get().items.filter(i => i.isSwatch).length,
      
      getSubtotal: () => {
        const state = get();
        const base = state.items.reduce((acc, item) => acc + item.price, 0);
        return Math.max(0, base - state.discountAmount);
      },

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: "fabriclicious-cart",
    }
  )
);
