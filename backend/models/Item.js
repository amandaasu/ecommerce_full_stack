const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  handle: { type: String, default: "N/A" },
  title: { type: String, default: "Unknown" },
  body: { type: String, default: "" },
  vendor: { type: String, default: "Unknown" },
  type: { type: String, default: "Unknown" },
  tags: [{ type: String }],
  option1Name: { type: String, default: "" },
  option1Value: { type: String, default: "" },
  option2Name: { type: String, default: "" },
  option2Value: { type: String, default: "" },
  option3Name: { type: String, default: "" },
  option3Value: { type: String, default: "" },
  variantSKU: { type: String, default: "Unknown" },
  variantGrams: { type: Number, default: 0 },
  variantInventoryTracker: { type: String, default: "" },
  variantInventoryQty: { type: Number, default: 0 },
  variantInventoryPolicy: { type: String, default: "deny" },
  variantFulfillmentService: { type: String, default: "manual" },
  variantPrice: { type: Number, default: 0.0 },
  variantCompareAtPrice: { type: Number, default: 0.0 },
  imageSrc: { type: String, default: "/public/logo.svg" },
});

// Compound Index for sorting and searching
itemSchema.index({ imageSrc: -1, title: -1, variantSKU: -1 }, { name: "image_title_sku_index" });

module.exports = mongoose.model("Item", itemSchema);
