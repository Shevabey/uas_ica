import express from "express";
import { createTransaction } from "../controllers/transactionController.js";
import authenticateToken from "../middleware/authUser.js";

const router = express.Router();

router.post("/", authenticateToken, createTransaction);

export default router;
