const cron = require('node-cron');
const fetchEmails = require('./controllers/fetchEmails'); // this should accept email + tokens
const UserToken = require('./models/UserToken'); // ✅ Use this instead of User

cron.schedule('* * * * *', async () => {
  console.log('⏰ Running dynamic cron job...');

  try {
    const users = await UserToken.find(); // ✅ Get all users with tokens

    for (const user of users) {
      console.log(`📨 Fetching emails for ${user.userEmail}`);

      await fetchEmails({
        userEmail: user.userEmail,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
        expiry_date: user.expiry_date
      });
    }
  } catch (error) {
    console.error('❌ Cron job error:', error);
  }
});
