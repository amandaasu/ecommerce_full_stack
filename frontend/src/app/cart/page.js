"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { clearCartAPI, fetchCartItems, removeFromCartAPI, updateCartItemAPI } from "../services/cartService";
import { ProductImage } from "../components/Products";
import CheckoutGif from "@/assets/checkout.gif"; // Add your checkout GIF to assets folder
import Image from "next/image";

const CartPage = () => {
  const { cart, totalItems, totalAmount, setCart, setLoading, setError } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    try {
      await clearCartAPI();
      setCart([]);
    } catch (error) {
      console.error("Error during checkout:", error);
      setError("Checkout failed. Please try again.");
    } finally {
      // setIsCheckingOut(false);
    }
  };
  return (
    <div className="px-10 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 mt-10">Shopping Cart</h2>

      {isCheckingOut ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Image src={CheckoutGif} alt="Checkout Animation" className="w-64 h-64 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--primary-color)]">Order Placed Successfully!</h3>
        </div>
      ) : cart?.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cart?.map((item) => (
            <div key={item.variantSKU} className="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-white">
              {/* Product Image */}
              <div className="w-24 h-24 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
                <ProductImage src={item.imageSrc} alt={item.title} width={80} height={80} />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                <p className="text-gray-500 text-sm">SKU: {item.variantSKU}</p>
                <p className="text-gray-400 text-xs mt-1">Price: ${item.variantPrice.toFixed(2)}</p>
                <button className="text-red-500 text-sm mt-1" onClick={() => handleRemove(item.variantSKU)}>
                  Remove
                </button>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center gap-2">
                <button onClick={() => handleQuantityChange(item.variantSKU, "REMOVE")} className="rounded-full px-3 py-1 border border-gray-300 hover:bg-gray-200">
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.variantSKU, "ADD")} className="rounded-full px-3 py-1 border border-gray-300 hover:bg-gray-200">
                  +
                </button>
              </div>

              {/* Total Price */}
              <div className="text-right w-24">
                <p className="text-lg font-semibold">${(item.variantPrice * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-gray-400">(${item.variantPrice.toFixed(2)} each)</p>
              </div>
            </div>
          ))}

          {/* Total and Checkout */}
          <div className="flex justify-between items-center mt-8 p-4 bg-gray-50 rounded-lg shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-[var(--primary-color)]">
                {"Total: "}${totalAmount.toFixed(2)}
                <span className="text-sm text-gray-400 ml-2">({totalItems} items)</span>
              </h2>
            </div>
            <button onClick={handleCheckout} className="px-6 py-2 rounded-full bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
