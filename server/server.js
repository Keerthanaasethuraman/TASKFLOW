const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

dotenv.config();

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

// Connect Database
connectDB();

const app = express();

// ==========================
// Middleware
// ==========================

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// ==========================
// Test Route
// ==========================

app.get("/", (req, res) => {
  res.send("🚀 TaskFlow Backend is Running!");
});

// ==========================
// API Routes
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// ==========================
// Error Middleware
// ==========================

app.use(notFound);
app.use(errorHandler);

// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ SERVER ERROR");
  console.error(err);
});