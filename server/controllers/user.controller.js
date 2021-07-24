const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const newToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

router.get("/", async (req, res) => {
  const users = await User.find().lean().exec();
  res.status(200).json({ data: users });
});

router.post("/signup", async (req, res) => {
  //check if user exists already with email
  let userCheck = await User.findOne({ email: req.body.email });

  //if exists send 400 error
  if (userCheck) {
    res
      .status(400)
      .json({ status: "failed", message: "Account with email already exists" });
    return;
  }

  //if not create new user
  let user = await User.create(req.body);

  //generate token for the user
  const token = newToken(user);

  //send user, token as res
  res.status(201).json({ status: "success", user, token });
});

//signin
router.post("/signin", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).send({
      status: "error",
      message: "Account with the provided email does not exists",
    });
    return;
  }

  const match = await user.checkPassword(req.body.password);

  if (!match) {
    return res.status(400).send({
      status: "error",
      message: "Wrong Password",
    });
  }

  const token = newToken(user);

  res.status(201).json({ status: "success", user, token });
});

module.exports = router;
