const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Post answer for questions
async function postAnswer(req, res) {
  const { questionid, answer } = req.body;
  const userid = req.user.userid;

  // Validate request body
  if (!questionid || !answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide both questionid and answer.",
    });
  }

  try {
    // Insert answer into database
    const [result] = await dbConnection.query(
      "INSERT INTO answerTable (userid, questionid, answer) VALUES (?,?, ?)",
      [userid, questionid, answer]
    );

    // Check if insertion was successful
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Failed to insert answer.",
      });
    }

    // Respond with success message
    return res.status(StatusCodes.CREATED).json({
      message: "Answer posted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred.",
    });
  }
}

// get answer for questions
async function getAnswer(req, res) {
  const questionid = req.params.questionid;
  try {
    const [answer] = await dbConnection.query(
      "SELECT * FROM answerTable WHERE questionid = ?",
      [questionid]
    );
    return res.status(StatusCodes.OK).json({ message: answer });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = { postAnswer, getAnswer };
