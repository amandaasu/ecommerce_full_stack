"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CardContainer, ProductImage } from "./Products";
import { fetchByCategory } from "../services/productService";

const categories = ["All", "Children's T-Shirts", "Skirts", "Dresses", "Hoodies"];

export default function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getFilteredProducts = async (page, category) => {
    try {
      setLoading(true);
      const data = await fetchByCategory(page, category);
      if (page > 1) {
        setProducts([...products, ...data.items] || []);
      } else {
        setProducts(data.items || []);
      }
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFilteredProducts(1, activeCategory);
  }, [activeCategory]);
  const onLoadMore = () => {
    getFilteredProducts(page + 1, activeCategory);
    setPage((prev) => {
      return prev + 1;
    });
  };
  const onChangeTab = (category) => {
    setActiveCategory(category);
    setPage(1);
    getFilteredProducts(1, category);
  };
  return (
    <div className="px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>

      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              onChangeTab(category);
            }}
            className={`px-6 py-2 rounded-full ${activeCategory === category ? "bg-[var(--primary-color)] text-white" : "bg-gray-200 text-gray-600"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <CardContainer items={products} loadMore={page < totalPages} onLoadMore={() => onLoadMore()} />
        </>
      )}
    </div>
  );
}
