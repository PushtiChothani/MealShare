
const mongoose = require("mongoose");

/**
 * Establishes connection to MongoDB Atlas database.
 * Configures event listeners for unexpected disconnections and connection errors.
 */
async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from the .env file.");
    }

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Awaiting automatic reconnection...");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB runtime connection error:", err.message);
    });

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
