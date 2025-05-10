import axios from "axios";

const API_BASE_URL = process.env.NEXT_API_BASE_URL + "/" + process.env.NEXT_ENV;
const API_BASE_URL_CART = API_BASE_URL + "/cart";

// Fetch all cart items
export const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_CART}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

// Add item to cart
export const addToCartAPI = async (product, quantity) => {
  try {
    const response = await axios.post(`${API_BASE_URL_CART}`, {
      item: {
        imageSrc: product.imageSrc,
        title: product.title,
        variantSKU: product.variantSKU,
        variantPrice: product.variantPrice,
        quantity: quantity,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItemAPI = async (productId, quantity) => {
  try {
    const response = await axios.patch(`${API_BASE_URL_CART}/${productId}`, {
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCartAPI = async (productId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL_CART}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// Get Cart Total
export const getCartTotal = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_CART}/total`);
    return response.data;
  } catch (error) {
    console.error("Error getting cart total:", error);
    throw error;
  }
};
export const clearCartAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/checkout`);
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
