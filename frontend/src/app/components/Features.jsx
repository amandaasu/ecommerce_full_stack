"use client";

import React from "react";
import Image from "next/image";

// Import icons from assets
import HighQualityIcon from "@/assets/quality.svg";
import WarrantyIcon from "@/assets/warranty.svg";
import ShippingIcon from "@/assets/shipping.svg";
import SupportIcon from "@/assets/support.svg";

const features = [
  {
    id: 1,
    icon: HighQualityIcon,
    title: "High Quality",
    description: "Crafted from top materials",
  },
  {
    id: 2,
    icon: WarrantyIcon,
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    id: 3,
    icon: ShippingIcon,
    title: "Free Shipping",
    description: "Order over $150",
  },
  {
    id: 4,
    icon: SupportIcon,
    title: "24/7 Support",
    description: "Dedicated support",
  },
];

export default function Features() {
  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center text-center gap-4">
            <div className="w-10 h-10">
              <Image src={feature.icon} alt={feature.title} width={40} height={40} />
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
