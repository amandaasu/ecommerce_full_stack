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
      <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>

      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-2 rounded-full ${activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const MouseEnterContext = createContext([false, () => {}]);

export const Card = ({ product }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <MouseEnterContext.Provider value={[isHovered, setIsHovered]}>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-linear transform"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          transform: isHovered ? "rotateY(10deg) rotateX(10deg)" : "rotateY(0deg) rotateX(0deg)",
        }}
      >
        <div className="overflow-hidden rounded-lg mb-4 h-[300px] relative z-10">
          <Image
            src={product.image}
            alt={product.title}
            width={320}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>

        <div className={`text-lg font-semibold text-gray-800 transition-transform duration-300 ${isHovered ? "translate-y-[-10px]" : ""}`}>{product.title}</div>

        <div className={`text-sm text-gray-500 transition-transform duration-300 ${isHovered ? "translate-y-[-5px]" : ""}`}>${product.price.toFixed(2)}</div>

        {isHovered && <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg z-0" style={{ transform: "translateZ(-1px)" }} />}
      </div>
    </MouseEnterContext.Provider>
  );
};
