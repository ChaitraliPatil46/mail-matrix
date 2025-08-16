const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userEmail: String,
  access_token: String,
  refresh_token: String,
  expiry_date: Number,
});

module.exports = mongoose.model("UserToken", TokenSchema);
