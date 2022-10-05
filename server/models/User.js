const mongoose = require("mongoose");
//mongoose.set('debug', true);

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  joinDate: { type: Date, required: true },
  lastJoinDate: { type: Date, required: true },
});

module.exports = mongoose.model("User", UserSchema);
