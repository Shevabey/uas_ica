import express from "express";
import { createTransaction } from "../controllers/transactionController.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/transactions", authenticateToken, createTransaction);

export default router;
