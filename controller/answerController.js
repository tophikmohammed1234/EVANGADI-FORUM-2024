const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// post answer for questions
async function postAnswer(req, res) {
  const { questionid, answer } = req.body;

  // Validate request body
  if (!questionid || !answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide answer.",
    });
  }

  try {
    // Insert answer into database
    const [answer] = await dbConnection.query(
      "INSERT INTO answerTable (questionid, answer) VALUES (?, ?) ",
      [questionid, answer]
    );

    // check if the length of the answer
    if (answer.length == 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide answer",
      });
    }

    // respond with success message
    return res.status(StatusCodes.CREATED).json({
      message: "Answer posted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = { postAnswer };
