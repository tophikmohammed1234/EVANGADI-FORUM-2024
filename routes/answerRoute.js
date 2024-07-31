const express = require("express");
const dbConnection = require("../db/dbConfig");
const router = express.Router();

// Import controller functions
const {
  answerQuestionById,
  answer,
} = require("../controller/answerController");

// --------------------------------------------------------------
// Define a GET route for fetching answers by question_id
// --------------------------------------------------------------
// 1 o Get Answers for a Question Documentation
// GET /api/answer/:question_id
// This route retrieves all answers for a specific question identified by the question_id parameter.
router.get("/:question_id", answerQuestionById);

// --------------------------------------------------------------
// 2 o Post Answers for a Question Documentation
// --------------------------------------------------------------
// POST /api/answer
// This route allows users to post an answer to a specific question.
router.post("/", answer);

module.exports = router;
