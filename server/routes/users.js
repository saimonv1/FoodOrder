const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
require("dotenv").config();

const authorization = require("../middleware/authorization");
const utils = require("../utils/auth.util");

router.get("/", authorization.authenticateTokenAdmin, async (req, res) => {
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

  let accessToken, refreshToken;
  try {
    accessToken = utils.generateAccessToken(savedUser);
    refreshToken = utils.generateRefreshToken(savedUser);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  const newRefreshToken = new RefreshToken({
    refreshToken: refreshToken,
  });
  try {
    await newRefreshToken.save();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  return res
    .status(201)
    .json({
      message: "User created successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
});

//Login
router.post("/login", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Field email is required!" });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: "Field password is required!" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User with this e-mail doesn't exist!" });
  }

  try {
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: "Wrong password" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  let accessToken, refreshToken;
  try {
    accessToken = utils.generateAccessToken(user);
    refreshToken = utils.generateRefreshToken(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  const newRefreshToken = new RefreshToken({
    refreshToken: refreshToken,
  });
  try {
    await newRefreshToken.save();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  try {
    await User.findByIdAndUpdate(user.id, {
      lastJoinDate: Date.now(),
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  return res
    .status(201)
    .json({
      message: "Logged in successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
});

router.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401);
  const refreshTokenInDB = await RefreshToken.findOne({
    refreshToken: refreshToken,
  });
  if (!refreshTokenInDB) return res.status(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    const accessToken = utils.generateAccessToken(user);
    return res.status(201).json({ accessToken: accessToken });
  });
});

router.delete("/logout", async (req, res) => {
  try {
    const refreshToken = await RefreshToken.findOne({
      refreshToken: req.body.token,
    });
    if (!refreshToken)
      return res.status(404).json({ message: "Refresh Token not found!" });

    const removedToken = await RefreshToken.deleteOne({
      refreshToken: req.body.token,
    });
    res.status(200).json(removedToken);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
