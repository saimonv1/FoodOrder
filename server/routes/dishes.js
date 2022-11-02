const express = require("express");
const router = express.Router({ mergeParams: true });
const Dish = require("../models/Dish");

const authorization = require("../middleware/authorization");

router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find({ menu: req.params.menuId });
    res.status(200).json(dishes);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", authorization.authenticateTokenAdmin, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Field name is required!" });
  }

  if (!req.body.description) {
    return res.status(400).json({ message: "Field description is required!" });
  }

  if (!req.body.price) {
    return res.status(400).json({ message: "Field price is required!" });
  }

  const dish = new Dish({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    menu: req.params.menuId,
  });

  try {
    const savedDish = await dish.save();
    res.status(201).json(savedDish);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:dishId", async (req, res) => {
  try {
    const dish = await Dish.findById(
      req.params.dishId
    );
    if (!dish)
      return res
        .status(404)
        .json({ message: "Dish with this ID doesn't exist!" });
        
    res.status(200).json(dish);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete("/:dishId", authorization.authenticateTokenAdmin, async (req, res) => {
  try {
    const dish = await Dish.findById(
      req.params.dishId
    );
    if (!dish)
      return res
        .status(404)
        .json({ message: "Dish with this ID doesn't exist!" });

    const removedDish = await Dish.deleteOne({
      _id: req.params.dishId,
      menu: req.params.menuId,
    });
    res.status(200).json(removedDish);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch("/:dishId", authorization.authenticateTokenAdmin, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Field name is required!" });
  }

  if (!req.body.description) {
    return res.status(400).json({ message: "Field description is required!" });
  }

  if (!req.body.price) {
    return res.status(400).json({ message: "Field price is required!" });
  }

  try {
    const dish = await Dish.findById(req.params.dishId);
    if (!dish)
      return res
        .status(404)
        .json({ message: "Dish with this ID doesn't exist!" });

    const updatedDish = await Dish.findByIdAndUpdate(req.params.dishId, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });
    res.status(200).json(updatedDish);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
