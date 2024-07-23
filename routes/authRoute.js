import express from "express";
import { Login, logOut, Me, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/authUser.js";

const router = express.Router();

router.get("/me", verifyToken, Me);
router.post("/login", Login);
router.post("/register", register);
router.delete("/logout", verifyToken, logOut);

export default router;
