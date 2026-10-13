import Product from "./product.model.js";

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const getProducts = async () => {
  try {
    const products = await Product.find().populate("category");

    console.log("PRODUCTS FROM DATABASE:", products);

    return products;
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    throw error;
  }
};


export const getProductById = async (id) => {
  return await Product.findById(id).populate("category");
};

export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};