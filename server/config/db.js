const mongoose = require("mongoose");

const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(dbUri);
    console.log("MongoDB is connected... I think?");
  } catch (err) {
    console.log("Error connecting to DB:", err.message);
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;