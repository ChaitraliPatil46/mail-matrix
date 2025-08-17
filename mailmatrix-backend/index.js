const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const folderRoutes = require("./routes/folderRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express(); // ✅ Initialize app first

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/folder", folderRoutes);
app.use("/api/email", emailRoutes);       // for folder-specific emails
app.use("/api", emailRoutes);             // for Google OAuth (e.g. /auth/google/callback)

// ✅ Test route
app.get("/api/test", (req, res) => res.send("API is working 🎉"));

// ✅ Cron job setup (optional logic inside it)
require("./cronJob");

// ✅ Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
