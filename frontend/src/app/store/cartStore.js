import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  totalItems: 0,
  loading: false,
  error: null,

  setCart: (cartItems) => set({ cart: cartItems.cart, totalItems: cartItems.totalItems || 0 }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
