const mongoose = require("mongoose");
//mongoose.set('debug', true);

const DishSchema = mongoose.Schema({
  name: {type: String, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: mongoose.Schema.Types.Decimal128, required: true},
  menu: {type: mongoose.Schema.Types.ObjectId, ref: "Menu"},
});

module.exports = mongoose.model("Dish", DishSchema);