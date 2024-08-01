// Get single question
async function singleQuestion(req, res) {
  const question_id = req.params.question_id;
  try {
    // This code is used to fetch the details of a specific question from the database based on the question_id parameter passed in the URL.
    const [singlequestion] = await dbConnection.query(
      `SELECT * FROM questiontable  WHERE questionid=?`,
      [question_id]
    );
    console.log(singlequestion);
    // if  no question was found in the database it returns The requested question could not be found
    if (singlequestion.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "The requested question could not be found.",
      });
    }
    //  if the requested question found it returns  the details of the requested question.
    return res.status(StatusCodes.OK).json({ question: singlequestion });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
module.exports = { singleQuestion };
