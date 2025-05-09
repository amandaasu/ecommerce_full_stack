"use client";

import Image from "next/image";
import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { CardContainer } from "../components/Products";
import { fetchAllProducts, fetchProducts } from "../services/productService";
import { useProductsStore } from "../store/productStore";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const { search, loading, setLoading, setError } = useProductsStore();
  const [totalItems, setTotalItems] = useState(0);
  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProducts({
        page: null,
        search: search || null,
        type: null,
      });
      setProducts(data.items || []);
      setTotalItems(data?.totalItems || data?.items?.length || 0);
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
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{search ? `Results for: "${search}"` : "All Products"}</h2>
          <p className="text-gray-500 mt-1">
            {totalItems} {totalItems === 1 ? "record" : "records"} {search ? "found" : "available"}
          </p>
        </div>
      </div>{" "}
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
