import axios from "axios";

const API_BASE_URL = process.env.NEXT_API_BASE_URL;

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchByCategory = async (page = 1, category) => {
  try {
    const url = category === "All" ? `${API_BASE_URL}/items?page=${page}` : `${API_BASE_URL}/items?page=${page}&type=${category}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
// Fetch all products
export const fetchDeals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/deals`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
