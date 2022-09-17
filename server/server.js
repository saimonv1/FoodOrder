const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT;
const DB_URL = process.env.DB_CONNECTION;

//Database
mongoose.connect(process.env.DB_CONNECTION);

//Import Routes
const citiesRoute = require('./routes/cities');
app.use('/cities', citiesRoute);

app.get("/api", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
