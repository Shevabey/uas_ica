import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { authenticateToken, authorizeRole } from "../middleware/authUser.js";

const router = express.Router();

router.post(
  "/add",
  authenticateToken,
  authorizeRole(["admin"]),
  createTransaction
);
router.get("/", authenticateToken, authorizeRole(["admin"]), getTransactions);
router.get(
  "/:id_transaksi",
  authenticateToken,
  authorizeRole(["admin"]),
  getTransactionById
);
router.patch(
  "/:id_transaksi",
  authenticateToken,
  authorizeRole(["admin"]),
  updateTransaction
);
router.delete(
  "/:id_transaksi",
  authenticateToken,
  authorizeRole(["admin"]),
  deleteTransaction
);

export default router;
