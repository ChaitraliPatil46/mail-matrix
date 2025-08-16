const mongoose = require("mongoose");

const gmailSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  folderName: { type: String, required: true },
  subject: String,
  from: String,
  body: String,
  date: String
});

module.exports = mongoose.model("Gmail", gmailSchema);
