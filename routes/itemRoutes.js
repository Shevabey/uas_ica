import express from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken, adminOnly } from "../middleware/authUser.js";

const router = express.Router();

router.get("/users", verifyToken, adminOnly, getUser);
router.get("/users/:id", verifyToken, adminOnly, getUserById);
router.post("/users", verifyToken, adminOnly, createUser);
router.patch("/users/:id", verifyToken, adminOnly, updateUser);
router.delete("/users/:id", verifyToken, adminOnly, deleteUser);

export default router;
