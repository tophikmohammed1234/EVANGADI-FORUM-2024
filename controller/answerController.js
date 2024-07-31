const dbConnection = require("../db/dbConfig");

// --------------------------------------------------------------
// 1 o	Get Answers for a Question Documentation
// GET /api/answer/:question_id
// Get answers for a specific question
// --------------------------------------------------------------
async function answerQuestionById(req, res) {
  const { question_id } = req.params;
  const sql = "SELECT * FROM answerTable WHERE questionid = ?";

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
    res.json({ answers: results });
  });
}

// --------------------------------------------------------------
// 2 o	Post Answers for a Question Documentation
// POST /api/answer
// Post an answer for a specific question
// --------------------------------------------------------------
async function answer(req, res) {
  const { questionid, answer, userid } = req.body;
  if (!questionid || !answer || !userid) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide answer",
    });
  }
  const sql =
    "INSERT INTO answerTable (questionid, answer, userid) VALUES (?, ?, ?)";

  dbConnection.query(sql, [questionid, answer, userid], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }
    res.status(201).json({
      message: "Answer posted successfully",
      answer_id: result.insertId,
    });
  });
}

module.exports = { answerQuestionById, answer };
