require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Item = require("./models/Item");

const dataPath = path.join(__dirname, "data.json");
const logPath = path.join(__dirname, "data_log.txt");
const defaultImagePath = "/public/logo.svg";
const rawData = fs.readFileSync(dataPath);
const items = JSON.parse(rawData);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return Item.deleteMany({});
  })
  .then(() => {
    console.log("Existing data cleared");

    const processedSKUs = new Set();
    const logs = [];
    let seededCount = 0;
    let skippedCount = 0;

    const formattedData = items
      .map((item) => {
        let { "Variant SKU": sku, Title: title, "Image Src": imageSrc } = item;
        const price = parseFloat(item["Variant Price"]) || 0.0;
        let changes = [];

        // Handle missing SKU
        if (!sku) {
          sku = `TEMP-${uuidv4().slice(0, 8)}`;
          changes.push(`Generated SKU: ${sku}`);
        }

        // Handle missing title
        if (!title) {
          title = "";
          changes.push(`Title missing, set as "Unknown" for SKU: ${sku}`);
        }

        // Handle duplicate SKU
        if (processedSKUs.has(sku)) {
          skippedCount++;
          logs.push(`Skipped: Duplicate SKU - ${sku}`);
          return null;
        }

        processedSKUs.add(sku);

        // Log field changes
        if (changes.length > 0) {
          logs.push(`SKU: ${sku} - Changes: ${changes.join(", ")}`);
        }

        seededCount++;

        return {
          handle: item["Handle"] || "N/A",
          title,
          body: item["Body"] || "",
          vendor: item["Vendor"] || "Unknown",
          type: item["Type"] || "Unknown",
          tags: item["Tags"] ? item["Tags"].split(",").map((tag) => tag.trim()) : [],
          option1Name: item["Option1 Name"] || "",
          option1Value: item["Option1 Value"] || "",
          option2Name: item["Option2 Name"] || "",
          option2Value: item["Option2 Value"] || "",
          option3Name: item["Option3 Name"] || "",
          option3Value: item["Option3 Value"] || "",
          variantSKU: sku,
          variantGrams: parseInt(item["Variant Grams"] || 0),
          variantInventoryTracker: item["Variant Inventory Tracker"] || "",
          variantInventoryQty: parseInt(item["Variant Inventory Qty"] || 0),
          variantInventoryPolicy: item["Variant Inventory Policy"] || "deny",
          variantFulfillmentService: item["Variant Fulfillment Service"] || "manual",
          variantPrice: price,
          variantCompareAtPrice: parseFloat(item["Variant Compare At Price"] || 0.0),
          imageSrc: imageSrc || "",
        };
      })
      .filter(Boolean);

    // Summary Logs
    logs.push(`\n--- SEEDING SUMMARY ---`);
    logs.push(`Total Items Processed: ${items.length}`);
    logs.push(`Total Items Seeded: ${seededCount}`);
    logs.push(`Total Items Skipped: ${skippedCount}`);
    logs.push(`--- END OF LOG ---`);

    // Write log file
    fs.writeFileSync(logPath, logs.join("\n"), "utf-8");
    console.log("Log file generated.");

    // Insert data
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
