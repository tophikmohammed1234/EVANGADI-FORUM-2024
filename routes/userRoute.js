const express = require("express");
const router = express.Router();

// Import user controllers
const { register, login, checkUser } = require("../controller/userController");

// User registration
// POST /api/user/register
router.post("/register", register);

// User login
// POST /api/user/login
router.post("/login", login);

// Check authenticated user information
// GET /api/user/check
router.get("/check", checkUser);

module.exports = router;
