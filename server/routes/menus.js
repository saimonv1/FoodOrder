const express = require("express");
const Dish = require("../models/Dish");
const Location = require("../models/Location");
const Menu = require("../models/Menu");
const router = express.Router({ mergeParams: true });

const authorization = require("../middleware/authorization");

router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find({ location: req.params.locationId });
    res.status(200).json(menus);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", authorization.authenticateTokenAdmin, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Field name is required!" });
  }

  if (!req.body.image) {
    return res.status(400).json({ message: "Field image is required!" });
  }

  if (!req.body.description) {
    return res.status(400).json({ message: "Field description is required!" });
  }

  const menu = new Menu({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    creationDate: Date.now(),
    lastUpdateDate: Date.now(),
    location: req.params.locationId,
  });

  try {
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:menuId", async (req, res) => {
  try {
    const menu = await Menu.findById(
      req.params.menuId
    );
    if (!menu)
      return res
        .status(404)
        .json({ message: "Menu with this ID doesn't exist!" });
        
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:menuId", authorization.authenticateTokenAdmin, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    if (!menu)
      return res
        .status(404)
        .json({ message: "Menu with this ID doesn't exist!" });
        
    const removedMenu = await Menu.deleteOne({
      _id: req.params.menuId,
      location: req.params.locationId,
    });
    res.status(200).json(removedMenu);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch("/:menuId", authorization.authenticateTokenAdmin, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Field name is required!" });
  }

  if (!req.body.image) {
    return res.status(400).json({ message: "Field image is required!" });
  }

  if (!req.body.description) {
    return res.status(400).json({ message: "Field description is required!" });
  }

  try {
    const menu = await Menu.findById(req.params.menuId);
    if (!menu)
      return res
        .status(404)
        .json({ message: "Menu with this ID doesn't exist!" });

    const updatedMenu = await Menu.findByIdAndUpdate(req.params.menuId, {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      lastUpdateDate: Date.now(),
    });
    res.status(200).json(updatedMenu);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
