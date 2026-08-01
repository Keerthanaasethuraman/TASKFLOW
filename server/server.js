const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

console.log("Mongo URI:", process.env.MONGODB_URI);

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 TaskFlow Backend is Running!");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});