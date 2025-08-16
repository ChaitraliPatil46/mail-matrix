const express = require("express");
const router = express.Router();
const { oauth2Client, getAuthUrl } = require("../utils/gmailAuth");
const { google } = require("googleapis");
const UserToken = require("../models/UserToken");
const fetchEmails = require("../controllers/fetchEmails");
const { getEmailsByFolder, deleteEmail, deleteMultipleEmails } = require("../controllers/emailController"); // 📂 Add this

// Step 1: Redirect to Google auth
router.get("/auth/google", (_, res) => {
  const url = getAuthUrl();
  console.log("🔗 Redirecting to Google:", url);
  res.redirect(url);
});

// Step 2: Handle callback from Google
router.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    console.error("❌ No code found in query");
    return res.status(400).send("No code found in query");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
    const userInfo = await oauth2.userinfo.get();
    const userEmail = userInfo.data.email;

    console.log("✅ User authenticated:", userEmail);

    await UserToken.findOneAndUpdate(
      { userEmail },
      {
        userEmail,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
      },
      { upsert: true }
    );

    await fetchEmails({
      userEmail,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
    });

    res.redirect(`http://localhost:3000/dashboard?email=${encodeURIComponent(userEmail)}`);
  } catch (err) {
    console.error("❌ OAuth error:", err.message);
    res.status(500).send("OAuth failed");
  }
});

// // 📥 Get emails by folder (Inbox, Sent, etc.)
// router.get("/:userEmail/:folderName", getEmailsByFolder);

// ✅ Get emails for specific folder and userEmail
router.get("/emails/:userEmail/:folderName", getEmailsByFolder);

// ✅ Delete a single email by ID
router.delete("/emails/:emailId", deleteEmail);

// ✅ Delete multiple emails by IDs
router.delete("/emails/bulk", deleteMultipleEmails);

module.exports = router;
