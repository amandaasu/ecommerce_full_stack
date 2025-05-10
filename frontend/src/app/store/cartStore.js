import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  totalItems: 0,
  loading: false,
  error: null,
  totalAmount: 0,
  setCart: (cartItems) => set({ cart: cartItems.cart, totalAmount: cartItems.totalAmount || 0, totalItems: cartItems.totalItems || 0 }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
