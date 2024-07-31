const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnection = require("../db/dbConfig");

// Register a new user
// POST /api/user/register
async function register(req, res) {
  const { username, first_name, last_name, email, password } = req.body;

  // Validate input fields
  if (!username || !first_name || !last_name || !email || !password) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required information.",
    });
  }

  try {
    // Check if the username or email already exists
    const [existingUsers] = await dbConnection.query(
      "SELECT username, userid FROM usertable WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        error: "Conflict",
        message: "User already existed",
      });
    }

    // Ensure the password meets the minimum length requirement
    if (password.length < 8) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Password must be at least 8 characters long.",
      });
    }

    // Encrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const [result] = await dbConnection.query(
      "INSERT INTO usertable (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, first_name, last_name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error in register function:", error); // Log the error for debugging
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Authenticate a user and generate a JWT token
// POST /api/user/login
async function login(req, res) {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields.",
    });
  }

  try {
    // Fetch the user by email
    const [results] = await dbConnection.query(
      "SELECT * FROM usertable WHERE email = ?",
      [email]
    );

    // Check if user exists and password matches
    if (
      results.length === 0 ||
      !(await bcrypt.compare(password, results[0].password))
    ) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid email or password.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: results[0].userid }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ message: "User login successful.", token });
  } catch (error) {
    console.error("Error in login function:", error); // Log the error for debugging
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Check if the user is authenticated
// GET /api/user/checkUser
async function checkUser(req, res) {
  res.send("User is authenticated.");
}

module.exports = { register, login, checkUser };
