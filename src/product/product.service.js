
import Product from "./product.model.js";

// Calculate selling price from original price and discount
const calculateSellingPrice = (originalPrice, discountPercentage = 0) => {
  const original = Number(originalPrice);
  const discount = Number(discountPercentage);

  if (!Number.isFinite(original) || original < 0) {
    throw new Error("Valid original price is required");
  }

  if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
    throw new Error("Discount must be between 0 and 100");
  }

  return Math.round(original * (1 - discount / 100) * 100) / 100;
};

// Create product
export const createProduct = async (data) => {
  const originalPrice = Number(data.originalPrice);
  const discountPercentage = Number(data.discountPercentage ?? 0);

  const price = calculateSellingPrice(
    originalPrice,
    discountPercentage
  );

  return await Product.create({
    ...data,
    originalPrice,
    discountPercentage,
    price,
  });
};

// Get all products
export const getProducts = async () => {
  try {
    const products = await Product.find().populate("category");
    return products;
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  return await Product.findById(id).populate("category");
};

// Update product
export const updateProduct = async (id, data) => {
  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    return null;
  }

  const originalPrice =
    data.originalPrice !== undefined
      ? Number(data.originalPrice)
      : existingProduct.originalPrice;

  const discountPercentage =
    data.discountPercentage !== undefined
      ? Number(data.discountPercentage)
      : existingProduct.discountPercentage;

  const price = calculateSellingPrice(
    originalPrice,
    discountPercentage
  );

  // Keep the existing image if no new image is uploaded
  const updatedData = {
    ...data,
    originalPrice,
    discountPercentage,
    price,
  };

  if (!data.image) {
    delete updatedData.image;
  }

  return await Product.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  ).populate("category");
};

// Delete product
export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
