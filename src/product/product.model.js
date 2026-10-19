

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // Original price before discount
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Discount percentage: 0 to 100
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Final selling price after discount
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Uploaded image path
    image: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;