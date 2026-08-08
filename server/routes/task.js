const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  addComment,
  deleteTask,
} = require("../controllers/taskController");

// Create Task
router.post("/", protect, createTask);

// Get All Tasks
router.get("/", protect, getTasks);

// Get Single Task
router.get("/:id", protect, getTaskById);

// Update Task
router.put("/:id", protect, updateTask);
// Add Comment
router.post("/:id/comment", protect, addComment);

// Delete Task
router.delete("/:id", protect, deleteTask);

module.exports = router;