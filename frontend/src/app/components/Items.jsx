"use client";

import React, { createContext, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
const MouseEnterContext = createContext([false, () => {}]);
import Image from "next/image";
import BrokenImage from "@/assets/broken-image.png";

export function CardContainer({ items }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>{active && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 h-full w-full z-10" />}</AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] bg-black/30 backdrop-blur-sm">
            <motion.div layoutId={`product-${active.title}-${id}`} ref={ref} className="w-full max-w-lg h-full md:h-auto md:max-h-[90%] bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-lg">
              {/* Image Section */}
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative">
                <ProductImage src={active.imageSrc} alt={active.title} hovered={false} className="mt-4 w-full h-64 lg:h-80 object-cover object-top sm:rounded-tr-lg sm:rounded-tl-lg" width={200} height={200} />

                <button onClick={() => setActive(null)} className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 11-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-bold text-2xl text-gray-800 dark:text-gray-100">
                  {active.title}
                </motion.h3>

                <motion.p layoutId={`price-${active.variantPrice}-${id}`} className="text-primary font-semibold text-xl">
                  ${active.variantPrice.toFixed(2)}
                </motion.p>

                {active.variantSKU && (
                  <motion.p layoutId={`option-${active.option1Value}-${id}`} className="text-sm text-gray-500">
                    Variant SKU: {active.variantSKU}
                  </motion.p>
                )}

                <motion.p layoutId={`body-${active.body}-${id}`} className="text-sm text-gray-600 dark:text-gray-300">
                  {active.body}
                </motion.p>

                <button className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg mt-4 hover:bg-opacity-90 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M16 6a1 1 0 00-.117 1.993L16 8h2a1 1 0 010 2h-2l-1.993 8H5.993L4 10H2a1 1 0 110-2h2a1 1 0 01.993.883L5.615 16h8.77l1.622-6H10a1 1 0 010-2h6a1 1 0 011 1z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <div
            key={product._id}
            onMouseEnter={() => setHoveredCard(product._id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setActive(product)}
            className="relative p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-linear transform cursor-pointer"
            style={{
              transform: hoveredCard === product._id ? "rotateY(10deg) rotateX(10deg)" : "rotateY(0deg) rotateX(0deg)",
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="overflow-hidden rounded-lg mb-4 h-[300px] relative z-10">
              <ProductImage src={product.imageSrc} alt={product.title} hovered={hoveredCard === product._id} />
            </div>
            <div className="text-lg font-semibold text-gray-800">{product.title}</div>
            <div className="text-sm text-gray-500">${product?.variantPrice?.toFixed(2) || "10000"}</div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="px-2 py-1">-</button>
                <span className="px-3">{0}</span>
                <button className="px-2 py-1">+</button>
              </div>
              <button className="border border-gray-500 text-gray-500 px-4 py-1 rounded hover:bg-gray-100">Add to Cart</button>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
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
