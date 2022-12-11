const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const authorization = require("./middleware/authorization");
const parameters = require("./middleware/parameters");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

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
app.use("/api/locations/:locationId/menus", parameters.menusMiddleware, menusRouter);

const dishesRouter = require("./routes/dishes");
app.use("/api/locations/:locationId/menus/:menuId/dishes", parameters.dishesMiddleware, dishesRouter);


const tokensRoute = require("./routes/tokens");
app.use("/api/tokens", tokensRoute);

const usersRoute = require("./routes/users");
app.use("/api/users", usersRoute);

const ordersRouter = require("./routes/orders");
app.use("/api/users/:userId/orders", authorization.authenticateTokenPersonal, ordersRouter);

const userIdsRouter = require("./routes/usersIds");
app.use("/api/users/:userName/userIds", authorization.authenticateTokenPersonalUsername, userIdsRouter);

app.get("/api", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
