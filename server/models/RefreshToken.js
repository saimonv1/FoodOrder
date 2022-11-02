const mongoose = require("mongoose");
//mongoose.set('debug', true);

const RefreshTokenSchema = mongoose.Schema({
  refreshToken: { type: String, required: true },
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
