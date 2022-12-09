const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.userName });

    if (!user)
      return res
        .status(404)
        .json({ message: "User with this username doesn't exist!" });
        
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
