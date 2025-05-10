"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { fetchDeals } from "../services/productService";
import { ProductImage } from "./Products";

function Carousel() {
  const carouselRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);
  const [deals, setDeals] = useState([]);
  useEffect(() => {
    const getDeals = async () => {
      try {
        setLoading(true);
        const data = await fetchDeals();
        setDeals(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDeals();
  }, [setDeals, setLoading, setError]);
  const handleScroll = (direction) => {
    const width = carouselRef.current.clientWidth;
    if (direction === "left") {
      carouselRef.current.scrollBy({ left: -width, behavior: "smooth" });
      setCurrentIndex(Math.max(currentIndex - 1, 0));
    } else {
      carouselRef.current.scrollBy({ left: width, behavior: "smooth" });
      setCurrentIndex(Math.min(currentIndex + 1, deals.length - 1));
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
      <div ref={carouselRef} className="flex gap-4 overflow-x-scroll scroll-smooth p-4" style={{ scrollbarWidth: "none" }}>
        {deals.map((item, index) => (
          <motion.div key={index} className="min-w-[300px] md:min-w-[384px] rounded-lg overflow-hidden bg-gray-100 shadow-lg cursor-pointer" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <div className="bg-white flex justify-center items-center relative h-64 md:h-80">
              <ProductImage src={item.imageSrc} alt={item.title} />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-between  p-4">
        <button onClick={() => handleScroll("left")} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <IconArrowNarrowLeft size={24} />
        </button>
        <button onClick={() => handleScroll("right")} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <IconArrowNarrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
const DealsOfTheMonth = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-05-31T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row gap-8 px-8 py-16">
      {/* Left Section - 40% */}
      <div className="w-2/5 flex flex-col justify-center space-y-4">
        <h2 className="text-4xl font-semibold text-gray-800">Deals Of The Month</h2>
        <p className="text-gray-600">Unmissable Deals on Trendy Accessories and Apparel! Grab Your Favorites Before They’re Gone!</p>
        <Link href="/shop">
          <button className="px-6 py-2 rounded-full bg-[var(--primary-color)] text-white">Buy Now</button>
        </Link>
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Hurry, Before It’s Too Late!</h3>
          <div className="flex gap-4">
            <div className="bg-white shadow-lg p-4 rounded-md text-center font-mono">
              <span className="block text-2xl font-bold">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="text-sm">Days</span>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-md text-center font-mono">
              <span className="block text-2xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-sm">Hr</span>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-md text-center font-mono">
              <span className="block text-2xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-sm">Mins</span>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-md text-center font-mono">
              <span className="block text-2xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="text-sm">Sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section - 60% */}
      <div className="w-3/5">
        <div className="overflow-hidden rounded-lg  relative">
          <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DealsOfTheMonth;
