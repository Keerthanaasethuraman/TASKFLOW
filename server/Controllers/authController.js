const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// ==========================
// Register User
// ==========================
const registerUser = async (req, res) => {
  console.log("🔥 registerUser called");

  try {
    const { name, email, password } = req.body;

    console.log(req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Login User
// ==========================
const loginUser = async (req, res) => {

  console.log("🔥 loginUser called");
  console.log("Body:", req.body);

  try {

    const { email, password } = req.body;

    console.log("Finding user...");

    const user = await User.findOne({ email });

    console.log("User:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Comparing password...");

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    console.log("Generating token...");

    const token = generateToken(user._id);

    console.log("Sending response...");

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error("LOGIN ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// =============================
// Get All Users
// =============================
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Export Controllers
// ==========================
module.exports = {
  registerUser,
  loginUser,
  getUsers,
};