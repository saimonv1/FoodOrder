const mongoose = require("mongoose");
//mongoose.set('debug', true);

const MenuSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creationDate: { type: Date, required: true },
  lastUpdateDate: { type: Date, required: true },
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
});

module.exports = mongoose.model("Menu", MenuSchema);
