import express from "express";
import {
  getProducts,
  searchProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authenticateToken from "../middleware/authUser.js";

const router = express.Router();

// Protected routes
router.get("/", authenticateToken, getProducts);
router.get("/search", authenticateToken, searchProduct);
router.get("/:id_produk", authenticateToken, getProductById);
router.post("/add", authenticateToken, addProduct);
router.patch("/:id_produk", authenticateToken, updateProduct);
router.delete("/:id_produk", authenticateToken, deleteProduct);

export default router;
