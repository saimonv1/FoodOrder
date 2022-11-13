const Location = require("../models/Location");
const Menu = require("../models/Menu");

//Check if location ID is valid in menu route
const menusMiddleware = async (req, res, next) => {
  const location = await Location.findById(req.params.locationId);
  if (!location)
    return res
      .status(404)
      .json({ message: "Location with this ID doesn't exist!" });
  next();
};

//Check if menu ID is valid in dish route
const dishesMiddleware = async (req, res, next) => {
  const menu = await Menu.findById(req.params.menuId);
  if (!menu)
    return res
      .status(404)
      .json({ message: "Menu with this ID doesn't exist!" });
  next();
};

module.exports = { menusMiddleware, dishesMiddleware };
