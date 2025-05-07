require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Item = require("./models/Item");

const dataPath = path.join(__dirname, "data.json");
const rawData = fs.readFileSync(dataPath);
const items = JSON.parse(rawData);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return Item.deleteMany({});
  })
  .then(() => {
    console.log("Existing data cleared");
    const validItems = items.filter((item) => item["Title"] && item["Variant SKU"] && item["Variant Price"] && item["Image Src"]);

    const formattedData = validItems.map((item) => ({
      imageSrc: item["Image Src"],
      title: item["Title"],
      variantSKU: item["Variant SKU"],
      variantPrice: parseFloat(item["Variant Price"]) || 0,
    }));

    return Item.insertMany(formattedData);
  })
  .then(() => {
    console.log("Data seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Error seeding data:", err);
    process.exit(1);
  });
