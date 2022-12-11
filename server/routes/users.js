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
    const users = await User.find().select('-password');
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
  return res.status(201).json({
    message: "User created successfully",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

router.patch("/:userId/roles", authorization.authenticateTokenAdmin, async (req, res) => {
  if (!req.body.role) {
    return res.status(400).json({ message: "Field role is required!" });
  }
  if(req.body.role !== "User" && req.body.role !== "Admin") {
    return res.status(400).json({ message: "Role can only be User or Admin!" });
  }
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this ID doesn't exist!" });

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      role: req.body.role
    });
    const returnUser = {
      email: updatedUser.email,
      joinDate: updatedUser.joinDate,
      lastJoinDate: updatedUser.lastJoinDate,
      role: updatedUser.role,
      username: updatedUser.username
    };
    res.status(200).json(returnUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
