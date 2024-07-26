import express from "express";
import {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { authenticateToken, authorizeRole } from "../middleware/authUser.js";

const router = express.Router();

// Protected routes
router.post("/add", authenticateToken, authorizeRole(["admin"]), addCustomer);
router.get("/", authenticateToken, authorizeRole(["admin"]), getCustomers);
router.get(
  "/:id_pelanggan",
  authenticateToken,
  authorizeRole(["admin"]),
  getCustomerById
);
router.patch(
  "/:id_pelanggan",
  authenticateToken,
  authorizeRole(["admin"]),
  updateCustomer
);
router.delete(
  "/:id_pelanggan",
  authenticateToken,
  authorizeRole(["admin"]),
  deleteCustomer
);

export default router;
