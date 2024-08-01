
const dbConection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

async function question(req, res) {
  const { userid, title, description, tag } = req.body;

  // Validate input
  if (!userid || !title || !description) {
    return res.status(400).json({
      msg: "Please provide all required fields",
    });
  }

  //   Check if title and description are less than 50 and 200 characters
  if (title.length > 50) {
    return res
      .status(400)
      .json({ msg: "Title must be less than 50 characters" });
  }

  if (description.length > 200) {
    return res
      .status(400)
      .json({ msg: "Description must be less than 200 characters" });
  }

  // Check if user exists
  try {
    const [user] = await dbConection.query(
      "SELECT userid FROM userTable WHERE userid = ?",
      [userid]
    );
    if (user.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    // generate questionid
    const questionid = uuidv4(); // generate UUID

    // Insert question into database
    await dbConection.query(
      "INSERT INTO questionTable (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, userid, title, description, tag || null]
    );

    return res
      .status(201)
      .json({ msg: "Question created successfully", questionid });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

module.exports = {
  question,
};

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
