const Folder = require("../models/Folder");

// ✅ Create a new folder for a user
const createFolder = async (req, res) => {
  try {
    const { userEmail, folderName } = req.body;

    // Prevent duplicate folder
    const existing = await Folder.findOne({ userEmail, folderName });
    if (existing) {
      return res.status(400).json({ message: "Folder already exists" });
    }

    const folder = new Folder({ userEmail, folderName });
    await folder.save();
    res.status(201).json({ message: "Folder created", folder });
  } catch (error) {
    console.error("Create Folder Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all folders of a specific user
const getUserFolders = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const folders = await Folder.find({ userEmail });
    res.status(200).json(folders);
  } catch (error) {
    console.error("Fetch Folders Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete folder by ID
const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    await Folder.findByIdAndDelete(id);
    res.status(200).json({ message: "Folder deleted" });
  } catch (error) {
    console.error("Delete Folder Error:", error);
    res.status(500).json({ message: "Failed to delete folder" });
  }
};

module.exports = {
  createFolder,
  getUserFolders,
  deleteFolder, // ✅ Add this in the export
};
