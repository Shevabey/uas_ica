import express from "express";
import {
  loginUser,
  registerUser,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logout);

export default router;
