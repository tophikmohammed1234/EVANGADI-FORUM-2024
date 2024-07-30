const db = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes"); // Import StatusCodes

const jwt = require("jsonwebtoken");

// Register a new user

const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Email or username already exists" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Hashing the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error registering user", error: error.message });
  }
};

// User login
// Define an asynchronous function named 'login' that takes request and response objects as parameters
const login = async (req, res) => {
  // Extract email and password from the request body using destructuring
  const { email, password } = req.body;

  // Check if either email or password is missing
  if (!email || !password) {
    // If either is missing, return a BAD_REQUEST status with an error message
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  try {
    // Query the database to find a user with the provided email
    // The query selects username, userid, and password fields
    const [users] = await db.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );

    // If no user is found with the provided email
    if (users.length === 0) {
      // Return an UNAUTHORIZED status with an error message
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    // Get the first (and should be only) user from the result array
    const user = users[0];

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match
    if (!isMatch) {
      // Return an UNAUTHORIZED status with an error message
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    // If credentials are valid, create a JWT token
    const token = jwt.sign(
      { userid: user.userid, username: user.username }, // Payload
      "secret", // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Send a successful response with the token
    res.status(StatusCodes.OK).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    // If any error occurs during the process
    console.error("Login error:", error); // Log the error
    // Send an INTERNAL_SERVER_ERROR status with an error message
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error logging in user" });
  }
};

// Check if a user exists in the database
const checkUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "User data retrieved successfully",
    username: req.user.username,
    userid: req.user.userid,
  });
};

module.exports = { register, login, checkUser };
