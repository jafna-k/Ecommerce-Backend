
import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./product.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";

const productRouter = express.Router();

// Create product with image upload (Admin only)
productRouter.post(
  "/",
  verifyToken,
  adminOnly,
  upload.single("image"),
  create
);

// Get all products (Public)
productRouter.get("/", getAll);

// Get single product (Public)
productRouter.get("/:id", getOne);

// Update product with optional new image (Admin only)
productRouter.put(
  "/:id",
  verifyToken,
  adminOnly,
  upload.single("image"),
  update
);

// Delete product (Admin only)
productRouter.delete(
  "/:id",
  verifyToken,
  adminOnly,
  remove
);

export default productRouter;
