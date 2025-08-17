const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const folderRoutes = require("./routes/folderRoutes");
const emailRoutes = require("./routes/emailRoutes");
import path from "path";
const app = express();

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

// ✅ Serve frontend (after all API routes)
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ✅ Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    const __dirname=path.resolve();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
