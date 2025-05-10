"use client";

import React, { Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CardContainer } from "../components/Products";
import { fetchAllProducts } from "../services/productService";
import { useProductsStore } from "../store/productStore";
import { IconX } from "@tabler/icons-react";
import NoItemsGif from "@/assets/no_items.gif";

// Main component that gets exported - wrapped in Suspense
export default function Shop() {
  return (
    <Suspense fallback={<div className="px-28 py-16">Loading shop page...</div>}>
      <ShopContent />
    </Suspense>
  );
}

// Content component that uses client-side hooks
function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const { loading, setLoading, setError } = useProductsStore();
  const [totalItems, setTotalItems] = useState(0);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);

      const queryParams = {
        search: searchParams.get("search") || null,
        type: searchParams.get("type") || null,
        price: searchParams.get("price") || null,
        page: searchParams.get("page") || null,
      };

      const data = await fetchAllProducts(queryParams);
      setProducts(data.items || []);
      setTotalItems(data?.totalItems || data?.items?.length || 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchParams, setLoading, setError]);

  useEffect(() => {
    getProducts();
  }, [searchParams, getProducts]);
  const handleFilterChange = (filterType, value) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }

    router.push(`/shop?${newParams.toString()}`);
  };

  const removeFilter = (filterType) => {
    handleFilterChange(filterType, null);
  };

  const activeFilters = [
    { label: "Search", value: searchParams.get("search"), key: "search" },
    { label: "Type", value: searchParams.get("type"), key: "type" },
    { label: "Price", value: searchParams.get("price"), key: "price" },
  ].filter((filter) => filter.value);

  return (
    <div className="px-28 py-16">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{searchParams.get("search") ? `Results for: "${searchParams.get("search")}"` : "All Products"}</h2>
          <p className="text-gray-500 mt-1">
            {totalItems} {totalItems === 1 ? "record" : "records"} {searchParams.get("search") ? "found" : "available"}
          </p>
        </div>

        <div className="flex gap-4">
          <select onChange={(e) => handleFilterChange("type", e.target.value)} className="px-3 py-2 border rounded-full " value={searchParams.get("type") || ""}>
            <option value="">All Types</option>
            <option value="t-shirt">T-Shirts</option>
            <option value="skirt">Skirts</option>
            <option value="hoodie">Hoodies</option>
            <option value="accessories">Accessories</option>
          </select>

          <select onChange={(e) => handleFilterChange("price", e.target.value)} className="px-3 py-2 border rounded-full" value={searchParams.get("price") || ""}>
            <option value="">All Prices</option>
            <option value="<10">Below $10</option>
            <option value="<20">Below $20</option>
            <option value="<30">Below $30</option>
            <option value=">30">Above $30</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex py-16">
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Image src={NoItemsGif} alt="No Items Found" className="w-64 h-64 mb-4" />
          <h3 className="text-xl font-semibold text-gray-500">No items found. Try adjusting the filters.</h3>
        </div>
      ) : (
        <CardContainer items={products} />
      )}
    </div>
  );
}
