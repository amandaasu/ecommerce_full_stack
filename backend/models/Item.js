// backend/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  handle: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  vendor: {
    type: String,
  },
  type: {
    type: String,
  },
  tags: {
    type: String,
  },
  option1Name: {
    type: String,
  },
  option1Value: {
    type: String,
  },
  option2Name: {
    type: String,
  },
  option2Value: {
    type: String,
  },
  option3Name: {
    type: String,
  },
  option3Value: {
    type: String,
  },
  variantSKU: {
    type: String,
    required: true,
    unique: true,
  },
  variantGrams: {
    type: Number,
  },
  variantInventoryTracker: {
    type: String,
  },
  variantInventoryQty: {
    type: Number,
  },
  variantInventoryPolicy: {
    type: String,
  },
  variantFulfillmentService: {
    type: String,
  },
  variantPrice: {
    type: Number,
    required: true,
  },
  variantCompareAtPrice: {
    type: String,
  },
  imageSrc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
