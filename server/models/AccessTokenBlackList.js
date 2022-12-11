const mongoose = require("mongoose");
//mongoose.set('debug', true);

const AccessTokenBlackListSchema = mongoose.Schema({
  accessToken: { type: String, required: true },
});

module.exports = mongoose.model("AccessTokenBlackList", AccessTokenBlackListSchema);
