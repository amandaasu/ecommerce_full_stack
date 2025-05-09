"use client";

import Image from "next/image";
import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { CardContainer } from "../components/Products";
import { fetchAllProducts, fetchProducts } from "../services/productService";
import { useProductsStore } from "../store/productStore";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const { search, loading, setLoading, setError } = useProductsStore();

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProducts({
        page: null,
        search: search || null,
        type: null,
      });
      setProducts(data.items || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [search]);

  return (
    <div className="px-28 py-16">
      <h2 className="text-3xl font-bold  mb-8">All Products</h2>
      {loading ? (
        <div className="flex  py-16">
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      ) : (
        <CardContainer items={products} />
      )}
    </div>
  );
}
