"use client";

import Image from "next/image";
import React from "react";
import NewsletterImage1 from "@/assets/NewsletterImage1.png";
import NewsletterImage2 from "@/assets/NewsletterImage2.png";

const NewsletterSection = () => {
  return (
    <div className="px-8 py-16 bg-gray-50 flex flex-col lg:flex-row items-center justify-center lg:justify-between">
      <div className="hidden lg:block lg:w-1/4">
        <Image src={NewsletterImage1} alt="Model 1" width={300} height={400} className="object-cover" />
      </div>

      <div className="lg:w-2/4 w-full  lg:text-left">
        <h2 className="text-4xl font-bold mb-4 text-center" style={{ color: "var(--secondary-color)" }}>
          Subscribe To Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6 text-center">Stay updated with the latest arrivals, exclusive offers, and more. Join our community now!</p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <input type="email" placeholder="Enter your email" className="px-4 py-2 border border-gray-300 rounded-md w-full lg:w-2/3 focus:outline-none focus:border-primary" />
          <button className="bg-secondary-color text-white py-2 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition" style={{ backgroundColor: "var(--secondary-color)" }}>
            Subscribe
          </button>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/4">
        <Image src={NewsletterImage2} alt="Model 2" width={300} height={400} className="object-cover" />
      </div>
    </div>
  );
};

export default NewsletterSection;
