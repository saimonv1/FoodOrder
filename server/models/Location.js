const mongoose = require("mongoose");
//mongoose.set('debug', true);

const LocationSchema = mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
});

module.exports = mongoose.model("Location", LocationSchema);
