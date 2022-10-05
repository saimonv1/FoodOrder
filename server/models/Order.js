const mongoose = require("mongoose");
//mongoose.set('debug', true);

const OrderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
});

module.exports = mongoose.model("Order", OrderSchema);
