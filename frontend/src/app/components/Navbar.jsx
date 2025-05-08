"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Import icons from assets
import HeartIcon from "@/assets/heart.svg";
import UserIcon from "@/assets/user.svg";
import CartIcon from "@/assets/cart.svg";
import Logo from "@/assets/MNlogo.svg";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image className="appLogo" src={Logo} alt="Logo" width={100} height={50} />
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6 flex justify-end">
          <div className="relative w-3/5 min-w-[200px]">
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full py-2 px-4 rounded-full bg-red-50 text-neutral-600 pl-10 outline-none focus:ring-2 focus:ring-red-400 transition" />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-600">🔍</span>
          </div>
        </div>

        {/* Icons */}
        <div className="flex gap-6 items-center">
          <Image src={HeartIcon} alt="Wishlist" width={24} height={24} className="cursor-pointer" />
          <Image src={UserIcon} alt="User" width={24} height={24} className="cursor-pointer" />
          <Image src={CartIcon} alt="Cart" width={24} height={24} className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
