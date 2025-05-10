import axios from "axios";

const API_BASE_URL = process.env.NEXT_API_BASE_URL + "/" + process.env.NEXT_ENV;

// Fetch all products with search
// /fetchItems
// /fetchItems?page=2
// /fetchItems?page=1&type=Accessories
// /fetchItems?page=2&type=Bikinis
// /fetchItems?page=1&search=Zebra&type=Bikinis
// /fetchItems?page=1&search=Zebra
// /fetchItems?page=2&type=Tops&search=Pink
// /fetchItems?type=Hoodies
export const fetchAllProducts = async (filters) => {
  try {
    const { page, type, search, price } = filters;
    let url = `${API_BASE_URL}/fetchItems`;

    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (type) params.append("type", type);
    if (search) params.append("search", search);
    if (price) params.append("price", price);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

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
