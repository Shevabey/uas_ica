import express from "express";
import {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import authenticateToken from "../middleware/authUser.js";

const router = express.Router();

// Protected routes
router.post("/add", authenticateToken, addCustomer);
router.get("/", authenticateToken, getCustomers);
router.get("/:id_pelanggan", authenticateToken, getCustomerById);
router.patch("/:id_pelanggan", authenticateToken, updateCustomer);
router.delete("/:id_pelanggan", authenticateToken, deleteCustomer);

export default router;
