
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service.js";

function prepareProductData(req, isUpdate = false) {
  const data = { ...req.body };

  // Uploaded image path
  if (req.file) {
    data.image = `/uploads/products/${req.file.filename}`;
  } else {
    // Image file upload cheyyathappol existing image overwrite cheyyaruthu
    delete data.image;
  }

  // Frontend helper field database-il save cheyyaruthu
  delete data.existingImage;

  // Calculate selling price from original price and discount
  const originalPrice = Number(data.originalPrice);
  const discount = Number(data.discountPercentage ?? 0);

  if (
    data.originalPrice !== undefined &&
    Number.isFinite(originalPrice) &&
    Number.isFinite(discount) &&
    originalPrice >= 0 &&
    discount >= 0 &&
    discount <= 100
  ) {
    data.price = Number(
      (originalPrice * (1 - discount / 100)).toFixed(2)
    );
  }

  return data;
}

// CREATE PRODUCT
export const create = async (req, res) => {
  try {
    const data = prepareProductData(req);
    const product = await createProduct(data);

    return res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to create product",
    });
  }
};

// GET ALL PRODUCTS
export const getAll = async (req, res) => {
  try {
    const products = await getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch products",
    });
  }
};

// GET SINGLE PRODUCT
export const getOne = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to fetch product",
    });
  }
};

// UPDATE PRODUCT
export const update = async (req, res) => {
  try {
    const data = prepareProductData(req, true);
    const product = await updateProduct(req.params.id, data);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to update product",
    });
  }
};

// DELETE PRODUCT
export const remove = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to delete product",
    });
  }
};
