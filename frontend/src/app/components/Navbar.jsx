"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

// Import icons from assets
import HeartIcon from "@/assets/heart.svg";
import UserIcon from "@/assets/user.svg";
import CartIcon from "@/assets/cart.svg";
import Logo from "@/assets/MNlogo.svg";
import { fetchCartItems } from "../services/cartService";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const { cart, totalItems, setCart, setLoading, setError } = useCartStore();

  const getCartItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const cartItems = await fetchCartItems();
      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image className="appLogo" src={Logo} alt="Logo" width={100} height={50} />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6 flex justify-end">
          <div className="relative w-3/5 min-w-[200px]">
            <input type="text" placeholder="Search" className="w-full py-2 px-4 rounded-full bg-red-50 text-neutral-600 pl-10 outline-none focus:ring-2 focus:ring-red-400 transition" />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-600">🔍</span>
          </div>
        </div>

        {/* Icons */}
        <div className="flex gap-6 items-center">
          <Image src={HeartIcon} alt="Wishlist" width={24} height={24} className="cursor-pointer" />
          <Image src={UserIcon} alt="User" width={24} height={24} className="cursor-pointer" />

          {/* Cart Icon with Badge */}
          <Link href="/cart">
            <div className="relative cursor-pointer">
              <Image src={CartIcon} alt="Cart" width={24} height={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-white text-xs flex items-center justify-center rounded-full px-2 py-1" style={{ background: "var(--primary-color)", minWidth: "24px" }}>
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
