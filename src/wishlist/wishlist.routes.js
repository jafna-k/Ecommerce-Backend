
import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "./wishlist.controller.js";

// IMPORTANT: Change this import to the location of your existing
// verifyToken middleware. Reuse the same middleware used by /cart.
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getWishlist);
router.post("/:productId", verifyToken, addToWishlist);
router.delete("/:productId", verifyToken, removeFromWishlist);

export default router;
