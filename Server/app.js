require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 7700;
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Database connection
const dbConnection = require("./db/dbConfig");
// User routes middleware file
const userRoutes = require("./routes/userRoute");
// Question routes middleware file
const questionRoutes = require("./routes/questionRoute");
// Answer routes middleware file
const answerRoutes = require("./routes/answerRoute");
// Authentication middleware
const authMiddleware = require("./middleware/authMiddleware");
const { createTables } = require("./db/database");

// Routes with authentication middleware
app.use("/api/questions", authMiddleware, questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/answers", authMiddleware, answerRoutes);

// Start server with database connection
async function start() {
  try {
    await dbConnection.execute("SELECT 'test'");
    createTables();
    app.listen(port, () => {
      console.log("Database connection established");
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to establish database connection:", error.message);
  }
}
start();
