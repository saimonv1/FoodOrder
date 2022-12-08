const mongoose = require("mongoose");
const Dish = require("./Dish");
//mongoose.set('debug', true);

const MenuSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  creationDate: { type: Date, required: true },
  lastUpdateDate: { type: Date, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
});

MenuSchema.post('deleteOne', async function(doc, next) {
  //console.log('deleting all dishes:');
  //console.log(this.getFilter()["_id"]);
  await Dish.deleteMany({menu: this.getFilter()["_id"]});
  next();
});

module.exports = mongoose.model("Menu", MenuSchema);
