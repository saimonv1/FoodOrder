const express = require("express");
const router = express.Router({ mergeParams: true });
const Dish = require("../models/Dish");

router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.status(200).json(dishes);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const dish = new Dish({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  try {
    const savedDish = await dish.save();
    res.status(201).json(savedDish);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get("/:dishId", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.dishId);
    res.status(200).json(menu);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete("/:dishId", async (req, res) => {
  try {
    const removedDish = await Dish.deleteOne({
      _id: req.params.dishId,
    });
    res.status(200).json(removedDish);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
