const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//Register
router.post("/", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Field email is required!" });
  }

  const emailCount = await User.countDocuments({ email: req.body.email });
  if (emailCount > 0) {
    return res
      .status(400)
      .json({ message: "User with this email already exists!" });
  }

  if (!req.body.username) {
    return res.status(400).json({ message: "Field username is required!" });
  }

  const userNameCount = await User.countDocuments({
    username: req.body.username,
  });
  if (userNameCount > 0) {
    return res
      .status(400)
      .json({ message: "User with this username already exists!" });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: "Field password is required!" });
  }

  let salt, hashedPassword;
  try {
    salt = await bcrypt.genSalt();
    hashedPassword = await bcrypt.hash(req.body.password, salt);
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    joinDate: Date.now(),
    lastJoinDate: Date.now(),
    role: "User",
  });

  let savedUser;
  try {
    savedUser = await user.save();
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  let token;
  try {
    token = jwt.sign({ userId: savedUser.id, email: savedUser.email, username: savedUser.username, role: savedUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ message: "User created successfully", token: token });
});

//Login
router.post("/login", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Field email is required!" });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: "Field password is required!" });
  }

  const user = await User.find({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User with this e-mail doesn't exist!" });
  }

  try {
    if(!await bcrypt.compare(req.body.password, user.password)) {
      return res.status(400).json({ message: "Wrong password" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  let token;
  try {
    token = jwt.sign({ userId: savedUser.id, email: savedUser.email, username: savedUser.username, role: savedUser.role }, process.env.ACESS_TOKEN_SECRET, { expiresIn: "1h" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(user.id, {
      lastJoinDate: Date.now()
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ message: "Logged in successfully", token: token });
  //jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
});

module.exports = router;
