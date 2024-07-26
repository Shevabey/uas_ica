import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Register user
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Pastikan hanya admin yang bisa mendaftarkan pengguna
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    const accessToken = jwt.sign(
      { id_staf: user.id_staf, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user
export const logout = (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (token) {
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ message: "Token is required" });
  }
};
