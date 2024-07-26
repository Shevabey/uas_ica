import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403); // Forbidden jika pengguna tidak memiliki peran yang sesuai
    }
    next();
  };
};

export { authenticateToken, authorizeRole };
