"use client";

import Image from "next/image";
import React, { createContext, useState, useContext, useRef } from "react";

const products = [
  { id: 1, title: "Shiny Dress", price: 95.5, image: "/assets/shiny-dress.jpg", category: "Women's Fashion" },
  { id: 2, title: "Long Dress", price: 95.5, image: "/assets/long-dress.jpg", category: "Women's Fashion" },
  { id: 3, title: "Full Sweater", price: 95.5, image: "/assets/full-sweater.jpg", category: "Accessories" },
  { id: 4, title: "White Dress", price: 95.5, image: "/assets/white-dress.jpg", category: "Women's Fashion" },
  { id: 5, title: "Colorful Dress", price: 95.5, image: "/assets/colorful-dress.jpg", category: "T-Shirts" },
  { id: 6, title: "White Shirt", price: 95.5, image: "/assets/white-shirt.jpg", category: "T-Shirts" },
];

const categories = ["All", "Women's Fashion", "Accessories", "T-Shirts"];

export default function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProducts = activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);

  return (
    <div className="px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Product</h2>
    </div>
  );
}
