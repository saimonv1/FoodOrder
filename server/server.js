const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const Location = require("./models/Location");
const Menu = require("./models/Menu");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT;
const DB_URL = process.env.DB_CONNECTION;

//Database
mongoose.connect(DB_URL, {}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to DB");
  }
});

//Import Routes
const locationsRoute = require("./routes/locations");
app.use("/api/locations", locationsRoute);

const menusMiddleware = async (req, res, next) => {
  const location = await Location.findById(
    req.params.locationId
  );
  if (!location)
      return res
        .status(404)
        .json({ message: "Location with this ID doesn't exist!" });   
  next();
};
const menusRouter = require("./routes/menus");
app.use("/api/locations/:locationId/menus", menusMiddleware, menusRouter);

const dishesMiddleware = async (req, res, next) => {
  const menu = await Menu.findById(
    req.params.menuId
  );
  if (!menu)
      return res
        .status(404)
        .json({ message: "Menu with this ID doesn't exist!" });   
  next();
};
const dishesRouter = require("./routes/dishes");
app.use("/api/locations/:locationId/menus/:menuId/dishes", dishesMiddleware, dishesRouter);



const usersRoute = require("./routes/users");
app.use("/api/users", usersRoute);

const ordersRouter = require("./routes/orders");
app.use("/api/users/:userId/orders", ordersRouter);

app.get("/api", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
