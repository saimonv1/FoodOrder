const mongoose = require("mongoose");
const Menu = require("./Menu");
//mongoose.set('debug', true);

const LocationSchema = mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
});

LocationSchema.post('deleteOne', async function(doc, next) {
  //console.log('deleting all menus with location id:');
  //console.log(this.getFilter()["_id"]);
  //await Menu.deleteMany({location: this.getFilter()["_id"]});
  const menusToDelete = await Menu.find({location: this.getFilter()["_id"]});
  //console.log(menusToDelete);
  menusToDelete.forEach(async (menu) => {
    await Menu.deleteOne({ _id: menu._id });
  });
  next();
});

module.exports = mongoose.model("Location", LocationSchema);
