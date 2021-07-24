const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);

      return resolve(payload);
    });
  });
};

const protect = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(400).json({
      status: "error",
      message: "Bad request",
    });
  }

  if (!bearerToken.startsWith("Bearer ")) {
    return res.status(400).json({
      status: "error",
      message: "Bad request",
    });
  }

  try {
    let payload;

    const token = bearerToken.split(" ")[1].trim();
    payload = await verifyToken(token);
    const user = await User.findById(payload.id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Bad request with bad token",
    });
  }
};

module.exports = protect;
