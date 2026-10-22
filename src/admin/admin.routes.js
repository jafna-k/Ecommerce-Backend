
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
  getReports,
} from "./admin.controller.js";

const router = express.Router();

// Dashboard
router.get(
  "/dashboard",
  verifyToken,
  adminOnly,
  getDashboardStats
);

// Customers
router.get(
  "/customers",
  verifyToken,
  adminOnly,
  getCustomers
);

// Orders
router.get(
  "/orders",
  verifyToken,
  adminOnly,
  getAdminOrders
);

// Single order details
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

// Inventory
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

// Reports
router.get(
  "/reports",
  verifyToken,
  adminOnly,
  getReports
);

export default router;
