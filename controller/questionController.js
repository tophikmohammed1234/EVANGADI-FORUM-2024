const dbConnection = require("../db/dbConfig");

// --------------------------------------------------------------
// 3 o	Get All Questions Documentation
// Route to get all questions
// GET /api/question
// --------------------------------------------------------------
async function getAllQuestions(req, res) {
  const sql = "SELECT * FROM questionTable";
  dbConnection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "No questions found." });
    }
    res.json({ questions: results });
  });
}

// --------------------------------------------------------------
// 4 o	Get Single Question Documentation
// Route to get a specific question by ID
// GET /api/question/:question_id

// --------------------------------------------------------------
async function getQuestionById(req, res) {
  const { question_id } = req.params;
  const sql = "SELECT * FROM questionTable WHERE question_id = ?";
  dbConnection.query(sql, [question_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }
    res.json({ question: results[0] });
  });
}

// --------------------------------------------------------------
// 5 o	Post Question Documentation
// Route to post a new question
// POST /api/question
// --------------------------------------------------------------
async function postQuestion(req, res) {
  const { questionid, userid, title, description, tag } = req.body;
  if (!questionid || !userid || !title || !description) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields.",
    });
  }
  const sql =
    "INSERT INTO questionTable (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)";
  dbConnection.query(
    sql,
    [questionid, userid, title, description, tag],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
      }
      res.status(201).json({
        message: "Question created successfully",
        question_id: result.insertId,
      });
    }
  );
}

module.exports = { getAllQuestions, getQuestionById, postQuestion };
