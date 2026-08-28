const Project = require("../models/Project");
// Create Project
const createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }
    const project = await Project.create({
      name,
      description,
      owner: req.user.id,
      members: members || [],
    });
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get All Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("owner", "name email")
      .populate("members", "name email");
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get Single Project
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email");
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Update Project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Delete Project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};