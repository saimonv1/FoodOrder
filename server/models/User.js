const mongoose = require("mongoose");
//mongoose.set('debug', true);

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  joinDate: { type: Date, required: true },
  lastJoinDate: { type: Date, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
