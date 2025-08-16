// Import required modules
const { google } = require('googleapis');
const Gmail = require('../models/Gmail'); // Mongoose model to store emails
const Folder = require('../models/Folder'); // Mongoose model to store user's folders
const UserToken = require("../models/UserToken"); // (not used here directly)
const { oauth2Client } = require('../utils/gmailAuth'); // Gmail OAuth2 setup

/**
 * Function to fetch emails from a user's Gmail and save them into matching folders
 * based on keywords found in subject or body.
 */
const fetchEmails = async ({ userEmail, access_token, refresh_token, expiry_date }) => {
  try {
    // Set the user's Gmail access credentials
    oauth2Client.setCredentials({
      access_token,
      refresh_token,
      expiry_date
    });

    // Create a Gmail API client
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Get the latest 10 emails from the user's inbox
    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });

    const messages = res.data.messages || [];

    // Loop through each message
    for (const msg of messages) {
      try {
        // Get full email details using message ID
        const detail = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
        });

        const payload = detail.data.payload || {};
        const headers = payload.headers || [];

        // Extract email subject, from, and date from headers
        const subject = headers.find(h => h.name === 'Subject')?.value || '(no subject)';
        const from = headers.find(h => h.name === 'From')?.value || '(no sender)';
        const date = headers.find(h => h.name === 'Date')?.value || '';

        // Get the base64 encoded body of the email
        let encodedBody = '';
        if (payload.parts && Array.isArray(payload.parts)) {
          const textPart = payload.parts.find(part => part.mimeType === 'text/plain');
          if (textPart?.body?.data) encodedBody = textPart.body.data;
        } else if (payload.body?.data) {
          encodedBody = payload.body.data;
        }

        // Decode the body into readable text
        const decodedBody = Buffer.from(encodedBody, 'base64').toString('utf-8');

        // Get all folders created by this user from the database
        const folders = await Folder.find({ userEmail });
        let matchedFolder = null;

        // Check if any folder name is found in the subject or body
        for (const f of folders) {
          const keyword = f.folderName.toLowerCase();
          if (
            subject.toLowerCase().includes(keyword) ||
            decodedBody.toLowerCase().includes(keyword)
          ) {
            matchedFolder = f.folderName;
            break;
          }
        }

        // If a matching folder is found
        if (matchedFolder) {
          // Check if this email is already saved (avoid duplicates)
          const alreadyExists = await Gmail.findOne({ userEmail, subject, from, date });
          if (alreadyExists) continue;

          // Save the email to the database with the matched folder
          await Gmail.create({
            userEmail,
            folderName: matchedFolder,
            subject,
            from,
            date,
            body: decodedBody,
          });

          // Log for developer visibility
          console.log(`📥 New mail for ${userEmail}`);
          console.log(`📁 Sorted into folder: ${matchedFolder}`);
          console.log(`✉️  Subject: ${subject}`);
        }

      } catch (msgErr) {
        // Error in processing individual message
        console.error(`⚠️ Error processing message ${msg.id} for ${userEmail}:`, msgErr.message);
      }
    }

  } catch (err) {
    // Error in fetching emails
    console.error(`❌ Error fetching emails for ${userEmail}:`, err.message);
  }
};

// Export the function so it can be used in other files
module.exports = fetchEmails;
