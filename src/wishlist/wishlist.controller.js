
import mongoose from "mongoose";
import Wishlist from "./wishlist.model.js";

const getCustomerId = (req) => req.user?.id || req.user?._id;

// GET /wishlist
export const getWishlist = async (req, res) => {
  try {
    const customerId = getCustomerId(req);

    if (!customerId) {
      return res.status(401).json({ message: "Please login to continue." });
    }

    const wishlist = await Wishlist.findOne({
      customer: customerId,
    }).populate("products");

    return res.status(200).json({
      products: wishlist?.products || [],
    });
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);
    return res.status(500).json({ message: "Unable to load wishlist." });
  }
};

// POST /wishlist/:productId
export const addToWishlist = async (req, res) => {
  try {
    const customerId = getCustomerId(req);
    const { productId } = req.params;

    if (!customerId) {
      return res.status(401).json({ message: "Please login to continue." });
    }

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid product." });
    }

    const Product = mongoose.model("Product");
    const productExists = await Product.exists({ _id: productId });

    if (!productExists) {
      return res.status(404).json({ message: "Product not found." });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { customer: customerId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate("products");

    return res.status(200).json({
      message: "Product added to wishlist.",
      products: wishlist.products,
    });
  } catch (error) {
    console.error("ADD WISHLIST ERROR:", error);
    return res.status(500).json({ message: "Unable to update wishlist." });
  }
};

// DELETE /wishlist/:productId
export const removeFromWishlist = async (req, res) => {
  try {
    const customerId = getCustomerId(req);
    const { productId } = req.params;

    if (!customerId) {
      return res.status(401).json({ message: "Please login to continue." });
    }

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid product." });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { customer: customerId },
      { $pull: { products: productId } },
      { new: true }
    ).populate("products");

    return res.status(200).json({
      message: "Product removed from wishlist.",
      products: wishlist?.products || [],
    });
  } catch (error) {
    console.error("REMOVE WISHLIST ERROR:", error);
    return res.status(500).json({ message: "Unable to remove product." });
  }
};
