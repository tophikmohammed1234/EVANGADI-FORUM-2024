const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Post answer for questions
async function postAnswer(req, res) {
	const { answer } = req.body;
	const question_id = req.params.question_id;
	const userid = req.user.userid;
	// Validate request body
	if (!answer) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Please provide  answer.",
		});
	}

	try {
		// Insert answer into database
		const [result] = await dbConnection.query(
			"INSERT INTO answerTable (userid, questionid, answer) VALUES (?,?, ?)",
			[userid, question_id, answer]
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
async function getAnswer(req, res) {
	const questionid = req.params.questionid;
	try {
		const [answer] = await dbConnection.query(
			`SELECT 
    answerTable.answerId, 
    answerTable.answer, 
    userTable.username, 
    questionTable.tag
FROM 
    answerTable
    JOIN userTable ON answerTable.userId = userTable.userId
    JOIN questionTable ON answerTable.questionId = questionTable.questionId
WHERE 
    questionTable.questionId = ?
ORDER BY 
    answerTable.answerId ASC`,
			[questionid]
		);
		return res.status(StatusCodes.OK).json({ answer });
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "An unexpected error occurred.",
		});
	}
}

module.exports = { postAnswer, getAnswer };
