import express from "express";
import { getAllItems, searchItems } from "../controllers/itemController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllItems);
router.get("/search", verifyToken, searchItems);

export default router;
