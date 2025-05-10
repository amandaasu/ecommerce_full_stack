const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const { buildQuery } = require("./queryHandler");

let cart = [];

// EndPoints Examole:
// /fetchItems
// /fetchItems?page=2
// /fetchItems?page=1&type=Accessories
// /fetchItems?page=2&type=Bikinis
// /fetchItems?page=1&search=Zebra&type=Bikinis
// /fetchItems?page=1&search=Zebra
// /fetchItems?page=2&type=Tops&search=Pink
// /fetchItems?type=Hoodies
// router.get("/fetchItems", async (req, res) => {
//   try {
//     const { page, type, search } = req.query;
//     const limit = 25;
//     const query = {};

//     if (type) query.type = type;
//     if (search) {
//       query.$or = [{ variantSKU: { $regex: search, $options: "i" } }, { title: { $regex: search, $options: "i" } }];
//     }

//     const aggregationPipeline = [
//       { $match: query },
//       {
//         $addFields: {
//           hasImage: { $cond: [{ $ne: ["$imageSrc", ""] }, 1, 0] },
//           hasTitle: { $cond: [{ $ne: ["$title", ""] }, 1, 0] },
//           hasSKU: { $cond: [{ $ne: ["$variantSKU", "TEMP"] }, 1, 0] },
//         },
//       },
//       {
//         $sort: {
//           hasImage: -1,
//           hasTitle: -1,
//           hasSKU: -1,
//         },
//       },
//     ];

//     // If `page` is not provided, return all items without pagination
//     if (!page) {
//       const items = await Item.aggregate(aggregationPipeline);
//       return res.json({
//         items,
//         currentPage: 1,
//         totalPages: 1,
//         totalItems: items.length,
//       });
//     }

//     // Paginated response if `page` is present
//     const pageNumber = parseInt(page, 10);
//     if (isNaN(pageNumber) || pageNumber < 1) {
//       return res.status(400).json({ message: "Invalid page number" });
//     }

//     const skip = (pageNumber - 1) * limit;

//     const paginatedItems = await Item.aggregate([...aggregationPipeline, { $skip: skip }, { $limit: limit }]);

//     const totalItems = await Item.countDocuments(query);
//     const totalPages = Math.ceil(totalItems / limit);

//     return res.json({
//       items: paginatedItems,
//       currentPage: pageNumber,
//       totalPages,
//       totalItems,
//     });
//   } catch (err) {
//     console.error("Error fetching items:", err.message);
//     res.status(500).json({ message: "Error fetching items." });
//   }
// });
router.get("/fetchItems", async (req, res) => {
  try {
    const { page, type, search, sku, price } = req.query;
    const limit = 25;
    const query = buildQuery({ type, search, sku, price });

    const aggregationPipeline = [
      { $match: query },
      {
        $addFields: {
          hasImage: { $cond: [{ $ne: ["$imageSrc", ""] }, 1, 0] },
          hasTitle: { $cond: [{ $ne: ["$title", ""] }, 1, 0] },
          hasSKU: { $cond: [{ $ne: ["$variantSKU", "TEMP"] }, 1, 0] },
        },
      },
      {
        $sort: {
          hasImage: -1,
          hasTitle: -1,
          hasSKU: -1,
        },
      },
    ];

    if (!page) {
      const items = await Item.aggregate(aggregationPipeline);
      return res.json({
        currentPage: 1,
        totalPages: 1,
        totalItems: items.length,
        items,
      });
    }

    const pageNumber = parseInt(page, 10) || 1;
    const skip = (pageNumber - 1) * limit;

    const paginatedItems = await Item.aggregate([...aggregationPipeline, { $skip: skip }, { $limit: limit }]);

    const totalItems = await Item.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      currentPage: pageNumber,
      totalPages,
      totalItems,
      items: paginatedItems,
    });
  } catch (err) {
    console.error("Error in /fetchItems:", err.message);
    res.status(500).json({ message: "Error fetching items." });
  }
});

router.get("/deals", async (req, res) => {
  try {
    const deals = await Item.find({ type: "Accessories" }).limit(6);
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching deals." });
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
    const totalAmount = cart.reduce((sum, cartItem) => sum + cartItem.totalPrice, 0);

    res.json({ message: "Item added to cart.", cart, totalItems, totalAmount });
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
  const totalAmount = cart.reduce((sum, cartItem) => sum + cartItem.totalPrice, 0);

  res.json({ message: "Item removed from cart.", cart, totalItems, totalAmount });
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
    const totalAmount = cart.reduce((sum, cartItem) => sum + cartItem.totalPrice, 0);

    res.json({ message: "Cart updated.", cart, totalItems, totalAmount });
  } else {
    res.status(404).json({ message: "Item not found in cart." });
  }
});
router.get("/checkout", (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared successfully.", cart, totalItems: 0, totalAmount: 0 });
});
module.exports = router;
