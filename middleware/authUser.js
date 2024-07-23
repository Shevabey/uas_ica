import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// JWT Token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ msg: "Mohon masukkan token jwt login anda!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token tidak valid" });
    req.user = user;
    next();
  });
};

// Protect login user
export const verifyUser = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Mohon login ke akun anda!" });
  }
  const user = await User.findOne({
    where: {
      uuid: req.user.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

// Access admin only
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Akses terlarang, admin only! " });
  }
  next();
};

// Access company only
export const companyOnly = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ msg: "Token is not valid" });
      req.user = user; // Mengatur user yang telah di-decode dari token
      if (req.user.role !== "company") {
        return res.status(403).json({ msg: "Unauthorized" });
      }
      next(); // Lanjut ke middleware atau controller berikutnya
    });
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

// Access applicant only
export const applicantOnly = (req, res, next) => {
  if (req.user.role !== "applicant" && req.user.role !== "admin") {
    return res.status(403).json({ msg: "Akses terlarang, applicant only! " });
  }
  next();
};
