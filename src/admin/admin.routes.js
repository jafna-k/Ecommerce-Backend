
import express from "express";

import { getAdminOrderById } from "../order/order.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

import {
  getDashboardStats,
  getCustomers,
  getAdminOrders,
  updateOrderStatus,
  getInventory,
  adjustStock,
} from "./admin.controller.js";

const router = express.Router();

// ==================== DASHBOARD ====================
router.get(
  "/dashboard",
  verifyToken,
  adminOnly,
  getDashboardStats
);

// ==================== CUSTOMERS ====================
router.get(
  "/customers",
  verifyToken,
  adminOnly,
  getCustomers
);

// ==================== ORDERS ====================

// Get all orders
router.get(
  "/orders",
  verifyToken,
  adminOnly,
  getAdminOrders
);

// Get single order details
router.get(
  "/orders/:id",
  verifyToken,
  adminOnly,
  getAdminOrderById
);

// Update order status
router.put(
  "/orders/:id/status",
  verifyToken,
  adminOnly,
  updateOrderStatus
);

// ==================== INVENTORY ====================

// Get inventory
router.get(
  "/inventory",
  verifyToken,
  adminOnly,
  getInventory
);

// Adjust stock
router.patch(
  "/inventory/:id/stock",
  verifyToken,
  adminOnly,
  adjustStock
);

export default router