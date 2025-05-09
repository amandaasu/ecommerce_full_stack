import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  totalItems: 0,
  loading: false,
  error: null,

  setCart: (cartItems) => set({ cart: cartItems.cart, totalItems: cart.cart.length || 0 }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
