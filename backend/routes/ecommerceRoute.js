const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

let cart = [];
//localhost:3000/dev/items?page=1&type=Accessories
router.get("/items", async (req, res) => {
  try {
    const { page, type } = req.query;
    const limit = 25;

    const query = type ? { type } : {};

    if (!page) {
      // Return all items if no page is specified
      const items = await Item.find(query);
      return res.json(items);
    }

    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ message: "Invalid page number" });
    }

    const skip = (pageNumber - 1) * limit;
    const paginatedItems = await Item.find(query).skip(skip).limit(limit);
    const totalItems = await Item.countDocuments(query);

    res.json({
      items: paginatedItems,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching items." });
  }
});
// GET /dev/deals - Fetch first 6 accessories as deals
router.get("/deals", async (req, res) => {
  try {
    const deals = await Item.find({ type: "Accessories" }).limit(6);
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching deals." });
  }
});
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const items = await Item.find({
      $or: [{ variantSKU: { $regex: query, $options: "i" } }, { title: { $regex: query, $options: "i" } }],
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error searching items." });
  }
});

// POST /api/cart - Add item to cart
router.post("/cart", (req, res) => {
  const { item } = req.body;

  if (item && item.variantSKU) {
    const existingItem = cart.find((cartItem) => cartItem.variantSKU === item.variantSKU);

    if (existingItem) {
      existingItem.quantity += item?.quantity || 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.variantPrice;
    } else {
      cart.push({ ...item, quantity: item?.quantity || 1, totalPrice: item.variantPrice });
    }

    const totalItems = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

    res.json({ message: "Item added to cart.", cart, totalItems });
  } else {
    res.status(400).json({ message: "Invalid item data. 'variantSKU' is required." });
  }
});

// GET /api/cart - Get cart items
router.get("/cart", (req, res) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  res.json({ cart, totalAmount, totalItems });
});

// DELETE /api/cart/:sku - Remove item from cart
router.delete("/cart/:sku", (req, res) => {
  const { sku } = req.params;
  cart = cart.filter((item) => item.variantSKU !== sku);

  const totalItems = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  res.json({ message: "Item removed from cart.", cart, totalItems });
});

// PATCH /api/cart/:sku - Update quantity of an item in the cart
router.patch("/cart/:sku", (req, res) => {
  const { sku } = req.params;
  const { quantity } = req.body;

  const item = cart.find((cartItem) => cartItem.variantSKU === sku);

  if (item) {
    item.quantity = quantity;
    item.totalPrice = item.quantity * item.variantPrice;

    const totalItems = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

    res.json({ message: "Cart updated.", cart, totalItems });
  } else {
    res.status(404).json({ message: "Item not found in cart." });
  }
});
module.exports = router;
