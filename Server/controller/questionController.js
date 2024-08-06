const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");

async function question(req, res) {
	const { title, description, tag } = req.body;
	const userid = req.user.userid;

	// Validate input
	if (!title || !description) {
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
		const [user] = await dbConnection.query(
			"SELECT userid FROM userTable WHERE userid = ?",
			[userid]
		);
		if (user.length === 0) {
			return res.status(404).json({ msg: "User not found" });
		}
		// generate questionid
		const questionid = uuidv4();

		// get current date
		var today = new Date();
		var date = String(today.getDate()).padStart(2, "0");
		var month = String(today.getMonth() + 1).padStart(2, "0");
		var year = today.getFullYear();

		today = `${date}/${month}/${year}`;
		//set tag to current date
		const tag = today;
		// Insert question into database
		await dbConnection.query(
			"INSERT INTO questionTable (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
			[questionid, userid, title, description, tag || null]
		);

		return res
			.status(201)
			.json({ msg: "Question created successfully", questionid });
	} catch (error) {
		return res.status(500).json({ msg: "Something went wrong" });
	}
}

// Get single question
async function singleQuestion(req, res) {
	const question_id = req.params.question_id;
	try {
		// This code is used to fetch the details of a specific question from the database based on the question_id parameter passed in the URL.
		const [singlequestion] = await dbConnection.query(
			` SELECT * FROM questiontable  WHERE questionid=?`,
			[question_id]
		);
		// if  no question was found in the database it returns The requested question could not be found
		if (singlequestion.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({
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

async function getQuestions(req, res) {
	try {
		const [questions] = await dbConnection.query(
			`SELECT questionTable.*, userTable.username
       FROM questionTable
       JOIN userTable ON questionTable.userid = userTable.userid
       ORDER BY questionTable.id DESC`
		);
		return res.status(StatusCodes.OK).json({ questions });
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred.",
		});
	}
}

module.exports = { singleQuestion, question, getQuestions };
