"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
// Import icons from assets
import HeartIcon from "@/assets/heart.svg";
import UserIcon from "@/assets/user.svg";
import CartIcon from "@/assets/cart.svg";
import Logo from "@/assets/MNlogo.svg";
import { fetchCartItems } from "../services/cartService";
import { useCartStore } from "../store/cartStore";
import { useProductsStore } from "../store/productStore";

export default function Navbar() {
  const { cart, totalItems, setCart, setLoading, setError } = useCartStore();
  const { setSearch } = useProductsStore();
  const [searchTerm, setLocalSearchTerm] = useState("");
  const handleSearch = () => {
    setSearch(searchTerm);
    console.log(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
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
        <div className="relative w-3/5 min-w-[200px]">
          <input type="text" placeholder="Search" onKeyDown={handleKeyPress} value={searchTerm} onChange={(e) => setLocalSearchTerm(e.target.value)} className="w-full py-2 px-4 rounded-full bg-red-50 text-neutral-600 pr-10 outline-none focus:ring-2 focus:ring-red-400 transition" />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-neutral-600 hover:text-red-400 transition" onClick={handleSearch}>
            <IconSearch size={20} />
          </span>
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
