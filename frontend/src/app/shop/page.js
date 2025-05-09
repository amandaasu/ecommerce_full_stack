"use client";

import Image from "next/image";
import React, { createContext, useState, useContext, useRef } from "react";
import { CardContainer } from "../components/Items";

const products = [
  {
    _id: "681baf03d98d640b00e029b4",
    handle: "zebra-print-bikini",
    title: "Zebra Print Bikini",
    body: "I hear that zebra print swimwear is rather 'in' at the moment, and has been seen on everyone from Cheryl Cole to...actually, she's the only one who I had heard of (What on earth is a Kim Kardashian?? Answers in a postcard please).\n\nClassic black and white zebra print bikini. Just make sure you wear suntan lotion ot you'll be black and white and red all over!! Hahahaha... (I'll get my coat)\n\nOne Size fits all.",
    vendor: "Docblack",
    type: "Bikinis",
    tags: "bikini, black, white, zebra",
    option1Name: "Title",
    option1Value: "Size Free",
    option2Name: "",
    option2Value: "",
    option3Name: "",
    option3Value: "",
    variantSKU: "DB341-ZEB-0",
    variantGrams: 0,
    variantInventoryTracker: "shopify",
    variantInventoryQty: 100,
    variantInventoryPolicy: "deny",
    variantFulfillmentService: "manual",
    variantPrice: 14.99,
    variantCompareAtPrice: "",
    imageSrc: "http://cdn.shopify.com/s/files/1/0028/4062/products/600_DB341_Zebra_Print_Bikini2.jpg?1257429506",
    __v: 0,
  },
  {
    _id: "681baf04d98d640b00e02a1a",
    handle: "pink-zebra-print-bikini",
    title: "Pink Zebra Print Bikini",
    body: "This a shade of pink is just on the right side of acid (...pink, I mean, not the drug. That's just a silly thing to do) Your mates will definately not lose you if you rock up to the beach in this bad boy. And if you happen to actually BE a boy, it becomes doubly true, although I guess in that situation the colour of the bikini becomes some what of a moot point. Either way, this is very cool beach type wear!\n\nOne Size fits all.",
    vendor: "Docblack",
    type: "Bikinis",
    tags: "bikini, pink, tribal, zebra",
    option1Name: "Title",
    option1Value: "Size Free",
    option2Name: "",
    option2Value: "",
    option3Name: "",
    option3Value: "",
    variantSKU: "DB339-PNK-0",
    variantGrams: 0,
    variantInventoryTracker: "shopify",
    variantInventoryQty: 100,
    variantInventoryPolicy: "deny",
    variantFulfillmentService: "manual",
    variantPrice: 14.99,
    variantCompareAtPrice: "",
    imageSrc: "http://cdn.shopify.com/s/files/1/0028/4062/products/600_DB339_Pink_Zebra_Bikini2.jpg?1257429506",
    __v: 0,
  },
  {
    _id: "681baf04d98d640b00e02a22",
    handle: "purple-zebra-print-bikini",
    title: "Purple Zebra Print Bikini",
    body: "If zebras were this colour in the wild...well, the giraffes would be pretty jealous thats for sure! Bright and vibrant bikini, which will set off a tan perfectly.\n\nOne Size fits all.",
    vendor: "Docblack",
    type: "Bikinis",
    tags: "bikini, purple, tribal, zebra",
    option1Name: "Title",
    option1Value: "Default",
    option2Name: "",
    option2Value: "",
    option3Name: "",
    option3Value: "",
    variantSKU: "DB340-PRL-0",
    variantGrams: 0,
    variantInventoryTracker: "shopify",
    variantInventoryQty: 99,
    variantInventoryPolicy: "deny",
    variantFulfillmentService: "manual",
    variantPrice: 14.99,
    variantCompareAtPrice: "",
    imageSrc: "http://cdn.shopify.com/s/files/1/0028/4062/products/600_db340_purple_zebra_bikini2.jpg?1257429506",
    __v: 0,
  },
];

const categories = ["All", "Women's Fashion", "Accessories", "T-Shirts"];

export default function NewArrivals() {
  return (
    <div className="px-28 py-16">
      <h2 className="text-3xl font-bold  mb-8">All Products</h2>
      <CardContainer items={products} />
    </div>
  );
}
