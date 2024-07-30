// Create a router instance using express.Router
const express = require("express");
const router = express.Router();
// authmiddeleware
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all-questions", authMiddleware);
