const express = require("express");
const Dish = require("../models/Dish");
const Location = require("../models/Location");
const Menu = require("../models/Menu");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find({ location: req.params.locationId });
    res.status(200).json(menus);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  if(!req.body.name) {
    res.status(400).json({ message: "Field name is required!" });
    return;
  }

  if(!req.body.description) {
    res.status(400).json({ message: "Field description is required!" });
    return;
  }

  if(!await Location.findById(req.params.locationId)){
    res.status(400).json({ message: "Valid locationId is required!" });
    return;
  }

  const menu = new Menu({
    name: req.body.name,
    description: req.body.description,
    creationDate: Date.now(),
    lastUpdateDate: Date.now(),
    location: req.params.locationId,
  });

  try {
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get("/:menuId", async (req, res) => {
  try {
    const menu = await Menu.find({ location: req.params.locationId }).findById(
      req.params.menuId
    );
    res.status(200).json(menu);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete("/:menuId", async (req, res) => {
  try {
    const removedMenu = await Menu.deleteOne({
      _id: req.params.menuId,
      location: req.params.locationId,
    });
    res.status(200).json(removedMenu);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// router.post("/:menuId/addDish/:dishId", async (req, res) => {
//   try {
//     const menu = await Menu.findById(req.params.menuId);
//     const dish = await Dish.findById(req.params.dishId);

//     menu.dishes.push(dish);

//     const savedMenu = await menu.save();
//     res.status(201).json(savedMenu);
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// });

// router.post("/:menuId/removeDish/:dishId", async (req, res) => {
//   try {
//     const menu = await Menu.findById(req.params.menuId);
//     const dish = await Dish.findById(req.params.dishId);

//     menu.dishes = menu.dishes.filter(item => item._id != dish._id);

//     const savedMenu = await menu.save();
//     res.status(201).json(savedMenu);
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// });

module.exports = router;
