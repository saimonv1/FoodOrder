const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

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

const menusRouter = require("./routes/menus");
app.use("/api/locations/:locationId/menus", menusRouter);

const dishesRouter = require("./routes/dishes");
app.use("/api/locations/:locationId/menus/:menuId/dishes", dishesRouter);

app.get("/api", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
