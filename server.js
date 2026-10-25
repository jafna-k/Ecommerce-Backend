
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import dbConnect from "./db.js";

import userRouter from "./src/user/user.routes.js";
import cartRouter from "./src/cart/cart.routes.js";
import categoryRouter from "./src/category/category.routes.js";
import customerRouter from "./src/customer/customer.routes.js";
import orderRouter from "./src/order/order.routes.js";
import paymentRouter from "./src/payment/payment.routes.js";
import productRouter from "./src/product/product.routes.js";
import productVariantRouter from "./src/productvariant/productvariant.routes.js";
import addressRouter from "./src/address/address.routes.js";
import adminRouter from "./src/admin/admin.routes.js";
import wishlistRouter from "./src/wishlist/wishlist.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// API routes
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);
app.use("/customer", customerRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/product", productRouter);
app.use("/productvariant", productVariantRouter);
app.use("/address", addressRouter);
app.use("/admin", adminRouter);

console.log("Wishlist router:", typeof wishlistRouter);
app.use("/wishlist",wishlistRouter);

// Backend test route
app.get("/", (req, res) => {
  res.send("Ecommerce backend is running");
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

// Connect database before starting server
const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
