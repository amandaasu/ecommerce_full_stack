import { create } from "zustand";

export const useProductsStore = create((set) => ({
  search: "",
  totalItems: 0,
  loading: false,
  error: null,

  setSearch: (sSearch) => set({ search: sSearch || "" }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
