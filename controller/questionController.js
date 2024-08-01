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
