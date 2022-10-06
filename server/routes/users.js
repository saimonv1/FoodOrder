const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", async (req, res) => {});

router.get("/:userId", async (req, res) => {});

router.delete("/:userId", async (req, res) => {});

router.patch("/:userId", async (req, res) => {});

module.exports = router;
