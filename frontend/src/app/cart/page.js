"use client";
import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { fetchCartItems, removeFromCartAPI, updateCartItemAPI } from "../services/cartService";
import Image from "next/image";
import BrokenImage from "@/assets/broken-image.png";
import { ProductImage } from "../components/Products";

const CartPage = () => {
  const { cart, totalItems, setCart, setLoading, setError } = useCartStore();

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const data = await fetchCartItems();
        setCart(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [setCart, setLoading, setError]);

  const handleRemove = async (productId) => {
    try {
      setLoading(true);
      const updatedCart = await removeFromCartAPI(productId);
      setCart(updatedCart);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId, action) => {
    const existingItem = cart.find((item) => item.variantSKU === productId);
    let newQuantity = existingItem?.quantity || 0;

    if (action === "ADD") newQuantity += 1;
    if (action === "REMOVE" && newQuantity > 0) newQuantity -= 1;

    if (newQuantity === 0) return handleRemove(productId);

    try {
      setLoading(true);
      const updatedCart = await updateCartItemAPI(productId, newQuantity);
      setCart(updatedCart);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-16 py-12">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.variantSKU} className="flex items-center justify-between gap-6 border-b pb-4 mb-4">
              <div className="flex items-center gap-4 flex-1">
                {/* <Image src={item.imageSrc || BrokenImage} alt={item.title} width={80} height={80} className="rounded" /> */}
                <ProductImage src={item.imageSrc} alt={item.title || "Product Image"} width={80} height={80} className="rounded" />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">SKU: {item.variantSKU}</p>
                  <button className="text-red-500 text-sm mt-1" onClick={() => handleRemove(item.variantSKU)}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleQuantityChange(item.variantSKU, "REMOVE")} className="rounded-full px-3 py-1 border border-gray-300 rounded">
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.variantSKU, "ADD")} className="rounded-full px-3 py-1 border border-gray-300 rounded">
                  +
                </button>
              </div>
              <p className="text-lg font-semibold w-20 text-right">${(item.variantPrice * item.quantity)?.toFixed(2)}</p>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8">
            <h2 className="text-xl font-bold">Total Items: {totalItems}</h2>
            <button className="px-6 py-2 rounded-full bg-[var(--primary-color)] text-white">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
