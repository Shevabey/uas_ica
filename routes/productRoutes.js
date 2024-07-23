import express from "express";
import {
  getProducts,
  searchProduct,
} from "../controllers/productController.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.get("/products", authenticateToken, getProducts);
router.get("/products/search", authenticateToken, searchProduct);

export default router;
