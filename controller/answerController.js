const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Function to submit an answer for a specific question

async function getAnswer(req, res) {
  const questionid = req.params.questionid;
  try {
    const [singleQuestionAnswer] = await dbConnection.query(
      `SELECT answerid,answer,username,tag FROM answerTable JOIN userTable JOIN questionTable ON answerTable.userid = userTable.userid AND 
     answerTable. questionid =questionTable. questionid WHERE questionTable.questionid=?
     `,
      [questionid]
    );
    return res.json({ answers: singleQuestionAnswer });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
module.exports = { getAnswer };
