const express = require("express");
const dbConnection = require("../db/dbConfig");
const router = express.Router();

// Import controller functions
const {
  getAllQuestions,
  getQuestionById,
  postQuestion,
} = require("../controller/questionController");

// --------------------------------------------------------------
// Define a GET route for fetching all questions
// 3 o	Get All Questions Documentation
// --------------------------------------------------------------
// Get all questions
// GET /api/question
router.get("/", getAllQuestions);

// --------------------------------------------------------------
// Define a GET route for fetching a specific question by ID
// 4 o	Get Single Question Documentation
// --------------------------------------------------------------
// Get a specific question by ID
// GET /api/question/:question_id
router.get("/:question_id", getQuestionById);

// --------------------------------------------------------------
// Define a POST route for creating a new question
// 5 o	Post Question Documentation
// --------------------------------------------------------------
// Post a new question
// POST /api/question
router.post("/", postQuestion);

module.exports = router;
