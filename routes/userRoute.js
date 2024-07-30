// Create a router instance using express.Router
const express = require("express");
const router = express.Router();
// authmiddeleware
const authMiddleware = require("../middleware/authMiddleware");

// Import controller functions
const { register, login, checkUser } = require("../controller/userController");

// Define the registration endpoint
router.post("/register", register);

// Define the login endpoint
router.post("/login", login);

// Define the user check endpoint
router.get("/check", authMiddleware, checkUser);

// Export the router
module.exports = router;
