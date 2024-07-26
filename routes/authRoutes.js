import express from "express";
import {
  loginUser,
  registerUser,
  logout,
} from "../controllers/authController.js";
import { authenticateToken, authorizeRole } from "../middleware/authUser.js";

const router = express.Router();

router.post(
  "/register",
  authenticateToken,
  authorizeRole(["admin"]),
  registerUser
);
router.post("/login", loginUser);
router.delete("/logout", logout);

export default router;
