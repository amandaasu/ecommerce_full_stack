require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Item = require("./models/Item");

const dataPath = path.join(__dirname, "data.json");
const rawData = fs.readFileSync(dataPath);
const items = JSON.parse(rawData);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    return Item.deleteMany({});
  })
  .then(() => {
    console.log("Existing data cleared");

    const formattedData = items
      .filter((item) => item["Variant SKU"] && item["Title"] && item["Image Src"])
      .map((item) => {
        const price = parseFloat(item["Variant Price"]);
        return {
          handle: item["Handle"] || "N/A",
          title: item["Title"] || "Untitled",
          body: item["Body"] || "",
          vendor: item["Vendor"] || "Unknown",
          type: item["Type"] || "Unknown",
          tags: item["Tags"] || "",
          option1Name: item["Option1 Name"] || "",
          option1Value: item["Option1 Value"] || "",
          option2Name: item["Option2 Name"] || "",
          option2Value: item["Option2 Value"] || "",
          option3Name: item["Option3 Name"] || "",
          option3Value: item["Option3 Value"] || "",
          variantSKU: item["Variant SKU"],
          variantGrams: item["Variant Grams"] ? parseInt(item["Variant Grams"]) : 0,
          variantInventoryTracker: item["Variant Inventory Tracker"] || "",
          variantInventoryQty: item["Variant Inventory Qty"] ? parseInt(item["Variant Inventory Qty"]) : 0,
          variantInventoryPolicy: item["Variant Inventory Policy"] || "deny",
          variantFulfillmentService: item["Variant Fulfillment Service"] || "manual",
          variantPrice: !isNaN(price) ? price : 0.0,
          variantCompareAtPrice: item["Variant Compare At Price"] || "",
          imageSrc: item["Image Src"],
        };
      });

    return Item.insertMany(formattedData);
  })
  .then(() => {
    console.log("Data seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Error seeding data:", err.message);
    process.exit(1);
  });
