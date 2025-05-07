// backend/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  imageSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  variantSKU: {
    type: String,
    required: true,
    unique: true,
  },
  variantPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
