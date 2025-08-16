const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  folderName: { type: String, required: true }
});

module.exports = mongoose.model("Folder", folderSchema);
