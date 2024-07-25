import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import authenticateToken from "../middleware/authUser.js";

const router = express.Router();

router.post("/add", authenticateToken, createTransaction);
router.get("/", authenticateToken, getTransactions);
router.get("/:id_transaksi", authenticateToken, getTransactionById);
router.patch("/:id_transaksi", authenticateToken, updateTransaction);
router.delete("/:id_transaksi", authenticateToken, deleteTransaction);

export default router;
