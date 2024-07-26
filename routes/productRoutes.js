import express from "express";
import {
  getProducts,
  searchProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticateToken, authorizeRole } from "../middleware/authUser.js";

const router = express.Router();

// Protected routes
router.get(
  "/",
  authenticateToken,
  authorizeRole(["staff", "admin"]),
  getProducts
);
router.get(
  "/search",
  authenticateToken,
  authorizeRole(["staff", "admin"]),
  searchProduct
);
router.get(
  "/:id_produk",
  authenticateToken,
  authorizeRole(["staff", "admin"]),
  getProductById
);
router.post("/add", authenticateToken, authorizeRole(["admin"]), addProduct);
router.patch(
  "/:id_produk",
  authenticateToken,
  authorizeRole(["admin"]),
  updateProduct
);
router.delete(
  "/:id_produk",
  authenticateToken,
  authorizeRole(["admin"]),
  deleteProduct
);

export default router;
