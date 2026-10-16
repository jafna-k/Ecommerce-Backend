
import Order from "./order.model.js";

import {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
} from "./order.service.js";

// CREATE ORDER (CUSTOMER)
export const create = async (req, res) => {
  try {
    const order = await createOrder(req.user.id, req.body);

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET LOGGED-IN CUSTOMER ORDERS
export const getAll = async (req, res) => {
  try {
    const orders = await getOrders(req.user.id);

    res.status(200).json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE CUSTOMER ORDER
export const getOne = async (req, res) => {
  try {
    const order = await getOrderById(
      req.user.id,
      req.params.id
    );

    res.status(200).json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// CANCEL CUSTOMER ORDER
export const cancel = async (req, res) => {
  try {
    const order = await cancelOrder(
      req.user.id,
      req.params.id
    );

    res.status(200).json(order);
  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled order cannot be updated",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE ORDER DETAILS (ADMIN)
export const getAdminOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate({
        path: "items.productVariant",
        select: "size color price sku image product",
        populate: {
          path: "product",
          select: "name image description",
        },
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("ADMIN ORDER DETAILS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
