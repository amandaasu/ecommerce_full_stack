"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import BrokenImage from "@/assets/broken-image.png";
import { addToCartAPI, updateCartItemAPI } from "../services/cartService";
import { useCartStore } from "../store/cartStore";
import CartIcon from "@/assets/cart-dark.png";

export function CardContainer({
  items,
  loadMore = false,
  onLoadMore = function () {
    return;
  },
}) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { cart, setCart } = useCartStore();
  const [quantity, setQuantity] = useState({});
  const [isUpdating, setIsUpdating] = useState({});

  const handleQuantityChange = (productId, action) => {
    setQuantity((prev) => {
      const currentQuantity = prev[productId] || 0;
      const newQuantity = action === "ADD" ? currentQuantity + 1 : action === "CLEAR" ? 0 : Math.max(0, currentQuantity - 1);
      return { ...prev, [productId]: newQuantity };
    });
  };

  const handleAddToCart = async (product) => {
    const productId = product.variantSKU;
    const quantityToAdd = quantity[productId] || 0;

    if (quantityToAdd === 0) return;

    setIsUpdating((prev) => ({ ...prev, [productId]: true }));

    try {
      const existingItem = cart.find((item) => item.variantSKU === productId);
      if (existingItem) {
        const updatedCart = await updateCartItemAPI(productId, quantityToAdd + (existingItem?.quantity || 0));
        setCart(updatedCart);
      } else {
        const updatedCart = await addToCartAPI(product, quantityToAdd + (existingItem?.quantity || 0));
        setCart(updatedCart);
      }
      handleQuantityChange(product.variantSKU, "CLEAR");
      console.log("Cart updated.");
    } catch (error) {
      console.error("Error updating cart:", error.message);
    } finally {
      setIsUpdating((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((product) => {
        const productId = product.variantSKU;
        const currentQuantity = quantity[productId] || 0;

        return (
          <div
            key={product._id}
            className="relative p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 cursor-pointer min-w-[220px]"
            style={{
              transform: hoveredCard === product._id ? "rotateY(10deg) rotateX(10deg)" : "rotateY(0deg) rotateX(0deg)",
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHoveredCard(product._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="overflow-hidden rounded-lg mb-4 h-[300px] relative z-10">
              <ProductImage src={product.imageSrc} alt={product.title} hovered={hoveredCard === product._id} />
            </div>
            <div className="text-lg font-semibold text-gray-800">{product.title}</div>
            <div className="text-sm text-gray-500">${product.variantPrice?.toFixed(2) || 0}</div>

            {currentQuantity === 0 ? (
              // className="px-6 py-2 rounded-full bg-[var(--primary-color)] text-white"
              <button className="px-6 py-2 rounded-full border border-primary text-primary px-4 py-1 rounded mt-2" onClick={() => setQuantity((prev) => ({ ...prev, [productId]: 1 }))}>
                Add to Cart
              </button>
            ) : (
              <div className="mt-2 flex gap-4">
                <div className="flex items-center gap-2">
                  <button className="rounded-full px-3 py-1 border border-gray-300 rounded" onClick={() => handleQuantityChange(productId, "REMOVE")} disabled={currentQuantity === 0}>
                    -
                  </button>
                  <span>{currentQuantity}</span>
                  <button className="rounded-full px-3 py-1 border border-gray-300 rounded" onClick={() => handleQuantityChange(productId, "ADD")}>
                    +
                  </button>
                </div>
                <div className="flex justify-center items-center gap-2 lg:gap-4 rounded-full bg-[var(--primary-color)] text-white cursor-pointer p-2 lg:p-3" onClick={() => handleAddToCart(product)}>
                  {/* Cart Icon - Always Visible */}
                  <Image src={CartIcon} alt="Cart" width={24} height={24} className="text-white" />

                  {/* Button - Visible only on LG and larger screens */}
                  <button src={CartIcon} className="hidden lg:block">
                    Buy Now
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {loadMore && <LoadMore onLoadMore={onLoadMore} />}
    </ul>
  );
}

export const ProductImage = ({ src, alt, hovered, ...options }) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={320}
      height={400}
      className="w-full h-full object-cover transition-transform duration-300"
      style={{
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}
      onError={() => setImageSrc(BrokenImage)}
      {...options}
    />
  );
};
function LoadMore({ onLoadMore }) {
  return (
    <div
      className="flex justify-center items-center mt-8"
      onClick={() => {
        onLoadMore();
      }}
    >
      <button className="px-6 py-2 rounded-full bg-[var(--primary-color)] text-white">{"Load More"}</button>
    </div>
  );
}
