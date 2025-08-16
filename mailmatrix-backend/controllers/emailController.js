// controllers/emailController.js
// This controller file contains two main functions:
// 1)saveEmail – for saving one email to MongoDB
// 2)getEmailsByFolder – for fetching emails from a specific folder of a user

const Gmail = require("../models/Gmail");

// Save a new Gmail entry for a user-folder
const saveEmail = async (req, res) => {
  try {
    const { userEmail, folderName, subject, from, date, body } = req.body;

    const gmail = new Gmail({
      userEmail,
      folderName,
      subject,
      from,
      date,
      body,
    });

    await gmail.save();
    res.status(201).json({ message: "Email saved", gmail });
  } catch (error) {
    console.error("Save Email Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all emails from a specific user-folder
const getEmailsByFolder = async (req, res) => {
  try {
    const { userEmail, folderName } = req.params;
    const emails = await Gmail.find({ userEmail, folderName });
    res.status(200).json(emails);
  } catch (error) {
    console.error("Fetch Emails Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a single email by ID
const deleteEmail = async (req, res) => {
  try {
    const { emailId } = req.params;
    const deletedEmail = await Gmail.findByIdAndDelete(emailId);
    
    if (!deletedEmail) {
      return res.status(404).json({ message: "Email not found" });
    }
    
    res.status(200).json({ message: "Email deleted successfully" });
  } catch (error) {
    console.error("Delete Email Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete multiple emails by IDs
const deleteMultipleEmails = async (req, res) => {
  try {
    const { emailIds } = req.body;
    
    if (!emailIds || !Array.isArray(emailIds) || emailIds.length === 0) {
      return res.status(400).json({ message: "Email IDs array is required" });
    }
    
    const result = await Gmail.deleteMany({ _id: { $in: emailIds } });
    
    res.status(200).json({ 
      message: `${result.deletedCount} email(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Delete Multiple Emails Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  saveEmail,
  getEmailsByFolder,
  deleteEmail,
  deleteMultipleEmails,
};
