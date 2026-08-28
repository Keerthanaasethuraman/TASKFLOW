const Task = require("../models/Task");
const User = require("../models/User");
const createTask = async (req, res) => {
  try {
    const {
  title,
  description,
  project,
  assignedTo,
  priority,
  dueDate,
  dueTime,
} = req.body;
    if (!title || !project) {
      return res.status(400).json({
        success: false,
        message: "Title and Project are required.",
      });
    }
const task = await Task.create({
  title,
  description,
  project,
  assignedTo,
  priority,
  dueDate,
  dueTime,
  createdBy: req.user.id,
      activity: [
        {
          action: "Task Created",
          user: req.user.id,
        },
      ],
    });
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project", "name description status")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("activity.user", "name email")
      .populate("comments.user", "name email");
    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "name description status")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("activity.user", "name email")
      .populate("comments.user", "name email");
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    const previousStatus = task.status;
    console.log("========== UPDATE TASK ==========");
console.log("Previous Assignee:", task.assignedTo?.toString());
console.log("Incoming Assignee:", req.body.assignedTo);
    const previousAssignee = task.assignedTo?.toString();
    Object.assign(task, req.body);
    console.log("After assign:", task.assignedTo);
console.log("After dueDate:", task.dueDate);
  if (
  req.body.assignedTo &&
  previousAssignee !== req.body.assignedTo
) {
  console.log("Assignment changed!");
  const assignedUser = await User.findById(
    req.body.assignedTo
  );
  task.activity.push({
    action: `assigned this task to ${assignedUser?.name || "Unknown User"}`,
    user: req.user.id,
    createdAt: new Date(),
  });
}
if (req.body.dueDate) {
  task.activity.push({
    action: "Updated Due Date",
    user: req.user.id,
    createdAt: new Date(),
  });
}
console.log(task.activity);
console.log("BEFORE TASK SAVE");
await task.save();
console.log("AFTER TASK SAVE");
console.log("BEFORE FETCHING UPDATED TASK");
await task.save();
    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("comments.user", "name email")
      .populate("activity.user", "name email");
      console.log("AFTER FETCHING UPDATED TASK");
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    task.comments.push({
      text,
      user: req.user.id,
      createdAt: new Date(),
    });
    task.activity.push({
      action: "Added Comment",
      user: req.user.id,
      createdAt: new Date(),
    });
    await task.save();
    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("comments.user", "name email")
      .populate("activity.user", "name email");
    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
  res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  addComment,
  deleteTask,
};