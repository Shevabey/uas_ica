import User from "../models/user.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Controller untuk registrasi user
export const register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  // Validasi password dan confirmPassword
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  // Hash password menggunakan argon2
  const hashPassword = await argon2.hash(password);
  try {
    // Buat user baru
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    // Generate JWT token
    // const token = jwt.sign(
    //   { id: newUser.uuid, role: newUser.role },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: "1d",
    //   }
    // );

    // res.status(201).json({ msg: "Registrasi berhasil", user: newUser, token });
    res.status(201).json({
      msg: "Registrasi berhasil",
      user: { name: name, email: email, role: role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// CONTROLLER LOGIN UNTUK MASUK KE AKUN YANG SUDAH DI REGISTER
export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });

  // Generate JWT token
  const token = jwt.sign(
    { id: user.uuid, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const { uuid, name, email, role } = user;
  res
    .status(200)
    .json({ msg: "Login berhasil", user: { uuid, name, email, role }, token });
};

// CONTROLLER AKUN SETELAH LOGIN MENGETAHUI DATA AKUN YANG TELAH LOGIN
export const Me = async (req, res) => {
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.user.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

// CONTROLLER LOGOUT AKUN SETELAH LOGIN
export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
