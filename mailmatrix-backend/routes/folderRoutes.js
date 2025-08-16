// routes/folderRoutes.js

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createFolder,
  getUserFolders,
  deleteFolder, // ✅ NEW: Added delete controller
} = require("../controllers/folderController");

// POST: Create a new folder
router.post("/create", createFolder);

// GET: Get all folders for a user
router.get("/:userEmail", getUserFolders);

// DELETE: Delete a folder by ID
router.delete("/delete/:id", deleteFolder); // ✅ NEW: Delete route

module.exports = router;
