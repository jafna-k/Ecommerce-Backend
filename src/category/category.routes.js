
import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
  toggleStatus,
} from "./category.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const categoryRouter = express.Router();

// Public routes
categoryRouter.get("/", getAll);
categoryRouter.get("/:id", getOne);

// Protected routes with image upload support
categoryRouter.post(
  "/",
  verifyToken,
  upload.single("image"),
  create
);

categoryRouter.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  update
);

categoryRouter.patch(
  "/:id/status",
  verifyToken,
  toggleStatus
);

categoryRouter.delete(
  "/:id",
  verifyToken,
  remove
);

export default categoryRouter;
